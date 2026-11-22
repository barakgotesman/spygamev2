import { act, render, screen } from '@testing-library/react'
import { createMemoryRouter, RouterProvider } from 'react-router'
import { defaultLocations } from './data/defaultLocations'
import { routes } from './router'
import { useGameStore } from './store/useGameStore'
import { useLocaleStore } from './store/useLocaleStore'

function renderAt(path: string): ReturnType<typeof createMemoryRouter> {
  const router = createMemoryRouter(routes, { initialEntries: [path] })
  render(<RouterProvider router={router} />)
  return router
}

beforeEach(() => {
  useLocaleStore.setState({ lang: 'en' })
  useGameStore.getState().reset()
  // jsdom has no modal <dialog>; opening it is all the confirm dialog needs here.
  HTMLDialogElement.prototype.showModal = function showModal(this: HTMLDialogElement): void {
    this.setAttribute('open', '')
  }
  HTMLDialogElement.prototype.close = function close(this: HTMLDialogElement): void {
    this.removeAttribute('open')
  }
})

describe('routes', () => {
  it('shows the landing page with a call to action into the game', () => {
    renderAt('/')
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Everyone knows the place.')
    const cta = screen.getAllByRole('link', { name: 'Deal the postcards' })[0]
    expect(cta).toHaveAttribute('href', '/play')
  })

  it('shows how to play', async () => {
    renderAt('/how-to-play')
    expect(await screen.findByRole('heading', { level: 1, name: 'How to play' })).toBeInTheDocument()
    expect(screen.getByText('How many players do I need?')).toBeInTheDocument()
  })

  it('shows every default place in the gallery', async () => {
    renderAt('/locations')
    expect(await screen.findByRole('heading', { level: 1, name: 'The places' })).toBeInTheDocument()
    expect(screen.getAllByRole('heading', { level: 2 }).length).toBeGreaterThanOrEqual(defaultLocations.length)
  })

  it('shows a friendly 404', () => {
    renderAt('/nope')
    expect(screen.getByRole('heading', { name: 'Return to sender' })).toBeInTheDocument()
  })

  it('mounts the game, without site chrome, at /play', () => {
    renderAt('/play')
    expect(screen.getByRole('button', { name: 'Deal the postcards' })).toBeInTheDocument()
    expect(screen.queryByRole('navigation', { name: 'Main' })).toBeInTheDocument() // setup's own footer links
    expect(screen.queryByRole('link', { name: 'Spy Game, home' })).not.toBeInTheDocument()
  })

  it('has no route for individual game phases', () => {
    renderAt('/reveal')
    expect(screen.getByRole('heading', { name: 'Return to sender' })).toBeInTheDocument()
  })

  it('serves Hebrew right-to-left when that language is chosen', () => {
    useLocaleStore.setState({ lang: 'he' })
    renderAt('/')
    expect(document.documentElement).toHaveAttribute('dir', 'rtl')
    expect(document.documentElement).toHaveAttribute('lang', 'he')
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('כולם מכירים את המקום.')
  })

  it('asks before leaving the game mid-round', async () => {
    const router = renderAt('/play')
    act(() => {
      useGameStore.getState().startGame(defaultLocations)
    })
    await act(async () => {
      await router.navigate('/')
    })
    expect(await screen.findByRole('dialog')).toHaveTextContent('Leave mid-round?')
    expect(router.state.location.pathname).toBe('/play')
  })
})
