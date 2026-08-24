const fs = require('fs');
const c = fs.readFileSync('app.js', 'utf8');
// Search for simulate, showNotification patterns
const patterns = ['simulateGroups', 'simulateKnockout', 'simulateInstant', 'showNotification', 'function '];
for (const p of patterns) {
  let i = 0;
  while (true) {
    const idx = c.indexOf(p, i);
    if (idx === -1) break;
    const start = Math.max(0, idx - 10);
    const end = Math.min(c.length, idx + 50);
    const context = c.substring(start, end).replace(/\n/g, ' \n');
    console.log('Found "' + p + '" at pos ' + idx + ': ' + context.substring(0, 80) + '...');
    i = idx + 1;
  }
  console.log('---');
}