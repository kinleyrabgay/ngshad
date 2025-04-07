import { Command } from 'commander';
import * as fs from 'fs-extra';
import { NgShadConfig } from '../types';

const init = new Command('init');

init
  .description('Initialize NgShad in your project')
  .action(async (): Promise<void> => {
    try {
      // Create the configuration file
      const config: NgShadConfig = {
        componentsPath: 'src/components',
        prefix: 'ngshad',
        style: 'tailwind',
      };

      await fs.writeJSON('ngshad.config.json', config, { spaces: 2 });

      // Create the components directory
      await fs.ensureDir(config.componentsPath);

      console.log('✅ Created configuration file');
      console.log('✅ Created components directory');
      console.log('\nNext steps:');
      console.log('1. Install dependencies:');
      console.log('   npm install -D tailwindcss postcss autoprefixer');
      console.log('2. Add components:');
      console.log('   ngshad add button');
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('Error:', error.message);
      } else {
        console.error('An unknown error occurred');
      }
      process.exit(1);
    }
  });

export default init;
