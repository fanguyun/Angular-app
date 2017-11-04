import { Component } from '@angular/core';

@Component({
  selector: 'head-cont',
  template: `
  <div class="ali_head">
    <div class="ali_cont">
      <div el-row>
        <div el-col span="8">
          <div class="ali_logo">雄才联盟</div>
          <div class="ds_inline">
            <p>中国IT人才摇篮</p>
            <p>Cradle of IT Talent In China</p>
          </div>
        </div>
        <div el-col span="16">
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

export class HeadComponent {
  title = '处理中心';
}
