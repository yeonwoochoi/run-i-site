import { Mesh, MeshStandardMaterial, PlaneGeometry } from 'three'

// 바닥 추가
export function createPlane() {
  const planeGeometry = new PlaneGeometry(10, 10, 1, 1)
  const planeMaterial = new MeshStandardMaterial({color: 0xffffff});
  const plane = new Mesh(planeGeometry, planeMaterial)
  plane.rotation.x = -0.5 * Math.PI;
  plane.position.y = -0.5;
  return plane;
}
