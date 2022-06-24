import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { product } from 'products';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private REST_API_SERVER = 'http://localhost:3000/products/'

  constructor(private httpClient: HttpClient) {}

  public sendGetRequest() {
    return this.httpClient.get<product[]>(this.REST_API_SERVER);
  }

  public getProduct(id:number){
    return this.httpClient.get<product[]>(this.REST_API_SERVER + id);
  }

  public addProduct(item:product){
   return this.httpClient.post<product>(this.REST_API_SERVER , item);
  }

  public delItem(id:number){
    return this.httpClient.delete<product>(this.REST_API_SERVER + id)
  }


}

