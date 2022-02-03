#!/usr/bin/env node


import { errorPrompt } from './commands/error.js';
import { dataTree } from './data-tree/data-tree.js';
import { banner } from './utils/banner.js';

( () => {
  banner( 'Bankinter-cli' );
  const args = process.argv.slice( 2 );
  const [command, framework, type] = args;
  try
  {
    dataTree[command][framework][type]();
  } catch ( error )
  {
    errorPrompt( command, framework, type );
  }

} )();
