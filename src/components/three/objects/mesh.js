import {
  BoxGeometry,
  CircleGeometry,
  ConeGeometry,
  IcosahedronGeometry,
  Mesh,
  PlaneGeometry,
  SphereGeometry,
  TorusGeometry
} from 'three'
import { createStandardMaterial } from '../materials/standard-material.js'

export function createMesh(type = 'cube', material = createStandardMaterial(), geometryConfigs = {}) {
  let geometry
  switch (type.toLowerCase()) {
    case 'cube': {
      const { width = 1, height = 1, depth = 1 } = geometryConfigs
      geometry = new BoxGeometry(width, height, depth)
      break
    }
    case 'sphere': {
      const { radius = 1, widthSegments = 32, heightSegments = 16 } = geometryConfigs
      geometry = new SphereGeometry(radius, widthSegments, heightSegments)
      break
    }
    case 'icosahedron': {
      const { radius = 1, detail = 0 } = geometryConfigs
      geometry = new IcosahedronGeometry(radius, detail)
      break
    }
    case 'circle': {
      const { radius = 1, segments = 32 } = geometryConfigs
      geometry = new CircleGeometry(radius, segments)
      break
    }
    case 'plane': {
      const { width = 1, height = 1, widthSegments = 1, heightSegments = 1 } = geometryConfigs
      geometry = new PlaneGeometry(width, height, widthSegments, heightSegments)
      break
    }
    case 'torus': {
      const { radius = 1, tube = 0.4, radialSegments = 16, tubularSegments = 100 } = geometryConfigs
      geometry = new TorusGeometry(radius, tube, radialSegments, tubularSegments)
      break
    }
    case 'cone': {
      const { radius = 1, height = 2, radialSegments = 32 } = geometryConfigs
      geometry = new ConeGeometry(radius, height, radialSegments)
      break
    }
    default: {
      throw new Error(`Unknown shape type: ${type}`)
    }
  }

  const mesh = new Mesh(geometry, material)
  return mesh
}
