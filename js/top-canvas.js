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

varying vec2 vUv;

vec3 bgColor = vec3(0.114,0.114,0.114);

void main() {
  vec2 uv = vUv;
  float shift = uShift * 0.2;

  vec2 uvOffset = vec2( shift, 0.0 );

  vec3 color = texture2D(uTexture, uv + uvOffset).rgb;

  color = mix(color, bgColor, uPercent);
  gl_FragColor = vec4( color, 1.0 );
}
`;

//
const canvasWrapper = document.querySelector(".canvas-wrapper");

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

let loopAnimationId = null;

function tick() {

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
    duration: 1.2,
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
    onUpdate: () => {
      uniforms.uShift.value = Math.random();
      uniforms.uPercent.value = animation.progress();
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
  });

  return animation;
}

ScrollTrigger.create({
  trigger: ".message",
  start: "top bottom",
  end: "top top+=10%",
  onEnter: () => {
    enterAnimation = animateCanvas(".message");
  },
  onEnterBack: () => {
    enterBackAnimation = animateCanvas(".mv");
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
