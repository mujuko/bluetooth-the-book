import { h } from 'vue'
import DefaultTheme from 'vitepress/theme'
import type { Theme } from 'vitepress'
import './custom.css'
import SvgDefs from './components/SvgDefs.vue'
import Seq from './components/Seq.vue'
import Pkt from './components/Pkt.vue'
import Timing from './components/Timing.vue'

export default {
  extends: DefaultTheme,
  Layout: () => h(DefaultTheme.Layout, null, { 'layout-top': () => h(SvgDefs) }),
  enhanceApp({ app }) {
    app.component('Seq', Seq)
    app.component('Pkt', Pkt)
    app.component('Timing', Timing)
  }
} satisfies Theme
