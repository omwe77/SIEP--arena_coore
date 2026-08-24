const fs = require('fs');
const c = fs.readFileSync('index.html', 'utf8');
const patterns = ['REAL_DATA', 'SIMULATION', 'data-badge-line', 'badge', 'data-badge'];
for (const p of patterns) {
  let i = 0;
  while (true) {
    const idx = c.indexOf(p, i);
    if (idx === -1) break;
    const start = Math.max(0, idx - 30);
    const end = Math.min(c.length, idx + 50);
    console.log('Found "' + p + '" at pos ' + idx + ': ...' + c.substring(start, end).replace(/\n/g, ' ') + '...');
    i = idx + 1;
  }
}