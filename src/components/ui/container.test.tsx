import { describe, it, expect } from 'vitest';
import { render, screen } from '@/test/utils';
import Container from './container';

describe('Container', () => {
  it('renders children correctly', () => {
    render(
      <Container>
        <div>Test content</div>
      </Container>
    );

    expect(screen.getByText('Test content')).toBeInTheDocument();
  });

  it('applies default size classes', () => {
    const { container } = render(
      <Container>
        <div>Test content</div>
      </Container>
    );

    const containerElement = container.firstChild;
    expect(containerElement).toHaveClass('max-w-7xl', 'mx-auto', 'px-6');
  });

  it('applies custom size classes', () => {
    const { container } = render(
      <Container size="sm">
        <div>Test content</div>
      </Container>
    );

    const containerElement = container.firstChild;
    expect(containerElement).toHaveClass('max-w-2xl');
  });

  it('applies custom className', () => {
    const { container } = render(
      <Container className="custom-class">
        <div>Test content</div>
      </Container>
    );

    const containerElement = container.firstChild;
    expect(containerElement).toHaveClass('custom-class');
  });

  it('renders with all size variants', () => {
    const sizes = ['sm', 'md', 'lg', 'xl'] as const;
    const expectedClasses = ['max-w-2xl', 'max-w-4xl', 'max-w-6xl', 'max-w-7xl'];

    sizes.forEach((size, index) => {
      const { container } = render(
        <Container size={size}>
          <div>Test</div>
        </Container>
      );

      expect(container.firstChild).toHaveClass(expectedClasses[index]);
    });
  });
});
