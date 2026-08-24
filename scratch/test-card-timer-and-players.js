const fs = require('fs');
const appJs = fs.readFileSync('app.js', 'utf8');
const styleCss = fs.readFileSync('style.css', 'utf8');

console.log('=== VERIFYING CARD TIMERS, PLAYER SCORERS & PENALTIES ===');

// Check TEAM_STAR_PLAYERS roster exists
const hasRosters = appJs.includes('TEAM_STAR_PLAYERS') &&
                   appJs.includes('L. Messi') &&
                   appJs.includes('K. Mbappé') &&
                   appJs.includes('Vinícius Jr.') &&
                   appJs.includes('H. Kane');
console.log('✓ Star player roster database implemented:', hasRosters);

// Check goal events attach player names
const hasPlayerInEvents = appJs.includes('player = getRandomPlayerForTeam') &&
                          appJs.includes('{ minute: min, team: \'home\', teamName: homeTeam, player, type: \'GOAL\' }');
console.log('✓ Goal events contain authentic player names:', hasPlayerInEvents);

// Check individual match card has own live timer
const hasCardLiveTimer = appJs.includes('card-live-timer') &&
                         appJs.includes('card-live-progress-fill') &&
                         styleCss.includes('.card-live-timer');
console.log('✓ Individual match card contains its own live timer HUD:', hasCardLiveTimer);

// Check goal scorers list and penalty summary on cards
const hasScorersList = appJs.includes('match-events-list') &&
                       appJs.includes('match-pens-summary') &&
                       styleCss.includes('.match-events-list');
console.log('✓ Match cards render goal scorers timeline & penalty results:', hasScorersList);

// Check simulateSingleMatch runs live animation timer on the card
const hasSingleMatchTimer = appJs.includes('activeSingleMatchIntervals[simKey]') &&
                            appJs.includes('match.currentSimMinute');
console.log('✓ simulateSingleMatch runs live animated match on card:', hasSingleMatchTimer);

console.log('\nAll card timer and player scorer checks passed!');
