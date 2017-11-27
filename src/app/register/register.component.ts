import { Component, OnInit } from '@angular/core';
import {Md5} from "ts-md5/dist/md5";
import { ElMessageService } from 'element-angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  phoneReg: RegExp;
  emailReg: RegExp;
  passwordReg: RegExp;
  isSend: boolean;
  isCheck: boolean;
  valueType: number;
  timer: number;
  sendText: string;
  constructor(
    private message: ElMessageService
  ) {
    this.phoneReg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
    this.emailReg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+$/;
    this.passwordReg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/;
    this.isSend = false;
    this.timer = 60;
    this.sendText = '发送验证码';
  }
  ngOnInit() {
  }
  handle(event: any): void {
    this.isCheck = event;
    console.log('event', event);
  }
  sendCode(userName: any): void {
    if (userName && (this.phoneReg.test(userName) || this.emailReg.test(userName))) {
      this.isSend = true;
      let scope = this;
      this.message['success']('验证码已发送，请注意查收!');
      let stime = setInterval(function() {
        scope.timer--;
        scope.sendText = scope.timer + 's后重发';
        if (scope.timer === 1) {
          clearInterval(stime);
          scope.sendText = '发送验证码';
          scope.isSend = false;
        }
      }, 1000);
    } else {
      this.message['error']('请输入正确的邮箱/手机号!');
    }
  }
  resigterSubmit(userName: any, passWord: any, compassWord: any, checkCode: any): void {
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
                this.message['success']('注册成功！');
              }
            }
          }
        }
      }
    }
  }

}
