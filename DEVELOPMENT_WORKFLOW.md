# Development Workflow & Best Practices

This document outlines the development workflow and best practices for the Tindra Light Store project.

## Development Workflow

### Standard Development Process

1. **Make Changes Locally**
   - Edit files in the project
   - Test changes locally using `npm run dev`
   - Verify changes work as expected

2. **Pre-Commit Checks**
   - Run linting: `npm run lint`
   - Run type checking: `npm run build` (catches TypeScript errors)
   - Fix any errors before committing

3. **Commit Changes**
   - Stage changes: `git add .`
   - Commit with descriptive message: `git commit -m "Description of changes"`
   - Push to GitHub: `git push origin main`

4. **Automatic Deployment**
   - Vercel automatically detects GitHub pushes
   - Builds and deploys to production
   - Updates live site at `huslampe.no` within 1-3 minutes

## Best Practices

### Code Quality

- **Simple & Straightforward**: Avoid over-engineering. Prefer simple, clear solutions.
- **Modular Code**: Keep components under 150-200 lines. Refactor if longer.
- **SOLID Principles**: Follow SOLID principles for maintainable code.
- **Reusability**: Check existing codebase before creating new components/functions.
- **Clean Code**: Write clean, well-structured, easy-to-understand code.

### Testing & Validation

- **Test Locally First**: Always run `npm run dev` and test changes before committing.
- **Build Check**: Run `npm run build` to catch build errors early.
- **Lint Often**: Run `npm run lint` frequently to catch code issues.
- **Type Check**: TypeScript compilation catches type errors during build.

### Git Workflow

- **Commit Often**: Make small, focused commits rather than large batches.
- **Descriptive Messages**: Write clear, descriptive commit messages.
- **Follow .gitignore**: Ensure sensitive files and build artifacts are ignored.
- **Review Changes**: Review `git status` and `git diff` before committing.

### File Organization

- **SOLID Architecture**: Each interface in its own file, modules in folders with index files.
- **Follow Patterns**: Maintain consistency with existing codebase patterns.
- **Avoid Duplication**: Reuse existing code and functionality when possible.
- **Clean Structure**: Keep codebase organized and easy to navigate.

### Deployment

- **Automatic Deployment**: Vercel automatically deploys on push to `main` branch.
- **Monitor Deployments**: Check Vercel dashboard for deployment status.
- **Verify Live Site**: Test changes on production after deployment.
- **Environment Variables**: Update in Vercel dashboard if needed.

### Performance

- **Build Often**: Build frequently to catch issues early.
- **Optimize Images**: Use Next.js Image component for optimized images.
- **Code Splitting**: Leverage Next.js automatic code splitting.
- **Performance Monitoring**: Monitor build times and bundle sizes.

## Common Commands

### Development

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Run linter
npm run lint

# Type check
npm run build  # TypeScript errors shown during build
```

### Git

```bash
# Check status
git status

# Stage changes
git add .

# Commit changes
git commit -m "Description of changes"

# Push to GitHub
git push origin main
```

### Deployment

- Automatic via Vercel on push to `main`
- Manual deployment: `vercel --prod` (if needed)

## File Structure Reference

### Key Directories

- `src/app/[locale]/` - Page components (home, products, contact, about)
- `src/components/` - Reusable components
- `src/components/sections/` - Page sections (hero, craft, testimonials, etc.)
- `src/lib/` - Utility functions and configurations
- `content/` - Content files (translations, product data)
- `public/` - Static assets (images, files)

### Important Files

- `next.config.ts` - Next.js configuration
- `vercel.json` - Vercel deployment configuration
- `package.json` - Dependencies and scripts
- `tsconfig.json` - TypeScript configuration
- `.gitignore` - Git ignore patterns

## Code Standards

### TypeScript

- Use TypeScript for type safety
- Define proper interfaces and types
- Avoid `any` types when possible

### React/Next.js

- Use functional components with hooks
- Follow Next.js 15 App Router patterns
- Use Server Components by default, Client Components when needed
- Properly handle async params in Next.js 15

### Styling

- Use Tailwind CSS for styling
- Follow existing design patterns
- Maintain responsive design
- Keep styles consistent across components

### Internationalization

- Use next-intl for translations
- Maintain both Norwegian (nb) and English (en) content
- Update content files in `content/` directory

## Pre-Commit Checklist

Before committing changes:

- [ ] Code tested locally with `npm run dev`
- [ ] Linting passes: `npm run lint`
- [ ] Build succeeds: `npm run build`
- [ ] No TypeScript errors
- [ ] Changes are focused and well-documented
- [ ] Commit message is descriptive
- [ ] No sensitive data in commits
- [ ] Follows existing code patterns

## Troubleshooting

### Build Errors

- Check TypeScript errors: `npm run build`
- Verify all imports are correct
- Check for missing dependencies

### Linting Errors

- Run `npm run lint` to see all issues
- Fix errors before committing
- Use auto-fix when possible: `npm run lint -- --fix`

### Deployment Issues

- Check Vercel dashboard for build logs
- Verify environment variables are set
- Check for build-time errors in logs

## Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Vercel Documentation](https://vercel.com/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)
