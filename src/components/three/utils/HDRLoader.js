import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader'
import { PMREMGenerator } from 'three'

export async function applyHDR(renderer, scene, hdrPath) {
  return new Promise((resolve, reject) => {
    const rgbeLoader = new RGBELoader()
    const pmremGenerator = new PMREMGenerator(renderer)

    rgbeLoader.load(hdrPath,
      (texture) => {
        const envMap = pmremGenerator.fromEquirectangular(texture).texture
        scene.environment = envMap
        scene.background = envMap

        texture.dispose()
        pmremGenerator.dispose()

        resolve()
      },
      undefined,
      (error) => {
        console.error('Failed to load HDR file:', error)
        reject(error)
      }
    )
  })
}
