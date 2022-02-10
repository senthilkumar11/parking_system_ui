import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SearchRequest } from '../model/search-request';
import { ParkingService } from '../service/parking.service';

@Component({
  selector: 'app-parking-details',
  templateUrl: './parking-details.component.html',
  styleUrls: ['./parking-details.component.scss']
})
export class ParkingDetailsComponent implements OnInit {
  searchForm: FormGroup = this.fb.group({
    parkingType: new FormControl('D'),
    vehicleRegistrationNumber: new FormControl(''),
    customerName: new FormControl(''),
    vehicleType: new FormControl(''),
    floor: new FormControl(''),
    slot: new FormControl('')
  })
  page:number=1;
  pageSize:number=10;
  collectionSize:number=0;
  vehichleTypes: any[] = [{ value: -1, key: 'Select Vehichle Type' },
  { value: 0, key: 'BIKE' }, { value: 1, key: 'CAR' }, { value: 2, key: 'BUS' }]
  submitted: boolean = false;
  parkingDetails!:any;
  constructor(private fb: FormBuilder, private parkingService: ParkingService,private route:Router) { }

  ngOnInit(): void {
  }

  submit(){
    console.log("Submit");
    this.page=1;
    this.getData();
  }
  getData(){
    let searchRequest=new SearchRequest(); 
    searchRequest.pageSize=this.pageSize;
    searchRequest.pageNumber=this.page;
    searchRequest.customerName=this.searchForm.get("customerName")?.value;
    searchRequest.floor=this.searchForm.get("floor")?.value;
    searchRequest.slot=this.searchForm.get("slot")?.value;
    searchRequest.vehicleRegistrationNumber=this.searchForm.get("vehicleRegistrationNumber")?.value;
    if(this.searchForm.get("vehicleType")?.value&&this.searchForm.get("vehicleType")?.value!=-1)
    searchRequest.vehicleType=this.searchForm.get("vehicleType")?.value;
    searchRequest.parkingType=this.searchForm.get("parkingType")?.value;
    this.parkingService.search(searchRequest).subscribe({next:(data:any)=>{
        this.parkingDetails=data.parkingDetails;
        this.collectionSize=data?.pageTotal;
    },error:(err:any)=>{

    }

    })
  }
  pageChange(event:any){
    console.log(event);
  }
}
