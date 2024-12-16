import { Color, Fog, FogExp2 } from 'three'

export function createFog(scene) {
  const fogColor = 0x000000;
  scene.fog = new FogExp2(fogColor, 0.1)
  scene.background = new Color(0x555555)
}
