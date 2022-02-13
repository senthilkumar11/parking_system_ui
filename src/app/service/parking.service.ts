import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Coupon } from '../model/coupon';
import { Fee } from '../model/fee';
import { NewEntry } from '../model/new-entry';
import { SearchRequest } from '../model/search-request';
import { System } from '../model/system';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class ParkingService {
  getTransaction(vehicleType: any) {
    return this.httpService.get("parking/transaction/"+vehicleType);
  }
  getHomeDetails() {
    return this.httpService.get("parking/home");
  }
  applyDiscount(couponCode: string, id: any) {
    let coupon=new Coupon();
    coupon.code=couponCode;
    return this.httpService.put("parking/coupon/apply/"+id,coupon);

  }
  getDiscountDetails(page: number, pageSize: number, searchData: string) {
    let search={
      searchData:searchData
    }
    return this.httpService.get("parking/coupon/"+page+"/"+pageSize+"/",search);
  }
  generateCoupon(coupon: Coupon) {
    return this.httpService.post("parking/coupon",coupon);
  }
  updateFee(fee: Fee) {
    return this.httpService.post("parking/fee",fee);
  }
  getFeeDetails() {
    return this.httpService.get("parking/fee");
  }
  search(searchRequest:SearchRequest) {
    return this.httpService.post("parking/search",searchRequest);
  }
  collectFee(id: number) {
    return this.httpService.put("parking/collectfee/"+id);
  }
  unPark(id: number) {
    return this.httpService.put("parking/unPark/"+id);
  }
  getDetails(id: any) {
   return this.httpService.get("parking/"+id);
  }
  park(newEntry: NewEntry) {
    return this.httpService.post('parking/park',newEntry);
  }

  constructor(private httpService:HttpService) { }

  createSystem(system:System){
    return this.httpService.post('parking/system',system);
  }
}
