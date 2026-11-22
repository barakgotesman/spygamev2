import { createBrowserRouter, type RouteObject } from 'react-router'
import { RootLayout } from './app/RootLayout'
import { SiteLayout } from './app/SiteLayout'
import { GamePage } from './features/game/GamePage'
import { HomePage } from './pages/HomePage'
import { NotFoundPage } from './pages/NotFoundPage'

/**
 * Only `/play` owns the game. Its phases (setup, reveal, round, settings) are store state and
 * are never routes, so a role screen can't be linked to, bookmarked or reached with Back.
 */
export const routes: RouteObject[] = [
  {
    element: <RootLayout />,
    children: [
      { path: '/play', element: <GamePage /> },
      {
        element: <SiteLayout />,
        children: [
          { index: true, element: <HomePage /> },
          { path: 'how-to-play', lazy: async () => ({ Component: (await import('./pages/HowToPlayPage')).HowToPlayPage }) },
          { path: 'locations', lazy: async () => ({ Component: (await import('./pages/LocationsPage')).LocationsPage }) },
          { path: '*', element: <NotFoundPage /> },
        ],
      },
    ],
  },
]

export const router = createBrowserRouter(routes)
