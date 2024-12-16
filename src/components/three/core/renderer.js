import { WebGLRenderer } from 'three';

export function createRenderer(canvas) {
  const renderer = new WebGLRenderer({ canvas, antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setClearColor(0xaaaaaa, 1);
  return renderer;
}
