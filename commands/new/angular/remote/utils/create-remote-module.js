import { exec } from 'child_process';
import { readFileSync } from 'fs';
import { askFor } from '../../../../../utils/ask-for.js';
import { writeLocalFile } from '../../../../../utils/files.js';

export function addRemoteModule ( projectName ) {
  return new Promise( async ( resolve, reject ) => {

    const moduleName = await askFor( 'moduleName', `It need a module to share.What is the name for this module?`, 'input', [] );
    console.log( `Creating ${moduleName}Module, a remote module for ${projectName}...` );

    await createModuleAndComponent( projectName, moduleName );

    const routingComponentPath = process.cwd() + `/${projectName}/src/app/${moduleName}/${moduleName}-routing.module.ts`;

    const routingModule = readFileSync( routingComponentPath, { encoding: 'utf8', flag: 'r' } );
    const componentName = moduleName.charAt( 0 ).toUpperCase() + moduleName.slice( 1 ) + 'Component';

    const importComponent = `import {${componentName}} from './${moduleName}.component'; `;
    let routingModuleFile = importComponent + routingModule.replace( 'const routes: Routes = [];', `const routes: Routes = [{path:'',component:${componentName}}];` );


    await writeLocalFile( routingComponentPath, routingModuleFile, { encoding: 'utf8', flag: 'r' } );
    resolve( moduleName );
  } );
}

export function createModuleAndComponent ( projectName, moduleName ) {
  return new Promise( ( resolve, reject ) => {
    const cmd = `cd ${projectName} && ng g m ${moduleName} --routing && ng g c ${moduleName} --module=${moduleName}`;
    exec( cmd, ( err, stdout, stderr ) => {
      err ? reject() : resolve();
    } );
  } );
}