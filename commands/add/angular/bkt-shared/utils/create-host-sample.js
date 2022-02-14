import { readFileSync } from 'fs';
import { writeLocalFile } from '../../../../../utils/files.js';
import spinner from '../../../../../utils/spinner.js';

export function createHostSample () {
  return new Promise( async ( resolve, reject ) => {

    spinner.start( `Adding bkt-shared to AppModule. Please wait...` );
    const appTemplatePath = process.cwd() + `/src/app/app.component.html`;
    const appComponentPath = process.cwd() + `/src/app/app.component.ts`;
    let appHtml = readFileSync( appTemplatePath, { encoding: 'utf8', flag: 'r' } );
    const moduleName = appHtml.match( />.*Module/gm )[0].replace( '>', '' );
    await writeLocalFile( appTemplatePath, APP_HOST_TEMPLATE );
    await writeLocalFile( appComponentPath, APP_HOST_COMPONENT( moduleName ) );

    const homeTemplatePath = process.cwd() + `/src/app/home/home.component.html`;
    const homeComponentPath = process.cwd() + `/src/app/home/home.component.ts`;

    await writeLocalFile( homeTemplatePath, HOME_HOST_TEMPLATE );
    await writeLocalFile( homeComponentPath, HOME_HOST_COMPONENT );

    spinner.stop();
    resolve();
  } );
};

const APP_HOST_TEMPLATE = `
  <bkt-header [headerProps]="headerProps" (onItemClicked)="onItemHeaderClick($event)"></bkt-header>
  <style>
  h2{
      font-size: 1.5rem;
    }
    h2:after {
      content: "";
      display: block;
      width: 45px;
      height: 3px;
      margin-top: 16px;
      background-color: #ff821c;
    }
    </style>
  <h2>In global component: "To Do List" has {{todoList.length}} elements</h2>
  <router-outlet></router-outlet>
  `;
const APP_HOST_COMPONENT = ( moduleName ) => `

  import { Component } from '@angular/core';
  import { Router } from '@angular/router';
  import { BktSharedService } from 'bkt-shared';
  import { BKT_HEADER_PROPS } from 'bkt-shared/lib/components/bkt-header/header.model';

  @Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
  })
  export class AppComponent {
    todoList = this.bktSharedService.getToDos();
    headerProps: BKT_HEADER_PROPS = {
      navList: [
        { text: 'Shell', path: '/' },
        { text: '${moduleName}', path: '/${moduleName}' },
      ]
    }

  
    constructor(private router: Router, private bktSharedService: BktSharedService) { }

    onItemHeaderClick(event: Event): void {
      const nav = (event as CustomEvent).detail;
      this.router.navigate([nav.path])
    }
  }
`;
const HOME_HOST_TEMPLATE = `
<style>
  article{
    width:30%;
    background-color:#f7faff;
    padding:2rem;
  }
  h4{ 
    font-size: 0.7rem;
    margin:0 0 1rem;
    text-transform: uppercase;
  }
  h3{
    margin: 0 0 1.5rem; 
    font-size: 2rem;
  }
  p{
    font-size: 1rem;
  }
</style>
<article>
  <h4>Shell app - Home Component</h4>
  <h3>To Do´s: {{todoList.length}} elements</h3>
  <p>It could be a module or a component, but in every cases will be connected to the global service throught 'bkt-shared' package.</p>
  <p>You can test the comunication adding a To Do.</p>
  <bkt-button [buttonProps]="buttonProps" (onItemClicked)="addToDo()"></bkt-button>
</article>
`;
const HOME_HOST_COMPONENT = `
import { Component, OnInit } from '@angular/core';
import { BktSharedService } from 'bkt-shared';
import { BKT_BUTTON_PROPS } from 'bkt-shared/lib/components/bkt-button/button.model';
import { BKT_LIST_ITEM } from 'bkt-shared/lib/components/bkt-list/list.model';
;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  todoList = this.bktSharedService.getToDos();
  buttonProps: BKT_BUTTON_PROPS = {
    text: 'Add To DO',
    type: 'primary'
  }
  constructor(private bktSharedService: BktSharedService) { }

  ngOnInit(): void {
  }
  addToDo() {
    const toDo: BKT_LIST_ITEM = {
      text: 'To Do from ShellApp / HomeComponent'
    }
    this.bktSharedService.addToDo(toDo)
  }

}
`;
