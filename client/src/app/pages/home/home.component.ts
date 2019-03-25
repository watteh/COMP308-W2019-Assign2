// home.component.ts -- Ryan Watson -- 300920674 -- 02/06/19

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  // sets title variable for home page
  title = `Welcome to Watson Innovation`;

  constructor() { }

  ngOnInit() {
  }

}
