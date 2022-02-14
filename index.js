#!/usr/bin/env node


import { errorPrompt } from './commands/error.js';
import { dataTree } from './data-tree/data-tree.js';
import { banner } from './utils/banner.js';

( () => {
  banner( 'Bkt-cli' );
  const args = process.argv.slice( 2 );
  const [command, framework, type] = args;
  try
  {
    if ( typeof dataTree[command] === 'function' ) 
    {
      typeof dataTree[command]();
    } else if ( typeof dataTree[command][framework] === 'function' )
    {
      dataTree[command][framework]();
    } else if ( typeof dataTree[command][framework][type] === 'function' )
    {
      typeof dataTree[command][framework][type]();
    } else
    {
      errorPrompt( command, framework, type );
    }
  } catch ( error )
  {
    errorPrompt( command, framework, type );
  }
}
)();