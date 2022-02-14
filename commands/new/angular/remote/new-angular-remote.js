
import { askFor } from '../../../../utils/ask-for.js';
import { addModuleFederation } from '../utils/add-module-federation.js';
import { checkInstallUpdateAngularCli } from '../utils/check-angular-cli.js';
import { createAngularProject } from '../utils/create-project.js';
import { updateAppTemplate } from '../utils/update-app-template.js';
import { addRemoteModule } from './utils/create-remote-module.js';
import { updateRemoteAppRouter } from './utils/update-remote-app-router.js';
import { updateRemoteWebpack } from './utils/update-remote-webpack.js';


export async function newAngularRemote () {
  await checkInstallUpdateAngularCli();
  const projectName = await askFor( 'name', 'What is the name of the project?', 'input', [] );
  const port = await askFor( 'port', `In which port will be deployed ${projectName}?`, 'input', [] );

  await createAngularProject( projectName );
  await addModuleFederation( projectName, port );
  await updateAppTemplate( projectName, '<router-outlet></router-outlet>' );
  const remoteModuleName = await addRemoteModule( projectName );

  await updateRemoteAppRouter( projectName, remoteModuleName );
  await updateRemoteWebpack( projectName, remoteModuleName );
  console.log( `The ${projectName} project was created successfully. You can start it with "ng serve" and see it on "http://localhost:${port}/remoteEntry.js" ` );
}
