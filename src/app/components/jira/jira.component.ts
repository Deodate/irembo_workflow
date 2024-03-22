import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder,FormGroup } from '@angular/forms';
import { ApiService } from 'src/app/api.service';
import { datamodel } from './model';

@Component({
  selector: 'app-jira',
  templateUrl: './jira.component.html',
  styleUrls: ['./jira.component.css']
})
export class JiraComponent implements OnInit {
  @ViewChild('graphContainer') graphContainer!: ElementRef;

  transitionform!:FormGroup;

  arrowIndices: any;
  bulletVisible = false;
  dragStartState: number | undefined; 
  dragEndState: number | undefined; 
  data:undefined|datamodel[];

  dragPositionStart = {x:150, y: 160};

  dragPositionTodo =  {x: 30, y: 115};

  dragPositionInProgress = {x: 430, y: 50};

  dragPositionDone = {x: 675, y: -62};
  item: any;

  constructor(private formbuilder:FormBuilder,private api:ApiService) { }

  ngOnInit(): void {
   this.transitionform=this.formbuilder.group({
    transition:['']
   })
   this.gettransition();
  }
  createtransition(data:datamodel){
    //  console.log(data)
    this.api.createtransition(data).subscribe((res=>{
      // this.transitionform.reset();
    }))
    this.gettransition();
  }

  gettransition(){
    this.api.gettransition().subscribe(res=>{
      this.data= res;
    })
  }
  }

