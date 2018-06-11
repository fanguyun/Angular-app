import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import 'rxjs/add/operator/filter';

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
          <div *ngIf="isMenu && !isPerson && !isOrg">
            <ul class="el-menu-demo">
              <li *ngFor="let item of menuList" class="el-menu-item"><a [routerLink]="item.url" routerLinkActive="active">{{item.name}}</a></li>
            </ul>
          </div>
          <div *ngIf="isPerson && isMenu && !isOrg">
            <ul class="el-menu-demo">
              <li *ngFor="let item of personMenu" class="el-menu-item"><a [routerLink]="item.url" routerLinkActive="active">{{item.name}}</a></li>
            </ul>
          </div>
          <div *ngIf="isOrg && isMenu && !isPerson">
            <ul class="el-menu-demo">
              <li *ngFor="let item of orgMenu" class="el-menu-item"><a [routerLink]="item.url" routerLinkActive="active">{{item.name}}</a></li>
            </ul>
          </div>
        </div>
        <div el-col span="3">
          <p class="user_seting" *ngIf="!isMenu && !isLogin">
            <a (click)="goPage('#/main')">返回首页</a>
          </p>
          <p class="user_seting" *ngIf="isMenu && !isLogin">
            <a (click)="goPage('#/register')">注 册</a> | <a (click)="goPage('#/login')">登 录</a>
          </p>
          <p class="user_seting" *ngIf="isLogin && isMenu">
            <a (click)="goPage('#/phome')" *ngIf="userKey == 'Personal'">个人中心</a><a (click)="goPage('#/ohome')" *ngIf="userKey != 'Personal'">企业中心</a> | <a (click)="goLoginOut()">退出</a>
          </p>
        </div>
      </div>
    </div>
  </div>
  `,
  styles: [
    `
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
  `
  ]
})
export class HeadComponent implements OnInit {
  title = '处理中心';
  isMenu: boolean;
  isLogin: boolean;
  isPerson: boolean;
  isOrg: boolean;
  menuList: Array<{ name: string; url: string }>;
  personMenu: Array<{ name: string; url: string }>;
  orgMenu: Array<{ name: string; url: string }>;
  userKey: string;
  constructor(private router: Router) {
    router.events
      .filter(event => event instanceof NavigationEnd)
      .subscribe((event: NavigationEnd) => {
        // 当路由发生变化，刷新组件
        this.setInfo();
      });
  }
  ngOnInit() {
    this.menuList = [
      { name: '首 页', url: '/main' },
      { name: '求 职', url: '/join' },
      // { name: '招 聘', url: '/job' },
      { name: '项 目', url: '/project' },
      { name: '培 训', url: '/train' }
    ];
    this.personMenu = [
      { name: '首 页', url: '/main' },
      { name: '我的雄才', url: '/phome' },
      { name: '我的申请', url: '/psend' },
      { name: '简历管理', url: '/presume' }
    ];
    this.orgMenu = [
      { name: '首 页', url: '/job' },
      // { name: '企业管理', url: '/ohome' },
      { name: '职位管理', url: '/osend' },
      { name: '应聘管理', url: '/oresume' },
      { name: '项目/培训管理', url: '/owaibao' }
    ];
  }
  setInfo(): void {
    // console.log("ngDoCheck");
    if (!localStorage.getItem('USER_KEY')) {
      // 是否登录
      window.location.href = '#/login';
    }
    this.userKey = localStorage.getItem('USER_KEY');
    if (this.router.url === '/login' || this.router.url === '/register') {
      this.isMenu = false;
    } else {
      this.isMenu = true;
    }
    if (
      this.router.url === '/phome' ||
      this.router.url === '/psend' ||
      this.router.url === '/presume'
    ) {
      this.isPerson = true;
    } else {
      this.isPerson = false;
    }
    if (
      this.router.url === '/job' ||
      this.router.url === '/ohome' ||
      this.router.url === '/osend' ||
      this.router.url === '/oresume' ||
      this.router.url === '/owaibao'
    ) {
      this.isOrg = true;
    } else {
      this.isOrg = false;
    }
    if (localStorage.getItem('MENU_INFO') === 'yes') {
      this.isLogin = true;
    }
  }
  goPage(url: string): void {
    window.location.href = url;
  }
  goLoginOut(): void {
    localStorage.setItem('MENU_INFO', 'no');
    this.isLogin = false;
    window.location.href = '#/login';
  }
}
