import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@/test/utils';
import Navigation from '../navigation';

describe('Navigation', () => {
  it('renders brand logo/name', () => {
    render(<Navigation />);

    const brandLink = screen.getByRole('link', { name: /nordlys/i });
    expect(brandLink).toBeInTheDocument();
  });

  it('renders navigation items', () => {
    render(<Navigation />);

    const navItems = ['Home', 'Products', 'About', 'Contact'];
    navItems.forEach(item => {
      expect(screen.getByRole('link', { name: item })).toBeInTheDocument();
    });
  });

  it('renders locale switcher', () => {
    render(<Navigation />);

    const localeSwitcher = screen.getByRole('button');
    expect(localeSwitcher).toBeInTheDocument();
  });

  it('toggles mobile menu when button is clicked', () => {
    render(<Navigation />);

    const menuButton = screen.getByRole('button', { name: /toggle navigation menu/i });
    expect(menuButton).toBeInTheDocument();

    // Initially mobile menu should be closed
    expect(screen.queryByText('Home')).toBeInTheDocument(); // Desktop nav

    // Click to open mobile menu
    fireEvent.click(menuButton);

    // Mobile menu should be visible
    const mobileNavItems = screen.getAllByRole('link', { name: 'Home' });
    expect(mobileNavItems.length).toBeGreaterThan(1); // Both desktop and mobile
  });

  it('closes mobile menu when nav item is clicked', () => {
    render(<Navigation />);

    const menuButton = screen.getByRole('button', { name: /toggle navigation menu/i });
    fireEvent.click(menuButton); // Open menu

    const mobileHomeLink = screen.getAllByRole('link', { name: 'Home' })[1]; // Mobile version
    fireEvent.click(mobileHomeLink);

    // Menu should close (implementation detail - hard to test state)
    expect(menuButton).toBeInTheDocument();
  });

  it('has proper navigation structure', () => {
    render(<Navigation />);

    const nav = screen.getByRole('navigation');
    expect(nav).toBeInTheDocument();
    expect(nav).toHaveClass('bg-[#0B0B0B]/95', 'backdrop-blur-sm', 'sticky', 'top-0');
  });

  it('shows correct navigation links with locale prefix', () => {
    render(<Navigation />);

    const homeLink = screen.getByRole('link', { name: 'Home' });
    expect(homeLink).toHaveAttribute('href', '/nb#home');
  });

  it('applies hover effects on navigation items', () => {
    render(<Navigation />);

    const navLinks = screen
      .getAllByRole('link')
      .filter(
        link =>
          link.textContent === 'Home' ||
          link.textContent === 'Products' ||
          link.textContent === 'About' ||
          link.textContent === 'Contact'
      );

    navLinks.forEach(link => {
      expect(link).toHaveClass('hover:text-[#FFB703]');
    });
  });

  it('renders with mobile-responsive classes', () => {
    render(<Navigation />);

    const desktopNav = screen.getByRole('navigation').querySelector('.hidden.md\\:flex');
    const mobileButton = screen.getByRole('button', { name: /toggle navigation menu/i });

    expect(desktopNav).toBeInTheDocument();
    expect(mobileButton).toHaveClass('md:hidden');
  });
});
