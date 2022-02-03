import { updateWebpack } from '../../utils/update-webpack.js';

export async function updateHostWebpack ( url, projectName, remoteModuleName ) {
  return new Promise( async ( resolve, reject ) => {

    const insert = `new ModuleFederationPlugin({
       remotes: {
            "${remoteModuleName}": "${url}/remoteEntry.js"
        },`;
    await updateWebpack( projectName, remoteModuleName, insert );
    resolve();
  } );
}