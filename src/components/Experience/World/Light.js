import {
  AmbientLight,
  DirectionalLight,
  DirectionalLightHelper,
  PointLight,
  PointLightHelper,
  SpotLight,
  SpotLightHelper
} from 'three';
import Experience from "@/components/Experience/Experience.js";

export default class Light {
  constructor() {
    this.lights = [];
    this.experience = new Experience()
    this.scene = this.experience.scene
  }

  createLight(type = 'AmbientLight', options = {}) {
    const defaultOptions = {
      color: 0xffffff,
      intensity: 2,
      position: [0, 10, 10],
      castShadow: true,
      shadowMapSize: 1024, // 그림자 해상도
    };

    const config = { ...defaultOptions, ...options };
    let light = null;
    let helper = null;

    switch (type) {
      case 'AmbientLight':
        light = new AmbientLight(config.color, config.intensity);
        break;

      case 'SpotLight':
        light = new SpotLight(config.color, config.intensity);
        light.position.set(...config.position);
        light.castShadow = config.castShadow;
        if (config.castShadow) {
          light.shadow.mapSize.width = config.shadowMapSize;
          light.shadow.mapSize.height = config.shadowMapSize;
        }
        helper = new SpotLightHelper(light);
        break;

      case 'DirectionalLight':
        light = new DirectionalLight(config.color, config.intensity);
        light.position.set(...config.position);
        light.castShadow = config.castShadow;
        if (config.castShadow) {
          light.shadow.mapSize.width = config.shadowMapSize;
          light.shadow.mapSize.height = config.shadowMapSize;
        }
        helper = new DirectionalLightHelper(light, 0.5);
        break;

      case 'PointLight':
        light = new PointLight(config.color, config.intensity);
        light.position.set(...config.position);
        light.castShadow = config.castShadow;
        if (config.castShadow) {
          light.shadow.mapSize.width = config.shadowMapSize;
        }
        helper = new PointLightHelper(light, 1);
        break;

      default:
        throw new Error(`Unsupported light type: ${type}`);
    }

    this.lights.push({ light, helper }); // Store the light and its helper
    this.scene.add(light)
    return { light, helper };
  }

  getLights() {
    return this.lights;
  }
}

