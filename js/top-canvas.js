import * as THREE from "./three.module.js";

const canvasWrapper = document.querySelector(".canvas-wrapper");
const width = canvasWrapper.offsetWidth;
const height = canvasWrapper.offsetHeight;

// レンダラーを作成
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#canvas'),
  antialias: true,
});
renderer.setClearColor(new THREE.Color("#1D1D1D"));
renderer.setSize(width, height);
renderer.setPixelRatio(window.devicePixelRatio);

// シーンを作成
const scene = new THREE.Scene();

// カメラを作成(画角, アスペクト比, 描画開始距離, 描画終了距離)
const camera = new THREE.PerspectiveCamera(45, width / height, 1, 10000);

// カメラの初期座標を設定（X座標, Y座標, Z座標）
camera.position.set(0, 0, 1000);

// 箱を作成
const texture = new THREE.TextureLoader().load("../images/top/canvas_ray.jpg");// テクスチャ
texture.colorSpace = THREE.SRGBColorSpace;
texture.wrapS = THREE.RepeatWrapping;
texture.wrapT = THREE.RepeatWrapping;
const geometry = new THREE.PlaneGeometry(width, height, 1, 1); //形状
const material = new THREE.MeshPhysicalMaterial({ map: texture }); //素材
const mesh = new THREE.Mesh(geometry, material);//geometry, materialからメッシュ作成
scene.add(mesh);

// 平行光源
const light = new THREE.DirectionalLight(0xb0ccff);
light.intensity = 4; // 光の強さ
light.position.set(1, 1, 1); // ライトの方向
// シーンに追加
scene.add(light);

let loopAnimationId = null;

function tick() {
  texture.offset.x = Math.random();
  texture.needsUpdate = true;

  loopAnimationId = requestAnimationFrame(tick);

  // レンダリング
  renderer.render(scene, camera);
}

/**
   * イベント禁止用処理
   * @param {Event} e イベントオブジェクト
   */
function noScroll(e) {
  e.preventDefault();
}

/**
 * スクロール許可（スクロール禁止処理解除）
 */
function allowWindowScroll() {
  document.removeEventListener('touchmove', noScroll);
  document.removeEventListener('wheel', noScroll);
}

/**
 * スクロール禁止処理設定
 */
function disallowWindowScroll() {
  document.addEventListener('touchmove', noScroll, { passive: false });
  document.addEventListener('wheel', noScroll, { passive: false });
}

let enterAnimation;
let enterBackAnimation;

function animateCanvas(scrollTarget) {
  if (enterAnimation) {
    enterAnimation.kill();
  }

  if (enterBackAnimation) {
    enterBackAnimation.kill();
  }

  const animation = gsap.timeline().to(window, {
    duration: 1.4,
    ease: "power2.out",
    scrollTo: {
      y: scrollTarget,
    },
    onStart: () => {
      disallowWindowScroll();
      if (loopAnimationId === null) {
        tick();
      }
    },
    onComplete: () => {
      cancelAnimationFrame(loopAnimationId);
      loopAnimationId = null;
      if (enterAnimation) {
        enterAnimation.kill();
      }
      if (enterBackAnimation) {
        enterBackAnimation.kill();
      }
      allowWindowScroll();
    }
  }).to(canvasWrapper, {
    duration: 1.4,
    ease: "power2.out",
    keyframes: {
      '0%': {
        opacity: 0,
      },
      '50%': {
        opacity: 1,
      },
      '100%': {
        opacity: 0,
      }
    },
  }, "<");

  return animation;
}

ScrollTrigger.create({
  trigger: ".message",
  start: "top bottom",
  end: "top top",
  onEnter: () => {
    enterAnimation = animateCanvas(".message");
  },
  onEnterBack: () => {
    enterBackAnimation = animateCanvas(".mv");
  }
});

// windowのリサイズ処理
const onResize = () => {
  const width = canvasWrapper.offsetWidth;
  const height = canvasWrapper.offsetHeight;

  // rendererを更新
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(width, height);

  camera.aspect = width / height;
  camera.updateProjectionMatrix();
};
window.addEventListener('resize', onResize);
