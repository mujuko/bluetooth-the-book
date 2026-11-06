<template>
  <!-- 全ページの図で共有する矢じり。display:none にすると参照が効かなくなるブラウザがある -->
  <svg aria-hidden="true" style="position: absolute; width: 0; height: 0; overflow: hidden">
    <defs>
      <marker id="arr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
        <path d="M0 0 L10 5 L0 10 z" style="fill: var(--vp-c-text-2)" />
      </marker>
      <marker id="arr-err" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
        <path d="M0 0 L10 5 L0 10 z" style="fill: var(--f-d-s)" />
      </marker>
      <marker id="arr-acc" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
        <path d="M0 0 L10 5 L0 10 z" style="fill: var(--f-c-s)" />
      </marker>
    </defs>
  </svg>
</template>
