// Angular2 docs call this a "Router Component"

import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  templateUrl: '/app/appComponent/app.component.html',
  styleUrls: ['/app/appComponent/app.component.css']
})

export class AppComponent {
  title = 'Tour of Heroes';
}
