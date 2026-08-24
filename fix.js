const fs = require('fs');
let c = fs.readFileSync('app.js', 'utf8');
let out = '';
const lines = c.split('\n');
// Keep everything up to and including line 2039 (renderStandings)
for (let i = 0; i <= 2039; i++) {
  out += lines[i] + '\n';
}
// Add the proper ending
out += '});\n';
out += '})();\n';
fs.writeFileSync('app.js', out);
console.log('Fixed app.js ending');