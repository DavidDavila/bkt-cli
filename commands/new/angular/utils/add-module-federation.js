import { exec } from 'child_process';
import { askFor } from '../utils/inquirer-angular-cli.js';

export function addModuleFederation ( projectName ) {
  return new Promise( async ( resolve, reject ) => {
    const port = await askFor( 'port', `In which port will be deployed ${projectName}?`, 'input', [] );
    console.log( `Creating webpack module federation for: ${projectName}...` );
    exec( `cd ${projectName} && ng add @angular-architects/module-federation --project ${projectName} --port ${port} --skip-confirmation`, ( err, stdout, stderr ) => {
      err ? reject() : resolve( port );
    } );
  } );
}