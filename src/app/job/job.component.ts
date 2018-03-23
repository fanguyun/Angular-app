import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-job',
  templateUrl: './job.component.html',
  styleUrls: ['./job.component.scss']
})
export class JobComponent implements OnInit {
  input: any;
  value: any;
  cityList: Array<{ label: string; value: string }>;
  constructor() {}

  ngOnInit() {
    this.cityList = [
      { label: '深圳', value: '深圳' },
      { label: '深圳2', value: '深圳2' }
    ];
  }
  handle(e): void {}
  clear(): void {}
}
