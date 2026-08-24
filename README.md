# PitchReplay — Starter

A working, no-build-step slice of the MVP described in `pitchreplay-plan.md`: filter by league/season, "Finals only" toggle, search, and click-to-load YouTube embeds (facade pattern — nothing loads until you click, for performance).

## Run it

Just double-click `index.html`. That's it — no `npm install`, no server, no build step.

## Files

- `index.html` / `style.css` / `app.js` — the actual site
- `data/highlights.json` — the same sample data as a standalone file, kept as a schema reference for later (e.g. once you wire up a real API or backend). **`app.js` does not read this file** — the data is inlined directly in `app.js` on purpose, because `fetch()` of a local JSON file fails under `file://` in most browsers (a CORS restriction), which would break the "just double-click it" experience.

## Replacing the sample data

Every entry currently uses the same placeholder `youtubeId` (`dQw4w9WgXcQ`) — a well-known placeholder video, not a real match clip. Replace each with a real, official highlight video's ID before using this for anything real. Keep it to official uploads (league/broadcaster channels) — don't embed re-uploaded/unofficial copies.

## Next steps

See `pitchreplay-plan.md`, Section 7, for the phased roadmap (favorites, match detail pages, real API integration, accounts).
