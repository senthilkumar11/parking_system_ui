import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Coupon } from '../model/coupon';
import { ParkingService } from '../service/parking.service';

@Component({
  selector: 'app-generate-coupon',
  templateUrl: './generate-coupon.component.html',
  styleUrls: ['./generate-coupon.component.scss']
})
export class GenerateCouponComponent implements OnInit {
  feeDiscountForm: FormGroup = this.fb.group({

    count: new FormControl('', [Validators.required,Validators.min(1),Validators.max(100)]),
    hourlyFeeDiscount: new FormControl('', [Validators.required,Validators.min(0),Validators.max(100)]),
    basicFeeDiscount: new FormControl('', [Validators.required,Validators.min(0),Validators.max(100)])
  })
  submitted: boolean = false;
  error: boolean = false;
  feeDiscountDetails!: any[];
  page:number=1;
  pageSize:number=10;
  collectionSize:number=0;
  searchData:string="";
  success:boolean=false;
  constructor(private fb: FormBuilder, private parkingService: ParkingService, private route: Router) { }


  ngOnInit(): void {
    this.getDiscountDetails();
  }
  submit(){
    console.log("submit")
    this.submitted=true;
    if(this.feeDiscountForm.valid){
      let coupon=new Coupon();
      coupon.basicDiscount=this.feeDiscountForm.get('basicFeeDiscount')?.value;
      coupon.hourlyDiscount=this.feeDiscountForm.get('hourlyFeeDiscount')?.value;
      coupon.count=this.feeDiscountForm.get('count')?.value;
      this.parkingService.generateCoupon(coupon).subscribe({
        next:(data:any)=>{

          this.page=1;
          this.getDiscountDetails()
        },error:(err:any)=>{
          this.error=true;
        }
      })

    }
  }
  pageChange(event:any){
    this.getDiscountDetails();
  }
  search(){
    this.page=1;
    this.getDiscountDetails();
  }
  getDiscountDetails(){
    this.parkingService.getDiscountDetails(this.page,this.pageSize,this.searchData).subscribe({next:(res:any)=>{
      this.feeDiscountDetails=res?.couponDetails;
      this.collectionSize=res?.total;
    },error:(err:any)=>{

    }

    })
  }
}
