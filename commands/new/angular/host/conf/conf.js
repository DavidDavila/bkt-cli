export const APP_INITIAL_TEMPLATE = ( projectName, remoteModuleName ) => `
  <header>
    <a [routerLink]="['/']" routerLinkActive="router-link-active"  >${projectName}</a>
    <a [routerLink]="['/${remoteModuleName}']" routerLinkActive="router-link-active"  >${remoteModuleName}</a>
  </header>  
  <router-outlet></router-outlet>`; 