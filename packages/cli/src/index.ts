#!/usr/bin/env node
import { Command } from 'commander';
import add from './commands/add';
import init from './commands/init';
import { version } from '../package.json';

const program = new Command();

program.name('ngshad').description('CLI for managing NgShad UI components').version(version);

program.addCommand(init);
program.addCommand(add);

program.parse();
