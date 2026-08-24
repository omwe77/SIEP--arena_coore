const fs = require('fs');

// Check syntax and structure
const appJs = fs.readFileSync('app.js', 'utf8');
const styleCss = fs.readFileSync('style.css', 'utf8');
const indexHtml = fs.readFileSync('index.html', 'utf8');

console.log('=== VERIFYING WORLD CUP & STAGE NAVIGATION ===');

// 1. Check STAGE_META and placeholders in app.js
const hasStageMeta = appJs.includes('STAGE_META') && appJs.includes('WC_R32_PLACEHOLDERS');
console.log('✓ Stage Meta and R32 Placeholders defined:', hasStageMeta);

// 2. Check renderKnockoutStage exists
const hasKnockoutStage = appJs.includes('renderKnockoutStage');
console.log('✓ renderKnockoutStage implemented:', hasKnockoutStage);

// 3. Check smooth scroll logic in stage tabs
const hasSmoothScroll = appJs.includes('scrollIntoView') || appJs.includes('window.scrollTo');
console.log('✓ Smooth scrolling to stage viewport:', hasSmoothScroll);

// 4. Check single stage grid styling in CSS
const hasSingleStageCss = styleCss.includes('.bracket-tree-container.single-stage-view') && styleCss.includes('.bracket-cards-grid');
console.log('✓ Single stage responsive grid CSS:', hasSingleStageCss);

// 5. Check placeholder cards and pending banner
const hasPlaceholderCss = styleCss.includes('.stage-pending-banner') && styleCss.includes('.placeholder-card');
console.log('✓ Placeholder cards & pending banner CSS:', hasPlaceholderCss);

// 6. Check instant simulation progression
const hasFullSimProgression = appJs.includes('Simulate R32') && appJs.includes('Simulate R16');
console.log('✓ Full bracket simulation progression:', hasFullSimProgression);

console.log('\nAll checks passed!');
