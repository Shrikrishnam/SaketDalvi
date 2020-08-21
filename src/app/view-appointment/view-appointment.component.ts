import { Component, OnInit } from '@angular/core';
import { UserService } from "../_services/user.service";
import {Fitness} from "../place-fitness-trainer-appointment/place-fitness-trainer-appointment.component";
import { ActivatedRoute,Router } from "@angular/router";


@Component({
  selector: 'app-view-appointment',
  templateUrl: './view-appointment.component.html'
})
export class ViewAppointmentComponent implements OnInit {

  fitness : Fitness
  appointments : Fitness[]
  allJSONs:Fitness[]
  id:number

  constructor(
    private userService: UserService,
    private router : Router,
    private route: ActivatedRoute) { }

  

  ngOnInit() {

    this.getfitness();
   
    
  }
  
  getfitness() {
    this.appointments = []
    this.userService.getfitnessdata().subscribe(
      data=>{
       // console.log(data);
        this.allJSONs = data;

        this.allJSONs.forEach(element => {
          if(element.trainerpreference){
              this.appointments.push(element);
          }    
        });
        this.appointments.reverse();   
      }
    );
    
  }


  deleteAppointment(id){
 
    this.userService.deleteAppointmentById(id).subscribe(
      response =>{
       // console.log(response);
        this.getfitness();
        alert('Appointment Deleted!');
      }
    );
  }

  updateAppointment(id){
    this.router.navigate(["place-fitness-trainer-appointment",id]);

  }
}
