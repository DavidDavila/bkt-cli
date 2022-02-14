import { exec } from 'child_process';
import spinner from '../../../../utils/spinner.js';

export function createAngularProject ( name ) {
  return new Promise( async ( resolve, reject ) => {


    spinner.start( `Creating ${name}´s project. Please wait...` );
    exec( `ng new ${name} --style=scss --routing`, ( err, stdout, stderr ) => {
      spinner.stop();
      err ? reject() : resolve( name );
    } );
  } );
};