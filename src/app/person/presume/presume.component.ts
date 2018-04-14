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
import { Router } from '@angular/router';

@Component({
  selector: 'app-presume',
  templateUrl: './presume.component.html',
  styleUrls: ['./presume.component.scss']
})
export class PresumeComponent implements OnInit {
  labelPosition: string = 'left';
  validateForm: FormGroup;
  validateForm2: FormGroup;
  validateForm3: FormGroup;
  validateForm4: FormGroup;
  imageUrl: '';
  province: [''];
  city: [''];
  actionUrl: string = '';
  header = new Headers({
    'Content-Type': 'application/json;charset=UTF-8',
    Authorization: 'Bearer ' + localStorage.getItem('USER_TOKEN')
  });
  heades = {
    'Content-Type': 'text/html',
    Authorization: 'Bearer ' + localStorage.getItem('USER_TOKEN')
  };
  userId = localStorage.getItem('USER_ID');
  constructor(
    @Inject(forwardRef(() => FormBuilder))
    private formBuilder: FormBuilder,
    private router: Router,
    private message: ElMessageService,
    private http: Http
  ) {}
  submit(): void {
    // 提交用户个人信息
    this.http
      .put(
        environment.apiBase +
          '/api/services/app/UserProfile/UpdatePersonalUserProfile',
        JSON.stringify({
          UserId: this.userId,
          Name: this.validateForm.value.name,
          Surname: 'none',
          MaritalStatus: this.validateForm.value.maritalStatus,
          Gender: this.validateForm.value.sex,
          DistrictId: this.validateForm.value.cityid,
          DetialAddress: this.validateForm.value.address,
          Birthday: this.validateForm.value.time
        }),
        {
          headers: this.header
        }
      )
      .subscribe(
        res => {
          // console.log('success', res);
          this.message['success']('个人信息保存成功');
        },
        error => {
          console.log('error', error);
        },
        () => {
          console.log('observable is now completed.');
        }
      );
    console.log(this.validateForm.value);
  }
  submit2(): void {
    console.log(this.validateForm2.value);
  }
  submit3(): void {
    console.log(this.validateForm3.value);
  }
  submit4(): void {
    console.log(this.validateForm4.value);
  }
  reset(): void {
    this.validateForm.reset();
  }
  handleMaolink(name): void {
    let offTop = document.getElementById(name).offsetTop;
    document.body.scrollTop = document.documentElement.scrollTop = offTop;
    this.router.navigate(['presume'], { fragment: name });
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
  ngOnInit(): void {
    this.actionUrl = environment.apiBase + '/api/services/app/File/UploadPhoto';
    // 获取用户信息
    this.http
      .get(
        environment.apiBase +
          '/api/services/app/UserProfile/GetPersonalUserProfile?userId=' +
          this.userId,
        {
          headers: this.header
        }
      )
      .subscribe(
        res => {
          // console.log('success', res);
          let data = JSON.parse(res['_body']).result;
          let pid =
            Number(data.livingAddress.districtId.toString().substring(0, 2)) *
            10000;
          this.handleGetpro();
          this.handleGetCity(pid);
          this.validateForm.patchValue({
            name: data.name,
            sex: data.gender,
            maritalStatus: data.maritalStatus,
            phone: data.phoneNumber,
            email: data.emailAddress,
            provinceid: pid,
            cityid: data.livingAddress.districtId,
            address: data.livingAddress.detialAddress,
            time: data.birthday
          });
        },
        error => {
          console.log('error', error);
        },
        () => {
          console.log('observable is now completed.');
        }
      );
    this.validateForm = this.formBuilder.group({
      name: ['', [this.cityValidator]],
      sex: [''],
      maritalStatus: [],
      phone: [''],
      email: [''],
      provinceid: '',
      cityid: '',
      address: [''],
      time: ['']
    });
    this.validateForm2 = this.formBuilder.group({
      schoolName: ['华南理工大学'],
      times: ['2008-2012'],
      majorName: ['计算机科学与应用'],
      education: ['本科'],
      remark: ['在校期间表现优异，学生会主席']
    });
    this.validateForm3 = this.formBuilder.group({
      comName: ['腾讯科技有限公司'],
      times: ['2012.6-2014.8'],
      job: ['产品经理'],
      money: ['保密'],
      remark: ['负责腾讯QQ音乐产品需求与优化']
    });
    this.validateForm4 = this.formBuilder.group({
      money: ['20K+'],
      jobs: ['产品经理、总监'],
      tims: ['1个月内'],
      org: ['互联网']
    });
  }
  handleGetpro(): void {
    // 获取省直辖市
    this.http
      .get(environment.apiBase + '/api/services/app/District/GetAllProvinces', {
        headers: this.header
      })
      .subscribe(
        res => {
          this.province = JSON.parse(res['_body']).result;
        },
        error => {
          console.log('error', error);
        }
      );
  }
  // 选择省获取市
  handleGetCity(pid): void {
    if (pid) {
      this.http
        .get(
          environment.apiBase +
            '/api/services/app/District/GetDistricts?parentCode=' +
            pid,
          {
            headers: this.header
          }
        )
        .subscribe(
          res => {
            this.city = JSON.parse(res['_body']).result;
          },
          error => {
            console.log('error', error);
          }
        );
    }
  }
  cityValidator = (control: FormControl) => {
    if (!control.value) {
      return { status: 'error', message: '请填写姓名' };
    }
    return { status: 'success' };
  };
  successHandle(file: any): void {
    this.imageUrl = file.raw;
    this.message.info('文件上传成功');
  }

  errorHandle(err: any): void {
    this.message.error('文件上传失败:' + err);
  }
}
