import { Raycaster } from 'three'

export function createRaycaster(renderer, camera, scene, target, onHover = null, onOut = null) {
  const raycaster = new Raycaster();
  let isHovered = false; // Hover 상태를 추적

  renderer.domElement.addEventListener('mousemove', (e) => {
    const mouse = {
      x: (e.clientX / renderer.domElement.clientWidth) * 2 - 1,
      y: -(e.clientY / renderer.domElement.clientHeight) * 2 + 1
    }
    raycaster.setFromCamera(mouse, camera)
    const intersects = raycaster.intersectObject(target, true)

    if (intersects.length > 0) {
      if (!isHovered) {
        isHovered = true;
        if (onHover) onHover(target);
      }
    }
    else {
      if (isHovered) {
        isHovered = false;
        if (onOut) onOut(target);
      }
    }
  })

  return raycaster;
}
