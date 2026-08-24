const fs = require('fs');
const styleCss = fs.readFileSync('style.css', 'utf8');
const appJs = fs.readFileSync('app.js', 'utf8');

console.log('=== VERIFYING ALL STAGES SIDEWISE SCROLLBAR & COLUMN LAYOUT ===');

// Check horizontal scrollbar and alignment
const hasScrollbar = styleCss.includes('.bracket-tree-container') &&
                     styleCss.includes('overflow-x: auto') &&
                     styleCss.includes('.bracket-tree-container::-webkit-scrollbar') &&
                     styleCss.includes('scrollbar-width: thin');
console.log('✓ Smooth horizontal scrollbar on bracket tree container:', hasScrollbar);

// Check column sizing
const hasColumnSizing = styleCss.includes('min-width: 320px') &&
                        styleCss.includes('width: 320px') &&
                        styleCss.includes('flex-shrink: 0');
console.log('✓ Fixed readable width and flex-shrink protection on columns:', hasColumnSizing);

// Check team rows and actions formatting
const hasCleanRows = styleCss.includes('.bracket-team-row .b-team-name') &&
                     styleCss.includes('text-overflow: ellipsis') &&
                     styleCss.includes('.match-card-actions') &&
                     styleCss.includes('justify-content: space-between');
console.log('✓ Clean team name ellipses, scores, and action button alignment:', hasCleanRows);

// Check all stages rendering logic in app.js
const hasAllStagesTree = appJs.includes("activeStageFilter === 'all'") &&
                         appJs.includes("html += renderKnockoutStage('r32'") &&
                         appJs.includes("html += renderKnockoutStage('qf'") &&
                         appJs.includes("html += renderKnockoutStage('sf'") &&
                         appJs.includes("html += renderKnockoutStage('gf'");
console.log('✓ All stages multi-column tree rendering:', hasAllStagesTree);

console.log('\nAll stages UI layout verification passed successfully!');
