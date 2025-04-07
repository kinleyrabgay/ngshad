import { Command } from 'commander';
import * as fs from 'fs-extra';
import * as path from 'path';
import { NgShadConfig } from '../types';

const AVAILABLE_COMPONENTS = ['button', 'card', 'input', 'select'];

const add = new Command('add');

add.argument('<component>', 'Component to add').action(async (component: string): Promise<void> => {
  try {
    // Validate component
    if (!AVAILABLE_COMPONENTS.includes(component)) {
      console.log('Available components:');
      AVAILABLE_COMPONENTS.forEach(c => console.log(`  ${c}`));
      throw new Error(`Component '${component}' is not available.`);
    }

    // Read the configuration file
    const config = (await fs.readJSON('ngshad.config.json')) as NgShadConfig;
    const componentPath = config.componentsPath || 'src/components';

    // Create the target directory if it doesn't exist
    const targetDir = path.join(process.cwd(), componentPath, component);
    await fs.ensureDir(targetDir);

    // Copy the component files
    const sourceDir = path.join(__dirname, '../../components', component);
    await fs.copy(sourceDir, targetDir);

    // Create an index.ts file for easy importing
    const indexContent = `export * from './${component}.component';\n`;
    await fs.writeFile(path.join(targetDir, 'index.ts'), indexContent);

    console.log(`✅ Added ${component} component to ${componentPath}/${component}`);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Error:', error.message);
    } else {
      console.error('An unknown error occurred');
    }
    process.exit(1);
  }
});

export default add;
