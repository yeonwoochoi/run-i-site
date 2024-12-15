import { MeshStandardMaterial } from 'three'

export function createStandardMaterial(color = 0xFF7F00) {
  const material = new MeshStandardMaterial({
    color: color,       // 기본 색상
    metalness: 0.6,     // 메탈리질
    roughness: 0.4,
    // wireframe: true
  });

  return material;
}
