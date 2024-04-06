import { Component } from '@angular/core';
import { WorflowSample } from './sample-workflow';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'jiraworkflow';

  sampleWorkflow: any;

  constructor() {
    this.initSample()
    console.log("sampleflow", this.sampleWorkflow)
  }


  initSample() {
    this.sampleWorkflow = WorflowSample.sample2;
    // this.sampleWorkflow = WorflowSample.sample1;
    
  }
}

