# NgShad UI

A collection of reusable Angular components, inspired by [shadcn/ui](https://ui.shadcn.com/). Built with Tailwind CSS and modern Angular practices.

## Features

- 🎨 Modern, minimal design
- ⚡ Lightweight and performant
- 🛠️ Easy to customize
- 📦 Simple installation
- 🔧 Zero external dependencies
- ♿ Accessible components

## Quick Start

```bash
# Install the CLI
npm install -g @ngshad/cli

# Go to your Angular project
cd my-angular-app

# Initialize NgShad
ngshad init

# Install required dependencies
npm install -D tailwindcss postcss autoprefixer

# Add your first component
ngshad add button
```

## Usage

```typescript
import { ButtonComponent } from './components/button';

@Component({
  // ...
  imports: [ButtonComponent],
  template: `
    <ngshad-button variant="primary">Click me</ngshad-button>
  `
})
```

## Available Components

- `button` - Flexible button component with multiple variants
- More components coming soon!

## Component Variants

### Button
```html
<!-- Default -->
<ngshad-button>Default</ngshad-button>

<!-- Primary -->
<ngshad-button variant="primary">Primary</ngshad-button>

<!-- Secondary -->
<ngshad-button variant="secondary">Secondary</ngshad-button>

<!-- Destructive -->
<ngshad-button variant="destructive">Destructive</ngshad-button>

<!-- Ghost -->
<ngshad-button variant="ghost">Ghost</ngshad-button>

<!-- Link -->
<ngshad-button variant="link">Link</ngshad-button>
```

## Development

```bash
# Clone the repository
git clone https://github.com/yourusername/ngshad.git
cd ngshad

# Install dependencies
npm install

# Build the project
npm run build

# Link for local development
cd packages/cli && npm link
```

## Project Structure

```
ngshad/
├── packages/
│   ├── cli/              # CLI tool for adding components
│   │   ├── src/
│   │   └── package.json
│   └── components/       # Component library
│       ├── src/
│       └── package.json
├── README.md
└── package.json
```

## License

MIT - See [LICENSE](LICENSE) for details