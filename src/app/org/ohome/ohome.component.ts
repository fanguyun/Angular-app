import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ohome',
  templateUrl: './ohome.component.html',
  styleUrls: ['./ohome.component.css']
})
export class OhomeComponent implements OnInit {
  imageUrl: String;
  orgText: String;
  orgGuimo: String;
  orgXinzhi: String;
  orgHangye: String;
  orgAddres: String;
  orgLink: String;
  constructor() { }
  handleMaolink(name): void {
    let offTop = document.getElementById(name).offsetTop
    document.body.scrollTop = document.documentElement.scrollTop = offTop
    // this.router.navigate(['presume'],{ fragment: name })
  }
  successHandle(file: any): void {
    this.imageUrl = URL.createObjectURL(file.raw)
  }
  ngOnInit() {
  }

}
