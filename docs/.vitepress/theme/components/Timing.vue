<script setup>
// タイミング図。横軸は時間（相対値で実寸ではない）。
//   rows:  [{ name, blocks: [{ x, w, t, c, ghost }] }]
//   spans: [{ x1, x2, row, t }]    … その行の下に引く「この区間」の寸法線
//   marks: [{ x, t }]              … 全行を貫く縦の点線
//   links: [{ x1, r1, x2, r2, t }] … 行をまたぐ矢印
import { computed } from 'vue'

const props = defineProps({
  rows: { type: Array, required: true },
  max: { type: Number, required: true },
  spans: { type: Array, default: () => [] },
  marks: { type: Array, default: () => [] },
  links: { type: Array, default: () => [] },
  width: { type: Number, default: 640 },
  rowH: { type: Number, default: 34 }
})

const left = computed(() => (props.rows.some((r) => r.name) ? 92 : 6))
const px = (x) => left.value + (x * (props.width - left.value - 8)) / props.max

const TOP = computed(() => (props.marks.some((m) => m.t) ? 24 : 6))

const rowY = computed(() => {
  const ys = []
  let y = TOP.value
  props.rows.forEach((_, i) => {
    ys.push(y)
    y += props.rowH + (props.spans.some((s) => s.row === i) ? 34 : 14)
  })
  return { ys, end: y }
})

const height = computed(() => rowY.value.end + 18)
</script>

<template>
  <div class="fig-scroll">
    <svg :viewBox="`0 0 ${width} ${height}`" role="img">
      <g v-for="(m, i) in marks" :key="'m' + i">
        <line :x1="px(m.x)" :x2="px(m.x)" :y1="TOP - 4" :y2="rowY.end - 8" class="ln-d" />
        <text v-if="m.t" :x="px(m.x)" y="14" class="m t2">{{ m.t }}</text>
      </g>
      <g v-for="(r, i) in rows" :key="'r' + i">
        <text v-if="r.name" x="4" :y="rowY.ys[i] + rowH / 2 + 5" class="tb">{{ r.name }}</text>
        <line :x1="left" :x2="width - 8" :y1="rowY.ys[i] + rowH" :y2="rowY.ys[i] + rowH" class="ln-d" />
        <g v-for="(b, j) in r.blocks" :key="j">
          <rect
            :x="px(b.x)"
            :y="rowY.ys[i] + 3"
            :width="px(b.x + b.w) - px(b.x)"
            :height="rowH - 3"
            rx="3"
            :class="b.ghost ? 'ghost' : 'f' + (b.c || 'a')"
          />
          <text v-if="b.t" :x="(px(b.x) + px(b.x + b.w)) / 2" :y="rowY.ys[i] + rowH / 2 + 6" class="m">{{ b.t }}</text>
        </g>
      </g>
      <g v-for="(s, i) in spans" :key="'s' + i">
        <line
          :x1="px(s.x1)"
          :x2="px(s.x2)"
          :y1="rowY.ys[s.row] + rowH + 12"
          :y2="rowY.ys[s.row] + rowH + 12"
          class="ln"
          marker-start="url(#arr)"
          marker-end="url(#arr)"
        />
        <text :x="(px(s.x1) + px(s.x2)) / 2" :y="rowY.ys[s.row] + rowH + 27" class="m t2 halo">{{ s.t }}</text>
      </g>
      <g v-for="(l, i) in links" :key="'l' + i">
        <line
          :x1="px(l.x1)"
          :x2="px(l.x2)"
          :y1="rowY.ys[l.r1] + rowH"
          :y2="rowY.ys[l.r2] + 3"
          class="ln-acc"
          marker-end="url(#arr-acc)"
        />
        <text
          v-if="l.t"
          :x="(px(l.x1) + px(l.x2)) / 2 + 8"
          :y="(rowY.ys[l.r1] + rowH + rowY.ys[l.r2]) / 2 + 4"
          class="t2 halo"
        >{{ l.t }}</text>
      </g>
      <text :x="width - 8" :y="height - 4" class="r t2">時間 →</text>
    </svg>
  </div>
</template>
