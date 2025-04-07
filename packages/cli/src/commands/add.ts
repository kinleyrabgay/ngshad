import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs';
import { join, resolve } from 'path';
import { NgShadConfig } from './init';

const AVAILABLE_COMPONENTS = ['button', 'card', 'input', 'select'];

export async function add(component: string) {
  try {
    // Validate component
    if (!AVAILABLE_COMPONENTS.includes(component)) {
      console.log('Available components:');
      AVAILABLE_COMPONENTS.forEach(c => console.log(`  ${c}`));
      throw new Error(`Component '${component}' is not available.`);
    }

    // Load config
    const configPath = join(process.cwd(), 'ngshad.config.json');
    if (!existsSync(configPath)) {
      throw new Error('NgShad config not found. Run `ngshad init` first.');
    }

    const config: NgShadConfig = JSON.parse(readFileSync(configPath, 'utf8'));

    // Find component file
    const libraryRoot = resolve(__dirname, '../../../components/src');
    const componentFile = join(libraryRoot, component, `${component}.component.ts`);

    if (!existsSync(componentFile)) {
      throw new Error(`Component '${component}' not found.`);
    }

    // Create target directory
    const targetDir = join(process.cwd(), config.componentsPath, component);
    if (!existsSync(targetDir)) {
      mkdirSync(targetDir, { recursive: true });
    }

    // Copy component
    let content = readFileSync(componentFile, 'utf8');
    content = content.replace(/ngshad-/g, `${config.prefix}-`);
    
    writeFileSync(join(targetDir, `${component}.component.ts`), content);
    console.log(`✓ Added ${component} component`);
    
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error:', error.message);
    } else {
      console.error('An unknown error occurred');
    }
    process.exit(1);
  }
} 