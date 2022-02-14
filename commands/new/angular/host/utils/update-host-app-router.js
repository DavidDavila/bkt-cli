
import { exec } from 'child_process';
import { askFor } from '../../../../../utils/ask-for.js';
import { updateAngularRouter } from '../../utils/update-angular-router.js';

export async function updateHostAppRouter ( projectName ) {
  return new Promise( async ( resolve, reject ) => {

    await createHomeShellComponent( projectName );

    const routingComponentPath = process.cwd() + `/${projectName}/src/app/app-routing.module.ts`;


    let url = await askFor( 'url', 'Which is the URL and PORT of the remote app? (e.g: http://localhost:4200/)', 'input', [] );
    url = /\/$/.test( url ) ? url : url + '/';

    let remoteModuleName = await askFor( 'remoteModuleName', 'What is the name of the shared angular module? (e.g: SharedModule)', 'input', [] );

    const newRoute = `
      const routes: Routes = [
        {path: '', component:HomeComponent},
        {
          path: '${remoteModuleName}',
          loadChildren: () =>
            loadRemoteModule({
              type: 'module',
              remoteEntry: '${url}remoteEntry.js',
              exposedModule: './Module'
            })
              .then(m => m.${remoteModuleName})
        },
      ];`;

    await updateAngularRouter( routingComponentPath, newRoute, `import {HomeComponent} from './home/home.component';import { loadRemoteModule } from '@angular-architects/module-federation';` );
    resolve( { url, remoteModuleName } );
  } );
}

const createHomeShellComponent = ( projectName ) => {
  return new Promise( ( resolve, reject ) => {
    const cmd = `cd ${projectName} && ng g c home --module=app`;
    exec( cmd, ( err, stdout, stderr ) => {
      err ? reject() : resolve();
    } );
  } );
};