import { writeFile } from 'fs';
export async function updateAppTemplate ( projectName, html ) {
  return new Promise( ( resolve, reject ) => {
    writeFile( process.cwd() + `/${projectName}/src/app/app.component.html`, html, { encoding: 'utf8', flag: 'w' }, err => {
      err ? reject( err ) : resolve();
    } );
  } );
}