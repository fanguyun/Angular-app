import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ElModule } from 'element-angular'
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
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
import { JoinshowComponent } from './join/joinshow/joinshow.component';

/*服务*/
import { LoginService } from "./service/login.service";
import { JoinindexComponent } from './join/joinindex/joinindex.component';
import { ProjecComponent } from './projec/projec.component';
import { TrainComponent } from './train/train.component';
import { JobComponent } from './job/job.component';
import { PhomeComponent } from './person/phome/phome.component';
import { PsendComponent } from './person/psend/psend.component';
import { PresumeComponent } from './person/presume/presume.component';
import { OhomeComponent } from './org/ohome/ohome.component';
import { OsendComponent } from './org/osend/osend.component';
import { OresumeComponent } from './org/oresume/oresume.component';


const routes: Routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'main', component: MainComponent},
  {path: 'job', component: JobComponent},
  {
    path: 'join', component: JoinComponent, children: [ // 嵌套子路由
      {path: 'index', component: JoinindexComponent},
      {path: 'show', component: JoinshowComponent},
      {path: '**', redirectTo: "index"} // 默认子路由
    ]
  },
  {path: 'project', component: ProjecComponent},
  {path: 'train', component: TrainComponent},
  {path: 'phome', component: PhomeComponent},
  {path: 'psend', component: PsendComponent},
  {path: 'presume', component: PresumeComponent},
  {path: 'ohome', component: OhomeComponent},
  {path: 'osend', component: OsendComponent},
  {path: 'oresume', component: OresumeComponent}
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
    JoinindexComponent,
    ProjecComponent,
    TrainComponent,
    JobComponent,
    PhomeComponent,
    PsendComponent,
    PresumeComponent,
    OhomeComponent,
    OsendComponent,
    OresumeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ElModule.forRoot(),
    RouterModule.forRoot(routes)
  ],
  providers: [
    LoginService,
    { provide: LocationStrategy, useClass: HashLocationStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
