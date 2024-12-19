import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

export function createControls (camera, renderer) {
  const controls = new OrbitControls(camera, renderer.domElement)
  controls.minDistance = 2;
  controls.maxDistance = 80;
  controls.maxPolarAngle = Math.PI / 2;
  controls.update();
  return controls;
}
