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
    parkingType: new FormControl(''),
    vehicleRegistrationNumber: new FormControl(''),
    customerName: new FormControl(''),
    vehicleType: new FormControl(''),
    floor: new FormControl(''),
    slot: new FormControl(''),
    availabilty:new FormControl('A')
  })
  page:number=1;
  pageSize:number=10;
  collectionSize:number=0;
  vehichleTypes: any[] = [
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
    if(this.searchForm.get("parkingType")?.value){
    searchRequest.parkingType=this.searchForm.get("parkingType")?.value;
    }else{
      searchRequest.parkingType=null;
    }
    if(this.searchForm.get("availabilty")?.value&&this.searchForm.get("availabilty")?.value!='A'){
      searchRequest.availabilty=this.searchForm.get("availabilty")?.value;
    }
    this.parkingService.search(searchRequest).subscribe({next:(data:any)=>{
        this.parkingDetails=data.parkingDetails;
        this.collectionSize=data?.total;
        console.log(data);
    },error:(err:any)=>{

    }

    })
  }
  pageChange(event:any){
    console.log(event);
  }
}
