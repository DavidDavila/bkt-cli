import { updateAngularRouter } from '../../utils/update-angular-router.js';

export async function updateRemoteAppRouter ( projectName, remoteModuleName ) {
  return new Promise( async ( resolve, reject ) => {

    const routingComponentPath = process.cwd() + `/${projectName}/src/app/app-routing.module.ts`;

    const moduleName = remoteModuleName.charAt( 0 ).toUpperCase() + remoteModuleName.slice( 1 ) + 'Module';

    const newRoute = `
      const routes: Routes = [
        {
          path:'',
          loadChildren: () => import('./${remoteModuleName}/${remoteModuleName}.module').then(m => m.${moduleName})
        }
      ];`;

    await updateAngularRouter( routingComponentPath, newRoute );
    resolve();
  } );
}