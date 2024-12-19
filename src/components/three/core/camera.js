import {PerspectiveCamera} from 'three';

export function createCamera() {
  const camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
  camera.position.set(2, 1, 5)
  camera.lookAt(0, 0, 0)
  return camera;
}
