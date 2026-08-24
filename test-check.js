const fs = require('fs');
const c = fs.readFileSync('app.js', 'utf8');
const checks = ['samplePoisson','expectedGoals','nationalTeamStrength','clubStrength','simulateGroups','simulateKnockout','simulateInstant','showNotification','TOURNAMENTS_CONFIG','REAL_DATA','SIMULATION','data-badge-line'];
console.log('=== APP.JS KEY FUNCTIONS ===');
for(const k of checks){ console.log((c.includes(k) ? '✓' : '✗') + ' ' + k); }
const tourneyKeys = ['wc','ucl','pl','laliga','serieA','euro','copa'];
console.log('\n=== TOURNAMENT CONFIGURATIONS ===');
for(const k of tourneyKeys){ console.log((c.includes('"'+k+'"') ? '✓' : '✗') + ' ' + k); }
console.log('\n=== BADGES ===');
console.log('REAL_DATA:', c.includes('REAL_DATA') ? '✓' : '✗');
console.log('SIMULATION:', c.includes('SIMULATION') ? '✓' : '✗');
console.log('data-badge-line:', c.includes('data-badge-line') ? '✓' : '✗');
console.log('\n=== STAGE TABS ===');
console.log('groups:', c.includes('data-stage="groups"') ? '✓' : '✗');
console.log('knockout:', c.includes('data-stage="knockout"') ? '✓' : '✗');
console.log('final:', c.includes('data-stage="final"') ? '✓' : '✗');
console.log('\n=== SIMULATION BUTTONS ===');
console.log('sim-draw-btn:', c.includes('sim-draw-btn') ? '✓' : '✗');
console.log('sim-groups-btn:', c.includes('sim-groups-btn') ? '✓' : '✗');
console.log('sim-next-stage-btn:', c.includes('sim-next-stage-btn') ? '✓' : '✗');
console.log('sim-instant-btn:', c.includes('sim-instant-btn') ? '✓' : '✗');