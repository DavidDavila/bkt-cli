import { Chalk } from 'chalk';
import figlet from 'figlet';

export function banner ( title ) {
  console.log(
    new Chalk( { level: 3 } ).hex( 'f96901' )( figlet.textSync( title )
    )
  );
};