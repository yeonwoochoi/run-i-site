import { MeshStandardMaterial } from 'three';

export function createStandardMaterial({ color = 0xFF7F00, metalness = 0.6, roughness = 0.4 } = {}) {
  const material = new MeshStandardMaterial({
    color,
    metalness,
    roughness,
  });

  return material;
}
