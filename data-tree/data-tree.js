import { addBktShared } from '../commands/add/angular/bkt-shared/addBktShared.js';
import { newAngularHost } from '../commands/new/angular/host/new-angular-host.js';
import { newAngularRemote } from '../commands/new/angular/remote/new-angular-remote.js';

export const dataTree = Object.freeze( {
  'new': {
    'angular': {
      'host': newAngularHost,
      'remote': newAngularRemote,
    }
  },
  'add': {
    'angular': {
      'bkt-shared': addBktShared
    }
  }
} );