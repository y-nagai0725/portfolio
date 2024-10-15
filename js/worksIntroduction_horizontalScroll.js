//WORKS個別ページ:スクロール画像横スクロール用JS
document.addEventListener('DOMContentLoaded', function () {
  //スクロール画像エリア
  const scrollArea = document.querySelector(".site-view__scroll-area");

  //スクロール画像ラッパー
  const scrollImgWrapper = document.querySelector(".site-view__scroll-img-wrapper");

  //スクロール画像
  const scrollImage = document.querySelector(".site-view__img--horizontal");

  //横スクロール設定
  gsap.to(scrollImage, {
    x: () => - (scrollImage.scrollWidth - scrollImgWrapper.clientWidth),
    ease: "none",
    scrollTrigger: {
      scroller: scrollArea,
      trigger: scrollImgWrapper,
      end: () => "+=" + (scrollImage.scrollWidth - scrollImgWrapper.clientWidth),
      scrub: 0.8,
      pin: true,
      anticipatePin: 1,
      invalidateOnRefresh: true,
    },
  });

}, false);