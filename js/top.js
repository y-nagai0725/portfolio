//TOPページ用JS
document.addEventListener('DOMContentLoaded', function () {

  //作品クラス
  class WorksItem {
    //作品表示切替用：duration
    duration = 0.8;

    //テキスト表示切替用：x方向への移動量
    xMove = "-40px";

    //コンストラクタ
    constructor(e) {
      this.txt = e.querySelector('.works__txt-wrap');
      this.img = e.querySelector('.works__img-wrap');
      gsap.set(this.txt, {
        autoAlpha: 0,
        x: this.xMove,
      });
      gsap.set(this.img, {
        autoAlpha: 0
      });
    }

    //作品表示
    show() {
      this.showImage();
      this.showTexts();
    }

    //作品非表示
    hide() {
      this.hideImage();
      this.hideTexts();
    }

    //画像表示
    showImage() {
      gsap.to(this.img, {
        duration: this.duration,
        autoAlpha: 1
      });
    }

    //画像非表示
    hideImage() {
      gsap.to(this.img, {
        duration: this.duration,
        autoAlpha: 0
      });
    }

    //説明テキスト表示
    showTexts() {
      let e;
      (e = this.currentAnimation) == null || e.kill();
      this.currentAnimation = gsap.to(this.txt, {
        duration: this.duration,
        autoAlpha: 1,
        x: 0,
      });
    }

    //説明テキスト非表示
    hideTexts() {
      let e;
      (e = this.currentAnimation) == null || e.kill();
      this.currentAnimation = gsap.to(this.txt, {
        duration: 0,
        autoAlpha: 0,
        x: this.xMove,
      });
    }
  }

  //SVG描画スクロール位置調整用
  const drawAdjustmentNumber = 0.65;

  //作品リスト
  const worksItemList = [...document.querySelectorAll('.works__item')].map(e => new WorksItem(e));

  //作品数
  const total = worksItemList.length;

  //GSAPスクロール固定要素
  const scrollOuter = document.getElementById('works__scroll-outer');

  //作品ナビゲーションボタン
  const worksNavBtns = document.querySelectorAll('.works__nav-btn');

  //スクロールテキストアイコン
  const worksScrollIcon = document.getElementById('works__scroll-icon');

  //スキルアイコンリスト
  const svgList = document.querySelectorAll('.skill__icon-svg');

  //ヘッダー
  const header = document.getElementById('header');

  //背景動画ラッパー
  const videoWrap = document.getElementById('bg__video-wrap');

  //キャッチコピー：日本語
  const catchcopyJa = document.getElementById('mv__catchcopy-ja');

  //キャッチコピー画像：英語
  const catchcopyEnImg = document.getElementById('mv__catchcopy-en-img');

  //スクロールボタン
  const scrollBtn = document.getElementById('mv__scroll-btn');

  //GSAPメディアクエリ
  const mm = gsap.matchMedia();

  //作品ナビゲーション
  const worksNavWrap = document.getElementById('works__nav-wrap');

  //現在表示している作品番号
  let currentIndex = -1;

  //（GSAP固定領域での）現在のスクロール量
  let currentScroll;

  //スクロール関数保持用
  let scrollToFunction;

  //対象の作品を表示
  function updateIndex(index) {
    if (currentIndex === -1 && index === total) {
      worksItemList[index - 1].show();
      currentIndex = index - 1;
      activeNavLink(currentIndex);
    } else if (currentIndex === -1) {
      worksItemList[index].show();
      currentIndex = index;
      activeNavLink(currentIndex);
    } else if (index !== currentIndex && index !== total) {
      worksItemList[currentIndex].hide();
      worksItemList[index].show();
      currentIndex = index;
      activeNavLink(currentIndex);
    }

    //ナビゲーションボタン表示
    if (!worksNavWrap.classList.contains('js-active')) {
      worksNavWrap.classList.add('js-active');
    }
  }

  //ナビゲーションボタンをアクティブ状態にする
  function activeNavLink(activeIndex) {
    worksNavBtns.forEach((e, index) => {
      if (index === activeIndex) {
        e.classList.add('js-active');
      } else {
        e.classList.remove('js-active');
      }
    });
  }

  //WORKSのスクロール処理設定
  function setScrollSetting(scrollValue) {
    gsap.to(scrollOuter, {
      scrollTrigger: {
        trigger: scrollOuter,
        start: 'top top',
        end: `${total * scrollValue}`,
        pin: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (e) => {
          const index = Math.floor(e.progress * total);
          updateIndex(index);
          currentScroll = e.progress * total * scrollValue;
        },
      }
    });
    gsap.to(worksScrollIcon, {
      rotate: 1440,
      ease: 'linear',
      scrollTrigger: {
        trigger: scrollOuter,
        start: 'top top',
        end: `${total * scrollValue}`,
        scrub: true,
      }
    });
  }

  //WORKSのナビゲーションボタン設定
  function setScrollNavLink(scrollValue) {
    scrollToFunction = (index, event) => {
      event.preventDefault();
      const scrollOuterPositon = scrollOuter.getBoundingClientRect().top + window.scrollY - currentScroll;

      gsap.to(window, {
        duration: 0.6,
        ease: 'linear',
        scrollTo: {
          y: scrollOuterPositon,
          offsetY: (index * -scrollValue) - 5,
        }
      });
    };

    worksNavBtns.forEach((btn, index) => {
      btn.onclick = scrollToFunction.bind(null, index);
    });
  }

  //スキルセクションのsvgアイコン初期化処理
  function initSVG() {
    svgList.forEach((svg) => {
      svg.querySelectorAll('path').forEach((path) => {
        const pathLength = path.getTotalLength();
        path.style.strokeDashoffset = pathLength;
        path.style.strokeDasharray = pathLength;
        path.style.opacity = 1;
      });
    });
  }

  //スキルセクションのsvgアイコン描画処理
  function drawSVG() {
    //ビューポートの高さ
    const windowHeight = window.innerHeight;

    //スクロール量
    const st = window.scrollY;

    for (let i = 0; i < svgList.length; i++) {
      const targetPos = svgList[i].getBoundingClientRect().top + st;
      if (st > targetPos - windowHeight * drawAdjustmentNumber) {
        svgList[i].querySelectorAll('path').forEach((path) => {
          path.style.transitionProperty = 'stroke-dashoffset';
          path.style.transitionDuration = '2.8s';
          path.style.transitionTimingFunction = 'ease-in-out';
          path.style.strokeDashoffset = 0;
        });
      }
    }
  }

  //mvのアニメーション開始処理
  function startMvAnimation() {
    //ヘッダー表示処理を止める
    header.classList.remove('js-show');

    //ページ最上部にいるときのみ開始を少し遅らせる
    if (window.scrollY === 0) {
      setTimeout(() => {
        videoWrap.classList.add('js-active');
        catchcopyJa.classList.add('js-active');
        catchcopyEnImg.classList.add('js-active');
        scrollBtn.classList.add('js-active');
      }, 800);
      setTimeout(() => {
        header.classList.add('js-show');
      }, 2000);
    } else {
      videoWrap.classList.add('js-completed');
      videoWrap.classList.add('js-active');
      catchcopyJa.classList.add('js-completed');
      catchcopyJa.classList.add('js-active');
      catchcopyEnImg.classList.add('js-completed');
      catchcopyEnImg.classList.add('js-active');
      scrollBtn.classList.add('js-completed');
      scrollBtn.classList.add('js-active');
      header.classList.add('js-show');
    }
  }

  //gsapのメディアクエリ設定
  function setGsapMatchMedia() {
    mm.add("(max-width: 767px)", () => {
      const scrollValue = scrollOuter.clientWidth * 2.1;
      setScrollSetting(scrollValue);
      setScrollNavLink(scrollValue);
    });

    mm.add("(min-width: 768px) and (max-width: 1023px)", () => {
      const scrollValue = scrollOuter.clientWidth * 1.4;
      setScrollSetting(scrollValue);
      setScrollNavLink(scrollValue);
    });

    mm.add("(min-width: 1024px)", () => {
      const scrollValue = scrollOuter.clientWidth * 0.7;
      setScrollSetting(scrollValue);
      setScrollNavLink(scrollValue);
    });
  }

  //mvのスクロールボタンのスムーススクロール
  document.getElementById('mv__scroll-btn').addEventListener('click', function (e) {
    e.preventDefault();
    gsap.to(window, {
      duration: 0.8,
      ease: 'ease-out',
      scrollTo: {
        y: '#message',
      }
    });
  });

  //背景のビデオ表示を徐々に非表示
  gsap.to(videoWrap, {
    autoAlpha: 0,
    scrollTrigger: {
      trigger: '.message',
      start: 'top top',
      end: 'bottom center-=100px',
      scrub: true,
    }
  });

  //スクロールイベント時処理
  window.addEventListener('scroll', function () {
    drawSVG();
  });

  //初期実行処理
  function topInit() {
    setGsapMatchMedia();
    startMvAnimation();
    initSVG();
  }

  //初期処理
  topInit();

}, false);