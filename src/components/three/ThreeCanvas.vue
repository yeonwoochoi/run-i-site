<!--<template>-->
<!--  <div ref="canvasContainer" id="canvasContainer" class="w-full h-screen relative overflow-hidden m-0 p-0"/>-->
<!--</template>-->

<!--<script setup>-->
<!--import { onMounted } from 'vue'-->
<!--import gsap from 'gsap'-->
<!--import { initializeThree } from './core/initializer.js'-->

<!--let camera, scene, renderer, controls-->

<!--onMounted(async () => {-->
<!--  const canvasContainer = document.querySelector('#canvasContainer')-->
<!--  if (!canvasContainer) return-->

<!--  const canvas = document.createElement('canvas')-->
<!--  canvasContainer.appendChild(canvas)-->

<!--  const {-->
<!--    renderer: initRenderer,-->
<!--    scene: initScene,-->
<!--    camera: initCamera,-->
<!--    controls: initControls-->
<!--  } = await initializeThree(canvas, {-->
<!--    onMouseOnObject,-->
<!--    onMouseOutObject-->
<!--  })-->

<!--  renderer = initRenderer-->
<!--  scene = initScene-->
<!--  camera = initCamera-->
<!--  controls = initControls-->

<!--  // Window resize-->
<!--  window.addEventListener('resize', onWindowResize, false)-->
<!--  animate()-->
<!--});-->

<!--function onWindowResize() {-->
<!--  camera.aspect = window.innerWidth / window.innerHeight;-->
<!--  camera.updateProjectionMatrix();-->
<!--  renderer.setSize(window.innerWidth, window.innerHeight);-->
<!--}-->

<!--function animate() {-->
<!--  requestAnimationFrame(animate)-->
<!--  controls.update()-->
<!--  renderer.render(scene, camera)-->
<!--}-->

<!--function onMouseOnObject(target) {-->
<!--  gsap.to(target.rotation, {-->
<!--    y: Math.PI, // 180도 회전-->
<!--    duration: 1,-->
<!--    ease: 'power1.out',-->
<!--  });-->
<!--  gsap.to(target.scale, {-->
<!--    x: 2, // 크기 증가-->
<!--    y: 2,-->
<!--    z: 2,-->
<!--    duration: 1,-->
<!--    ease: 'power2.out',-->
<!--  });-->
<!--}-->

<!--function onMouseOutObject(target) {-->
<!--  gsap.to(target.rotation, {-->
<!--    y: 0, // 원래 회전 상태-->
<!--    duration: 1,-->
<!--    ease: 'power1.inOut',-->
<!--  });-->
<!--  gsap.to(target.scale, {-->
<!--    x: 1, // 원래 크기-->
<!--    y: 1,-->
<!--    z: 1,-->
<!--    duration: 1,-->
<!--    ease: 'power2.inOut',-->
<!--  });-->
<!--}-->
<!--</script>-->
<template>
  <div>
    <div ref="canvasContainer" id="canvasContainer" class="w-full h-screen relative overflow-hidden m-0 p-0"></div>
    <div ref="textContainer" id="textContainer" class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-2xl font-bold text-center"></div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import gsap from 'gsap';

const canvasContainer = ref(null);
const textContainer = ref(null);

onMounted(() => {
  // Set up scene, camera, and renderer
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  if (canvasContainer.value) canvasContainer.value.appendChild(renderer.domElement);

  // Add orbit controls
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;

  // Create a dynamic sphere
  const geometry = new THREE.IcosahedronGeometry(2, 0);
  const material = new THREE.MeshStandardMaterial({ color: 0x3498db, wireframe: true });
  const sphere = new THREE.Mesh(geometry, material);
  scene.add(sphere);

  // Add light
  const light = new THREE.DirectionalLight(0xffffff, 1);
  light.position.set(5, 5, 5);
  scene.add(light);

  // Set camera position
  camera.position.z = 5;

  // Animation function
  function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
  }
  animate();

  // Responsive resizing
  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });

  // Mouse interaction for rotation
  window.addEventListener('mousemove', (event) => {
    const xRotation = (event.clientY / window.innerHeight) * 2 - 1;
    const yRotation = (event.clientX / window.innerWidth) * 2 - 1;
    gsap.to(sphere.rotation, { x: xRotation * Math.PI, y: yRotation * Math.PI, duration: 1 });
  });

  // Scroll-triggered text animation
  const messages = ['Tailored Solutions', 'Run-I Studio', 'We Drive Your Vision Forward,', 'Whatever It Is—from Web to AI.'];
  let currentMessage = 0;

  if (textContainer.value) {
    window.addEventListener('scroll', () => {
      if (
        window.scrollY > window.innerHeight * 0.5 &&
        currentMessage < messages.length &&
        textContainer.value
      ) {
        textContainer.value.innerText = messages[currentMessage];
        gsap.fromTo(
          textContainer.value,
          { opacity: 0 },
          { opacity: 1, duration: 1 }
        );
        currentMessage++;
      }
    });
  }
});
</script>

<style>
#canvasContainer {
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
}
#textContainer {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #fff;
  font-size: 2rem;
  font-family: Arial, sans-serif;
  text-align: center;
  pointer-events: none;
}
</style>
