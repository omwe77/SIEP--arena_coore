const fs = require('fs');

let content = fs.readFileSync('app.js', 'utf8');

const brokenSection = `    }

    match.isLive = true;
    match.isSimulated = false;
        document.querySelectorAll(\`[data-stage="\${stageKey}"] .match-event-row\`).forEach(el => {
          el.classList.add('goal-event');
        });

        if (allDone) {
          progressToNextStage(stageKey);
        }
        renderActiveTournament();
      }
    }, 150);
  }`;

const fixedSection = `  function simulateSingleMatch(stageKey, matchIdx) {
    const state = tournamentState[activeTournKey];
    const match = state[stageKey]?.[matchIdx];
    if (!match || match.isSimulated || match.isLive) return;

    // Precompute outcome if not already generated
    if (!match.winner) {
      const outcome = precomputeMatchResult(match.home, match.away, true);
      Object.assign(match, outcome);
    }

    match.isLive = true;
    match.isSimulated = false;
    match.currentSimMinute = 0;
    match.currentDisplayScoreHome = 0;
    match.currentDisplayScoreAway = 0;
    renderStageViewport();

    const simKey = \`\${stageKey}_\${matchIdx}\`;
    if (activeSingleMatchIntervals[simKey]) {
      clearInterval(activeSingleMatchIntervals[simKey]);
    }

    const totalTargetMinutes = match.hadExtraTime ? 120 : 90;
    // Step by 8 simulated minutes every 150ms (~2.2 seconds total for full animated match)
    activeSingleMatchIntervals[simKey] = setInterval(() => {
      match.currentSimMinute = (match.currentSimMinute || 0) + 8;
      const curMin = match.currentSimMinute;

      match.currentDisplayScoreHome = match.events.filter(e => e.team === 'home' && e.minute <= curMin).length;
      match.currentDisplayScoreAway = match.events.filter(e => e.team === 'away' && e.minute <= curMin).length;

      // Update ticker with goal event
      const recentGoal = match.events.find(e => e.minute >= curMin - 8 && e.minute <= curMin);
      if (recentGoal) {
        const tickerEl = document.getElementById('bracket-ticker-text');
        if (tickerEl) {
          const goalType = recentGoal.type.includes('ET') ? ' (ET)' : '';
          tickerEl.textContent = \`⚡ GOAL! \${recentGoal.teamName}: \${recentGoal.player}\${goalType} (\${recentGoal.minute}') // \`;
        }
      }

      // Animate live timer progress
      const maxMin = match.hadExtraTime ? 120 : 90;
      const pct = Math.min(100, Math.round((curMin / maxMin) * 100));
      const timerEl = document.querySelector(\`[data-stage="\${stageKey}"] .card-live-progress-fill\`);
      if (timerEl) timerEl.style.width = \`\${pct}%\`;

      renderStageViewport();

      if (curMin >= totalTargetMinutes) {
        clearInterval(activeSingleMatchIntervals[simKey]);
        delete activeSingleMatchIntervals[simKey];

        match.isLive = false;
        match.isSimulated = true;

        const tickerEl = document.getElementById('bracket-ticker-text');
        if (tickerEl) {
          const extraInfo = match.hadPenalties ? \` (\${match.penHome}-\${match.penAway} PENS)\` : (match.hadExtraTime ? ' (AET)' : ' (FT)');
          tickerEl.textContent = \`RESULT: \${match.home} \${match.scoreHome} - \${match.scoreAway} \${match.away}\${extraInfo} // \`;
        }

        // Show stage completion toast
        showStageAdvancementToast(stageKey);

        // Add goal pulse animation to scored events
        document.querySelectorAll(\`[data-stage="\${stageKey}"] .match-event-row\`).forEach(el => {
          el.classList.add('goal-event');
        });

        const allDone = (state[stageKey] || []).every(m => m.isSimulated);
        if (allDone) {
          progressToNextStage(stageKey);
        }
        renderActiveTournament();
      }
    }, 150);
  }`;

// Handle both CRLF and LF
const normContent = content.replace(/\r\n/g, '\n');
const normBroken = brokenSection.replace(/\r\n/g, '\n');

if (normContent.includes(normBroken)) {
  const isCRLF = content.includes('\r\n');
  const replacedNorm = normContent.replace(normBroken, fixedSection.replace(/\r\n/g, '\n'));
  const finalContent = isCRLF ? replacedNorm.replace(/\n/g, '\r\n') : replacedNorm;
  fs.writeFileSync('app.js', finalContent, 'utf8');
  console.log('Successfully fixed simulateSingleMatch in app.js!');
} else {
  console.error('Could not find brokenSection in app.js');
}
