import { Component, OnInit } from '@angular/core';
// import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-notifier',
  templateUrl: './notifier.component.html',
  styleUrls: ['./notifier.component.css']
})
export class NotifierComponent implements OnInit {

  constructor() { }
  // private toastr:ToastrService

  ngOnInit(): void {
  }

  // ShowSuccess(){
  //   this.toastr.success('Toastr Added successfully')
  // }

}
