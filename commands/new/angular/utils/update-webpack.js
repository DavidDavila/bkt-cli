import { readFileSync } from 'fs';
import { writeLocalFile } from '../../../../utils/files.js';

export async function updateWebpack ( projectName, remoteModuleName, insertText ) {
  return new Promise( async ( resolve, reject ) => {
    const webpackFilePath = process.cwd() + `/${projectName}/webpack.config.js`;

    const webpackFile = readFileSync( webpackFilePath, { encoding: 'utf8', flag: 'r' } );

    const moduleName = remoteModuleName.charAt( 0 ).toUpperCase() + remoteModuleName.slice( 1 ) + 'Module';

    let webpackFileUpdated = webpackFile.replace( 'new ModuleFederationPlugin({', insertText );


    await writeLocalFile( webpackFilePath, webpackFileUpdated, { encoding: 'utf8', flag: 'r' } );
    resolve( moduleName );
  } );
}