// services.component.ts -- Ryan Watson -- 300920674 -- 02/06/19
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css']
})
export class ServicesComponent implements OnInit {
  // setting title variable for services page
  title = `Services`;

  constructor() { }

  ngOnInit() {

  }

}
