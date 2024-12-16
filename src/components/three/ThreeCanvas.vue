<template>
  <div ref="canvasContainer" id="canvasContainer" class="w-full h-screen relative"/>
</template>

<script setup>
import { onMounted } from 'vue'
import * as THREE from 'three'
import { createRenderer } from "./core/renderer.js";
import { createCamera } from "./core/camera.js";
import { createScene } from "./core/scene.js";
import { createLight } from "./core/light.js";
import { createControls } from './core/control.js'
import { createCube } from "./objects/cube.js";
import { createPlane } from "./objects/plane.js";
import { createFog } from "./objects/fog.js";
import { createSkyBox } from "./objects/skybox.js";

let camera, scene, renderer, cube, light, lightHelper, plane, controls, skyBox;

onMounted(() => {
  const canvasContainer = document.querySelector('#canvasContainer');
  if (!canvasContainer) return;

  const canvas = document.createElement('canvas');
  canvasContainer.appendChild(canvas);

  // 기본 요소 생성
  renderer = createRenderer(canvas);
  scene = createScene();
  camera = createCamera();
  ({ light, lightHelper } = createLight('PointLight'));
  controls = createControls(camera, renderer);
  cube = createCube();
  plane = createPlane();
  skyBox = createSkyBox();

  if (renderer.capabilities.isWebGL2) {
    // 화면 크기에 100%로 맞추기
    renderer.domElement.style.width = '100%';

    // 그림자 사용
    renderer.shadowMap.enabled = true;
    cube.castShadow = true; // 그림자 생길 오브젝트
    plane.receiveShadow = true; // 그림자 받을 오브젝트

    // 안개 추가
    createFog(scene)

    // Axis Helper 추가
    const axesHelper = new THREE.AxesHelper(5)
    scene.add(axesHelper)

    // Scene 요소 추가
    scene.add(plane)
    scene.add(cube);
    scene.add(light)
    scene.add(plane)
    scene.add(skyBox)
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
</script>
