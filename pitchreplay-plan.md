# PitchReplay — Football Highlights Site: Full Plan

## 1. Requirements & Target Audience

**Core requirement:** a fast, browsable archive of football highlight clips — including finals — filterable by league/season, searchable, mobile-first, legally sound (embed via YouTube, don't host video files yourself).

**Audience:**
- Casual fans who missed a match and want the 3-minute version
- Fans of a specific league/team who want a filtered feed
- People specifically hunting finals/big moments (the "including final matches" ask suggests this is a headline feature, not an afterthought)

**Non-functional requirements:** loads fast on mobile data, works without an account, accessible (captions, keyboard nav), no ongoing hosting cost for an MVP.

---

## 2. Name & Branding

| Name | Why it works |
|---|---|
| **PitchReplay** | Clear, describes exactly what it does, reads well as a wordmark |
| **GoalVault** | Implies an archive/library feel — good if finals/history is the hook |
| **FullTimeFeed** | Plays on "full-time" (match end) + "feed" (content stream) |
| **TouchlineTV** | Broadcast-y, works if you lean into a "channel" identity |
| **MatchRewind** | Very literal, easy to say out loud in a demo |
| **OffsideArchive** | Cheekier, memorable, slight insider-joke appeal for fans |

I'll use **PitchReplay** through the rest of this plan — swap freely.

**Branding direction:** dark pitch-green (`#0B3D2E`) + chalk white + one accent (amber `#F4B400` for "final"/featured tags, since gold reads as "big match"). Wordmark in a bold condensed sans (stadium-scoreboard feel). Logo mark: a simple rewind-triangle inside a ball or pitch-line motif — keep it geometric, not a literal ball/crest (avoids any trademark overlap with real clubs/leagues).

⚠️ **Trademark note:** don't finalize a name without a quick search — these are proposals, not cleared names.

---

## 3. Feature List

**MVP (must-have):**
- Highlight grid with thumbnail, teams, score, competition, date
- Filter by league, season, and "Finals only"
- Text search (team name, competition)
- Responsive layout (mobile grid → desktop grid)
- Click-to-play video (YouTube embed)

**Phase 2:**
- Favorites (localStorage, no login required)
- Match detail page (full highlight + related highlights)
- Sort by date/most-watched

**Phase 3 (needs a backend):**
- User accounts, favorites synced across devices
- Comments/reactions
- Personalized "for you" feed based on followed teams

---

## 4. Tech Stack

| Layer | Recommendation | Why |
|---|---|---|
| Frontend | **Plain HTML/CSS/JS**, no build step | Zero config, works by double-clicking, nothing to break before a demo (learned this the hard way on a prior project — a half-wired React setup is worse than no React) |
| Frontend (if you outgrow vanilla) | React + Vite | Only once the site needs real client-side routing/state — don't start here |
| Video hosting | **YouTube embeds**, not self-hosted files | Free, YouTube's CDN handles bandwidth, and you're not redistributing copyrighted broadcast footage yourself — only embedding official uploads |
| Match/league data | Curated JSON to start; **football-data.org** or **TheSportsDB** free tier later for live schedules | Free tiers exist but are rate-limited — fine for a showcase, not for scale |
| Hosting | GitHub Pages / Netlify / Vercel | All free, all CDN-backed, all zero-cost for a static site |
| Backend (Phase 3 only) | Supabase (free tier) | Postgres + auth without running your own server |

---

## 5. Information Architecture & Data Model

```
League ──< Match >── Team
              │
              └──< Highlight
```

- **League**: id, name, country, logo, seasons[]
- **Team**: id, name, leagueId, crestPlaceholder (see accessibility/legal note below)
- **Match**: id, leagueId, season, homeTeamId, awayTeamId, homeScore, awayScore, date, stage ("Group", "Final", etc.)
- **Highlight**: id, matchId, title, youtubeId, durationSeconds, thumbnail, tags[]
- **User** *(Phase 3 only)*: id, email, favorites: [highlightId]

Full JSON schema is in the starter code below.

---

## 6. UI/UX Principles & Sitemap

**Principles:** content (the video grid) is the UI — minimize chrome around it; one clear filter bar, not a sidebar of 15 options; finals get a visually distinct badge, not a separate design language; no autoplay-with-sound anywhere.

**Sitemap:**
```
/                    Home — featured/latest highlights + filter bar
/league/:id          League page, filtered grid
/match/:id           Single highlight, full player + related clips
/search?q=           Search results
/favorites           Saved clips (localStorage, Phase 2)
```

**Rough wireframe (text form):**
```
┌─────────────────────────────────────────────┐
│ [Logo]      [Search........]     [Favorites] │
├─────────────────────────────────────────────┤
│  ⭐ FEATURED: Final — Team A 3-1 Team B       │
│  [ big thumbnail, click to play ]             │
├─────────────────────────────────────────────┤
│ League: [All ▾]  Season: [All ▾]  ☐ Finals   │
├─────────────────────────────────────────────┤
│ [card] [card] [card]                          │
│ [card] [card] [card]                          │
│ [card] [card] [card]                          │
└─────────────────────────────────────────────┘
```
Each card: thumbnail (16:9), competition + stage badge, "Team A 2–1 Team B", date.

---

## 7. MVP Scope & Phased Roadmap

**Phase 1 — MVP (this weekend-scale):**
Static site, ~20–30 curated highlights in a JSON file (hand-picked, including a few real finals), client-side filter + search, YouTube click-to-load embeds, fully responsive, no backend, no login.

**Phase 2:** localStorage favorites, match detail pages, better search (fuzzy match on team names).

**Phase 3 (optional, real infra):** football-data.org integration for live schedules, Supabase for accounts + cross-device favorites.

**Phase 4 (stretch):** PWA/offline shell, admin page for curating new highlights without editing JSON by hand.

---

## 8. Data Schema & Starter Code

See the accompanying starter project (`pitchreplay-starter/`) — a working, no-build-step demo:
- `index.html` / `style.css` / `app.js`
- `data/highlights.json` — sample dataset (schema below, values are **placeholder data**, not real match footage)

```json
{
  "id": "h1",
  "matchId": "m1",
  "title": "Sample Final Highlights",
  "youtubeId": "dQw4w9WgXcQ",
  "durationSeconds": 187,
  "league": "Sample League",
  "season": "2025/26",
  "stage": "Final",
  "homeTeam": "Team A",
  "awayTeam": "Team B",
  "homeScore": 3,
  "awayScore": 1,
  "date": "2026-06-14",
  "tags": ["final", "comeback"]
}
```

> The sample `youtubeId` is a well-known placeholder video, deliberately not a real match clip — swap in real, official highlight video IDs before this goes live.

---

## 9. Deployment & Performance

- **Lazy-load embeds:** don't load the real YouTube iframe until a thumbnail is clicked (a "facade" pattern) — YouTube's embed script is heavy, and loading 20 of them on page load will tank your performance score. The starter code below implements this.
- Lazy-load thumbnail images (`loading="lazy"`).
- Host on Netlify/GitHub Pages — both are CDN-backed by default, nothing to configure.
- Keep the JSON dataset small and static for MVP; don't hit a live API on every page load.

---

## 10. Accessibility & Inclusivity

- Every embedded video needs a descriptive `iframe title` (screen readers announce it).
- Prefer official uploads that already have captions/subtitles — you can't add captions to someone else's embedded video, so curation matters here.
- Full keyboard navigation: filter dropdowns, search box, and every card must be reachable and operable via Tab/Enter, with visible focus states.
- Don't encode match info only in color (e.g., a green "W" badge) — pair it with text.
- Respect `prefers-reduced-motion` for any hover/entrance animation.
- Real team crests/logos are trademarked — for a showcase, use text badges or placeholder marks rather than scraped official logos, same as the "not affiliated with FIFA" disclaimer approach from the World Cup project.

---

## Immediate Next Step

The starter project below is a working Phase-1 MVP slice: filter + search + lazy-loaded embeds, 6 sample entries. Swap in real data and it's most of the way to the full MVP scope in Section 7.
