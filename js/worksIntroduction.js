//WORKS個別ページ用JS
document.addEventListener('DOMContentLoaded', function () {
  //スクロールエリア
  const scrollArea = document.getElementById('site-view__scroll-area');

  //スクロールバーのハンドル
  const scrollbarThumb = document.getElementById('site-view__scrollbar-thumb');

  //スクロールバー
  const scrollbar = document.getElementById('site-view__scrollbar');

  //スクロールエリアの高さ
  let scrollAreaHeight = scrollArea.clientHeight;

  //スクロールエリア内部も含めた高さ
  let totalHeight = scrollArea.scrollHeight;

  //ハンドルの高さ
  let thumbHeight = scrollbarThumb.clientHeight;

  //スクロールバーのハンドル以外部分
  let scrollbarTrack = scrollAreaHeight - thumbHeight;

  //ハンドル制御フラグ
  let active = false;

  //ハンドルY座標保持用
  let scrollbarThumbPositionY;

  //ウィンドウのリサイズ時処理
  window.addEventListener('resize', function () {
    //各値の再取得
    scrollAreaHeight = scrollArea.clientHeight;
    totalHeight = scrollArea.scrollHeight;
    thumbHeight = scrollbarThumb.clientHeight;
    scrollbarTrack = scrollAreaHeight - thumbHeight;

    //ハンドルの位置設定
    const y = (scrollArea.scrollTop * scrollbarTrack) / (totalHeight - scrollAreaHeight);
    scrollbarThumb.style.transform = "translate(-50%, " + y + "px)";
  });

  //スクロールエリアのスクロール時処理
  scrollArea.addEventListener('scroll', function () {
    //ハンドル操作時は何もしない
    if (active) return;

    //各値の再取得
    scrollAreaHeight = scrollArea.clientHeight;
    totalHeight = scrollArea.scrollHeight;
    thumbHeight = scrollbarThumb.clientHeight;
    scrollbarTrack = scrollAreaHeight - thumbHeight;

    //スクロール位置からハンドルの位置設定
    const y = (scrollArea.scrollTop * scrollbarTrack) / (totalHeight - scrollAreaHeight);
    scrollbarThumb.style.transform = "translate(-50%, " + y + "px)";
  }, { passive: true }
  );

  //スクロールバーのクリックイベント処理
  scrollbar.addEventListener('click', function (event) {
    event.preventDefault();
    active = true;

    //各値の再取得
    scrollAreaHeight = scrollArea.clientHeight;
    totalHeight = scrollArea.scrollHeight;
    thumbHeight = scrollbarThumb.clientHeight;
    scrollbarTrack = scrollAreaHeight - thumbHeight;

    //ハンドル位置、エリアのスクロール位置計算
    const scrollbarThumbY = event.layerY;
    const calc =
      (totalHeight - scrollAreaHeight) / (scrollAreaHeight - thumbHeight);
    let resultY = scrollbarThumbY - thumbHeight / 2;
    let scrollY = resultY * calc;

    //スクロールバーの端を超えないように
    if (resultY < 0) {
      resultY = 0;
    } else if (resultY > scrollbarTrack) {
      resultY = scrollbarTrack;
    }

    //ハンドル位置設定
    scrollbarThumb.style.transform = "translate(-50%, " + resultY + "px)";

    //エリアのスクロール位置設定
    scrollArea.scrollTop = scrollY;
    active = false;
  },
    { passive: false }
  );

  //ハンドルのmousedownイベント時処理
  scrollbarThumb.addEventListener('mousedown', function (event) {
    active = true;
    scrollbarThumbPositionY = event.pageY - this.getBoundingClientRect().top;

    //各値の再取得
    scrollAreaHeight = scrollArea.clientHeight;
    totalHeight = scrollArea.scrollHeight;
    thumbHeight = scrollbarThumb.clientHeight;
    scrollbarTrack = scrollAreaHeight - thumbHeight;
  },
    { passive: true }
  );

  //ハンドルのtouchstartイベント時処理
  scrollbarThumb.addEventListener('touchstart', function (event) {
    active = true;
    scrollbarThumbPositionY = event.touches[0].pageY - this.getBoundingClientRect().top;

    //各値の再取得
    scrollAreaHeight = scrollArea.clientHeight;
    totalHeight = scrollArea.scrollHeight;
    thumbHeight = scrollbarThumb.clientHeight;
    scrollbarTrack = scrollAreaHeight - thumbHeight;
  },
    { passive: true }
  );

  //mousemoveイベント処理
  document.addEventListener('mousemove', function (event) {
    //ハンドル操作時以外は何もしない
    if (!active) return;

    //ハンドル位置、エリアのスクロール位置計算
    let scrollbarThumbY =
      ((event.pageY - scrollbar.getBoundingClientRect().top) / scrollbarTrack) *
      scrollbarTrack -
      scrollbarThumbPositionY;
    const calc =
      (totalHeight - scrollAreaHeight) / (scrollAreaHeight - thumbHeight);
    const scrollY = scrollbarThumbY * calc;

    //スクロールバーの端を超えないように
    if (scrollbarThumbY < 0) {
      scrollbarThumbY = 0;
    } else if (scrollbarThumbY > scrollbarTrack) {
      scrollbarThumbY = scrollbarTrack;
    }

    //ハンドル位置設定
    scrollbarThumb.style.transform = "translate(-50%, " + scrollbarThumbY + "px)";

    //エリアのスクロール位置設定
    scrollArea.scrollTop = scrollY;
  },
    { passive: false }
  );

  //touchmoveイベント処理
  document.addEventListener('touchmove', function (event) {
    //ハンドル操作時以外は何もしない
    if (!active) return;

    //ハンドル位置、エリアのスクロール位置計算
    let scrollbarThumbY =
      ((event.touches[0].pageY - scrollbar.getBoundingClientRect().top) / scrollbarTrack) *
      scrollbarTrack -
      scrollbarThumbPositionY;
    const calc =
      (totalHeight - scrollAreaHeight) / (scrollAreaHeight - thumbHeight);
    const scrollY = scrollbarThumbY * calc;

    //スクロールバーの端を超えないように
    if (scrollbarThumbY < 0) {
      scrollbarThumbY = 0;
    } else if (scrollbarThumbY > scrollbarTrack) {
      scrollbarThumbY = scrollbarTrack;
    }

    //ハンドル位置設定
    scrollbarThumb.style.transform = "translate(-50%, " + scrollbarThumbY + "px)";

    //エリアのスクロール位置設定
    scrollArea.scrollTop = scrollY;
  },
    { passive: false }
  );

  //mouseupイベント処理
  document.addEventListener("mouseup", function () {
    active = false;
  });

  //touchendイベント処理
  document.addEventListener('touchend', function () {
    active = false;
  });
}, false);