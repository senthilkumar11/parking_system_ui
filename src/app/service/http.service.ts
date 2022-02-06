import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class HttpService {

  constructor(private http: HttpClient) {
  }

  get(url:string, param?: any,reqData?:any, options?: any) {
    let header = new HttpHeaders();
    header = header.append('content-type', 'application/json');
    // console.log("options from get: " + options);
    if (options) {
      header = options;
      if (options.headers.get('USERNAME') === null)
        options.headers.append('USERNAME', 'TESTUSER');
    }
    return this.http.get(environment.baseURL + url + this.queryString(param),{params:reqData,headers: header});
  }

  post(url:string, params?: any, options?: any) {
    let header = new HttpHeaders();
    header = header.append('content-type', 'application/json');
    // console.log("options from post: " + options);
    if (options) {
      header = options;
      if (options.headers.get('USERNAME') === null)
        options.headers.append('USERNAME', 'TESTUSER');
    }
    return this.http.post(environment.baseURL + url, JSON.stringify(params), { headers: header });
  }

  put(url:string, params?: any, options?: any) {
    let header = new HttpHeaders();
    header = header.append('content-type', 'application/json');
    if (options) {
      header = options;
      if (options.headers.get('USERNAME') === null)
        options.headers.append('USERNAME', 'TESTUSER');
    }
    return this.http.put(environment.baseURL + url, JSON.stringify(params), { headers: header });
  }

  delete(url:string, params?: any, options?: any) {
    return this.http.delete(environment.baseURL + url + this.queryString(params));
  }

  private queryString(jsonArray:any) {
    if (!jsonArray || jsonArray.length === 0) {
      return '';
    }
    const str = [];
    for (const p in jsonArray) {
      if (jsonArray.hasOwnProperty(p)) {
        str.push(encodeURIComponent(p) + '=' + encodeURIComponent(jsonArray[p]));
      }
    }
    if (str.length > 0) {
      return '?' + str.join('&');
    }
    return '';
  }

}
