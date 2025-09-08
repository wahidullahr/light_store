import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@/test/utils';
import LocaleSwitcher from '../locale-switcher';

// Mock next/navigation
const mockPush = vi.fn();
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
  usePathname: () => '/nb/products',
}));

describe('LocaleSwitcher', () => {
  beforeEach(() => {
    mockPush.mockClear();
  });

  it('renders the label correctly', () => {
    render(<LocaleSwitcher label="Switch Language" />);
    
    expect(screen.getByText('Switch Language')).toBeInTheDocument();
  });

  it('renders with globe icon', () => {
    render(<LocaleSwitcher label="English" />);
    
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
  });

  it('has proper accessibility attributes', () => {
    render(<LocaleSwitcher label="English" />);
    
    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('aria-label');
  });

  it('calls router.push when clicked', () => {
    render(<LocaleSwitcher label="English" />);
    
    const button = screen.getByRole('button');
    fireEvent.click(button);
    
    expect(mockPush).toHaveBeenCalledWith('/en/products');
  });

  it('toggles between locales correctly', () => {
    // Mock Norwegian locale
    vi.mocked(vi.importActual('next-intl')).useLocale = () => 'nb';
    
    render(<LocaleSwitcher label="English" />);
    
    const button = screen.getByRole('button');
    fireEvent.click(button);
    
    expect(mockPush).toHaveBeenCalledWith('/en/products');
  });

  it('applies hover styles with proper classes', () => {
    render(<LocaleSwitcher label="English" />);
    
    const button = screen.getByRole('button');
    expect(button).toHaveClass(
      'text-[#F6F3EC]',
      'hover:text-[#FFB703]',
      'hover:bg-[#FFB703]/10'
    );
  });
});