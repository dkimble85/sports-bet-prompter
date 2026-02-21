import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import Header from '../components/Header'

// Mock TanStack Router Link as a plain anchor so we don't need a full router context
vi.mock('@tanstack/react-router', () => ({
  Link: ({
    children,
    to,
    className,
    onClick,
  }: {
    children: React.ReactNode
    to: string
    className?: string
    activeProps?: object
    onClick?: () => void
  }) => (
    <a href={to} className={className} onClick={onClick}>
      {children}
    </a>
  ),
}))

describe('Header', () => {
  it('renders the menu toggle button', () => {
    render(<Header />)
    expect(screen.getByRole('button', { name: /open menu/i })).toBeInTheDocument()
  })

  it('sidebar is hidden initially', () => {
    render(<Header />)
    const aside = screen.getByRole('complementary')
    expect(aside.className).toContain('-translate-x-full')
  })

  it('opens the sidebar when the menu button is clicked', () => {
    render(<Header />)
    const openButton = screen.getByRole('button', { name: /open menu/i })
    fireEvent.click(openButton)
    const aside = screen.getByRole('complementary')
    expect(aside.className).toContain('translate-x-0')
  })

  it('toggle button aria-label changes to "Close menu" when open', () => {
    render(<Header />)
    const openButton = screen.getByRole('button', { name: /open menu/i })
    fireEvent.click(openButton)
    // Both the header toggle and the sidebar X button carry aria-label="Close menu"
    const closeButtons = screen.getAllByRole('button', { name: /close menu/i })
    expect(closeButtons.length).toBeGreaterThanOrEqual(1)
  })

  it('closes the sidebar when the X button inside the sidebar is clicked', () => {
    render(<Header />)
    // Open first
    fireEvent.click(screen.getByRole('button', { name: /open menu/i }))
    const aside = screen.getByRole('complementary')
    expect(aside.className).toContain('translate-x-0')

    // Close via the X button inside sidebar (aria-label="Close menu")
    const closeButtons = screen.getAllByRole('button', { name: /close menu/i })
    fireEvent.click(closeButtons[0])
    expect(aside.className).toContain('-translate-x-full')
  })

  it('renders all navigation links', () => {
    render(<Header />)
    expect(screen.getByText('Home')).toBeInTheDocument()
    expect(screen.getByText('Token Calculator')).toBeInTheDocument()
    expect(screen.getByText('NBA Prompts')).toBeInTheDocument()
    expect(screen.getByText('NFL Prompts')).toBeInTheDocument()
    expect(screen.getByText('NCAA Prompts')).toBeInTheDocument()
  })

  it('navigation links point to correct routes', () => {
    render(<Header />)
    expect(screen.getByText('Home').closest('a')).toHaveAttribute('href', '/')
    expect(screen.getByText('Token Calculator').closest('a')).toHaveAttribute('href', '/calculator')
    expect(screen.getByText('NBA Prompts').closest('a')).toHaveAttribute('href', '/nba-prompts')
    expect(screen.getByText('NFL Prompts').closest('a')).toHaveAttribute('href', '/nfl-prompts')
    expect(screen.getByText('NCAA Prompts').closest('a')).toHaveAttribute('href', '/ncaa-prompts')
  })

  it('clicking a nav link closes the sidebar', () => {
    render(<Header />)
    fireEvent.click(screen.getByRole('button', { name: /open menu/i }))
    const aside = screen.getByRole('complementary')
    expect(aside.className).toContain('translate-x-0')

    fireEvent.click(screen.getByText('Home'))
    expect(aside.className).toContain('-translate-x-full')
  })

  it('renders the Navigation heading inside the sidebar', () => {
    render(<Header />)
    expect(screen.getByText('Navigation')).toBeInTheDocument()
  })
})
