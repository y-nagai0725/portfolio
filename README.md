# Portfolio<!-- omit in toc -->
![Image](https://github.com/user-attachments/assets/38cbe5b2-06ee-499e-b18e-4b69f5acc058)

## 目次<!-- omit in toc -->
- [概要](#概要)
- [公開URL](#公開url)
- [目的](#目的)
- [使用技術](#使用技術)
- [使用フォント](#使用フォント)
- [デザインカンプ](#デザインカンプ)
- [TOPページ](#topページ)
  - [FV](#fv)
  - [メッセージセクション](#メッセージセクション)
  - [ABOUTセクション](#aboutセクション)
  - [SKILLセクション](#skillセクション)
  - [WORKSセクション](#worksセクション)
  - [CONTACTセクション](#contactセクション)
- [WORKSページ](#worksページ)
- [作品詳細ページ](#作品詳細ページ)
- [CONTACTページ](#contactページ)
  - [THANKSページ](#thanksページ)
- [グローバルナビゲーションメニュー](#グローバルナビゲーションメニュー)

## 概要
* ポートフォリオサイトです。
* 職業訓練の卒業制作です。

## 公開URL
[https://portfolio.mikanbako.jp](https://portfolio.mikanbako.jp)

## 目的
* 職業訓練にて学んだデザイン作成、コーディング技術による制作物
* 自身のスキル、制作物の紹介

## 使用技術
* HTML
* CSS
* JavaScript
* GSAP
* three.js（FV～次セクションへの背景描画に使用）

## 使用フォント
* 和文フォント
  * [Noto Sans JP](https://fonts.google.com/noto/specimen/Noto+Sans+JP)
* 欧文フォント
  * [Oswald](https://fonts.google.com/specimen/Oswald)

## デザインカンプ
[Figmaページ（閲覧のみ可能です）](https://www.figma.com/design/oxv9pQ7REeRA8bIJeLAS96/%E3%83%9D%E3%83%BC%E3%83%88%E3%83%95%E3%82%A9%E3%83%AA%E3%82%AA%E3%82%B5%E3%82%A4%E3%83%88?node-id=0-1&t=BzG1GcLpfhDDp16S-1)

## TOPページ
### FV
![Image](https://github.com/user-attachments/assets/c31cbed7-5f3d-4153-9142-ff647ee63bcb)

背景の描画にthree.jsを使用しています。

### メッセージセクション
![Image](https://github.com/user-attachments/assets/8407234a-56ce-466a-96bc-dd7230f6ee72)

### ABOUTセクション
![Image](https://github.com/user-attachments/assets/def3ffa0-9f65-4017-8531-8919ae9baf13)

（写真と名前はここでは隠しています。）

### SKILLセクション
![Image](https://github.com/user-attachments/assets/c5c03899-56f8-446a-9e40-c5b4e6278fe7)

スキルのアイコンを描画するアニメーションを実装しました。

svgのpathの`stroke-dashoffset`,`stroke-dasharray`をJavaScriptで操作してアニメーションさせています。

### WORKSセクション
![Image](https://github.com/user-attachments/assets/46ac3331-dcf7-4972-a384-3268010daddb)

画面が固定されスクロールで作品がスライドしていく演出を**GSAP**で実装しました。

GSAPの[ScrollTrigger](https://gsap.com/docs/v3/Plugins/ScrollTrigger/?page=1),[ScrollTo](https://gsap.com/docs/v3/Plugins/ScrollToPlugin/)を使用しています。

MOREボタンクリックで[作品詳細ページ](#作品詳細ページ)へ、VIEW ALLクリックで[WORKSページ](#worksページ)へ遷移します。

### CONTACTセクション
![Image](https://github.com/user-attachments/assets/aac69b0e-ba45-44b7-b4f4-c65efbd81344)

ボタンクリックで[CONTACTページ](#contactページ)へ遷移します。

## WORKSページ
![Image](https://github.com/user-attachments/assets/ea5248d7-3741-47cb-bb0f-f2f63c9d385f)

制作物一覧ページです。

## 作品詳細ページ
![Image](https://github.com/user-attachments/assets/9ca21100-c9ae-4165-b56f-0b32f7cf70fd)

画像部分はスクロール可能です。

JavaScriptとCSSでスクロールバーをカスタマイズ、操作の制御などを実装しています。

## CONTACTページ
![Image](https://github.com/user-attachments/assets/a4acebaa-a3a2-412a-a097-3f556f80e988)

お問い合わせを入力、送信できます。

Googleフォームを使用して入力内容の送信、管理者への通知を行っています。

### THANKSページ
![Image](https://github.com/user-attachments/assets/4a885ee2-0327-410a-ab15-da018d790b0a)

お問い合わせ送信完了時に表示されます。

## グローバルナビゲーションメニュー
![Image](https://github.com/user-attachments/assets/95ca6327-ca84-43f9-92ff-32eade990983)