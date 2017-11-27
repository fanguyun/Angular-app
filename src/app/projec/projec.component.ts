import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-projec',
  templateUrl: './projec.component.html',
  styleUrls: ['./projec.component.css']
})
export class ProjecComponent implements OnInit {

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
