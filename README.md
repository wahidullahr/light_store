# 🏔️ Nordlys Trelys - Premium Nordic Wooden Lights

A stunning, high-performance bilingual landing page showcasing handcrafted wooden lights with warm Nordic design.

## ✨ Features

### 🎨 **Design & User Experience**

- **Premium Nordic Aesthetic** - Dark canvas with warm whites and amber accents
- **Bilingual Support** - Norwegian (default) and English with seamless switching
- **Responsive Design** - Optimized for all devices from mobile to desktop
- **Smooth Animations** - Framer Motion with staggered reveals and micro-interactions
- **Interactive Gallery** - Lightbox with keyboard navigation
- **Accessibility First** - WCAG 2.2 AA compliant with semantic HTML

### ⚡ **Performance & Technical**

- **Next.js 15** with App Router and TypeScript
- **Tailwind CSS v4** with custom design tokens
- **Server-Side Rendering** with optimized images
- **Core Web Vitals** optimized for 95+ Lighthouse scores
- **SEO Optimized** with structured data and meta tags

### 🔧 **Developer Experience**

- **TypeScript** strict mode with comprehensive types
- **ESLint + Prettier** for code quality
- **Vitest** for unit testing
- **Playwright** for E2E and accessibility testing
- **GitHub Actions** CI/CD with automated testing
- **Husky** pre-commit hooks

## 🚀 Quick Start

### Prerequisites

- Node.js 20+
- npm 9+

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd light_store

# Install dependencies
npm install

# Start development server
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to see the application.

## 📁 Project Structure

```
├── .github/workflows/     # GitHub Actions CI/CD
├── .vscode/              # VSCode workspace settings
├── content/              # Bilingual content (NO/EN)
│   ├── nb/              # Norwegian content
│   ├── en/              # English content
│   └── images.json      # Shared image configurations
├── public/              # Static assets
├── src/
│   ├── app/            # Next.js App Router pages
│   │   ├── [locale]/   # Localized routes
│   │   ├── globals.css # Global styles
│   │   └── sitemap.ts  # SEO sitemap
│   ├── components/     # React components
│   │   ├── sections/   # Page sections
│   │   └── ui/        # Reusable UI components
│   ├── lib/           # Utilities and configurations
│   └── test/          # Test utilities and setup
├── tests/             # E2E tests (Playwright)
└── README.md
```

## 🎯 Available Scripts

### Development

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run lint:fix     # Fix ESLint issues
```

### Testing

```bash
npm run test              # Run unit tests
npm run test:ui           # Run tests with UI
npm run test:coverage     # Run tests with coverage
npm run test:e2e          # Run E2E tests
npm run test:e2e:ui       # Run E2E tests with UI
npm run test:e2e:headed   # Run E2E tests in headed mode
```

### Code Quality

```bash
npm run format           # Format code with Prettier
npm run format:check     # Check code formatting
npm run type-check       # Run TypeScript type checking
```

## 🌍 Internationalization

The application supports Norwegian (nb) and English (en) with:

- **Dynamic routing**: `/nb` and `/en` routes
- **Content management**: JSON files in `content/[locale]/`
- **Type-safe translations**: Full TypeScript support
- **SEO optimization**: Localized meta tags and structured data

### Adding New Content

1. Update JSON files in `content/nb/` and `content/en/`
2. Add corresponding TypeScript interfaces in `src/lib/types.ts`
3. Components automatically consume localized content

## 🧪 Testing Strategy

### Unit Tests (Vitest)

- Component rendering and behavior
- Utility functions
- Type safety validation
- 70%+ coverage requirement

### E2E Tests (Playwright)

- Cross-browser compatibility
- User journey validation
- Accessibility compliance (axe-core)
- Performance monitoring

### Visual Regression

- Consistent design across devices
- Animation integrity
- Layout stability

## 🔧 Configuration

### Environment Variables

```bash
# .env.local
NEXT_PUBLIC_SITE_URL=https://your-domain.com
GOOGLE_SITE_VERIFICATION=your-verification-code
PLAUSIBLE_DOMAIN=your-domain.com  # Optional analytics
```

### Deployment (Vercel)

1. Connect repository to Vercel
2. Configure environment variables
3. Deploy automatically on push to `main`

## 📈 Performance Targets

- **Lighthouse Performance**: ≥95
- **First Contentful Paint**: <2.5s
- **Largest Contentful Paint**: <4.0s
- **Cumulative Layout Shift**: <0.1
- **Total Blocking Time**: <500ms

## ♿ Accessibility

- **WCAG 2.2 AA** compliant
- **Screen reader** optimized
- **Keyboard navigation** support
- **Color contrast** ratios maintained
- **Focus management** for interactions

## 🎨 Design System

### Colors

- **Canvas**: `#0B0B0B` (Dark background)
- **Warm White**: `#F6F3EC` (Primary text)
- **Amber**: `#FFB703` (Accent/CTA)
- **Slate variants**: Supporting grays

### Typography

- **Display**: Fraunces (headings)
- **Body**: Inter (content)
- **Scale**: Responsive with proper line heights

### Spacing

- **Container**: Max 1280px with responsive padding
- **Sections**: Consistent vertical rhythm
- **Grid**: 12-column responsive grid

## 🛠️ Development Guidelines

### Code Style

- **TypeScript**: Strict mode, no `any` types
- **Components**: Small, typed, single responsibility
- **Imports**: Absolute paths with `@/` alias
- **CSS**: Tailwind only, no inline styles

### Git Workflow

1. Create feature branch from `develop`
2. Implement changes with tests
3. Run pre-commit hooks (automatic)
4. Create pull request to `develop`
5. Merge to `main` triggers deployment

### Adding Components

1. Create in appropriate `components/` subdirectory
2. Add TypeScript interfaces with `I` prefix
3. Include unit tests
4. Document props and usage
5. Export from index file

## 📦 Dependencies

### Core

- **Next.js 15**: React framework with App Router
- **React 19**: UI library
- **TypeScript**: Type safety
- **Tailwind CSS**: Utility-first styling

### Features

- **next-intl**: Internationalization
- **Framer Motion**: Animations
- **Lucide React**: Icons
- **Radix UI**: Accessible primitives

### Development

- **Vitest**: Unit testing
- **Playwright**: E2E testing
- **ESLint**: Code linting
- **Prettier**: Code formatting
- **Husky**: Git hooks

## 🚨 Troubleshooting

### Build Issues

```bash
# Clear Next.js cache
rm -rf .next

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

### Test Failures

```bash
# Update Playwright browsers
npx playwright install

# Run tests in debug mode
npm run test:e2e:headed
```

### Type Errors

```bash
# Check TypeScript configuration
npm run type-check

# Verify import paths
# Ensure all interfaces are properly exported
```

## 📄 License

This project is proprietary and confidential.

## 🤝 Contributing

1. Follow the established code style
2. Add tests for new features
3. Update documentation
4. Ensure accessibility compliance
5. Test across different browsers and devices

---

**Built with ❤️ for premium Nordic craftsmanship**
