import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CategoryDto } from 'src/app/models/category/categoryDto';
import { ListResponseModel } from 'src/app/models/listResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  apiURL:string = "https://localhost:44398/api/Category";

  constructor(private httpClient:HttpClient) { }

  getAllCategories():Observable<ListResponseModel<CategoryDto>> {
    return this.httpClient.get<ListResponseModel<CategoryDto>>(this.apiURL +"/GetAllWithImage");
  }
}
