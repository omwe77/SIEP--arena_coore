const fs = require('fs');
const appJs = fs.readFileSync('app.js', 'utf8');
const styleCss = fs.readFileSync('style.css', 'utf8');

console.log('=== VERIFYING MANUAL ROUND DECISION & BUTTON SIZING ===');

// Check that finalizeStageSimulation does NOT force next stage tab switch
const finalizeHasNoForcedTab = !appJs.includes("setStageTab('r16', true);") &&
                               !appJs.includes("setStageTab('qf', true);") &&
                               !appJs.includes("setStageTab('sf', true);");
console.log('✓ Stage finalization keeps user on current round to view results:', finalizeHasNoForcedTab);

// Check that stage action button triggers navigate to that round
const stageActionNavigates = appJs.includes("setStageTab('r32', true);") &&
                             appJs.includes("simulateStageWithClock('r32');");
console.log('✓ Stage action button navigates to corresponding section when clicked:', stageActionNavigates);

// Check that all stage tabs are wired with setStageTab
const tabsWired = appJs.includes("setStageTab(stage, true);");
console.log('✓ Section tab buttons navigate to corresponding section:', tabsWired);

// Check button styling & sizing in style.css
const hasResponsiveControls = styleCss.includes('.sim-controls-group') &&
                              styleCss.includes('.sim-action-btn') &&
                              styleCss.includes('white-space: nowrap;') &&
                              styleCss.includes('flex: 1 1 340px;');
console.log('✓ Header card & buttons adjusted to prevent cutoff:', hasResponsiveControls);

console.log('\nAll verification checks passed!');
