const fs = require('fs');
const c = fs.readFileSync('index.html', 'utf8');
['simulateGroups', 'simulateKnockout', 'simulateInstant', 'showNotification'].forEach(k => {
  let i = 0;
  const results = [];
  while (true) {
    const idx = c.indexOf(k, i);
    if (idx === -1) break;
    const start = Math.max(0, idx - 20);
    const end = Math.min(c.length, idx + 40);
    results.push('Found ' + k + ' at pos ' + idx + ': ...' + c.substring(start, end).replace(/\n/g, ' ') + '...');
    i = idx + 1;
  }
  results.length > 0 ? results.forEach(r => console.log(r)) : console.log(k + ': NOT FOUND');
  console.log('---');
});