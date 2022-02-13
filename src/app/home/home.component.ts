import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ParkingService } from '../service/parking.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  err:boolean=false;
  homeDetails!:any;
  vehicleType:any=0;
  transactionSummary!:any;
  vehichleTypes: any[] = [
    { value: 0, key: 'BIKE' }, { value: 1, key: 'CAR' }, { value: 2, key: 'BUS' }]
  constructor(private parkingService: ParkingService,private route:Router) { }

  ngOnInit(): void {
  this.parkingService.getHomeDetails().subscribe({
    next:(data:any)=>{
      this.homeDetails=data;
      this.getTransactionSummary();
      },error:(err:any)=>{
      err
    }
  })
  
  
  }
  getTransactionSummary(){
    console.log(event)
    console.log("transaction");
    console.log(this.vehicleType);
    this.parkingService.getTransaction(this.vehicleType).subscribe({
      next:(data:any)=>{
        this.transactionSummary=data;
      },error:(err:any)=>{

      }
    })
  }


}
