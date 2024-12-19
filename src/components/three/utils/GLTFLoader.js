import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { MeshPhysicalMaterial } from 'three'

export async function loadGLTF(scene, gltfPath) {
  try {
    const loader = new GLTFLoader();
    const gltf = await loader.loadAsync(gltfPath);
    scene.add(gltf.scene)

    const gltfObj = gltf.scene;
    gltfObj.traverse((obj) => {
      if (obj.isMesh) {
        obj.castShadow = true;
        obj.receiveShadow = true;
        // obj.material = new MeshPhysicalMaterial({ metalness: 0, roughness: 0.5 })
      }
    })
    gltfObj.scale.set(10, 10, 10)
    gltfObj.position.y = -0.5

    return gltfObj;
  }
  catch (e) {
    console.error('Error loading GLTF model:', e);
    throw e;
  }
}
