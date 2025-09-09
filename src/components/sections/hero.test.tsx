import { describe, it, expect } from 'vitest';
import { render, screen } from '@/test/utils';
import Hero from './hero';

const mockImage = {
  src: 'https://example.com/hero-image.jpg',
  alt: 'Beautiful wooden lamp',
  width: 2000,
  height: 1333,
};

describe('Hero', () => {
  it('renders hero title', () => {
    render(<Hero image={mockImage} />);

    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
  });

  it('renders hero image with correct attributes', () => {
    render(<Hero image={mockImage} />);

    const image = screen.getByRole('img');
    expect(image).toHaveAttribute('src', mockImage.src);
    expect(image).toHaveAttribute('alt', mockImage.alt);
  });

  it('renders call-to-action buttons', () => {
    render(<Hero image={mockImage} />);

    const buttons = screen.getAllByRole('link');
    expect(buttons).toHaveLength(2);

    // Check if CTA links have correct hrefs
    expect(buttons[0]).toHaveAttribute('href', '#bestill');
    expect(buttons[1]).toHaveAttribute('href', '#produkter');
  });

  it('has proper semantic structure', () => {
    render(<Hero image={mockImage} />);

    const header = screen.getByRole('banner');
    // Remove the section test as it's not a proper role in this context
    const navigation = screen.getByRole('navigation');
    const figure = screen.getByRole('img').closest('figure');

    expect(header).toBeInTheDocument();
    expect(navigation).toBeInTheDocument();
    expect(figure).toBeInTheDocument();
  });

  it('includes accessibility attributes', () => {
    render(<Hero image={mockImage} />);

    const header = screen.getByRole('banner');
    expect(header).toHaveAttribute('aria-label');
    expect(header).toHaveAttribute('id', 'home');
  });

  it('renders with proper styling classes', () => {
    render(<Hero image={mockImage} />);

    const header = screen.getByRole('banner');
    expect(header).toHaveClass('relative', 'isolate', 'bg-[#0B0B0B]');
  });

  it('renders figcaption for screen readers', () => {
    render(<Hero image={mockImage} />);

    const figcaption = screen.getByText(mockImage.alt);
    expect(figcaption).toHaveClass('sr-only');
  });

  it('includes decorative floating particles', () => {
    const { container } = render(<Hero image={mockImage} />);

    const particles = container.querySelectorAll('.animate-pulse');
    expect(particles.length).toBeGreaterThan(0);
  });
});
