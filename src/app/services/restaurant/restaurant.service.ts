import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from 'src/app/models/listResponseModel';
import { ResponseModel } from 'src/app/models/responseModel';
import { AddCommentDto } from 'src/app/models/restaurant/addCommentDto';

import { FavoriteRestaurantDto } from 'src/app/models/restaurant/favoriteRestaurantDto';
import { Restaurant } from 'src/app/models/restaurant/restaurant';
import { RestaurantComment } from 'src/app/models/restaurant/restaurantComment';
import { RestaurantDto } from 'src/app/models/restaurant/restaurantDto';
import { RestaurantMenu } from 'src/app/models/restaurant/restaurantMenu';
import { SingleResponseModel } from 'src/app/models/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {
  apiURL:string = "https://localhost:44398/api/Restaurant";
  apiURL2:string = "https://localhost:44398/api/Menu";
  apiURL3:string = "https://localhost:44398/api/FavoriteRestaurant";
  apiURL4:string = "https://localhost:44398/api/RestaurantComment";
  constructor(private httpClient:HttpClient) { }
  

  getAllRestaurants():Observable<ListResponseModel<RestaurantDto>> {
    return this.httpClient.get<ListResponseModel<RestaurantDto>>(this.apiURL +"/GetAllWithImage");
  }

  getRestaurantDetails(restaurantId:string):Observable<SingleResponseModel<RestaurantDto>>{
    return this.httpClient.get<SingleResponseModel<RestaurantDto>>(this.apiURL +"/getdetailsdtobyid?id="+restaurantId);
  }

  getRestaurantMenusByRestaurantId(restaurantId:string):Observable<ListResponseModel<RestaurantMenu>>{
    return this.httpClient.get<ListResponseModel<RestaurantMenu>>(this.apiURL2 +"/GetMenuDetailsByRestaurantId?restaurantId=" + restaurantId);
  }

  addFavoriteService(favoriteRestaurant:RestaurantDto):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiURL3 +"/add",favoriteRestaurant);
  }
  getFavoriteRestaurantsByCustomerId(customerId:String):Observable<ListResponseModel<FavoriteRestaurantDto>>{
    return this.httpClient.get<ListResponseModel<FavoriteRestaurantDto>>(this.apiURL3 +"/GetFavoriteRestaurantByCustomerID?id=" + customerId)
  }

  deleteFavoriteRestaurant(id:string):Observable<ResponseModel> {
    return this.httpClient.get<ResponseModel>(this.apiURL3 +"/Delete?id=" + id)
  }

  getRestaurantsByCategoryId(...categoryId:string[]):Observable<ListResponseModel<RestaurantDto>> {
    return this.httpClient.get<ListResponseModel<RestaurantDto>>(this.apiURL + "/GetRestaurantsByCategoryId?categoryId=" + categoryId);
  }

  getRestaurantCommentsByRestaurantId(restaurantId:string):Observable<ListResponseModel<RestaurantComment>> {
    return this.httpClient.get<ListResponseModel<RestaurantComment>>(this.apiURL4 + "/GetCommentsByRestaurantId?restaurantId=" + restaurantId)
  }

  addComment(comment:AddCommentDto):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiURL4 +"/add",comment);
  }

}
