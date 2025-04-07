import { Command } from 'commander';
import * as fs from 'fs-extra';
import * as path from 'path';
import { execSync } from 'child_process';
import { NgShadConfig } from '../types';

const add = new Command('add');

add
  .argument('<component>', 'Component to add')
  .description('Add a NgShad component to your project')
  .action(async (component: string): Promise<void> => {
    try {
      // Read the configuration file
      const config = await fs.readJSON('ngshad.config.json') as NgShadConfig;
      const componentPath = config.componentsPath || 'src/components';

      // Create a temporary directory
      const tempDir = path.join(process.cwd(), '.ngshad-temp');
      await fs.ensureDir(tempDir);

      try {
        // Download the specific component files
        console.log(`📦 Downloading ${component} component...`);
        execSync(`npm pack @ngshad/components --pack-destination ${tempDir}`, { stdio: 'ignore' });
        
        // Get the downloaded tarball name
        const tarball = fs.readdirSync(tempDir).find(file => file.startsWith('ngshad-components-'));
        if (!tarball) {
          throw new Error('Could not find component package');
        }

        // Extract only the component files we need
        execSync(`tar -xzf ${path.join(tempDir, tarball)} -C ${tempDir} package/src/${component}`, { stdio: 'ignore' });

        // Check if component exists in the package
        const componentDir = path.join(tempDir, 'package/src', component);
        if (!await fs.pathExists(componentDir)) {
          throw new Error(`Component "${component}" not found in the package`);
        }

        // Target path in user's project
        const targetDir = path.join(process.cwd(), componentPath, component);
        await fs.ensureDir(targetDir);

        // Copy component files
        await fs.copy(componentDir, targetDir);

        // Create index.ts file
        const indexContent = `export * from './${component}.component';\n`;
        await fs.writeFile(path.join(targetDir, 'index.ts'), indexContent);

        console.log(`✅ Added ${component} component to ${componentPath}/${component}`);
      } finally {
        // Clean up temporary directory
        await fs.remove(tempDir);
      }
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
