
import { addModuleFederation } from '../utils/add-module-federation.js';
import { checkInstallUpdateAngularCli } from '../utils/check-angular-cli.js';
import { createAngularProject } from '../utils/create-project.js';
import { updateAppTemplate } from '../utils/update-app-template.js';
import { APP_INITIAL_TEMPLATE } from './conf/conf.js';
import { updateHostAppRouter } from './utils/update-host-app-router.js';
import { updateHostWebpack } from './utils/update-host-webpack.js';



export async function newAngularHost () {
  await checkInstallUpdateAngularCli();
  const projectName = await createAngularProject();
  const port = await addModuleFederation( projectName );
  const { url, remoteModuleName } = await updateHostAppRouter( projectName );
  await updateAppTemplate( projectName, APP_INITIAL_TEMPLATE( projectName, remoteModuleName ) );
  await updateHostWebpack( url, projectName, remoteModuleName );
  console.log( `The ${projectName} project was created successfully. You can start it with "ng serve" and navigate to "${remoteModuleName}" to check that micronfrontend works. ` );
}
