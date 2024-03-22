import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { datamodel } from './components/jira/model';

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
}
