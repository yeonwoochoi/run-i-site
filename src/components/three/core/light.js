import {
  AmbientLight,
  DirectionalLight,
  DirectionalLightHelper,
  PointLight,
  PointLightHelper,
  SpotLight,
  SpotLightHelper
} from 'three'

export function createLight(type = 'AmbientLight', options = {}) {
  let light, helper

  const defaultOptions = {
    color: 0xffffff,
    intensity: 500,
    position: [0, 10, 10],
    castShadow: true,
    shadowMapSize: 1024, // 그림자 해상도
  }

  const config = { ...defaultOptions, ...options }

  switch (type) {
    case 'AmbientLight':
      light = new AmbientLight(config.color, config.intensity)
      break

    case 'SpotLight':
      light = new SpotLight(config.color, config.intensity)
      light.position.set(...config.position)
      light.castShadow = config.castShadow
      if (light.castShadow) {
        light.shadow.mapSize.width = config.shadowMapSize
        light.shadow.mapSize.height = config.shadowMapSize
      }
      helper = new SpotLightHelper(light)
      break

    case 'DirectionalLight':
      light = new DirectionalLight(config.color, config.intensity)
      light.position.set(...config.position)
      light.castShadow = config.castShadow
      if (light.castShadow) {
        light.shadow.mapSize.width = config.shadowMapSize
        light.shadow.mapSize.height = config.shadowMapSize
      }
      helper = new DirectionalLightHelper(light, 0.5)
      break

    case 'PointLight':
      light = new PointLight(config.color, config.intensity)
      light.position.set(...config.position)
      light.castShadow = config.castShadow
      if (light.castShadow) {
        light.shadow.mapSize.width = config.shadowMapSize
        light.shadow.mapSize.height = config.shadowMapSize
      }
      helper = new PointLightHelper(light, 1)
      break

    default:
      throw new Error(`Unsupported light type: ${type}`)
  }

  return { light, helper }
}
