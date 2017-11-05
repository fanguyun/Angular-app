import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'head-cont',
  template: `
  <div class="ali_head">
    <div class="ali_cont">
      <div el-row>
        <div el-col span="9">
          <div class="ali_logo">雄才联盟</div>
          <div class="ds_inline">
            <p>中国IT人才摇篮</p>
            <p>Cradle of IT Talent In China</p>
          </div>
        </div>
        <div el-col span="12">
          <div *ngIf="isMenu">
            <el-menu [model]="0" class="el-menu-demo" mode="horizontal">
              <el-menu-item index="1">首 页</el-menu-item>
              <el-menu-item index="2">招 聘</el-menu-item>
              <el-menu-item index="3">项 目</el-menu-item>
              <el-menu-item index="4">培 训</el-menu-item>
            </el-menu>
          </div>
        </div>
        <div el-col span="3">
          <p class="user_seting" *ngIf="isMenu">
            <a (click)="goPage('/register')">注册</a> | <a (click)="goPage('/login')">登录</a>
          </p>
        </div>
      </div>
    </div>
  </div>
  `,
  styles: [`
  .h_regise{
    line-height:80px;
  }
  `]
})

export class HeadComponent implements OnInit {
  title = '处理中心';
  isMenu: boolean;
  constructor(
    private router: Router
  ) {
    let scope = this;
    setTimeout(function(){
      if (scope.router.url === '/login' || scope.router.url === '/register') {
        scope.isMenu = false;
      } else {
        scope.isMenu = true;
      }
    }, 600);
  }
  ngOnInit() {}
  goPage (url: string): void {
    window.location.href = url;
  }
}
