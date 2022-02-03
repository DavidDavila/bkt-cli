import { exec } from 'child_process';
import { askFor } from './inquirer-angular-cli.js';
export const MINIMUM_VERSION_ANGULAR_CLI = 12;

export function installAngularCli () {
  return new Promise( ( resolve, reject ) => {
    console.log( 'Installing @angular/cli...' );
    exec( 'npm -g i @angular/cli', ( err, stdout, stderr ) => {
      err ? reject() : resolve( Number( stdout.match( /\d+.\d+.\d+/ )[0].split( '.' )[0] ) );
    } );
  } );
}

export function updateAngularCli () {
  return new Promise( ( resolve, reject ) => {
    console.log( 'Updating @angular/cli...' );
    exec( 'ng update', ( err, stdout, stderr ) => {
      resolve();
    } );
  } );
}

export function checkAngularCliVersion ( stdout ) {
  return new Promise( ( resolve, reject ) => {
    console.log( 'Checking @angular/cli...' );
    exec( 'ng v', async ( err, stdout, stderr ) => {
      if ( err ) return reject( err );
      const version = Number( stdout.match( /Angular CLI: (\d+.\d+.\d+)/ )[1].split( '.' )[0] );
      return resolve( version );
    } );
  } );
}

export function checkInstallUpdateAngularCli () {
  return new Promise( async ( resolve, reject ) => {
    let version;
    try
    {
      version = await checkAngularCliVersion();
    } catch ( error )
    {
      const msg = '@angular/cli not detected. Do you want to install?';
      const install = await askFor( 'install', msg, 'list', ['Yes', 'No'] );
      switch ( install ) 
      {
        case 'Yes':
          version = await installAngularCli();
          break;
        default:
          reject( 'User Aborted' );
      }
    }
    if ( version < MINIMUM_VERSION_ANGULAR_CLI )
    {
      const msg = 'Your version of @angular/cli is not compatible with microfrontends. Do you want to update it?';
      const update = await askFor( 'update', msg, 'list', ['Yes', 'No'] );
      switch ( update ) 
      {
        case 'Yes':
          version = await updateAngularCli();
          break;
        default:
          reject( 'User Aborted' );
      }
    }
    resolve();
  } );
}
