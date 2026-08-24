const fs = require('fs');
const idx = fs.readFileSync('index.html', 'utf8');
const app = fs.readFileSync('app.js', 'utf8');
const data = fs.readFileSync('data/real-tournaments.json', 'utf8');
let d = JSON.parse(data);
console.log('=== INDEX.HTML BADGES ===');
console.log('REAL_DATA span:', idx.includes('<span class="data-badge REAL_DATA"') ? 'PRESENT' : 'MISSING');
console.log('SIMULATION span:', idx.includes('<span class="data-badge SIMULATION"') ? 'PRESENT' : 'MISSING');
console.log('data-badge-line:', idx.includes('data-badge-line') ? 'PRESENT' : 'MISSING');
console.log();
console.log('=== APP.JS KEY FUNCTIONS ===');
const fns = ['samplePoisson', 'expectedGoals', 'nationalTeamStrength', 'clubStrength', 'simulateGroups', 'simulateKnockout', 'simulateInstant'];
fns.forEach(fn => {
  console.log(fn + ':', app.includes('function ' + fn) ? 'DEFINED' : 'NOT DEFINED');
});
console.log();
console.log('=== DATA/real-tournaments.json TEAMS ===');
for (const k of ['wc', 'ucl', 'pl', 'laliga', 'serieA', 'euro', 'copa']) {
  console.log(k + ':' + (d[k].teams ? d[k].teams.length : 0) + ' teams');
}