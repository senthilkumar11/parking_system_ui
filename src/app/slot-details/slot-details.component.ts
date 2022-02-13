import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ParkingService } from '../service/parking.service';

@Component({
  selector: 'app-slot-details',
  templateUrl: './slot-details.component.html',
  styleUrls: ['./slot-details.component.scss']
})
export class SlotDetailsComponent implements OnInit {

  parkingDetails!: any;
  couponCode!: string;
  applyCoupon!: boolean;
  err: boolean = false;
  errApplyingCoupon:boolean=false
  constructor(private activatedRoute: ActivatedRoute, private parkingService: ParkingService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((data: any) => {
      console.log(data);
      if (data?.id) {
        this.parkingService.getDetails(data.id).subscribe({
          next: (res: any) => {
            console.log(res);
            this.parkingDetails = res;
            this.couponCode=res?.coupon?.coupon;
          }, error: (res: any) => {

          }
        })
      }
    })
  }
  applyCouponCode() {
    this.applyCoupon = true;
    if (this.couponCode) {
      this.parkingService.applyDiscount(this.couponCode, this.parkingDetails.id).subscribe({
        next: (res: any) => {
          this.parkingDetails = res;
          this.errApplyingCoupon=false;
        }, error: (err: any) => {
          this.errApplyingCoupon=true
        }
      })
    }
  }
  unPark(id: number) {
    this.parkingService.unPark(id).subscribe({
      next: (res: any) => {
        this.parkingDetails = res;
      }, error: () => {
        this.err = true;
      }
    })
  }
  collectFee(id: number) {
    this.parkingService.collectFee(id).subscribe({
      next: (res: any) => {
        this.parkingDetails = res;
      }, error: () => {

      }
    })
  }

}
