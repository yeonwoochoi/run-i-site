<template>
  <div ref="canvasContainer" id="canvasContainer" class="w-full h-screen relative overflow-hidden m-0 p-0"/>
</template>

<script setup>
import { onMounted } from 'vue'
import * as THREE from 'three'
import { createRenderer } from './core/renderer.js'
import { createCamera } from './core/camera.js'
import { createScene } from './core/scene.js'
import { createLight } from './core/light.js'
import { createControls } from './core/control.js'
import { applyHDR } from './utils/HDRLoader'
import { loadGLTF } from './utils/GLTFLoader'
import { createRaycaster } from './core/raycaster'
import { createPlane } from './objects/plane.js'
import gsap from 'gsap'
// import { createMesh } from './objects/mesh.js'
// import { createFog } from "./objects/fog.js";

let camera, scene, renderer, light, lightHelper, controls, raycaster, group, plane, mesh, skyBox;

onMounted(async () => {
  const canvasContainer = document.querySelector('#canvasContainer')
  if (!canvasContainer) return

  const canvas = document.createElement('canvas')
  canvasContainer.appendChild(canvas)

  // 기본 요소 생성
  group = new THREE.Group();
  renderer = createRenderer(canvas);
  scene = createScene();
  camera = createCamera();
  controls = createControls(camera, renderer);
  ({ light, lightHelper } = createLight('DirectionalLight'));
  raycaster = createRaycaster(renderer, camera, scene, group, onMouseOnObject, onMouseOutObject);
  // plane = createPlane();
  // mesh = createMesh();
  // skyBox = createSkyBox();

  // RGBE Loader
  try {
    await applyHDR(renderer, scene, 'src/assets/hdr/qwantani_sunset_4k.hdr')
    console.log('HDR applied successfully');
  } catch (e) {
    console.error('Failed to apply HDR:', e);
  }

  // GLTF Loader
  try {
    const gltfScene = await loadGLTF(scene, 'src/assets/gltfs/Camera_01_4k.glb');
    group.add(gltfScene)
    console.log('GLTF model loaded:', gltfScene);
  } catch (error) {
    console.error('Failed to load GLTF model:', error);
  }

  if (renderer.capabilities.isWebGL2) {
    // 화면 크기에 100%로 맞추기
    renderer.domElement.style.width = '100%'

    // 그림자 사용
    renderer.shadowMap.enabled = true
    // plane.receiveShadow = true // 그림자 생길 오브젝트
    // mesh.castShadow = true // 그림자 생길 오브젝트

    // 안개 추가 (SkyBox 안보여..)
    // createFog(scene)

    // Axis Helper 추가
    const axesHelper = new THREE.AxesHelper(5)

    // Scene 요소 추가
    scene.add(light)
    scene.add(axesHelper)
    scene.add(group)
    // scene.add(plane)
    // scene.add(skyBox)
    // scene.add(mesh)
    if (lightHelper) scene.add(lightHelper)

    animate()
    window.addEventListener('resize', onWindowResize, false)
  } else {
    console.error("WebGL2 is not supported by your browser or device.");
  }
});

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
  requestAnimationFrame( animate );
  controls.update()
  renderer.render( scene, camera );  // 반드시 필요
}

// Hover 상태 처리 함수
function onMouseOnObject(target) {
  gsap.to(target.rotation, {
    y: Math.PI, // 180도 회전
    duration: 1,
    ease: 'power1.out',
  });
  gsap.to(target.scale, {
    x: 2, // 크기 증가
    y: 2,
    z: 2,
    duration: 1,
    ease: 'power2.out',
  });
}

// Hover 해제 상태 처리 함수
function onMouseOutObject(target) {
  gsap.to(target.rotation, {
    y: 0, // 원래 회전 상태
    duration: 1,
    ease: 'power1.inOut',
  });
  gsap.to(target.scale, {
    x: 1, // 원래 크기
    y: 1,
    z: 1,
    duration: 1,
    ease: 'power2.inOut',
  });
}
</script>
