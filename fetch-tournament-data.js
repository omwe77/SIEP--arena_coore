// fetch-tournament-data.js
//
// ONE-TIME script — run this yourself on your own machine, ONCE.
// It is NOT part of the live website and should never be uploaded
// or referenced by index.html/app.js directly. It writes a plain
// JSON file that the static site reads locally instead.
//
// Usage:
//   1. npm init -y                     (only if you don't have a package.json yet)
//   2. Set your key as an environment variable, don't paste it into this file:
//        macOS/Linux: export API_FOOTBALL_KEY="your_key_here"
//        Windows (PowerShell): $env:API_FOOTBALL_KEY="your_key_here"
//   3. Fill in the 5 league IDs below (Step 3 in the lesson) and the season year.
//   4. Run:  node fetch-tournament-data.js
//   5. Check data/real-tournaments.json was created, then delete your
//      exported key from your shell history if you're on a shared machine.

const fs = require("node:fs/promises");

const API_KEY = process.env.API_FOOTBALL_KEY;
if (!API_KEY) {
  console.error("Missing API_FOOTBALL_KEY environment variable. See usage notes at the top of this file.");
  process.exit(1);
}

const BASE_URL = "https://v3.football.api-sports.io";

// Fill these in yourself from Step 3 (curl the /leagues?search= endpoint) —
// deliberately left blank rather than guessed, since a wrong ID silently
// returns empty data instead of an obvious error.
const COMPETITIONS = {
  wc:      { leagueId: 1,   season: 2026 }, // FIFA World Cup
  ucl:     { leagueId: 2,   season: 2025 }, // UEFA Champions League
  pl:      { leagueId: 39,  season: 2025 }, // Premier League (England)
  laliga:  { leagueId: 140, season: 2025 }, // La Liga (Spain)
  serieA:  { leagueId: 135, season: 2025 }, // Serie A (Italy)
  euro:    { leagueId: 4,   season: 2024 }, // UEFA European Championship
  copa:    { leagueId: 9,   season: 2024 }  // Copa América
};

async function apiGet(path) {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: { "x-apisports-key": API_KEY }
  });
  if (!res.ok) {
    throw new Error(`Request failed (${res.status}) for ${path}`);
  }
  const json = await res.json();
  if (json.errors && Object.keys(json.errors).length > 0) {
    // The API returns HTTP 200 even on some errors (e.g. bad season for
    // your plan) — the real error shows up inside the JSON body instead.
    console.warn(`API returned an error for ${path}:`, json.errors);
  }
  return json.response;
}

async function fetchCompetition(key, { leagueId, season }) {
  if (!leagueId || !season) {
    console.warn(`Skipping "${key}" — leagueId/season not filled in yet.`);
    return null;
  }

  console.log(`Fetching teams for ${key} (league ${leagueId}, season ${season})...`);
  const teamsRaw = await apiGet(`/teams?league=${leagueId}&season=${season}`);
  const teams = teamsRaw.map(t => ({
    name: t.team.name,
    code: t.team.code || t.team.name.slice(0, 3).toUpperCase(),
    logo: t.team.logo,
    countryCode: t.team.country || null
  }));

  console.log(`Fetching standings for ${key}...`);
  let table = [];
  try {
    const standingsRaw = await apiGet(`/standings?league=${leagueId}&season=${season}`);
    // Standings response shape varies: groups vs a single table.
    // Inspect standingsRaw[0].league.standings in your own console.log
    // before assuming a shape here — this is exactly the kind of thing
    // worth verifying per-competition rather than trusting blindly.
    const rawStandings = standingsRaw?.[0]?.league?.standings || [];
    table = rawStandings.flat().map(row => ({
      name: row.team.name,
      points: row.points,
      goalsDiff: row.goalsDiff
    }));
  } catch (err) {
    console.warn(`No standings available for ${key} on your plan:`, err.message);
  }

  return { teams, table };
}

async function main() {
  const output = {};

  for (const [key, config] of Object.entries(COMPETITIONS)) {
    try {
      const data = await fetchCompetition(key, config);
      if (data) output[key] = data;
    } catch (err) {
      console.error(`Failed fetching ${key}:`, err.message);
    }
    // Free plan is rate-limited — a small delay between competitions
    // avoids tripping it during this one-time run.
    await new Promise(r => setTimeout(r, 1500));
  }

  await fs.mkdir("data", { recursive: true });
  await fs.writeFile(
    "data/real-tournaments.json",
    JSON.stringify(output, null, 2)
  );

  // Also write to data/real-tournaments.js for file:// compatibility
  await fs.writeFile(
    "data/real-tournaments.js",
    `window.REAL_TOURNAMENTS_DATA = ${JSON.stringify(output, null, 2)};`
  );

  console.log("\nDone. Wrote data/real-tournaments.json and data/real-tournaments.js");
  console.log("Double-check these files have NO api key in them before committing them.");
}

main();
