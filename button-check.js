const fs = require('fs');
const c = fs.readFileSync('index.html', 'utf8');
const buttons = ['sim-draw-btn', 'sim-groups-btn', 'sim-next-stage-btn', 'sim-instant-btn'];
for (const k of buttons) {
  const search = 'id="' + k + '"';
  const idx = c.indexOf(search);
  if (idx >= 0) {
    const start = idx;
    const end = Math.min(c.length, idx + 80);
    const section = c.substring(start, end);
    const hasDisabled = section.includes('disabled');
    console.log(k + ': present, disabled=' + hasDisabled);
  } else {
    console.log(k + ': NOT FOUND');
  }
}