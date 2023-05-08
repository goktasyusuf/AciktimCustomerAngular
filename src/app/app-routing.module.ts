import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RestaurantComponent } from './components/restaurant/restaurant.component';
import { HomeComponent } from './components/home/home.component';
import { SliderComponent } from './components/slider/slider.component';
import { FeaturedRestaurantsComponent } from './components/featured-restaurants/featured-restaurants.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { RestaurantsComponent } from './components/restaurants/restaurants.component';
import { RestaurantDetailComponent } from './components/restaurant/restaurant-detail/restaurant-detail.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { AccountComponent } from './components/account/account.component';
import { OrdersComponent } from './components/orders/orders.component';

import { SupportComponent } from './components/support/support.component';
import { CartComponent } from './components/cart/cart.component';
import { FavoriteRestaurantsComponent } from './components/favorite-restaurants/favorite-restaurants.component';

import { AuthGuardGuard } from './guards/auth-guard.guard';


const routes: Routes = [
  {path:"",pathMatch:"full",component:HomeComponent,children:[
    {path:"",component:SliderComponent},
    {path:"",component:FeaturedRestaurantsComponent},
    {path:"",component:CategoriesComponent},
    {path:"",component:RestaurantsComponent},
    {path:":id",component:RestaurantsComponent},
  ]},
  {path:"restaurant/:restaurantId",component:RestaurantComponent,children:[
    {path:"",component:RestaurantDetailComponent},
  ]},
  {path:"auth/login",component:LoginComponent},
  {path:"auth/register",component:RegisterComponent},
  {path:"account",component:AccountComponent ,canActivate:[AuthGuardGuard]},
  {path:"orders",component:OrdersComponent ,canActivate:[AuthGuardGuard]},

  {path:"support",component:SupportComponent},
  {path:"cart",component:CartComponent ,canActivate:[AuthGuardGuard]},
  {path:"favoriteRestaurants",component:FavoriteRestaurantsComponent ,canActivate:[AuthGuardGuard]},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
