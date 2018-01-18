import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-oresume',
  templateUrl: './oresume.component.html',
  styleUrls: ['./oresume.component.css']
})
export class OresumeComponent implements OnInit {
  tableData = new Array(10).fill({
    name: '张小三',
    date: '2017-10-20',
    job: '前端开发',
    mstate: '已面试',
    lstate: '已录用'
  })
  constructor() { }

  ngOnInit() {
  }

}
