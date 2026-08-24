const fs = require('fs');
const c = fs.readFileSync('index.html', 'utf8');

// Check data-nav
let i = 0;
let n = 0;
while (true) {
  const idx = c.indexOf('data-nav="', i);
  if (idx === -1) break;
  n++;
  if (n <= 3) {
    const start = Math.max(0, idx - 10);
    const end = Math.min(c.length, idx + 30);
    console.log('data-nav at ' + idx + ': ...' + c.substring(start, end).replace(/\n/g, ' ') + '...');
  }
  i = idx + 1;
}

// Check data-tourn
console.log('---');
i = 0;
n = 0;
while (true) {
  const idx = c.indexOf('data-tourn="', i);
  if (idx === -1) break;
  n++;
  if (n <= 5) {
    const start = Math.max(0, idx - 5);
    const end = Math.min(c.length, idx + 30);
    console.log('data-tourn at ' + idx + ': ...' + c.substring(start, end).replace(/\n/g, ' ') + '...');
  }
  i = idx + 1;
}

// Check data-stage
console.log('---');
i = 0;
n = 0;
while (true) {
  const idx = c.indexOf('data-stage="', i);
  if (idx === -1) break;
  n++;
  if (n <= 5) {
    const start = Math.max(0, idx - 5);
    const end = Math.min(c.length, idx + 30);
    console.log('data-stage at ' + idx + ': ...' + c.substring(start, end).replace(/\n/g, ' ') + '...');
  }
  i = idx + 1;
}