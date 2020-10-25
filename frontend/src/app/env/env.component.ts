import {isPlatformBrowser} from '@angular/common';
import {Component, Inject, OnInit, PLATFORM_ID} from '@angular/core';
import {environment} from '../../environments/environment';

@Component({
  selector: 'app-env',
  templateUrl: './env.component.html',
})
export class EnvComponent implements OnInit {
  public isBrowser = isPlatformBrowser(this.platformId);
  public variables = new Map<string, string>();

  constructor(@Inject(PLATFORM_ID) private platformId: any) {

  }

  ngOnInit() {
    Object.keys(environment).forEach((k) => {
      this.variables.set(k, environment[k]);
    });
  }

}
