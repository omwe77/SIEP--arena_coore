const fs = require('fs');
const c = fs.readFileSync('index.html', 'utf8');
// Search for addEventListener
let i = 0;
const results = [];
while (true) {
  const idx = c.indexOf('addEventListener', i);
  if (idx === -1) break;
  const start = Math.max(0, idx - 10);
  const end = Math.min(c.length, idx + 100);
  results.push('addEventListener at ' + idx + ': ...' + c.substring(start, end).replace(/\n/g, ' ') + '...');
  i = idx + 1;
}
// Also search for '=>' patterns that might define event handlers
const results2 = [];
let j = 0;
while (true) {
  const idx = c.indexOf(' =>', j);
  if (idx === -1) break;
  const start = Math.max(0, idx - 30);
  const end = Math.min(c.length, idx + 60);
  results2.push('arrow at ' + idx + ': ...' + c.substring(start, end).replace(/\n/g, ' ') + '...');
  j = idx + 1;
}
console.log('=== ADD EVENT LISTENER ===');
results.slice(0, 15).forEach(r => console.log(r));
console.log('\n=== ARROW FUNCTIONS ===');
results2.slice(0, 20).forEach(r => console.log(r));