import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

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
  constructor(private router: Router, private fb: FormBuilder) { }

  ngOnInit(): void {
  }
  submit(){
    console.log('submit');
    if(this.systemForm.get('noOfFloors')?.valid){

    }else if(this.systemForm.get('noOfFloors')?.valid){

    }
    if(this.systemForm.valid){

    }
  }

}
