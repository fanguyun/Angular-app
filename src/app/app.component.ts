import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  handle(time: number): void {
    // [time] is string
    // date style follow format props
    console.log(time);
  }
  clearClickHandle(time: number): void {
  }
}
