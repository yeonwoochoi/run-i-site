import * as THREE from 'three';
import { createRenderer } from './renderer.js';
import { createCamera } from './camera.js';
import { createScene } from './scene.js';
import { createLight } from './light.js';
import { createControls } from './control.js';
import { applyHDR } from '../utils/HDRLoader';
import { loadGLTF } from '../utils/GLTFLoader';
import { createRaycaster } from './raycaster';

export async function initializeThree(canvas, options = {}) {
  const renderer = createRenderer(canvas);
  const scene = createScene();
  const camera = createCamera();
  const controls = createControls(camera, renderer);
  const group = new THREE.Group();
  const { light, lightHelper } = createLight('DirectionalLight');
  const raycaster = createRaycaster(renderer, camera, scene, group, options.onMouseOnObject, options.onMouseOutObject);

  // Apply HDR
  try {
    await applyHDR(renderer, scene, 'src/assets/hdr/qwantani_sunset_4k.hdr');
    console.log('HDR applied successfully');
  } catch (e) {
    console.error('Failed to apply HDR:', e);
  }

  // Load GLTF Model
  try {
    const gltfScene = await loadGLTF(scene, 'src/assets/gltfs/Camera_01_4k.glb');
    group.add(gltfScene);
    console.log('GLTF model loaded:', gltfScene);
  } catch (error) {
    console.error('Failed to load GLTF model:', error);
  }

  // Add elements to scene
  scene.add(light);
  scene.add(group);
  if (lightHelper) scene.add(lightHelper);

  return { renderer, scene, camera, controls, raycaster, group };
}
