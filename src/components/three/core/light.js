import {PointLight} from 'three';

export function createLight() {
  const pointLight = new PointLight(0xffffff, 100);
  pointLight.position.set(0, 2, 12);
  return pointLight;
}
