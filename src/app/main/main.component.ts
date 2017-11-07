import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  value: any;
  cityList: Array<{label: string, value: string}>;
  constructor() { }

  ngOnInit() {
    this.cityList = [
      {label: '深圳', value: '深圳'}
    ];
  }
  clear(): void {
    this.value = null;
  }

}
