import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-osend',
  templateUrl: './osend.component.html',
  styleUrls: ['./osend.component.css']
})
export class OsendComponent implements OnInit {
  tableData = new Array(20).fill({
    name: '前端开发',
    date: '2017-10-12',
    num: '5',
    money: '面议',
    yoer: '3',
    education: '不限'
  })
  constructor() { }

  ngOnInit() {
  }
  handleMaolink(name):void {
    console.log(name)
  }

}
