# Bluetooth the Book

Bluetooth Low Energy をしくみから学ぶ、日本語のやさしい教科書です。

**読む：** https://mujuko.github.io/bluetooth-the-book/

想定読者は、理科が得意な高校生、数学が苦手な理系の大学生、生物系出身の SE です。

## 原本との関係

[The Bluetooth® Low Energy Primer](https://www.bluetooth.com/bluetooth-le-primer/) v1.3.0（© Bluetooth SIG, Inc.）を骨組みの参考にしていますが、翻訳ではありません。文章、図、確認問題、章の構成はすべて書き下ろしです。本文でカットした話は、各章末の枠と付録C に原本の節番号つきで残しています。

本書は Bluetooth SIG とは関係のない非公式の教材です。Bluetooth® は Bluetooth SIG, Inc. の登録商標です。

## 手元で動かす

Node.js が必要です。

```bash
npm ci
```

```bash
npm run docs:dev
```

`main` への push で GitHub Actions がビルドし、GitHub Pages に公開します。

## 構成

- `docs/*.md`：本文（VitePress）
- `docs/.vitepress/theme/components/`：図を描く部品（`Seq` シーケンス図、`Pkt` パケット図、`Timing` タイミング図）
- `docs/.vitepress/config.mts`：サイトの設定、目次、囲み記事の定義
