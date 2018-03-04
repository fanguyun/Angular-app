import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-phome',
  templateUrl: './phome.component.html',
  styleUrls: ['./phome.component.css']
})
export class PhomeComponent implements OnInit {
  tableData: any[] = new Array(16).fill({
    name: '用户研究',
    sex: '男',
    compony: '腾讯计算机有限公司',
    joblist:
      '1、与产品、设计、后端工程师一起产出相关产品2、抽象通用功能组建，开发基础工具，提高团队效率3、参与产品设计讨论，从前端技术角度给予反馈并评估可行性4、参与并实践 code review，提高自身与团队能力水平',
    money: '15000',
    time: '2017-08-19',
    address: '上海市普陀区金沙江路 1518 弄'
  });
  constructor() {}

  ngOnInit() {}
}
