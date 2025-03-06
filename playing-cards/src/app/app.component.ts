import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

//@Component is a decorator
@Component({
  // the custom element to declare the component in index.html
  selector: 'app-root',
  // replaced the NgModule paradigm used on older Angular version
  // TODO > to research because application won't all be using the
  // newest standalone feature
  standalone: true,
  // The HTML inline with the TS code
  template: '',
  templateUrl: './app.component.html',
  // The CSS styles inline with the TS code
  // styles: '',
  styleUrl: './app.component.css',
  imports: [RouterOutlet],
})
export class AppComponent {}
