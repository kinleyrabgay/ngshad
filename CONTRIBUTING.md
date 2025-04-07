# Contributing to NgShad UI

Thank you for your interest in contributing to NgShad UI! This document provides guidelines and instructions for contributing.

## Development Setup

1. Fork and clone the repository:

```bash
git clone https://github.com/kinleyrabgay/ngshad.git
cd ngshad
```

2. Install dependencies:

```bash
npm install
```

3. Build the project:

```bash
npm run build
```

4. Link for local development:

```bash
cd packages/cli && npm link
```

## Project Structure

```
ngshad/
├── packages/
│   ├── cli/                    # CLI tool
│   │   ├── src/
│   │   │   ├── commands/       # CLI commands
│   │   │   └── index.ts        # CLI entry point
│   │   └── package.json
│   └── components/             # Component library
│       ├── src/
│       │   ├── button/         # Button component
│       │   └── [component]/    # Other components
│       └── package.json
├── README.md
└── package.json
```

## Adding a New Component

1. Create a new component directory:

```bash
mkdir packages/components/src/your-component
```

2. Create the component files:

```typescript
// your-component.component.ts
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ngshad-your-component',
  standalone: true,
  imports: [CommonModule],
  template: ` <!-- Your component template --> `,
})
export class YourComponent {
  // Your component logic
}
```

3. Follow these guidelines:

- Use Tailwind CSS for styling
- Make components standalone
- Add proper TypeScript types
- Follow Angular best practices
- Keep it simple and focused

## Commit Guidelines

We follow [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` New features
- `fix:` Bug fixes
- `docs:` Documentation changes
- `style:` Code style changes (formatting, etc)
- `refactor:` Code refactoring
- `test:` Adding or updating tests
- `chore:` Maintenance tasks

Example:

```bash
git commit -m "feat: add new button variant"
```

## Pull Request Process

1. Create a new branch:

```bash
git checkout -b feat/your-feature
```

2. Make your changes and commit them using conventional commits

3. Push to your fork and submit a pull request

4. Ensure your PR:
   - Has a clear title and description
   - Includes tests if applicable
   - Updates documentation if needed
   - Follows the existing code style
   - Has a clean commit history

## Development Guidelines

### Component Guidelines

- Keep components simple and focused
- Use TypeScript strictly
- Follow Angular style guide
- Write clear documentation
- Add proper types for all props
- Use Tailwind CSS for styling
- Make components customizable
- Ensure accessibility

### CLI Guidelines

- Keep commands simple
- Provide clear error messages
- Handle edge cases gracefully
- Add proper validation
- Keep dependencies minimal

## Need Help?

- Check existing issues and PRs
- Create a new issue for bugs or features
- Ask questions in discussions
- Follow the code of conduct

## License

By contributing, you agree that your contributions will be licensed under the MIT License.
