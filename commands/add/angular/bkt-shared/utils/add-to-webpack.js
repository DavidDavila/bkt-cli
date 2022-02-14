import { readFileSync } from 'fs';
import { writeLocalFile } from '../../../../../utils/files.js';
import spinner from '../../../../../utils/spinner.js';

export function addBktSharedToWebpack () {
  return new Promise( async ( resolve, reject ) => {

    spinner.start( `Adding bkt-shared to Webpack. Please wait...` );
    const webpackConfigPath = process.cwd() + `/webpack.config.js`;

    let webpackFile = readFileSync( webpackConfigPath, { encoding: 'utf8', flag: 'r' } );

    webpackFile = webpackFile.replace( 'shared: share({', `shared: share({ "bkt-shared": { singleton: true, strictVersion: true, requiredVersion: 'auto' }, ` );
    await writeLocalFile( webpackConfigPath, webpackFile );
    spinner.stop();
    resolve();
  } );
};