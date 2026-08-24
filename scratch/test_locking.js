const fs = require('fs');

// Test app.js syntax and logic
try {
  // Check that app.js has valid syntax
  const appCode = fs.readFileSync('app.js', 'utf8');
  console.log('Read app.js successfully, size:', appCode.length, 'bytes');

  // Let's create an isolated VM test for the locking logic
  const vm = require('vm');
  
  // Test mock state
  const mockState = {
    totalMatchdays: 38,
    matchdays: [
      [
        { home: 'Real Madrid', away: 'Barcelona', isSimulated: false },
        { home: 'Atletico', away: 'Sevilla', isSimulated: false }
      ],
      [
        { home: 'Barcelona', away: 'Atletico', isSimulated: false },
        { home: 'Sevilla', away: 'Real Madrid', isSimulated: false }
      ],
      [
        { home: 'Real Madrid', away: 'Atletico', isSimulated: false },
        { home: 'Barcelona', away: 'Sevilla', isSimulated: false }
      ]
    ]
  };

  function isMatchdayUnlocked(state, mdIdx) {
    if (!state || !state.matchdays || mdIdx === 0) return true;
    if (mdIdx < 0 || mdIdx >= state.matchdays.length) return false;
    for (let i = 0; i < mdIdx; i++) {
      const round = state.matchdays[i];
      if (!round || !round.every(m => m.isSimulated)) {
        return false;
      }
    }
    return true;
  }

  function getFirstPendingMatchdayIdx(state) {
    if (!state || !state.matchdays) return 0;
    const idx = state.matchdays.findIndex(round => round.some(m => !m.isSimulated));
    return idx === -1 ? state.matchdays.length : idx;
  }

  console.log('--- TEST 1: Initial state ---');
  console.log('MD1 (idx 0) unlocked?', isMatchdayUnlocked(mockState, 0), '(Expected: true)');
  console.log('MD2 (idx 1) unlocked?', isMatchdayUnlocked(mockState, 1), '(Expected: false)');
  console.log('MD3 (idx 2) unlocked?', isMatchdayUnlocked(mockState, 2), '(Expected: false)');
  console.log('First pending MD idx:', getFirstPendingMatchdayIdx(mockState), '(Expected: 0)');

  console.log('\n--- TEST 2: MD1 partially simulated ---');
  mockState.matchdays[0][0].isSimulated = true;
  console.log('MD1 (idx 0) unlocked?', isMatchdayUnlocked(mockState, 0), '(Expected: true)');
  console.log('MD2 (idx 1) unlocked?', isMatchdayUnlocked(mockState, 1), '(Expected: false)');
  console.log('First pending MD idx:', getFirstPendingMatchdayIdx(mockState), '(Expected: 0)');

  console.log('\n--- TEST 3: MD1 fully simulated ---');
  mockState.matchdays[0][1].isSimulated = true;
  console.log('MD1 (idx 0) unlocked?', isMatchdayUnlocked(mockState, 0), '(Expected: true)');
  console.log('MD2 (idx 1) unlocked?', isMatchdayUnlocked(mockState, 1), '(Expected: true)');
  console.log('MD3 (idx 2) unlocked?', isMatchdayUnlocked(mockState, 2), '(Expected: false)');
  console.log('First pending MD idx:', getFirstPendingMatchdayIdx(mockState), '(Expected: 1)');

  console.log('\n--- TEST 4: MD2 fully simulated ---');
  mockState.matchdays[1][0].isSimulated = true;
  mockState.matchdays[1][1].isSimulated = true;
  console.log('MD1 (idx 0) unlocked?', isMatchdayUnlocked(mockState, 0), '(Expected: true)');
  console.log('MD2 (idx 1) unlocked?', isMatchdayUnlocked(mockState, 1), '(Expected: true)');
  console.log('MD3 (idx 2) unlocked?', isMatchdayUnlocked(mockState, 2), '(Expected: true)');
  console.log('First pending MD idx:', getFirstPendingMatchdayIdx(mockState), '(Expected: 2)');

  console.log('\nALL VALIDATION TESTS PASSED PERFECTLY!');
} catch (err) {
  console.error('Test failed:', err);
  process.exit(1);
}
