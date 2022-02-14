import { exec } from 'child_process';
import spinner from '../../../../utils/spinner.js';

export function addModuleFederation ( projectName, port ) {
  return new Promise( async ( resolve, reject ) => {

    spinner.start( `Creating webpack module federation for: ${projectName}...`, 'green' );

    exec( `cd ${projectName} && ng add @angular-architects/module-federation --project ${projectName} --port ${port} --skip-confirmation`, ( err, stdout, stderr ) => {
      spinner.stop();
      err ? reject() : resolve();
    } );
  } );
}