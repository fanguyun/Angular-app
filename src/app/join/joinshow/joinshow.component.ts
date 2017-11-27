import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-joinshow',
  templateUrl: './joinshow.component.html',
  styleUrls: ['./joinshow.component.css']
})
export class JoinshowComponent implements OnInit {
  input: any;
  value: any;
  cityList: Array<{label: string, value: string}>;
  constructor() { }

  ngOnInit() {
    this.cityList = [
      {label: '深圳', value: '深圳'},
      {label: '深圳2', value: '深圳2'}
    ];
  }
  handle(e): void{
  }
  clear(): void{
  }
}
