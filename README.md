# management-application nuxt-firebase

[SITE](https://management-89e03.web.app/)

## Description

ユーザーやサプライヤーなどの顧客管理用のwebサービスです。
勤務していた会社で実際に開発していたものを元に、ポートフォリオ用に直したものになります。

Firebase * Nuxt.js

### Features

* SPA (Single Page Application)
* SSR (Sever Side Rendering)
* PWA (Progressive Web Apps)
* Serverless (Cloud Functions for Firebase + Firebase Hosting)

### Libraries

* [Node.js](https://github.com/nodejs/node) v10.15.3
* [Nuxt.js](https://github.com/nuxt/nuxt.js) v2.x

### 管理画面の主な機能

* 登録したユーザーの審査（承認、非承認の選択とデータベースの変更）
* ユーザー等の一覧表示（期間や名前での検索や並び替え）
* 売上や利益の表示（合計、月別、週別など）
* アプリで行われているビデオ通話の監視
* お知らせの作成（データベースの作成、変更）
* 管理者のログイン関連機能
* サプライヤーの管理者ログイン関連機能

### Cloud Functions での主な機能

* Firebase adminを使用したadmin権限による、ユーザーの削除や特定のデータの取得や変更など
* AWSに保存してある録画ビデオの取得
* nodemailerを使用した、ユーザーの登録や購入、通報などの際の管理者へのメール送信
* OneSignalを使用した、IOSアプリへのプッシュ通知の送信
