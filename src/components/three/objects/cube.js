import { BoxGeometry, Mesh } from 'three';
import { createStandardMaterial } from "../materials/standard-material.js";

export function createCube() {
  const geometry = new BoxGeometry(1, 1, 1);
  const cube = new Mesh(geometry, createStandardMaterial());
  return cube;
}
