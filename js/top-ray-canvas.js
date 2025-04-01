import * as THREE from "./three.module.js";

// 頂点シェーダーのソース
const vertexSource = `
varying vec2 vUv;

void main() {
  vUv = uv;
  gl_Position = vec4( position, 1.0 );
}
`;

// ピクセルシェーダーのソース
const fragmentSource = `
uniform sampler2D uTexture;
uniform float uShift;
uniform float uPercent;
uniform float uPlus;

varying vec2 vUv;

vec3 bgColor = vec3(0.114,0.114,0.114);

const float PI = 3.14;

void main() {
  vec2 uv = vUv;
  float shift = uShift * 0.25 + uPlus;

  vec2 uvOffset = vec2( shift, 0.0 );

  vec3 color = texture2D(uTexture, uv + uvOffset).rgb;

  float percent = abs(cos(PI * uPercent));

  color = mix(color, bgColor, percent);

  gl_FragColor = vec4( color, 1.0 );
}
`;

//canvasWrapper
const canvasWrapper = document.querySelector(".ray-canvas-wrapper");
const mvCanvasWrapper = document.querySelector(".mv-canvas-wrapper");

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
const canvas = document.querySelector("#canvas");

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

// cameraの作成
const camera = new THREE.OrthographicCamera();
camera.matrixAutoUpdate = false;

//テクスチャ
const texture = new THREE.TextureLoader().load("../images/top/canvas_ray.jpg");
texture.colorSpace = THREE.SRGBColorSpace;
texture.wrapS = THREE.MirroredRepeatWrapping;
texture.wrapT = THREE.MirroredRepeatWrapping;

// uniformの定義
const uniforms = {
  uTexture: {
    value: texture,
  },
  uShift: {
    value: 0.0,
  },
  uPercent: {
    value: 0.0,
  },
  uPlus: {
    value: 0.0,
  }
};

// planeの作成
const geometry = new THREE.PlaneGeometry(2, 2);
const material = new THREE.ShaderMaterial({
  uniforms: uniforms,
  vertexShader: vertexSource,
  fragmentShader: fragmentSource,
});
const plane = new THREE.Mesh(geometry, material);
scene.add(plane);

//loop処理制御用
let loopAnimationId = null;

//描画処理
function tick() {

  loopAnimationId = requestAnimationFrame(tick);

  uniforms.uShift.value = Math.random();

  // レンダリング
  renderer.render(scene, camera);
}

//描画処理キャンセル
function cancelTick(animationId) {
  cancelAnimationFrame(animationId);

  //描画を初期状態へ
  uniforms.uPercent.value = 0.0;
  renderer.render(scene, camera);
}

//進捗度差分
let progressValue = 0.0;

//描画アニメーション切り替え用ScrollTrigger
ScrollTrigger.create({
  trigger: ".message",
  start: "top bottom",
  end: "center top",
  onEnter: () => {
    mvCanvasWrapper.classList.add("hidden");
    tick();
  },
  onEnterBack: () => {
    tick();
  },
  onUpdate: (self) => {
    uniforms.uPercent.value = self.progress;
    if (progressValue === 0.0) {
      progressValue = self.progress;
    } else {
      const plusValue = (progressValue - self.progress) * 10;
      uniforms.uPlus.value = plusValue;
      progressValue = self.progress;
    }
  },
  onLeave: () => {
    cancelTick(loopAnimationId);
  },
  onLeaveBack: () => {
    mvCanvasWrapper.classList.remove("hidden");
    cancelTick(loopAnimationId);
  }
});

// windowのリサイズ処理
const onResize = () => {
  const windowSize = getWindowSize();

  // rendererを更新
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(windowSize.width, windowSize.height);
};
window.addEventListener('resize', onResize);
