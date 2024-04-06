import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { datamodel } from './components/jira/model';
import { WorflowSample } from './sample-workflow';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http:HttpClient) { }

  //create transition
  createtransition(data:datamodel){
     return this.http.post<datamodel>("http://localhost:3000/posts",data)
  } 
  gettransition(){
    return this.http.get<datamodel[]>("http://localhost:3000/posts");
  }
  getWorkflowData() {
    // This will return the workflow data directly
    return WorflowSample.sample2; 
  }
}
