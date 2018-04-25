import { Component, OnInit, Inject, forwardRef } from '@angular/core';
import { ElMessageService } from 'element-angular';
import { Http, Headers } from '@angular/http';
import { environment } from '../../../environments/environment';
import {
  FormBuilder,
  FormGroup,
  AbstractControl,
  FormControl
} from '@angular/forms';

@Component({
  selector: 'app-phome',
  templateUrl: './phome.component.html',
  styleUrls: ['./phome.component.scss']
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
  validateForm: FormGroup;
  isVisible: boolean = false;
  resumeMain: object = {};
  userInfo: object = {};
  header = new Headers({
    'Content-Type': 'application/json;charset=UTF-8',
    Authorization: 'Bearer ' + localStorage.getItem('USER_TOKEN')
  });
  userId = localStorage.getItem('USER_ID');
  resumeId = localStorage.getItem('RESUME_ID') || '';
  constructor(
    @Inject(forwardRef(() => FormBuilder))
    private formBuilder: FormBuilder,
    private message: ElMessageService,
    private http: Http
  ) {}

  ngOnInit() {
    this.validateForm = this.formBuilder.group({
      name: ['', [this.requireValidator]]
    });
    this.getUserResume();
    this.getUserInfo();
  }
  ctrl(item: string): AbstractControl {
    return this.validateForm.controls[item];
  }

  statusCtrl(item: string): string {
    if (!this.validateForm.controls[item]) return;
    const control: AbstractControl = this.validateForm.controls[item];
    return control.dirty && control.hasError('status')
      ? control.errors.status
      : '';
  }

  messageCtrl(item: string): string {
    if (!this.validateForm.controls[item]) return;
    const control: AbstractControl = this.validateForm.controls[item];
    return control.dirty && control.hasError('message')
      ? control.errors.message
      : '';
  }
  requireValidator = (control: FormControl) => {
    if (!control.value) {
      return { status: 'error', message: '该项不能为空' };
    }
    return { status: 'success' };
  };
  updateResume(id: any): void {
    this.getUserInfo();
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
  handleAddResume(): void {
    // 新增简历
    this.http
      .post(
        environment.apiBase +
          '/api/services/app/Resume/NewResume?userId=' +
          this.userId +
          '&name=' +
          this.validateForm.value.name,
        {},
        {
          headers: this.header
        }
      )
      .subscribe(
        res => {
          let resumeId = JSON.parse(res['_body']).result;
          this.message['success']('创建简历成功');
          localStorage.setItem('RESUME_ID', resumeId); // 简历ID
          this.getResumeMain(resumeId);
          this.isVisible = false;
        },
        error => {
          console.log('error', error);
        },
        () => {
          console.log('observable is now completed.');
        }
      );
  }
  getUserResume(): void {
    // 根据用户ID获取所有简历
    this.http
      .get(
        environment.apiBase +
          '/api/services/app/Resume/GetResumeListByUser?userId=' +
          this.userId,
        {
          headers: this.header
        }
      )
      .subscribe(
        res => {
          this.resumeId =
            JSON.parse(res['_body']).result &&
            JSON.parse(res['_body']).result[0]
              ? JSON.parse(res['_body']).result[0].id
              : '';
          if (this.resumeId) {
            this.getResumeMain(this.resumeId);
          }
        },
        error => {
          console.log('error', error);
        },
        () => {
          console.log('observable is now completed.');
        }
      );
  }
  getResumeMain(id): void {
    // 根据简历ID获取简历
    this.http
      .get(
        environment.apiBase +
          '/api/services/app/Resume/GetResume?resumeId=' +
          id,
        {
          headers: this.header
        }
      )
      .subscribe(
        res => {
          this.resumeMain = JSON.parse(res['_body']).result;
        },
        error => {
          console.log('error', error);
        },
        () => {
          console.log('observable is now completed.');
        }
      );
  }
  getUserInfo(): void {
    this.http
      .get(
        // 获取用户信息
        environment.apiBase +
          '/api/services/app/UserProfile/GetPersonalUserProfile?userId=' +
          this.userId,
        {
          headers: this.header
        }
      )
      .subscribe(
        res => {
          this.userInfo = JSON.parse(res['_body']).result;
        },
        error => {
          console.log('error', error);
        },
        () => {
          console.log('observable is now completed.');
        }
      );
  }
}
