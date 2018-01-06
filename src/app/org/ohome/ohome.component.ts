import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ohome',
  templateUrl: './ohome.component.html',
  styleUrls: ['./ohome.component.css']
})
export class OhomeComponent implements OnInit {

  constructor() { }
  handleMaolink(name): void {
    let offTop = document.getElementById(name).offsetTop
    document.body.scrollTop = document.documentElement.scrollTop = offTop
    // this.router.navigate(['presume'],{ fragment: name })
  }
  ngOnInit() {
  }

}
