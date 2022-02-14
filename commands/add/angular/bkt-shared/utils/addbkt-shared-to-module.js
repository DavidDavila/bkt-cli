import { readFileSync } from 'fs';
import { writeLocalFile } from '../../../../../utils/files.js';
import spinner from '../../../../../utils/spinner.js';

export function addBktSharedToAppModule ( componentName = 'app' ) {
  return new Promise( async ( resolve, reject ) => {

    spinner.start( `Adding bkt-shared to ${componentName}Module. Please wait...` );
    let appModulePath = process.cwd() + `/src/`;
    appModulePath += componentName === 'app' ? `${componentName}/${componentName}.module.ts` : `app/${componentName}/${componentName}.module.ts`;
    let appModule = readFileSync( appModulePath, { encoding: 'utf8', flag: 'r' } );
    appModule = appModule.replace( '@NgModule({', '@NgModule({schemas: [CUSTOM_ELEMENTS_SCHEMA],' );
    appModule = appModule.replace( "import { NgModule } from '@angular/core';", "import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';" );
    await writeLocalFile( appModulePath, appModule );
    spinner.stop();
    resolve();
  } );
};