import { defineConfig } from 'vitepress'
import container from 'markdown-it-container'

const PRIMER_URL = 'https://www.bluetooth.com/bluetooth-le-primer/'
const ARCH_URL =
  'https://www.bluetooth.com/wp-content/uploads/Files/Specification/HTML/Core_v7.0/out/en/architecture%2C-change-history%2C-and-conventions/architecture--arch-.html'

// 本書で使う囲み記事。::: 名前 [任意の見出し] で書く。
const BOXES: Record<string, string> = {
  goal: 'この章のゴール',
  primer: '原本にはこんな話も（本書では省略）',
  spec: '仕様書にはこんな話も（本書では省略）',
  analogy: 'たとえ話',
  bio: '生物系の人へ',
  se: 'SE の人へ',
  deep: 'ちょっと込み入った話',
  extra: '原本の外からの補足'
}

function useBoxes(md: any) {
  for (const [name, defaultTitle] of Object.entries(BOXES)) {
    md.use(container, name, {
      render(tokens: any[], idx: number) {
        const token = tokens[idx]
        if (token.nesting === 1) {
          const custom = token.info.trim().slice(name.length).trim()
          const title = md.utils.escapeHtml(custom || defaultTitle)
          return `<div class="custom-block box-${name}"><p class="custom-block-title">${title}</p>\n`
        }
        if (name === 'primer') {
          return `<p class="primer-link"><a href="${PRIMER_URL}" target="_blank" rel="noreferrer">原本（英語）を開く</a></p></div>\n`
        }
        if (name === 'spec') {
          return `<p class="primer-link"><a href="${ARCH_URL}" target="_blank" rel="noreferrer">Core v7.0 の Architecture 編（英語）を開く</a></p></div>\n`
        }
        return '</div>\n'
      }
    })
  }
}

const chapter = (n: number, title: string) => {
  const id = String(n).padStart(2, '0')
  return { text: `第${n}章 ${title}`, link: `/ch${id}` }
}

export default defineConfig({
  lang: 'ja-JP',
  title: 'Bluetooth the Book',
  description: 'Bluetooth Classic（BR/EDR）と LE をしくみから学ぶ、日本語のやさしい教科書（非公式）',
  base: '/bluetooth-the-book/',
  cleanUrls: true,
  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/bluetooth-the-book/favicon.svg' }],
    ['meta', { name: 'theme-color', content: '#0f766e' }]
  ],
  markdown: {
    config: useBoxes
  },
  themeConfig: {
    logo: '/favicon.svg',
    nav: [
      { text: '基礎', link: '/ch01' },
      { text: 'Classic 編', link: '/ch06' },
      { text: 'LE 編', link: '/ch18' },
      {
        text: '付録',
        items: [
          { text: '数字の早見表', link: '/numbers' },
          { text: '用語集', link: '/glossary' },
          { text: 'LE Primer との対応', link: '/primer-map' },
          { text: 'Core 仕様との対応（Classic）', link: '/core-map' }
        ]
      }
    ],
    sidebar: [
      { text: 'はじめに', link: '/preface' },
      {
        text: '第I部 Bluetooth の土台',
        items: [
          chapter(1, 'Bluetooth とは何か'),
          chapter(2, '仕様書の地図'),
          chapter(3, 'スタックという考え方'),
          chapter(4, '電波の基礎'),
          chapter(5, 'HCI')
        ]
      },
      {
        text: '第II部 Classic（BR/EDR）',
        items: [
          chapter(6, 'ピコネットと時計'),
          chapter(7, '電波とパケット'),
          chapter(8, '見つける、つなぐ'),
          chapter(9, '5階建ての運び道'),
          chapter(10, 'ACL：確実に運ぶ'),
          chapter(11, 'SCO と eSCO：声を運ぶ'),
          chapter(12, 'リンクマネージャと省電力'),
          chapter(13, 'L2CAP と SDP'),
          chapter(14, 'プロファイル'),
          chapter(15, 'ペアリングと暗号'),
          chapter(16, '混雑をよける'),
          chapter(17, '総まとめ：音楽が鳴るまで')
        ]
      },
      {
        text: '第III部 LE：電波の世界',
        items: [
          chapter(18, 'LE の考え方'),
          chapter(19, 'LE の電波と PHY'),
          chapter(20, 'リンク層の基本'),
          chapter(21, 'アドバタイズ'),
          chapter(22, 'コネクション'),
          chapter(23, '定期アドバタイズと PAwR'),
          chapter(24, 'アイソクロナス通信と音'),
          chapter(25, '方向と距離をはかる')
        ]
      },
      {
        text: '第IV部 LE：データの世界',
        items: [
          chapter(26, 'L2CAP'),
          chapter(27, 'ATT'),
          chapter(28, 'GATT'),
          chapter(29, 'GAP'),
          chapter(30, 'セキュリティ')
        ]
      },
      {
        text: '第V部 実践とまとめ',
        items: [
          chapter(31, 'アプリを作るときの現実'),
          chapter(32, '総まとめ：心拍が届くまで'),
          chapter(33, 'Classic と LE、どちらを選ぶか')
        ]
      },
      {
        text: '付録',
        items: [
          { text: '付録A 数字の早見表', link: '/numbers' },
          { text: '付録B 用語集', link: '/glossary' },
          { text: '付録C 原本との対応表', link: '/primer-map' },
          { text: '付録D Core 仕様との対応表', link: '/core-map' }
        ]
      }
    ],
    socialLinks: [{ icon: 'github', link: 'https://github.com/mujuko/bluetooth-the-book' }],
    outline: { level: [2, 2], label: 'この章の節' },
    docFooter: { prev: '前へ', next: '次へ' },
    sidebarMenuLabel: '目次',
    returnToTopLabel: 'ページの先頭へ',
    darkModeSwitchLabel: '外観',
    lightModeSwitchTitle: 'ライトモードに切り替え',
    darkModeSwitchTitle: 'ダークモードに切り替え',
    externalLinkIcon: true,
    notFound: {
      title: 'ページが見つかりません',
      quote: 'リンクが古くなっているかもしれません。',
      linkLabel: '表紙に戻る',
      linkText: '表紙に戻る'
    },
    footer: {
      message: '本書は Bluetooth SIG とは無関係の非公式教材です。Bluetooth® は Bluetooth SIG, Inc. の登録商標です。',
      copyright: '参考：The Bluetooth® Low Energy Primer v1.3.0、Bluetooth® Core Specification v7.0（© Bluetooth SIG, Inc.）。本文と図は本書の書き下ろしです。'
    },
    search: {
      provider: 'local',
      options: {
        miniSearch: {
          options: {
            // 日本語は空白で単語が分かれないので、ブラウザ標準の分かち書きを使う
            tokenize: (text: string) => {
              const segmenter = new Intl.Segmenter('ja', { granularity: 'word' })
              return Array.from(segmenter.segment(text))
                .filter((s: any) => s.isWordLike)
                .map((s: any) => s.segment)
            }
          }
        },
        translations: {
          button: { buttonText: '検索', buttonAriaLabel: '検索' },
          modal: {
            displayDetails: '詳細を表示',
            resetButtonTitle: '検索語を消す',
            backButtonTitle: '閉じる',
            noResultsText: '見つかりませんでした',
            footer: {
              selectText: '選択',
              navigateText: '移動',
              closeText: '閉じる'
            }
          }
        }
      }
    }
  }
})
