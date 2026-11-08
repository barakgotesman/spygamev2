# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users
Friends gathered in one room, passing a single phone around (often evenings, dim light, drinks in hand, loud). Everyone is a casual player; no accounts, no setup skill. One person (the host) configures the round.

## Product Purpose
A Spyfall-style party game. Everyone but the spy secretly learns the same location; players question each other against a timer, then vote on who the spy is. Success is a round that starts in under 20 seconds and produces arguments and laughter.

## Positioning
One-device, zero-install, instant: the phone itself is the secret-keeper. The mechanism is the secret passing from hand to hand, which no scoreboard or lobby app does.

## Operating Context
Pass-the-phone ritual: each player looks privately at their role, then the phone goes to the next person. Then a shared countdown (default 7 min) and a vote. Locations are a user-editable list stored on the device.

## Capabilities and Constraints
- Players 2-20, spies 1..players-1, round length 1-60 min, editable locations (name + optional image URL), device-local storage.
- Tech: React 19, Vite, TypeScript strict, Tailwind v4, Zustand, motion. No backend. See CLAUDE.md.
- Roles must never linger on screen (hold-to-reveal, instant hide).
- Author's name and LinkedIn link in the footer (Barak Gotesman).

## Brand Commitments
Original and playful. The user rejected a first dark "noir" redesign as generic AI slop; avoid near-black + neon/red accent, condensed all-caps display type, and rounded dark cards.

## Evidence on Hand
No testimonials, metrics or images exist. Default locations: Spa, Casino, Wedding, Airplane, Amusement Park, Night Club, Pub, Restaurant, Supermarket.

## Product Principles
1. The secret is the product: reveal and hide are the signature moments.
2. One thumb, one hand, bad light, loud room: big targets, instant feedback.
3. Playful and a little mischievous, never corporate or "gamer".
4. Fast to start, nothing to learn.
