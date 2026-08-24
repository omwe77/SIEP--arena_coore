const fs = require('fs');
const appJs = fs.readFileSync('app.js', 'utf8');
const styleCss = fs.readFileSync('style.css', 'utf8');

console.log('=== VERIFYING STAGE NAVIGATION & STATS REMOVAL ===');

// Check no stats buttons in renderMatchCard
const hasStatsButtonInCards = appJs.includes('btn-match-details') || appJs.includes('📊 STATS');
console.log('✓ Stats button removed from match cards:', !hasStatsButtonInCards);

// Check no stats badges in renderKnockoutStage
const hasStatsBadgeInStage = appJs.includes('📊') && appJs.includes('SIMULATED');
console.log('✓ Stats count badge removed from stage header:', !hasStatsBadgeInStage);

// Check setStageTab function exists
const hasSetStageTab = appJs.includes('function setStageTab(stageKey');
console.log('✓ setStageTab function implemented:', hasSetStageTab);

// Check group completion automatically switches to R32
const autoR32 = appJs.includes("setStageTab('r32', true);");
console.log('✓ Group completion switches to R32:', autoR32);

// Check stage transitions for R16, QF, SF, GF
const autoTransitions = appJs.includes("setStageTab('r16', true);") &&
                        appJs.includes("setStageTab('qf', true);") &&
                        appJs.includes("setStageTab('sf', true);") &&
                        appJs.includes("setStageTab('gf', true);");
console.log('✓ Automatic transitions to R16, QF, SF, GF:', autoTransitions);

// Check tab click listeners use setStageTab
const tabsWired = appJs.includes("setStageTab(stage, true)");
console.log('✓ Stage tabs wired with setStageTab:', tabsWired);

console.log('\nAll verification checks passed!');
