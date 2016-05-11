import {Component, ApplicationRef} from '@angular/core';
import {AsyncPipe} from '@angular/common'
import {Observable} from 'rxjs';
import {NgRedux} from 'ng2-redux';
import {IAppState} from '../app-state';

@Component({
  selector: 'rtbm-my-app',
  pipes: [AsyncPipe],
  template: `
    <p>{{ sampleData$ | async }}</p>
    <button (click)="foo()">Foo</button>
  `,
  styles: [require('../style.css')]
})
export class RtbmMyApp {
  private sampleData$: Observable<number>;
  private unsubscribe: () => void;

  constructor(
    ngRedux: NgRedux<IAppState>,
    applicationRef: ApplicationRef
  ) {
    this.sampleData$ = ngRedux.select(n => n.sampleReducer.get('sampleData'));

    ngRedux.mapDispatchToTarget((dispatch) => {
      return {
        foo: (credentials) => dispatch({
          type: 'App/FOO',
          payload: 'FOO'
        })
      }
    })(this);

    this.unsubscribe = ngRedux.subscribe(() => {
      applicationRef.tick();
    });
  }

  ngOnDestroy() {
    this.unsubscribe();
  }
}
