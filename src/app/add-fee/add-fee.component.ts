import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Fee } from '../model/fee';
import { ParkingService } from '../service/parking.service';

@Component({
  selector: 'app-add-fee',
  templateUrl: './add-fee.component.html',
  styleUrls: ['./add-fee.component.scss']
})
export class AddFeeComponent implements OnInit {
  feeForm: FormGroup = this.fb.group({

    vehicleType: new FormControl('', Validators.required),
    basicFee: new FormControl('', Validators.required),
    hourlyFee: new FormControl('', Validators.required)
  })
  vehichleTypes: any[] = [{ value: "BIKE", key: 'BIKE' }, { value: "CAR", key: 'CAR' }, { value: "BUS", key: 'BUS' }]
  submitted: boolean = false;
  error: boolean = false;
  feeDetails!: any[];
  constructor(private fb: FormBuilder, private parkingService: ParkingService, private route: Router) { }

  ngOnInit(): void {
    console.log("infee")
    this.getFeeDetails();
  }
  submit() {
    console.log("submitted");
    this.submitted = true;
    if (this.feeForm.valid) {
      let fee = new Fee();
      fee.vehicleType = this.feeForm.get('vehicleType')?.value;
      fee.basicFee = this.feeForm.get('basicFee')?.value;
      fee.perHourFee = this.feeForm.get('hourlyFee')?.value;
      this.parkingService.updateFee(fee).subscribe({
        next: (data: any) => {
          this.getFeeDetails();
        }, error: (err: any) => {
          this.error = true;
        }
      })
    }
  }
  getFeeDetails() {
    this.parkingService.getFeeDetails().subscribe({
      next: (data: any) => {
        this.feeDetails = data;
      }

    })
  }
}
