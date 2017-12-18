import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-psend',
  templateUrl: './psend.component.html',
  styleUrls: ['./psend.component.css']
})
export class PsendComponent implements OnInit {
  private tableData: any[] =  new Array(20).fill({
    name: '用户研究',
    sex: '男',
    compony: '腾讯计算机有限公司',
    money: '15000',
    time: '2017-08-19',
    address: '上海市普陀区金沙江路 1518 弄',
    state: '投递成功'
  })
  constructor() { }

  ngOnInit() {
  }

}
