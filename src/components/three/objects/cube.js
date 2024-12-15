import { BoxGeometry, Mesh, MeshBasicMaterial } from 'three';
import { createStandardMaterial } from "@/components/three/materials/standard-material.js";

export function createCube() {
  const geometry = new BoxGeometry(1, 1, 1);
  const cube = new Mesh(geometry, createStandardMaterial());
  return cube;
}
