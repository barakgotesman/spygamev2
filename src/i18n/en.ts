import { plural } from '../lib/plural'

/** English is the source of truth: `he.ts` must provide exactly the same shape. */
export const en = {
  meta: {
    title: 'Spy Game',
    description: 'A pass-the-phone party game. Find the spy before time runs out.',
  },
  common: {
    player: (n: number) => `Player ${n}`,
    cancelGame: 'Cancel game',
    keepPlaying: 'Keep playing',
    wishYouWereHere: 'Wish you were here',
  },
  setup: {
    titleLead: "Who's the",
    titleMark: 'spy?',
    settings: 'Settings',
    switchLanguage: 'Switch to Hebrew',
    sectionAria: 'Round setup',
    players: 'Players',
    playersHint: 'pass the phone',
    playersAria: (n: number) => `${n} players`,
    fewerPlayers: 'Fewer players',
    morePlayers: 'More players',
    spies: (n: number) => (n === 1 ? 'Spy' : 'Spies'),
    spiesHint: 'in the dark',
    spiesAria: (n: number) => `${n} ${n === 1 ? 'spy' : 'spies'}`,
    fewerSpies: 'Fewer spies',
    moreSpies: 'More spies',
    deal: 'Deal the postcards',
    noLocations: 'No locations left. Add one in settings to play.',
  },
  reveal: {
    pass: (n: number) => `Pass to player ${n}`,
    startRound: 'Start the round',
    cancelTitle: 'Cancel this game?',
    cancelBody: "Everyone's postcards are thrown away and you start over.",
    postCard: 'Post card',
    ofTotal: (n: number, total: number) => `${n} of ${total}`,
    holdAria: (n: number) => `Hold to read the postcard of player ${n}`,
    holdToRead: 'Hold to read it',
    sealed: 'sealed · eyes only',
    to: (serial: string) => `To: player ${serial}`,
    lostInMail: 'Lost in the mail',
    spyLine: "You're the spy. Bluff until you work out where everyone is.",
  },
  round: {
    findSpy: 'Find the spy',
    findSpies: (n: number) => `Find the ${n} spies`,
    subtitle: "Ask each other questions. Vote when you're ready.",
    timerAria: 'Round timer',
    timeLeft: 'Time left',
    timeUp: 'Time is up',
    voteNow: 'Vote now!',
    startClock: 'Start the clock',
    pause: 'Pause',
    resume: 'Resume',
    votesAria: 'Votes',
    theVote: 'The vote',
    ballotsLeft: (n: number) => `${n} ${n === 1 ? 'ballot' : 'ballots'} left`,
    removeVote: (n: number) => `Remove vote from player ${n}`,
    addVote: (n: number) => `Add vote to player ${n}`,
    votes: (n: number) => `${n} ${n === 1 ? 'vote' : 'votes'}`,
    revealSpies: (n: number) => (n > 1 ? 'Reveal the spies' : 'Reveal the spy'),
    cancelBody: 'The clock and all votes are thrown away and you start over.',
  },
  verdict: {
    resultAria: 'Round result',
    caught: 'Caught',
    spiesAre: (n: number) => (n > 1 ? 'The spies were' : 'The spy was'),
    newGame: 'New game',
  },
  settings: {
    back: 'Back',
    title: 'Settings',
    sectionsAria: 'Settings sections',
    tabLocations: 'Locations',
    tabTimer: 'Timer',
    newLocation: 'New location',
    namePlaceholder: 'Library',
    pictureUrl: 'Picture URL (optional)',
    addLocation: 'Add location',
    postcards: (n: number) => `${n} ${plural('en', n, { one: 'postcard', other: 'postcards' })}`,
    restore: 'Restore defaults',
    empty: 'No locations yet. Add one above or restore the defaults.',
    deleteLocation: (name: string) => `Delete ${name}`,
    roundLength: 'Round length',
    minutes: 'min',
    shorter: 'Shorter round',
    longer: 'Longer round',
    appliesNext: 'Applies to the next round',
    sliderAria: 'Round length in minutes',
  },
  footer: {
    postedBy: 'Posted by',
    author: 'Barak Gotesman',
  },
}

type Widen<T> = T extends string
  ? string
  : T extends (...args: infer A) => infer R
    ? (...args: A) => Widen<R>
    : { [K in keyof T]: Widen<T[K]> }

export type Messages = Widen<typeof en>
