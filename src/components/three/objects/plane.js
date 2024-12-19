import { Mesh, MeshStandardMaterial, PlaneGeometry, TextureLoader } from 'three'

// 바닥 추가
export function createPlane() {
  const textureLoader = new TextureLoader();
  // 텍스처 로드
  const textureAO = textureLoader.load('src/assets/images/textures/grass/textures/leafy_grass_ao_4k.jpg');
  const textureARM = textureLoader.load('src/assets/images/textures/grass/textures/leafy_grass_arm_4k.jpg');
  const textureDIFF = textureLoader.load('src/assets/images/textures/grass/textures/leafy_grass_diff_4k.jpg');
  const textureDISP = textureLoader.load('src/assets/images/textures/grass/textures/leafy_grass_disp_4k.png');
  const textureNOR_GL = textureLoader.load('src/assets/images/textures/grass/textures/leafy_grass_nor_gl_4k.jpg');
  const textureROUGH = textureLoader.load('src/assets/images/textures/grass/textures/leafy_grass_rough_4k.jpg');

  const planeGeometry = new PlaneGeometry(10, 10, 1, 1);
  const planeMaterial = new MeshStandardMaterial({
    aoMap: textureAO,
    alphaMap: textureARM,
    map: textureDIFF,
    displacementMap: textureDISP,
    displacementScale: 0.02,
    alphaTest: 0.5,
    normalMap: textureNOR_GL,
    roughnessMap: textureROUGH,
    metalness: 0.1,
    roughness: 0.7,
    color: 0x3b814d,
  });

  const plane = new Mesh(planeGeometry, planeMaterial);
  plane.rotation.x = -0.5 * Math.PI;
  plane.position.y = -0.5;
  return plane;
}
