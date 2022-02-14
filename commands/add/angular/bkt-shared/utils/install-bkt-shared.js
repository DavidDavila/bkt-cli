import { execSync } from 'child_process';
import spinner from '../../../../../utils/spinner.js';

export function installBktShared () {
  return new Promise( ( resolve, reject ) => {

    spinner.start( `Installing bkt-shared from npm. Please wait...` );
    execSync( `npm i lit lit-html @webcomponents/webcomponentsjs  bkt-shared -S` );
    spinner.stop();

    resolve();

  } );
};