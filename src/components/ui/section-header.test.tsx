import { describe, it, expect } from 'vitest';
import { render, screen } from '@/test/utils';
import SectionHeader from './section-header';

describe('SectionHeader', () => {
  it('renders title correctly', () => {
    render(<SectionHeader title="Test Title" />);

    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('Test Title');
  });

  it('renders subtitle when provided', () => {
    render(<SectionHeader title="Test Title" subtitle="Test subtitle" />);

    expect(screen.getByText('Test subtitle')).toBeInTheDocument();
  });

  it('does not render subtitle when not provided', () => {
    render(<SectionHeader title="Test Title" />);

    expect(screen.queryByText('Test subtitle')).not.toBeInTheDocument();
  });

  it('applies default center alignment', () => {
    const { container } = render(<SectionHeader title="Test Title" />);

    const headerElement = container.firstChild;
    expect(headerElement).toHaveClass('text-center');
  });

  it('applies left alignment when specified', () => {
    const { container } = render(<SectionHeader title="Test Title" align="left" />);

    const headerElement = container.firstChild;
    expect(headerElement).toHaveClass('text-left');
  });

  it('applies right alignment when specified', () => {
    const { container } = render(<SectionHeader title="Test Title" align="right" />);

    const headerElement = container.firstChild;
    expect(headerElement).toHaveClass('text-right');
  });

  it('applies custom className', () => {
    const { container } = render(<SectionHeader title="Test Title" className="custom-class" />);

    const headerElement = container.firstChild;
    expect(headerElement).toHaveClass('custom-class');
  });

  it('renders with proper semantic structure', () => {
    render(<SectionHeader title="Main Title" subtitle="Descriptive subtitle" />);

    const header = screen.getByRole('banner');
    const heading = screen.getByRole('heading', { level: 2 });
    const subtitle = screen.getByText('Descriptive subtitle');

    expect(header).toContainElement(heading);
    expect(header).toContainElement(subtitle);
  });
});
