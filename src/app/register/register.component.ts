import { Component, OnInit } from '@angular/core';
import { Md5 } from 'ts-md5/dist/md5';
import { ElMessageService } from 'element-angular';
import { Http, Headers } from '@angular/http';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  phoneReg: RegExp;
  emailReg: RegExp;
  passwordReg: RegExp;
  type: string = '0';
  isSend: boolean;
  isCheck: boolean = true;
  valueType: number;
  timer: number;
  sendText: string;
  verifyCodeSno: number;
  constructor(private message: ElMessageService, private http: Http) {
    this.phoneReg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
    this.emailReg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+$/;
    this.passwordReg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/;
    this.isSend = false;
    this.timer = 60;
    this.sendText = '发送验证码';
  }
  ngOnInit() {}
  header = new Headers({
    'Content-Type': 'application/json'
  });
  handle(event: any): void {
    this.isCheck = event;
    console.log('event', event);
  }
  handleChange(event: any): void {
    this.type = event;
  }
  sendCode(userName: any): void {
    if (
      userName &&
      (this.phoneReg.test(userName) || this.emailReg.test(userName))
    ) {
      this.isSend = true;
      let scope = this;
      // 发送验证码
      this.http
        .post(
          environment.apiBase + '/api/services/app/Verify/SendVerifyCode',
          { PhoneNumber: userName, Usage: 'Register' },
          {
            headers: this.header
          }
        )
        .subscribe(
          res => {
            let successData = JSON.parse(res['_body']);
            this.message['success']('验证码为 ' + successData.result.code);
            scope.verifyCodeSno = successData.result.sno;
            let stime = setInterval(function() {
              scope.timer--;
              scope.sendText = scope.timer + 's后重发';
              if (scope.timer === 1) {
                clearInterval(stime);
                scope.sendText = '发送验证码';
                scope.timer = 60;
                scope.isSend = false;
              }
            }, 1000);
          },
          error => {
            console.log('error', error);
          },
          () => {
            console.log('observable is now completed.');
          }
        );
    } else {
      this.message['error']('请输入正确的邮箱/手机号!');
    }
  }
  resigterSubmit(
    userName: any,
    passWord: any,
    compassWord: any,
    checkCode: any
  ): void {
    if (!userName) {
      this.message['error']('账号不能为空!');
    } else {
      if (!this.phoneReg.test(userName) && !this.emailReg.test(userName)) {
        this.message['error']('请输入正确的邮箱/手机号!');
      } else {
        if (!passWord) {
          this.message['error']('密码不能为空！');
        } else {
          if (!this.passwordReg.test(passWord)) {
            this.message['error']('密码为6-16位数字和字母的组合！');
          } else {
            if (passWord !== compassWord) {
              this.message['error']('两次密码不一致！');
            } else {
              if (!checkCode) {
                this.message['error']('请输入验证码!');
              } else {
                // 用户注册
                this.http
                  .post(
                    environment.apiBase + '/api/services/app/Account/Register',
                    {
                      Username: userName,
                      password: passWord,
                      verifyCodeSno: this.verifyCodeSno,
                      VerifyCode: checkCode,
                      RegisterType: this.type,
                      phoneNumber: userName,
                      emailAddress: userName + '@qq.com'
                    },
                    {
                      headers: this.header
                    }
                  )
                  .subscribe(
                    res => {
                      console.log('success', res);
                      this.message['success']('注册成功！请登录');
                      window.location.href = '#/login';
                    },
                    error => {
                      console.log('error', error);
                      let errData = JSON.parse(error['_body']);
                      this.message['error'](
                        errData.error.message + ' ' + errData.error.details
                      );
                    },
                    () => {
                      console.log('observable is now completed.');
                    }
                  );
              }
            }
          }
        }
      }
    }
  }
}
