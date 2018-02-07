import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  template: `
    <header class="row">
      <nav class="col-md-8 col-md-offset-2">
        <ul class="nav nav-pills">
        
          <!-- routerLink expects an array where each element is a segment of the url -->
          <!-- routerLinkActive places the element as a class when the link is clicked-->

          <li routerLinkActive="active"><a [routerLink]="['/messages']">Messenger</a></li>
          <li routerLinkActive="active"><a [routerLink]="['/auth']">Authentication</a></li>
        </ul>
      </nav>
    </header>  
  `
})

export class HeaderComponent {

}