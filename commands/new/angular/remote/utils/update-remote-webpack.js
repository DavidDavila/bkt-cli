import { updateWebpack } from '../../utils/update-webpack.js';

export async function updateRemoteWebpack ( projectName, remoteModuleName ) {
  return new Promise( async ( resolve, reject ) => {
    const insert = `new ModuleFederationPlugin({
        name: "${remoteModuleName}",
        filename: "remoteEntry.js",
        exposes: {
            './Module': './/src/app/${remoteModuleName}/${remoteModuleName}.module.ts',
        },      `;
    await updateWebpack( projectName, remoteModuleName, insert );
    resolve();
  } );
}