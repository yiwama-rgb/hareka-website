# hareka.io

Hareka合同会社のコーポレートサイト（Astro + Netlify）。

## 執筆前に必ず読むドキュメント

- **ブログ記事（`src/content/blog/`）を書く前** → [docs/blog-guideline.md](docs/blog-guideline.md) を必ず読む
- **導入事例（`src/content/cases/`）を書く前** → [docs/case-study-guideline.md](docs/case-study-guideline.md) を必ず読む

どちらもタイトルは全角32文字以内、文体・禁止表現・必須要素が定義されている。読まずに書き始めないこと。

## URL

`trailingSlash: 'always'`。内部リンクは必ず末尾スラッシュ付きで書く（`/cases/` `/blog/26-.../`）。

## 公開前

`npm run build` でエラーがないことを確認する。
