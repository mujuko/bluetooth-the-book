<script setup>
// シーケンス図。steps の各要素は次のいずれか。
//   { from, to, label, sub, dash, lost, tone }  … 矢印（lost は途中で失われる）
//   { section: '見出し' }                        … 全幅の区切り
//   { note: '本文\n2行目', over: 0, c: 'c' }      … 登場人物の上に置くメモ（over 省略で全幅）
import { computed } from 'vue'

const props = defineProps({
  actors: { type: Array, required: true },
  steps: { type: Array, required: true },
  tones: { type: Array, default: () => [] },
  width: { type: Number, default: 640 }
})

const PAD = 84

const xs = computed(() => {
  const n = props.actors.length
  if (n === 1) return [props.width / 2]
  return props.actors.map((_, i) => PAD + (i * (props.width - 2 * PAD)) / (n - 1))
})

const layout = computed(() => {
  let y = 54
  const items = []
  for (const s of props.steps) {
    if (s.section !== undefined) {
      items.push({ ...s, type: 'section', y: y + 6 })
      y += 34
    } else if (s.note !== undefined) {
      const lines = s.note.split('\n')
      const h = 12 + lines.length * 18
      const full = s.over === undefined
      const w = full ? props.width - 40 : Math.min(s.w ?? 210, props.width - 20)
      const cx = full ? props.width / 2 : xs.value[s.over]
      const x = Math.max(10, Math.min(cx - w / 2, props.width - w - 10))
      items.push({ ...s, type: 'note', y, x, w, h, lines, cx: x + w / 2 })
      y += h + 12
    } else {
      const x1 = xs.value[s.from]
      const x2 = xs.value[s.to]
      const ly = y + 22
      const ex = s.lost ? x1 + (x2 - x1) * 0.62 : x2
      items.push({ ...s, type: 'msg', x1, x2, ex, ly, mid: (x1 + x2) / 2 })
      y += s.sub ? 54 : 40
    }
  }
  return { items, height: y + 10 }
})
</script>

<template>
  <div class="fig-scroll">
    <svg :viewBox="`0 0 ${width} ${layout.height}`" role="img">
      <g v-for="(name, i) in actors" :key="i">
        <line :x1="xs[i]" y1="40" :x2="xs[i]" :y2="layout.height - 6" class="ln-d" />
        <rect :x="xs[i] - 80" y="6" width="160" height="34" rx="6" :class="tones[i] ? 'f' + tones[i] : 'fn'" />
        <text :x="xs[i]" y="28" class="m tb">{{ name }}</text>
      </g>
      <g v-for="(s, i) in layout.items" :key="i">
        <template v-if="s.type === 'section'">
          <line x1="8" :x2="width - 8" :y1="s.y + 12" :y2="s.y + 12" class="ln-d" />
          <text :x="width / 2" :y="s.y + 16" class="m tb halo acc">{{ s.section }}</text>
        </template>
        <template v-else-if="s.type === 'note'">
          <rect :x="s.x" :y="s.y" :width="s.w" :height="s.h" rx="5" :class="'f' + (s.c || 'n')" />
          <text v-for="(line, j) in s.lines" :key="j" :x="s.cx" :y="s.y + 20 + j * 18" class="m">{{ line }}</text>
        </template>
        <template v-else>
          <line
            :x1="s.x1"
            :y1="s.ly"
            :x2="s.ex"
            :y2="s.ly"
            :class="s.lost || s.tone === 'err' ? 'ln-err' : s.tone === 'acc' ? 'ln-acc' : 'ln'"
            :stroke-dasharray="s.dash ? '5 3' : undefined"
            :marker-end="s.lost ? undefined : s.tone === 'err' ? 'url(#arr-err)' : s.tone === 'acc' ? 'url(#arr-acc)' : 'url(#arr)'"
          />
          <path v-if="s.lost" :d="`M${s.ex - 6} ${s.ly - 6} L${s.ex + 6} ${s.ly + 6} M${s.ex - 6} ${s.ly + 6} L${s.ex + 6} ${s.ly - 6}`" class="ln-err" />
          <text :x="s.mid" :y="s.ly - 7" class="m halo" :class="{ err: s.lost || s.tone === 'err' }">{{ s.label }}</text>
          <text v-if="s.sub" :x="s.mid" :y="s.ly + 17" class="m t2 halo">{{ s.sub }}</text>
        </template>
      </g>
    </svg>
  </div>
</template>
