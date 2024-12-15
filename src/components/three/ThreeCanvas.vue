<template>
  <div ref="canvasContainer" id="canvasContainer" class="w-full h-screen relative"/>
</template>

<script setup>
import { onMounted, ref, defineProps } from 'vue'
import { createRenderer } from "./core/renderer.js";
import { createCamera } from "./core/camera.js";
import { createScene } from "./core/scene.js";
import { createLight } from "./core/light.js";
import { createCube } from "./objects/cube.js";
import { DragControls } from 'three/addons/controls/DragControls.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const props = defineProps({
  x: Number,
  y: Number
});

const { x, y } = props;

let canvasContainer = ref(null);
let camera, scene, renderer, cube, light, controls;

onMounted(() => {
  const canvasContainer = document.querySelector('#canvasContainer');
  if (!canvasContainer) return;

  const canvas = document.createElement('canvas');
  canvasContainer.appendChild(canvas);

  renderer = createRenderer(canvas);
  scene = createScene();
  camera = createCamera();
  light = createLight();
  cube = createCube();

  if (renderer.capabilities.isWebGL2) {
    renderer.domElement.style.width = '100%';

    scene.add(cube);
    scene.add(light)

    const dragControls = new DragControls( [cube], camera, renderer.domElement );
    dragControls.addEventListener( 'drag', () => {
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;
    });

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

  renderer.render( scene, camera );  // 반드시 필요
}
</script>
