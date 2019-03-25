// about.component.ts -- Ryan Watson -- 300920674 -- 02/06/19

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  // setting page title variable
  title = `About Ryan Watson`;
  constructor() { }

  ngOnInit() {

  }

}
