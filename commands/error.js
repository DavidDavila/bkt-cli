import { dataTree } from '../data-tree/data-tree.js';

export function errorPrompt ( command, framework, type ) {
  switch ( true )
  {
    case !dataTree[command]:
      command ?

        console.error( `Command: ${command} is a bad command. You can use:
          ${Object.keys( dataTree ).map( command => `${command}` ).join( ', ' )}` )
        :
        console.error( `Command needed. You can use:
          ${Object.keys( dataTree ).map( command => `${command}` ).join( ', ' )}` );
      break;
    case !dataTree[command][framework]:
      framework ?
        console.error( `Framework: ${framework} is a bad framework. You can use:
          ${Object.keys( dataTree[command] ).map( framework => `${framework}` ).join( ', ' )}` )
        :
        console.error( `Framework needed. You can use:
          ${Object.keys( dataTree[command] ).map( framework => `${framework}` ).join( ', ' )}` )
        ;
      break;
    case !dataTree[command][framework][type]:
      type ?
        console.error( `Type: ${type} is a bad type. You can use:
          ${Object.keys( dataTree[command][framework] ).map( type => `${type}` ).join( ', ' )}` )
        :
        console.error( `Type needed. You can use:
          ${Object.keys( dataTree[command][framework] ).map( type => `${type} ` ).join( ', ' )}` );
      break;
    default:
      console.error( `${command} ${framework} ${type} is a bad command` );
  }

}