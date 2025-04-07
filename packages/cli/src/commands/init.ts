import { existsSync, mkdirSync, writeFileSync } from 'fs';
import { join } from 'path';

export interface NgShadConfig {
  componentsPath: string;
  prefix: string;
}

const defaultConfig: NgShadConfig = {
  componentsPath: './src/components',
  prefix: 'ngshad'
};

const tailwindConfig = `/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{html,ts}',
  ],
  theme: {
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
    },
  },
  plugins: [],
}`;

const globalCss = `@tailwind base;
@tailwind components;
@tailwind utilities;
 
@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 222.2 84% 4.9%;
    --primary: 222.2 47.4% 11.2%;
    --primary-foreground: 210 40% 98%;
    --secondary: 210 40% 96.1%;
    --secondary-foreground: 222.2 47.4% 11.2%;
    --muted: 210 40% 96.1%;
    --muted-foreground: 215.4 16.3% 46.9%;
    --accent: 210 40% 96.1%;
    --accent-foreground: 222.2 47.4% 11.2%;
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 210 40% 98%;
    --border: 214.3 31.8% 91.4%;
    --input: 214.3 31.8% 91.4%;
    --ring: 222.2 84% 4.9%;
    --radius: 0.5rem;
  }
}
 
@layer base {
  * {
    @apply border-border;
  }
  body {
    @apply bg-background text-foreground;
  }
}`;

export async function init() {
  const cwd = process.cwd();
  
  // Create components directory
  const componentsPath = join(cwd, defaultConfig.componentsPath);
  if (!existsSync(componentsPath)) {
    mkdirSync(componentsPath, { recursive: true });
    console.log(`✓ Created components directory`);
  }

  // Create config file
  const configPath = join(cwd, 'ngshad.config.json');
  writeFileSync(configPath, JSON.stringify(defaultConfig, null, 2));
  console.log('✓ Created configuration file');

  // Create styles directory and add global CSS
  const stylesPath = join(cwd, 'src/styles');
  if (!existsSync(stylesPath)) {
    mkdirSync(stylesPath, { recursive: true });
  }
  writeFileSync(join(stylesPath, 'globals.css'), globalCss);
  console.log('✓ Added global styles');

  // Create Tailwind config
  writeFileSync(join(cwd, 'tailwind.config.js'), tailwindConfig);
  console.log('✓ Created Tailwind configuration');

  console.log('\n✓ NgShad UI is ready!');
  console.log('\nNext steps:');
  console.log('1. Install dependencies:');
  console.log('   npm install -D tailwindcss postcss autoprefixer');
  console.log('2. Import styles in your app:');
  console.log('   import "./styles/globals.css";');
  console.log('3. Add your first component:');
  console.log('   ngshad add button');
}