# Spy Game

A pass-the-phone party game inspired by Spyfall. Everyone secretly learns the same location, except the spy. Ask each other questions, vote, and find the spy before the timer runs out.

One phone, no accounts, no install. It works in any modern mobile browser.

> Originally an Angular 10 app I built in 2020. Rebuilt from scratch with React, Vite, TypeScript and Tailwind.

## How to play

1. **Set up the round.** Pick the number of players (2-20) and spies. Tap **Tear to start**.
2. **Pass the phone.** Each player takes a turn holding the silver foil on their numbered ticket:
   - Everyone but the spy sees their ticket **"Admit one to ..."** a location, such as Casino or Pub.
   - The spy's ticket is stamped **VOID**, so they don't know where everyone is.
   - Let go and the ticket covers itself again, so nobody can peek over a shoulder.
3. **Play the round.** Start the timer (7 minutes by default) and ask each other questions about the location. The spy must bluff; everyone else must prove they know the place without giving it away.
4. **Vote.** Add a tally mark for whoever you think the spy is. You have one vote slip per player.
5. **Reveal.** See who the spy was, and what the location was.

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

## Built with

React 19, Vite, TypeScript (strict), Tailwind CSS v4, Zustand, motion, and lucide-react. Tests run on Vitest. Fonts (Ultra, Bricolage Grotesque, Courier Prime) are self-hosted, and there are no external requests.

## Project layout

```
src/
  features/   setup, reveal, round and settings screens
  components/ shared UI (Ticket, Button, ConfirmDialog, ...)
  store/      Zustand stores (game state, saved settings)
  lib/        pure, unit-tested game logic
  hooks/      wake lock, timer clock, text fitting
  data/       default locations
```

Architecture notes and coding conventions live in [CLAUDE.md](CLAUDE.md).

## Author

Built by [Barak Gotesman](https://www.linkedin.com/in/barak-gotesman-04424015b/). Made for fun, with great sympathy for the original Spyfall.
