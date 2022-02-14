import { readdirSync } from 'fs';
import { askFor } from '../../../../../utils/ask-for.js';
import { writeLocalFile } from '../../../../../utils/files.js';
import spinner from '../../../../../utils/spinner.js';
import { addBktSharedToAppModule } from './addbkt-shared-to-module.js';

export function createRemoteSample () {
  return new Promise( async ( resolve, reject ) => {

    spinner.start( `Adding bkt-shared to AppModule. Please wait...` );
    const folders = readdirSync( process.cwd() + '/src/app' ).map( file => !/\..*/.test( file ) && file ).filter( v => v );
    console.log( folders );
    const components = folders.map(
      folder => readdirSync( process.cwd() + `/src/app/${folder}` )
        .map( file =>
          /\.*\.component\.ts/.test( file ) && `${folder}/${file}` )
        .filter( file => file ) ).flat();
    spinner.stop();
    const componentSelected = await askFor( 'componentSelected', 'Which component do you want to select?', 'list', components );

    const templatePath = process.cwd() + `/src/app/${componentSelected.replace( '.ts', '.html' )}`;
    const componentPath = process.cwd() + `/src/app/${componentSelected}`;

    const componentName = componentSelected.split( '.' )[0].split( '/' )[1];

    await addBktSharedToAppModule( componentName );
    await writeLocalFile( templatePath, MODULE_REMOTE_TEMPLATE );
    await writeLocalFile( componentPath, MODULE_REMOTE_COMPONENT( componentName ) );

    spinner.stop();
    resolve();
  } );
};

const MODULE_REMOTE_TEMPLATE = `
<main>
  <section>
    <article>
      <bkt-list [listProps]="listProps" [titleList]="'To do list'" (onItemClicked)="onItemListClick($event)" ></bkt-list>
      <bkt-button [buttonProps]="buttonProps" (onItemClicked)="onItemButtonClick()"></bkt-button>
    </article>
  </section>
</main>
`;
const MODULE_REMOTE_COMPONENT = ( componentName ) => `


import { Component, OnInit} from '@angular/core';
import { BktSharedService } from 'bkt-shared';
import { BKT_BUTTON_PROPS } from 'bkt-shared/lib/components/bkt-button/button.model';
import { BKT_LIST_ITEM, BKT_LIST_PROPS } from 'bkt-shared/lib/components/bkt-list/list.model';

@Component({
  selector: 'app-root',
  templateUrl: './${componentName}.component.html',
  styleUrls: ['./${componentName}.component.scss'],
})
export class ${componentName.charAt( 0 ).toUpperCase() + componentName.slice( 1 )}Component {
 title = 'sharedAPP';
  listProps: BKT_LIST_PROPS = [...this.bktSharedService.getToDos()] as BKT_LIST_PROPS;
  buttonProps: BKT_BUTTON_PROPS = {
    text: 'Add to do',
    type: 'primary'
  }
  constructor(private bktSharedService: BktSharedService) { }

  onItemListClick(event: Event): void {
    const item: BKT_LIST_ITEM = (event as CustomEvent).detail;
    const position: number = this.listProps.indexOf(item);
    this.listProps = [...this.bktSharedService.removeToDo(position)]
  }
  onItemButtonClick(): void {

    const todo = { text: 'To Do from hogar' }
    this.bktSharedService.addToDo(todo);
    this.listProps = [...this.bktSharedService.getToDos()] as BKT_LIST_PROPS;
  }
}`;
