import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NewEntry } from '../model/new-entry';
import { ParkingService } from '../service/parking.service';

@Component({
  selector: 'app-new-entry',
  templateUrl: './new-entry.component.html',
  styleUrls: ['./new-entry.component.scss']
})
export class NewEntryComponent implements OnInit {
  parkingForm: FormGroup = this.fb.group({
    parkingType: new FormControl('', Validators.required),
    vehicleRegistrationNumber: new FormControl('', Validators.required),
    customerName: new FormControl('', Validators.required),
    phNumber: new FormControl('', Validators.required),
    vehicleType: new FormControl('', Validators.required),
    fee: new FormControl()
  })
  vehichleTypes: any[] = [{ value: -1, key: 'Select Vehichle Type' },
  { value: 0, key: 'BIKE' }, { value: 1, key: 'CAR' }, { value: 2, key: 'BUS' }]
  submitted: boolean = false;
  error: boolean = false;
  errMsg!:string;
  constructor(private fb: FormBuilder, private parkingService: ParkingService, private route: Router) { }

  ngOnInit(): void {
  }

  submit() {
    console.log('submit');
    if (this.parkingForm.get('parkingType')?.value === 'RESERVE') {
      this.parkingForm.controls['fee'].setValidators([Validators.required]);
      this.parkingForm.controls['fee'].updateValueAndValidity();
            console.log("entered",this.parkingForm.valid);
    }else{
      this.parkingForm.controls['fee'].setValidators([]);
      this.parkingForm.controls['fee'].updateValueAndValidity();
            console.log("else",this.parkingForm.valid);
    }
    this.submitted = true;
    if (this.parkingForm.valid) {
      let newEntry = new NewEntry(this.parkingForm.get('customerName')?.value,
        this.parkingForm.get('parkingType')?.value, this.parkingForm.get('vehicleRegistrationNumber')?.value,
        this.parkingForm.get('phNumber')?.value, this.parkingForm.get('vehicleType')?.value, this.parkingForm.get('fee')?.value);

      this.parkingService.park(newEntry).subscribe({
        next: (data: any) => {
          console.log(data);
          this.route.navigate(['/slotDetails/' + data?.id]);
        }, error: (res) => {
          this.errMsg=res?.error?.message;
          this.error = true;
        }
      })
    }
  }
}
