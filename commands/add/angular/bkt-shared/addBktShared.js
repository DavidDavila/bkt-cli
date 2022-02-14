

import { askFor } from '../../../../utils/ask-for.js';
import { addBktSharedToWebpack } from './utils/add-to-webpack.js';
import { addBktSharedToAppModule } from './utils/addbkt-shared-to-module.js';
import { createHostSample } from './utils/create-host-sample.js';
import { createRemoteSample } from './utils/create-remote-sample.js';
import { installBktShared } from './utils/install-bkt-shared.js';

export function addBktShared () {
  return new Promise( async ( resolve, reject ) => {
    await installBktShared();
    await addBktSharedToAppModule();
    await addBktSharedToWebpack();
    const sample = await askFor( 'sample', 'Do you want to see a sample in this proyect? We need host and remote', 'list', ['Yes', 'No'] );
    if ( sample == 'Yes' )
    {
      const projectType = await askFor( 'projectType', 'What kind of project is this?', 'list', ['Host', 'Remote'] );
      if ( projectType == 'Host' )
      {
        await createHostSample();
      } else
      {
        await createRemoteSample();
      }
    }

    console.log( 'Thank you, bkt-shared is ready for work. You can see starting the server with "ng serve"' );

  } );
}