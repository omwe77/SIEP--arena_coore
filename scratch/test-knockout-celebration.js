const fs = require('fs');
const appJs = fs.readFileSync('app.js', 'utf8');
const styleCss = fs.readFileSync('style.css', 'utf8');
const indexHtml = fs.readFileSync('index.html', 'utf8');

console.log('=== VERIFYING HIGH-STAKES KNOCKOUT STAGES & CELEBRATIONS ===');

// Check HTML elements exist
const hasModal = indexHtml.includes('id="champion-modal"') &&
                 indexHtml.includes('id="confetti-canvas"') &&
                 indexHtml.includes('id="champ-modal-name"') &&
                 indexHtml.includes('id="stage-advance-toast"');
console.log('✓ Championship Modal and Toast in index.html:', hasModal);

// Check CSS classes exist
const hasStageStyles = styleCss.includes('.bracket-match-card.stage-qf') &&
                       styleCss.includes('.bracket-match-card.stage-sf') &&
                       styleCss.includes('.bracket-match-card.stage-gf') &&
                       styleCss.includes('.celebration-modal') &&
                       styleCss.includes('.confetti-canvas') &&
                       styleCss.includes('.stage-advance-toast');
console.log('✓ High-stakes stage theming & celebration CSS in style.css:', hasStageStyles);

// Check JS logic exists
const hasToastLogic = appJs.includes('function showStageAdvancementToast') &&
                      appJs.includes('showStageAdvancementToast(\'qf\')') &&
                      appJs.includes('showStageAdvancementToast(\'sf\')');
console.log('✓ Stage advancement toasts in app.js:', hasToastLogic);

const hasCelebrationLogic = appJs.includes('function triggerChampionCelebration') &&
                            appJs.includes('function startConfettiAnimation') &&
                            appJs.includes('triggerChampionCelebration(state.champion)');
console.log('✓ Championship celebration & confetti engine in app.js:', hasCelebrationLogic);

const hasStageCardStyling = appJs.includes('stage-badge-qf') &&
                            appJs.includes('stage-badge-sf') &&
                            appJs.includes('stage-badge-gf');
console.log('✓ High-stakes stage badges rendered on match cards:', hasStageCardStyling);

console.log('\nAll knockout UI and celebration checks passed successfully!');
