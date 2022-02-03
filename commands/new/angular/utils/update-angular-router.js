import { readFileSync } from 'fs';
import { writeLocalFile } from '../../../../utils/files.js';

export function updateAngularRouter ( routingComponentPath, routes, imports ) {
  return new Promise( async ( resolve, reject ) => {
    const path = './';
    const routingModule = readFileSync( routingComponentPath, { encoding: 'utf8', flag: 'r' } );

    let routingModuleFile = routingModule.replace( 'const routes: Routes = [];', routes );
    if ( imports ) routingModuleFile = imports + routingModuleFile;
    await writeLocalFile( routingComponentPath, routingModuleFile, { encoding: 'utf8', flag: 'r' } );

    resolve();

  } );
}