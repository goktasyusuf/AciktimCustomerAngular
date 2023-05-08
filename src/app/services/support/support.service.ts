import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseModel } from 'src/app/models/responseModel';
import { Support } from 'src/app/models/support/support';

@Injectable({
  providedIn: 'root'
})
export class SupportService {
apiURL:string = "https://localhost:44398/api/Support"
  constructor(private httpClient:HttpClient) { }

  addSupportMessage(supportDto:Support):Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(this.apiURL +"/add",supportDto)
  }
}
