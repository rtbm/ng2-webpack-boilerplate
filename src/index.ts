import 'core-js/es6';
import 'core-js/es7/reflect';
require('zone.js/dist/zone');

import 'ts-helpers';

import {bootstrap} from '@angular/platform-browser-dynamic';
import {RtbmMyApp} from './containers/my-app';

bootstrap(RtbmMyApp, [
]);
