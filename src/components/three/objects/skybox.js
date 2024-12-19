import { BoxGeometry, Mesh, MeshStandardMaterial, TextureLoader, BackSide } from 'three';

export function createSkyBox() {
  const skyMaterialArray = [];

  const texturePaths = {
    ft: 'src/assets/images/skybox/penguins/arid_ft.jpg',
    bk: 'src/assets/images/skybox/penguins/arid_bk.jpg',
    up: 'src/assets/images/skybox/penguins/arid_up.jpg',
    dn: 'src/assets/images/skybox/penguins/arid_dn.jpg',
    rt: 'src/assets/images/skybox/penguins/arid_rt.jpg',
    lf: 'src/assets/images/skybox/penguins/arid_lf.jpg',
  };

  const loader = new TextureLoader();

  const texture_ft = loader.load(
    texturePaths.ft,
    () => console.log("Front texture loaded successfully"),
    undefined,
    (error) => console.error("Failed to load front texture", error)
  );

  const texture_bk = loader.load(
    texturePaths.bk,
    () => console.log("Back texture loaded successfully"),
    undefined,
    (error) => console.error("Failed to load back texture", error)
  );

  const texture_up = loader.load(
    texturePaths.up,
    () => console.log("Top texture loaded successfully"),
    undefined,
    (error) => console.error("Failed to load top texture", error)
  );

  const texture_dn = loader.load(
    texturePaths.dn,
    () => console.log("Bottom texture loaded successfully"),
    undefined,
    (error) => console.error("Failed to load bottom texture", error)
  );

  const texture_rt = loader.load(
    texturePaths.rt,
    () => console.log("Right texture loaded successfully"),
    undefined,
    (error) => console.error("Failed to load right texture", error)
  );

  const texture_lf = loader.load(
    texturePaths.lf,
    () => console.log("Left texture loaded successfully"),
    undefined,
    (error) => console.error("Failed to load left texture", error)
  );

  // MeshBasicMaterial 사용
  skyMaterialArray.push(new MeshStandardMaterial({ map: texture_ft }));
  skyMaterialArray.push(new MeshStandardMaterial({ map: texture_bk }));
  skyMaterialArray.push(new MeshStandardMaterial({ map: texture_up }));
  skyMaterialArray.push(new MeshStandardMaterial({ map: texture_dn }));
  skyMaterialArray.push(new MeshStandardMaterial({ map: texture_rt }));
  skyMaterialArray.push(new MeshStandardMaterial({ map: texture_lf }));

  // 각 재질의 면을 뒤집어서 내부에서 보이도록 설정
  skyMaterialArray.forEach(skyMaterial => {
    skyMaterial.side = BackSide;
  });

  const skyGeometry = new BoxGeometry(240, 240, 240);
  const sky = new Mesh(skyGeometry, skyMaterialArray);
  return sky;
}
