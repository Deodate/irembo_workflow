import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-jira',
  // standalone: true,
  // imports: [RouterModule, HeaderComponent],
  templateUrl: './jira.component.html',
  styleUrls: ['./jira.component.css']
})
export class JiraComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
