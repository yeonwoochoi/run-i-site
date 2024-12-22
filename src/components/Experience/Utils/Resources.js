import EventEmitter from './EventEmitter.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { CubeTextureLoader, TextureLoader } from 'three'

export default class Resources extends EventEmitter {
  constructor(sources) {
    super();

    this.sources = sources;

    this.items = {};
    this.toLoad = this.sources.length;
    this.loaded = 0;

    this.setLoaders();
    this.startLoading();
  }

  setLoaders() {
    this.loaders = {}
    this.loaders.gltfLoader = new GLTFLoader()
    this.loaders.textureLoader = new TextureLoader()
    this.loaders.cubeTextureLoader = new CubeTextureLoader() // skybox의 정육면체 Cube의 각 6개 면에 texture 등록하면 skybox 완성됨
  }

  startLoading() {
    for (const source of this.sources) {
      if (source.type === 'gltfModel') {
        this.loaders.gltfLoader.load(
          source.path,
          (file) => {
            console.log(`GLTF model loaded successfully: ${source.path}`);
            this.sourceLoaded(source, file);
          },
          undefined,
          (error) => {
            console.error(`Failed to load GLTF model: ${source.path}`, error);
          }
        );
      } else if (source.type === "texture") {
        this.loaders.textureLoader.load(
          source.path,
          (file) => {
            console.log(`Texture loaded successfully: ${source.path}`);
            this.sourceLoaded(source, file);
          },
          undefined,
          (error) => {
            console.error(`Failed to load texture: ${source.path}`, error);
          }
        );
      } else if (source.type === "cubeTexture") {
        this.loaders.cubeTextureLoader.load(
          source.path,
          (file) => {
            console.log(`Cube texture loaded successfully: ${source.path}`);
            this.sourceLoaded(source, file);
          },
          undefined,
          (error) => {
            console.error(`Failed to load cube texture: ${source.path}`, error);
          }
        );
      }
    }
  }

  sourceLoaded(source, file) {
    this.items[source.name] = file;
    this.loaded++
    if (this.loaded === this.toLoad) {
      this.trigger("ready")
    }
  }
}
