import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { SliderComponent } from './components/slider/slider.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { FeaturedRestaurantsComponent } from './components/featured-restaurants/featured-restaurants.component';
import { RestaurantsComponent } from './components/restaurants/restaurants.component';
import { MatRadioModule} from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RestaurantComponent } from './components/restaurant/restaurant.component';
import { HomeComponent } from './components/home/home.component';
import { RestaurantDetailComponent } from './components/restaurant/restaurant-detail/restaurant-detail.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { AccountComponent } from './components/account/account.component';
import { OrdersComponent } from './components/orders/orders.component';
import { SupportComponent } from './components/support/support.component';
import { CartComponent } from './components/cart/cart.component';
import { FavoriteRestaurantsComponent } from './components/favorite-restaurants/favorite-restaurants.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { HttpClientModule } from '@angular/common/http';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MenuPipePipe } from './pipes/menu-pipe.pipe';
import { RestaurantPipePipe } from './pipes/restaurant-pipe.pipe';




@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    SliderComponent,
    CategoriesComponent,
    FeaturedRestaurantsComponent,
    RestaurantsComponent,
    RestaurantComponent,
    HomeComponent,
    RestaurantDetailComponent,
    LoginComponent,
    RegisterComponent,
    AccountComponent,
    OrdersComponent,
    SupportComponent,
    CartComponent,
    FavoriteRestaurantsComponent,
    MenuPipePipe,
    RestaurantPipePipe,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatDialogModule,
    BrowserAnimationsModule,
    MatRadioModule,
    MatCheckboxModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ToastrModule.forRoot({
      timeOut: 1000,
      preventDuplicates: false,
      closeButton: true,
      countDuplicates: true,
      positionClass: "toast-bottom-right",
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
