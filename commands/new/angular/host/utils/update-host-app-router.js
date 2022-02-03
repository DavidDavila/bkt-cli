import { askFor } from '../../utils/inquirer-angular-cli.js';
import { updateAngularRouter } from '../../utils/update-angular-router.js';

export async function updateHostAppRouter ( projectName ) {
  return new Promise( async ( resolve, reject ) => {

    const routingComponentPath = process.cwd() + `/${projectName}/src/app/app-routing.module.ts`;


    let url = await askFor( 'url', 'Which is the URL and PORT of the remote app? (e.g: http://localhost:4200/)', 'input', [] );
    url = /\/$/.test( url ) ? url : url + '/';

    let remoteModuleName = await askFor( 'remoteModuleName', 'What is the name of the shared angular module? (e.g: SharedModule)', 'input', [] );

    const newRoute = `
      const routes: Routes = [
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

    await updateAngularRouter( routingComponentPath, newRoute, `import { loadRemoteModule } from '@angular-architects/module-federation';` );
    resolve( { url, remoteModuleName } );
  } );
}