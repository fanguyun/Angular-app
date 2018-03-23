import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-owaibao',
  templateUrl: './owaibao.component.html',
  styleUrls: ['./owaibao.component.scss']
})
export class OwaibaoComponent implements OnInit {
  tableData = new Array(10).fill({
    name: '李小四',
    date: '2016-08-12 19:00',
    job: '新媒体运营',
    kehu: '平安银行',
    mstate: '已入职'
  });
  constructor() {}

  ngOnInit() {}
}
