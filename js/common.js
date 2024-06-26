//全ページ共通のJS
document.addEventListener('DOMContentLoaded', function () {

  //クラス付与のスクロール位置調整用
  const adjustmentNumber = 0.65;

  //wrapper
  const wrapper = document.getElementById('wrapper');

  //ヘッダー
  const header = document.getElementById('header');

  //ヘッダーロゴ
  const headerLogo = document.getElementById('header__logo-link');

  //グローバルナビゲーション
  const gnav = document.getElementById('gnav');

  //グローバルナビゲーションリスト
  const gnavList = document.querySelectorAll('.gnav__list');

  //メニュー開閉ボタン
  const menuBtn = document.getElementById('menu-btn');

  //トップへ戻るボタン
  const backBtn = document.getElementById('footer__back-btn');

  //js-クラス付与対象リスト
  const jsTargetList = document.querySelectorAll('.js-fadeIn, .js-fadeUp, .js-fadeUpLarge, .js-fadeRight');

  //スクロールイベント時処理
  window.addEventListener('scroll', function () {
    if (window.scrollY === 0) {
      headerLogo.classList.remove('js-hidden');
    } else {
      headerLogo.classList.add('js-hidden');
    }

    headerInit();
    setJsTargetActive();
  });

  //メニューボタンクリック時処理
  menuBtn.addEventListener('click', function () {
    if (this.classList.contains('js-opened')) {
      headerInit();
    } else {
      this.classList.add('js-opened');
      gnav.classList.add('js-opened');
      headerLogo.classList.add('js-black');
      gnavList.forEach(li => {
        li.classList.add('js-active');
      });

      //メニューが開かれているときはスクロール禁止
      document.addEventListener('touchmove', noScroll, { passive: false });
      document.addEventListener('wheel', noScroll, { passive: false });
    }
  });

  //トップへ戻るボタンクリック時処理
  backBtn.addEventListener('click', function () {
    window.scroll({
      top: 0,
      behavior: 'smooth'
    });
  });

  //ヘッダー初期化
  function headerInit() {
    menuBtn.classList.remove('js-opened');
    gnav.classList.remove('js-opened');
    headerLogo.classList.remove('js-black');
    gnavList.forEach(li => {
      li.classList.remove('js-active');
    });

    //スクロール禁止を解除
    document.removeEventListener('touchmove', noScroll);
    document.removeEventListener('wheel', noScroll);
  }

  //イベント処理禁止用
  function noScroll(e) {
    e.preventDefault();
  }

  //ヘッダー表示
  function showHeader() {
    header.classList.add('js-show');
  }

  //対象にクラス付与
  function setJsTargetActive() {
    const windowHeight = window.innerHeight;
    const st = window.scrollY;
    jsTargetList.forEach((e) => {
      const position = e.getBoundingClientRect().top + st;
      if (st > position - windowHeight * adjustmentNumber) {
        e.classList.add('js-active');
      }
    });
  }

  //ページ表示時アニメーション設定
  function startPageAnimation() {
    wrapper.classList.add('js-active');
  }

  //初期実行処理
  function init() {
    startPageAnimation();
    showHeader();
  }

  //初期処理
  init();

}, false);