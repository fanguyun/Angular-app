import { Component, OnInit } from '@angular/core';
import {Md5} from "ts-md5/dist/md5";
import { ElMessageService } from 'element-angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private message: ElMessageService
  ) {
  }
  ngOnInit() {
  }
  loginSubmit(userName: string, passWord: string) {
    if (!userName) {
      this.message['error']('账号不能为空!');
    } else {
      if (!passWord) {
        this.message['error']('密码不能为空！');
      } else {
        console.log(userName);
        console.log(Md5.hashStr(passWord));
        this.message['success']('登陆成功！');
      }
    }
  }

}
