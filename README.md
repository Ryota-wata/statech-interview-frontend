# statech-interview-front
スタテクの選考を受けて合格するまでの物語

## ローカルでの起動方法

### アプリ起動
```shell
$ npm install
$ npm run dev
```
[http://localhost:3000](http://localhost:3000) にアクセス

### Next.jsの設定
```shell
✔ Would you like to use TypeScript? … No
✔ Would you like to use ESLint? … Yes
✔ Would you like to use Tailwind CSS? … No
✔ Would you like to use `src/` directory? … Yes
✔ Would you like to use App Router? (recommended) … No
✔ Would you like to customize the default import alias (@/*)? … No

参考：https://zenn.dev/ikkik/articles/51d97ff70bd0da
```

### その他の起動方法
```bash
yarn dev
# or
pnpm dev
# or
bun dev
```

### その他のコマンド
```bash
npm run build
- 開発用サーバーを起動してアプリを実行する
npm start
- アプリをビルドして完成アプリを生成する
```