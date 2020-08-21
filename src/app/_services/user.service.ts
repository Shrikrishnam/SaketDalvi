import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions, Response } from "@angular/http";
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Fitness } from '../place-fitness-trainer-appointment/place-fitness-trainer-appointment.component';

const httpOptions = {
  headers: new Headers({ "Content-Type": "application/json" })
};

@Injectable({ providedIn: 'root' })
export class UserService {

    public static BaseUrl = "http://localhost:6565/";

    constructor(private http: HttpClient) { }
    // postfitnessdata(data){
    //   return this.http.post(UserService.BaseUrl+'allfriends',data,httpOptions).pipe(map((response: Response) => response.json()));
    // }
    postfitnessdata(data){
      return this.http.post(UserService.BaseUrl+'allfriends',data);
    }
    getfitnessdata(){
      return this.http.get<Fitness[]>(UserService.BaseUrl+'allfriends');
    }
    deleteAppointmentById(id){
      return this.http.delete(UserService.BaseUrl+`allfriends/${id}`);
    }
    editAppointmentById(id,data){
      return this.http.put(UserService.BaseUrl+`allfriends/${id}`,data);
    }
    getAppointmentById(id){
      return this.http.get<Fitness>(UserService.BaseUrl+`allfriends/${id}`);
    }
    // getFitnessData() {
    //   return this.http.get(UserService.BaseUrl+'allfriends',httpOptions).pipe(map((response: Response) => response.json()));
    // }
    // deleteAppointmentById(id){
    //   return this.http.delete(UserService.BaseUrl+'allfriends',httpOptions).pipe(map((response:Response) => response.json()));
    // }
}