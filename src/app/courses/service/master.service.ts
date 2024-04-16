import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MasterService {

  constructor() { }

  listarray=[{"name":"Deodate","money":"1,000,000 USD"}];

  GetData(){
    return this.listarray;
  }

  SaveData(Input:any){
    this.listarray.push(Input);
  }
}
