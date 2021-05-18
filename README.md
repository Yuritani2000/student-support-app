## アプリ概要
サポーターズ様主催のハッカソン「技育CAMP」（2021年5月8日・9日開催）にて制作した学生支援Webアプリです。
大学の友人と共に3人で制作いたしました。
製作期間：2021年5月1日から2021年5月9日(9日間)

## 技術概要
- 使用言語: TypeScript
- 使用フレームワーク: Node.js, React
- 使用ライブラリ: Styled-Components, React-Calendar, React-Router-DOM
- データベース: Firebase Realtime Database
- ユーザ認証: Firebase Authentication
- ホスティング: Firebase

## 動作確認方法
- masterブランチをローカル環境にclone後、そのローカルリポジトリのディレクトリ内でターミナルを起動し、
- `yarn install`を実行してください(事前にnode.js及びyarnのインストールが必要となります)。
- 次に、各自Firebaseにてプロジェクトを作成していただき、Firebaseのコンソールから、Authenticationのメール/パスワードによる認証を有効にしてください。また、Realtime Databaseを有効にしてください。
- Firebaseのコンソールから、「プロジェクトを設定」→「マイアプリ」を確認していただき、表示されているURLの以下項目をご確認ください。

```javascript
   var firebaseConfig = {
    apiKey: "任意の文字列1",
    authDomain: "任意の文字列2",
    databaseURL: "任意の文字列3",
    projectId: "任意の文字列4",
    storageBucket: "任意の文字列5",
    messagingSenderId: "任意の文字列6",
    appId: "任意の文字列7",
    measurementId: "任意の文字列8"
  };
```

- ローカルリポジトリ直下に、`.env.local`のファイル名でファイルを作成していただき、上記コードの各項目に対応する「任意の文字列(番号)」の部分を、以下の形式に合わせコピー&ペーストしてください。

```javascript
REACT_APP_FIREBASE_API_KEY='任意の文字列1'
REACT_APP_FIREBASE_AUTH_DOMAIN='任意の文字列2'
REACT_APP_FIREBASE_DATABASE_URL='任意の文字列3'
REACT_APP_FIREBASE_PROJECT_ID='任意の文字列4'
REACT_APP_FIREBASE_STORAGE_BUCKET='任意の文字列5'
REACT_APP_FIREBASE_MESSAGING_SENDER_ID='任意の文字列6'
REACT_APP_FIREBASE_APP_ID='任意の文字列7'
REACT_APP_FIREBASE_MEASUREMENT_ID='任意の文字列8'
```

- 処理が終了したのちに、`yarn start`を実行していただくと、自動的にブラウザが起動し、サインイン画面が表示されます。
- 「Sign upはこちら」をクリックするとアカウント作成画面へ移動しますので、そこで架空のメールアドレス及びパスワードを使用してアカウントを作成してください。