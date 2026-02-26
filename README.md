# Word Bubble

A word-catching game: spell the target word by clicking the correct letters in colored balls as they fall. 20 levels, 3 lives, faster and longer words as you go.

## Tech

- **React 18** + **TypeScript** + **Vite** — SPA with hot module replacement (HMR)
- **PWA** — Install on phone or Mac via “Add to Home Screen” / “Install”
- **Vitest** + **React Testing Library** — unit/component tests
- **Playwright** — integration/e2e tests

## Commands

| Command | Description |
|--------|-------------|
| `npm run dev` | Start dev server with hot reload (default: http://localhost:5173) |
| `npm run build` | Production build (output in `dist/`) |
| `npm run preview` | Serve production build locally |
| `npm run test` | Run unit tests in watch mode |
| `npm run test:run` | Run unit tests once |
| `npm run test:coverage` | Unit test coverage report |
| `npm run test:e2e` | Run Playwright e2e tests (starts dev server if needed) |
| `npm run test:e2e:ui` | Playwright UI mode for debugging e2e |

## Game rules

- The **target word** is shown at the top (as `?` until you collect each letter).
- **Letters in colored balls** fall from the top; click the next correct letter to spell the word in order.
- **Complete the word** before time runs out to advance to the next level.
- **20 levels**: words get longer and letters fall faster each level.
- **3 lives**: if you don’t complete the word in time, you lose a life and retry the same level. At 0 lives, game over — restart from level 1.

## Install as app

- **iOS Safari**: Share → “Add to Home Screen”
- **Chrome (desktop/mobile)**: Install prompt or menu → “Install Word Bubble”
- **macOS Safari**: File → “Add to Dock” or use the share menu

Build first with `npm run build`, then serve `dist/` over HTTPS (or localhost) for full PWA behavior.
