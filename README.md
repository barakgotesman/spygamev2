# Spy Game

A pass-the-phone party game inspired by Spyfall. Everyone secretly learns the same location, except the spy. Ask each other questions, vote, and find the spy before the timer runs out.

One phone, no accounts, no install. It works in any modern mobile browser, in **English and Hebrew** (right-to-left). The language follows your browser on first launch, and there's a one-tap switch on the first screen.

> Originally an Angular 10 app I built in 2020. Rebuilt from scratch with React, Vite, TypeScript and Tailwind.

## How to play

1. **Set up the round.** Pick the number of players (2-20) and spies. Tap **Deal the postcards**.
2. **Pass the phone.** Each player takes a turn holding the sealed flap of their postcard:
   - Everyone but the spy sees an illustrated postcard of the location, such as the Casino or the Pub.
   - The spy's postcard was **lost in the mail**, so they don't know where everyone is.
   - Let go and the postcard seals itself again, so nobody can peek over a shoulder.
3. **Play the round.** Start the timer (7 minutes by default) and ask each other questions about the location. The spy must bluff; everyone else must prove they know the place without giving it away.
4. **Vote.** Add a tally mark for whoever you think the spy is. You have one ballot per player.
5. **Reveal.** The real postcard turns up with the spy's seat stamped on it.

You can edit the locations (add your own, with an optional image URL) and the round length in **Settings**. Both are saved on your device.

## Run it locally

You need [Node.js](https://nodejs.org) 20 or newer.

```bash
npm install
npm run dev
```

Open the address Vite prints (usually `http://localhost:5173`).

| Command             | What it does                      |
| ------------------- | --------------------------------- |
| `npm run dev`       | Start the dev server              |
| `npm run build`     | Typecheck and build for production |
| `npm run preview`   | Serve the production build        |
| `npm test`          | Run the unit tests                |
| `npm run lint`      | Lint the code                     |
| `npm run typecheck` | Typecheck only                    |

## Pages

| Route           | What                                             |
| --------------- | ------------------------------------------------ |
| `/`             | Landing page                                     |
| `/how-to-play`  | Rules, example questions, tips and FAQ           |
| `/locations`    | Gallery of the illustrated postcards             |
| `/play`         | The game                                         |

It is a client-rendered single-page app, so a static host must serve `index.html` for every path. `vercel.json` (Vercel) and `public/_redirects` (Netlify) already do.

## Built with

React 19, React Router, Vite, TypeScript (strict), Tailwind CSS v4, Zustand, motion, and lucide-react. Tests run on Vitest. Fonts (Bagel Fat One, Familjen Grotesk, Courier Prime, plus Secular One and Heebo for Hebrew) are self-hosted, and there are no external requests.

## Project layout

```
src/
  app/        route layouts (site chrome, root)
  pages/      landing, how to play, locations, 404
  features/   game (setup, reveal, round, settings screens)
  components/ shared UI (Postcard, Scene, Button, ConfirmDialog, ...)
  store/      Zustand stores (game state, saved settings)
  lib/        pure, unit-tested game logic
  hooks/      wake lock, timer clock, text fitting
  data/       default locations
  i18n/       English and Hebrew copy, typed so both stay in sync
```

Architecture notes and coding conventions live in [CLAUDE.md](CLAUDE.md).

## Author

Built by [Barak Gotesman](https://www.linkedin.com/in/barak-gotesman-04424015b/). Made for fun, with great sympathy for the original Spyfall.
