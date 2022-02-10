import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ParkingService } from '../service/parking.service';

@Component({
  selector: 'app-slot-details',
  templateUrl: './slot-details.component.html',
  styleUrls: ['./slot-details.component.scss']
})
export class SlotDetailsComponent implements OnInit {

  parkingDetails!:any;
  constructor(private activatedRoute:ActivatedRoute,private parkingService:ParkingService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((data:any)=>{
      console.log(data);
      if(data?.id){
         this.parkingService.getDetails(data.id).subscribe({next:(res:any)=>{
              console.log(res);
              this.parkingDetails=res;
         },error: (res:any)=>{

         }})
      }
    })
  }
  unPark(id:number){
      this.parkingService.unPark(id).subscribe({next:(res:any)=>{
        this.parkingDetails=res;
      },error:()=>{

      }})
  }
  collectFee(id:number){
    this.parkingService.collectFee(id).subscribe({next:(res:any)=>{
      this.parkingDetails=res;
    },error:()=>{

    }})
  }

}
