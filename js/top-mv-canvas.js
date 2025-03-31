import * as THREE from "./three.module.js";

//
const canvasWrapper = document.querySelector(".mv-canvas-wrapper");

// windowのサイズを取得
const getWindowSize = () => {
  const width = canvasWrapper.offsetWidth;
  const height = canvasWrapper.offsetHeight;
  return {
    width,
    height,
  };
};

const windowSize = getWindowSize();

//canvas
const canvas = document.querySelector("#mv-canvas");

// レンダラーを作成
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  antialias: true,
});
renderer.setClearColor(new THREE.Color("#1D1D1D"));
renderer.setSize(windowSize.width, windowSize.height);
renderer.setPixelRatio(window.devicePixelRatio);

// シーンを作成
const scene = new THREE.Scene();

//カメラ
const camera = new THREE.PerspectiveCamera(40, windowSize.width / windowSize.height, 0.1, 10000);
camera.position.set(-2, 0, 7);
camera.lookAt(scene.position);
scene.add(camera);

//ライト
const light_1 = new THREE.DirectionalLight(0xffffff, 1.2);
light_1.position.set(1, 1, 0).normalize();
scene.add(light_1);
const light_2 = new THREE.DirectionalLight(0xffffff, 1.2);
light_2.position.set(-1, -1, 0).normalize();
scene.add(light_2);

scene.fog = new THREE.FogExp2(0x000000, 0.1);

const texture = new THREE.TextureLoader().load("../images/top/canvas_ray.jpg");
texture.colorSpace = THREE.SRGBColorSpace;
texture.wrapS = THREE.RepeatWrapping;
texture.wrapT = THREE.MirroredRepeatWrapping;

const material = new THREE.MeshLambertMaterial({ map: texture });
const geometry = new THREE.CylinderGeometry(0.8, 0.8, 30, 32, 1, false);

const cylinder = new THREE.Mesh(geometry, material);
material.side = THREE.BackSide;
cylinder.position.x = -2;
cylinder.rotation.x = Math.PI / 2;
scene.add(cylinder);

function tick() {

  requestAnimationFrame(tick);

  texture.offset.x -= 0.0001;
  texture.offset.x %= 1;

  texture.offset.y -= 0.02;
  texture.offset.y %= 1;
  texture.needsUpdate = true;

  // レンダリング
  renderer.render(scene, camera);
}

const onResize = () => {
  const windowSize = getWindowSize();

  camera.aspect = windowSize.width / windowSize.height;
  camera.updateProjectionMatrix();

  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(windowSize.width, windowSize.height);
};
window.addEventListener('resize', onResize);

tick();