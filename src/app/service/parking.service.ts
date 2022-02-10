import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { NewEntry } from '../model/new-entry';
import { SearchRequest } from '../model/search-request';
import { System } from '../model/system';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class ParkingService {
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
