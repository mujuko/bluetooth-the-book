<script setup>
// パケットや入れ子構造を帯で描く。
//   rows: [{ name, x, fields: [{ t, s, w, c, open }] }]
//   w は相対幅で実寸ではない。open:true の欄は次の行へ「中身を開く」点線を引く。
import { computed } from 'vue'

const props = defineProps({
  rows: { type: Array, required: true },
  units: { type: Number, default: 0 },
  width: { type: Number, default: 640 }
})

const ROW = 46
const GAP = 24

const left = computed(() => (props.rows.some((r) => r.name) ? 104 : 4))

const total = computed(() => {
  if (props.units) return props.units
  return Math.max(...props.rows.map((r) => (r.x || 0) + r.fields.reduce((a, f) => a + f.w, 0)))
})

const scale = computed(() => (props.width - left.value - 4) / total.value)

const laid = computed(() =>
  props.rows.map((r, i) => {
    let cur = (r.x || 0) * scale.value + left.value
    const y = 4 + i * (ROW + GAP)
    const start = cur
    const fields = r.fields.map((f) => {
      const w = f.w * scale.value
      const item = { ...f, x: cur, w, y }
      cur += w
      return item
    })
    return { ...r, y, fields, start, end: cur }
  })
)

const guides = computed(() => {
  const out = []
  laid.value.forEach((r, i) => {
    const next = laid.value[i + 1]
    if (!next) return
    r.fields.forEach((f) => {
      if (f.open) {
        out.push({ x1: f.x, y1: r.y + ROW, x2: next.start, y2: next.y })
        out.push({ x1: f.x + f.w, y1: r.y + ROW, x2: next.end, y2: next.y })
      }
    })
  })
  return out
})

const height = computed(() => 8 + props.rows.length * ROW + (props.rows.length - 1) * GAP)
</script>

<template>
  <div class="fig-scroll">
    <svg :viewBox="`0 0 ${width} ${height}`" role="img">
      <line v-for="(g, i) in guides" :key="i" :x1="g.x1" :y1="g.y1" :x2="g.x2" :y2="g.y2" class="ln-d" />
      <g v-for="(r, i) in laid" :key="i">
        <text v-if="r.name" x="4" :y="r.y + 28" class="tb">{{ r.name }}</text>
        <g v-for="(f, j) in r.fields" :key="j">
          <rect :x="f.x" :y="f.y" :width="f.w" :height="46" :class="'f' + (f.c || 'n')" />
          <text :x="f.x + f.w / 2" :y="f.y + (f.s ? 20 : 28)" class="m">{{ f.t }}</text>
          <text v-if="f.s" :x="f.x + f.w / 2" :y="f.y + 37" class="m t2">{{ f.s }}</text>
        </g>
      </g>
    </svg>
  </div>
</template>
