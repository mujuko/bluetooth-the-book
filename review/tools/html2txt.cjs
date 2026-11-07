// Convert Bluetooth Core spec HTML pages to searchable plain text.
// usage: node html2txt.cjs <dir>   (converts every *.html except index.html)
const fs = require('fs');
const path = require('path');
const dir = process.argv[2];
const ent = { amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ' };
function decode(s) {
  return s
    .replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCodePoint(parseInt(h, 16)))
    .replace(/&#(\d+);/g, (_, d) => String.fromCodePoint(+d))
    .replace(/&([a-z]+);/gi, (m, n) => (n in ent ? ent[n] : m));
}
for (const f of fs.readdirSync(dir)) {
  if (!f.endsWith('.html') || f === 'index.html') continue;
  let h = fs.readFileSync(path.join(dir, f), 'utf8');
  const a = h.indexOf('id="content-wrapper"');
  const b = h.indexOf('id="bottom-pager"', a);
  if (a > 0) h = h.slice(a, b > a ? b : undefined);
  h = h
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<style[\s\S]*?<\/style>/gi, '')
    // headings: keep the formal number
    .replace(/<h([1-6])[^>]*>([\s\S]*?)<\/h\1>/gi, (_, lv, inner) => '\n\n#' + '#'.repeat(+lv) + ' ' + inner.replace(/<[^>]+>/g, '') + '\n')
    .replace(/<\/(td|th)>/gi, ' | ')
    .replace(/<\/tr>/gi, '\n')
    .replace(/<(br|\/p|\/li|\/div|\/section|\/table|\/caption|\/dt|\/dd)[^>]*>/gi, '\n')
    .replace(/<li[^>]*>/gi, '\n- ')
    .replace(/<[^>]+>/g, '');
  let t = decode(h)
    .replace(/[ \t ]+/g, ' ')
    .replace(/ *\n */g, '\n')
    .replace(/\n{3,}/g, '\n\n');
  fs.writeFileSync(path.join(dir, f.replace(/\.html$/, '.txt')), t);
  console.log(f, t.length);
}
