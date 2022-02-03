import { chmod, writeFile } from 'fs';
export function writeLocalFile ( path, data ) {
  return new Promise( ( resolve, reject ) => {
    chmod( path, 0o777, ( err, succ ) => {
      writeFile( path, data, ( err ) => {
        resolve();
      } );
    } );
  } );
}