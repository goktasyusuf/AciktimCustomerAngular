import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CustomerAddress } from 'src/app/models/customer/customerAddress';
import { ListResponseModel } from 'src/app/models/listResponseModel';
import { ResponseModel } from 'src/app/models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  apiURL:string = "https://localhost:44398/api/CustomerAddresses";
  constructor(private httpClient:HttpClient) { }

  addAddress(customer:CustomerAddress):Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(this.apiURL + "/add",customer);
  }

  getAddressDetailsByCustomerId(customerId:string):Observable<ListResponseModel<CustomerAddress>>{
    return this.httpClient.get<ListResponseModel<CustomerAddress>>(this.apiURL + "/getallbycustomerid?id=" + customerId);
  }

  deleteAddress(customerAddressId:string):Observable<ResponseModel> {
    return this.httpClient.get<ResponseModel>(this.apiURL +"/delete?id=" +customerAddressId)
  }

  updateAddress(customerAddress:CustomerAddress):Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(this.apiURL + "/update",customerAddress);   
  }
  
}
