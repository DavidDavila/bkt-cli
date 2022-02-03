import { exec } from 'child_process';
import { askFor } from './inquirer-angular-cli.js';

export function createAngularProject () {
  return new Promise( async ( resolve, reject ) => {
    const name = await askFor( 'name', 'What is the name of the project?', 'input', [] );
    console.log( `Creating ${name}´s project. Please wait...` );
    exec( `ng new ${name} --style=scss --routing`, ( err, stdout, stderr ) => {
      err ? reject() : resolve( name );
    } );
  } );
};