import { Component, OnInit } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { FormBuilder, Validators, AbstractControl } from "@angular/forms";
import { ActivatedRoute,Router } from "@angular/router";
import { UserService } from "../_services/user.service";

export class Fitness {
  constructor(
    public inr: number,
    public paisa: number,
    public streetaddress: string,
    public city: string,
    public state: string,
    public country: string,
    public pincode: number,
    public phonenumber: number,
    public email: string,
    public firstname: string,
    public lastname: string,
    public age: number,
    public trainerpreference: string,
    public physiotherapist: string,
    public packages: string,
  ) 
  {}
}

@Component({
  selector: "app-place-fitness-trainer-appointment",
  templateUrl: "./place-fitness-trainer-appointment.component.html",
})
export class PlaceFitnessTrainerAppointmentComponent implements OnInit {
  fitnessForm: FormGroup;
  submitted = false;
  fitness: Fitness;
  min = 18;
  max = 60;
  id: number

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router : Router,
    private route: ActivatedRoute
  ) {}
 

  ngOnInit() {
    
    this.id = this.route.snapshot.params['id'];//For edit
   // console.log(this.id);
    this.fitness = new Fitness(0,0,'','','','',null,null,'','','',null,'male','yes','Onetime');
    if(this.id){
  
      this.userService.getAppointmentById(this.id).subscribe(
        response =>{
        //  console.log("data for edit " + response);
          this.fitness = response;

        }
      );
    }
   
    this.fitnessForm = this.formBuilder.group({
      inr:["",Validators.required],
      paisa :["",Validators.required],
      streetaddress: ["",Validators.required],
      city:  ["",Validators.required],
      state: ["",Validators.required],
      country: ["",Validators.required],
      pincode:["",[Validators.required, Validators.pattern("[0-9]*"),Validators.minLength(6),Validators.maxLength(6)]],
      firstname: ["", [Validators.required, Validators.pattern("[a-zA-Z ]*")]],
      lastname: ["", [Validators.required, Validators.pattern("[a-zA-Z ]*")]],
      age: [null, [Validators.required, this.AgeValidator]],
      email: ["", [Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]],
      phonenumber: ['', [Validators.required, Validators.pattern("[0-9]*")]],
      trainerpreference: ["male", Validators.required],
      physiotherapist :['yes', Validators.required],
      packages :["",Validators.required]
    });

    this.fitnessForm.controls['packages'].valueChanges.subscribe((value) => {    
      this.fitnessForm.patchValue({inr: value,paisa:0});
   }
   );
 

  }

  get f() {
    return this.fitnessForm.controls;
  }

  AgeValidator(control: AbstractControl): { [key: string]: boolean } | null {
    if ((control.value < 18 || control.value > 60) && control.value) {
      return { age: true };
    }
    return null;
  }

  
  onSubmit() {
  
    
    this.submitted = true;

    // stop here if form is invalid
    if (this.fitnessForm.invalid) {
      return;
    }
    
    let inr = this.fitnessForm.controls["inr"].value;;
    let paisa = this.fitnessForm.controls["paisa"].value;;
    let streetaddress = this.fitnessForm.controls["streetaddress"].value;
    let city = this.fitnessForm.controls["city"].value;
    let state = this.fitnessForm.controls["state"].value;
    let country = this.fitnessForm.controls["country"].value;
    let pincode = this.fitnessForm.controls["pincode"].value;
    let phonenumber = this.fitnessForm.controls["phonenumber"].value;
    let firstname = this.fitnessForm.controls["firstname"].value;
    let lastname = this.fitnessForm.controls["lastname"].value;
    let email = this.fitnessForm.controls["email"].value;
    let age = this.fitnessForm.controls["age"].value;
    let trainerpreference = this.fitnessForm.controls["trainerpreference"].value;
    let physiotherapist = this.fitnessForm.controls["physiotherapist"].value;
    let packages = this.fitnessForm.controls["packages"].value;


    this.fitness = new Fitness(
      inr,
      paisa,
      streetaddress,
      city,
      state,
      country,
      pincode,
      phonenumber,
      email,
      firstname,
      lastname,
      age,
      trainerpreference,
      physiotherapist,
      packages,
  
    );

    if(this.id){
      this.userService.editAppointmentById(this.id,this.fitness).subscribe(
        response =>{
         // console.log("FROM API put" + response);
          this.router.navigate(['view-appointment']);
          this.fitnessForm.reset();
          alert("Changes saved!");
          
        }
      );
    }else{
      this.userService.postfitnessdata(this.fitness).subscribe((response) => {
       // console.log("FROM API post" + response);
        this.router.navigate(['landing-page']);
        this.fitnessForm.reset();
        alert("Appointment placed!");
      });
    }
   
  }
}
