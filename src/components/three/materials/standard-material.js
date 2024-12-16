import { MeshStandardMaterial, TextureLoader } from 'three'

export function createStandardMaterial(color = 0xFF7F00) {
  const texture = new TextureLoader().load('../../../assets/images/logos/company-logo.png')

  const material = new MeshStandardMaterial({
    color: color,
    metalness: 0.6,     // 메탈리질
    roughness: 0.4,
    // wireframe: true,
    // map: texture
  });

  return material;
}
