import { Component, OnInit } from '@angular/core';
import { ElMessageService } from 'element-angular';
import { Router } from '@angular/router';
import { Md5 } from 'ts-md5/dist/md5';
import { Http, Headers } from '@angular/http';
import { environment } from '../../environments/environment';
import { base64decode } from '../base/index';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
  phoneReg: RegExp;
  emailReg: RegExp;
  constructor(
    private message: ElMessageService,
    private router: Router,
    private http: Http
  ) {
    this.phoneReg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
    this.emailReg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+$/;
    localStorage.setItem('MENU_INFO', 'no');
  }
  ngOnInit() {}
  header = new Headers({
    'Content-Type': 'application/json',
    Accept: 'application/json'
  });
  loginSubmit(userName: any, passWord: any): void {
    if (!userName) {
      this.message['error']('账号不能为空!');
    } else {
      if (!this.phoneReg.test(userName) && !this.emailReg.test(userName)) {
        this.message['error']('请输入正确的邮箱/手机号!');
      } else {
        if (!passWord) {
          this.message['error']('密码不能为空！');
        } else {
          let loginData = {
            userNameOrEmailAddress: userName,
            password: passWord,
            rememberClient: true
          };
          let userData = {};
          let userArray = [];
          let userKey = '';
          this.http
            .post(
              environment.apiBase + '/api/TokenAuth/Authenticate',
              loginData,
              { headers: this.header }
            )
            .subscribe(
              res => {
                // console.log('success', res);
                localStorage.setItem(
                  'USER_ID',
                  JSON.parse(res['_body']).result.userId
                );
                localStorage.setItem(
                  'USER_TOKEN',
                  JSON.parse(res['_body']).result.accessToken
                );
                userData = JSON.parse(
                  base64decode(
                    JSON.parse(res['_body']).result.accessToken.split('.')[1]
                  )
                );
                for (let i in userData) {
                  userArray.push(userData[i]);
                }
                userArray.forEach((item, index) => {
                  if (index === 3) {
                    userKey = item;
                  }
                });
                localStorage.setItem('USER_KEY', userKey);
                this.message['success']('登陆成功！');
                localStorage.setItem('MENU_INFO', 'yes');
                if (userKey === 'Personal') {
                  window.location.href = '#/main';
                } else {
                  window.location.href = '#/job';
                }
              },
              error => {
                // console.log('error', error);
                let newErr = JSON.parse(error['_body']);
                this.message['error'](
                  newErr.error.message + ' ' + newErr.error.details
                );
              },
              () => {
                console.log('observable is now completed.');
              }
            );
          // console.log(userName);
          // console.log(Md5.hashStr(passWord));

          // this.router.navigate(['/main']);
        }
      }
    }
  }
}
