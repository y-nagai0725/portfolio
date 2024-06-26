//WORKS一覧ページ用JS
document.addEventListener('DOMContentLoaded', function () {

  //フィルターボタンリスト
  const filterBtns = document.querySelectorAll('.works-view__filter-btn');

  //作品リスト
  const worksList = document.querySelectorAll('.works-view__list');

  //フィルターボタンクリック時の処理設定
  filterBtns.forEach(btn => {
    btn.addEventListener('click', function () {
      //全てのボタンの付与クラスを削除
      filterBtns.forEach(e => e.classList.remove('js-active'));

      //クラス付与
      this.classList.add('js-active');

      //押したボタンの内容で作品をフィルターかける
      filter(btn.dataset.filter);
    });
  });

  //該当タグでフィルター
  function filter(filterName) {
    //すべて選択時
    if (filterName === 'all') {
      clearFilter();
      return;
    }

    worksList.forEach(item => {
      //作品についているタグ
      const tags = [...item.querySelectorAll('.works-view__tag')].map(e => e.dataset.tag);

      //フィルター対象のタグが含まれている場合は表示
      if (tags.includes(filterName)) {
        item.classList.remove('js-hidden');
      } else {
        item.classList.add('js-hidden');
      }
    });
  }

  //フィルター解除
  function clearFilter() {
    worksList.forEach(item => {
      item.classList.remove('js-hidden');
    });
  }

}, false);