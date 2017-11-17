import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ElModule } from 'element-angular'
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import 'rxjs/add/operator/map';

import 'element-angular/theme/index.css'

/*组件*/
import { AppComponent } from './app.component';
import { HeadComponent } from './head.component';
import { FootComponent } from './foot.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { MainComponent } from './main/main.component';
import { JoinComponent } from './join/join.component';
import { JoinshowComponent } from './joinshow/joinshow.component';

/*服务*/
import { LoginService } from "./service/login.service";
import { JoinindexComponent } from './joinindex/joinindex.component';


const routes: Routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'main', component: MainComponent},
  {
    path: 'join', component: JoinComponent, children: [ // 嵌套子路由
      {path: 'index', component: JoinindexComponent},
      {path: 'show', component: JoinshowComponent},
      {path: '**', redirectTo: "index"} // 默认子路由
    ]
  },

];

@NgModule({
  declarations: [
    AppComponent,
    HeadComponent,
    FootComponent,
    LoginComponent,
    RegisterComponent,
    MainComponent,
    JoinComponent,
    JoinshowComponent,
    JoinindexComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ElModule.forRoot(),
    RouterModule.forRoot(routes)
  ],
  providers: [
    LoginService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
