import { Component, OnInit } from '@angular/core';
import { ElMessageService } from 'element-angular';

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
  setRadio: string = '1';
  pbComList: any[] = [
    { name: '公司一', type: 'warning' },
    { name: '公司二', type: 'warning' }
  ];
  constructor(private message: ElMessageService) {}

  ngOnInit() {}
  updateResume(id: any): void {
    // 简历刷新
    this.message['success']('刷新成功');
  }
  handleEntrust(id: any): void {
    // 简历委托
    this.message['success']('委托成功');
  }
  handleAddCom(compony: string): void {
    // 添加屏蔽公司
    if (!compony) {
      this.message['error']('公司名称不能为空');
    } else {
      let isAdd = true;
      this.pbComList.forEach((item, i) => {
        if (item.name.includes(compony)) {
          this.message['error']('已添加该公司');
          isAdd = false;
        }
      });
      if (isAdd) {
        this.pbComList.push({
          name: compony,
          type: 'warning'
        });
      }
    }
  }
  handleRemove(index: number): void {
    this.pbComList.splice(index, 1);
  }
}
