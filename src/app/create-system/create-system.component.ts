import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { System } from '../model/system';
import { ParkingService } from '../service/parking.service';

@Component({
  selector: 'app-create-system',
  templateUrl: './create-system.component.html',
  styleUrls: ['./create-system.component.scss']
})
export class CreateSystemComponent implements OnInit {
  systemForm:FormGroup=this.fb.group({
    noOfFloors:new FormControl('',[Validators.required]),
    slotsPerFloor:new FormControl('',[Validators.required])
  });
  submitted:boolean=false;
  error:boolean=false;
  created:boolean=false;
  constructor(private router: Router, private fb: FormBuilder,private parkingService:ParkingService) { }

  ngOnInit(): void {
  }
  submit(){
    console.log('submit');
   
    this.submitted=true; 
    if(this.systemForm.valid){
      let system=new System(this.systemForm.get('noOfFloors')?.value,this.systemForm.get('slotsPerFloor')?.value);
      this.parkingService.createSystem(system).subscribe({next:data=>{
        this.created=true;
      },error:(err)=>{
        console.log(err)
        if(err?.status===400)
        this.error=true;
      }})
    }
  }

}
