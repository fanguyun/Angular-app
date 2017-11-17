import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'head-cont',
  template: `
  <div class="ali_head">
    <div class="ali_cont">
      <div el-row>
        <div el-col span="9">
          <div class="ali_logo" (click)="goPage('/main')">雄才联盟</div>
          <div class="ds_inline">
            <p>中国IT人才摇篮</p>
            <p>Cradle of IT Talent In China</p>
          </div>
        </div>
        <div el-col span="12">
          <div *ngIf="isMenu">
            <ul class="el-menu-demo">
              <li *ngFor="let item of menuList" class="el-menu-item"><a [routerLink]="item.url" routerLinkActive="active">{{item.name}}</a></li>
            </ul>
          </div>
        </div>
        <div el-col span="3">
        <p class="user_seting" *ngIf="!isMenu">
          <a (click)="goPage('/main')">返回首页</a>
        </p>
          <p class="user_seting" *ngIf="isMenu">
            <a (click)="goPage('/register')">注 册</a> | <a (click)="goPage('/login')">登 录</a>
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
  .el-menu--horizontal .el-menu-item a{
    display:block;
  }
  li.el-menu-item{
    float:left;
    line-height:80px;
    height:80px;
  }
  .el-menu-item:focus, .el-menu-item:hover{
    background:none;
  }
  .active{
    color:#20A0FF;
    border-bottom:3px solid #20A0FF;
  }
  li.el-menu-item a{
    display:block;
    line-height:77px;
    padding:0 30px;
  }
  `]
})

export class HeadComponent implements OnInit {
  title = '处理中心';
  isMenu: boolean;
  menuList: Array<{name: string, url: string}>;
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
  ngOnInit() {
    this.menuList = [
      {name: '首 页', url: '/main'},
      {name: '招 聘', url: '/join'},
      {name: '项 目', url: '/object'},
      {name: '培 训', url: '/train'}
    ];
    let scope = this;
    setTimeout(function(){
      if (scope.router.url === '/login' || scope.router.url === '/register') {
        scope.isMenu = false;
      } else {
        scope.isMenu = true;
      }
    }, 100);
  }
  goPage (url: string): void {
    window.location.href = url;
  }
}
