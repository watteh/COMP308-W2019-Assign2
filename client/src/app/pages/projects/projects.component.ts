// projects.component.ts -- Ryan Watson -- 300920674 -- 02/06/19
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {
  // setting title variable for projects page
  title = `My Projects`;

  constructor() { }

  ngOnInit() {

  }

}
