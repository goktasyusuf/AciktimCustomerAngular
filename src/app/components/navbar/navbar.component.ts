import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { RestaurantMenu } from 'src/app/models/restaurant/restaurantMenu';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  itemsInCart: RestaurantMenu[] = []
  constructor(private authService:AuthService,private router:Router,private toastrService:ToastrService){}
  ngOnInit(): void {
    this.getItemsInCart();

  }

  isAuthenticated() {
    if(localStorage.getItem('token')) {
      return true;
    }
    return false;
  }
  getItemsInCart() {
    var productListString = localStorage.getItem("menus");
    this.itemsInCart = productListString ? JSON.parse(productListString) : [];
  }
  logout(){
    if(this.itemsInCart.length == 0 ) {
      localStorage.removeItem('menus');
    }
    this.authService.logout();
    this.router.navigate(["/"]);
    this.toastrService.success("Başarıyla Çıkış Yapıldı","BAŞARILI")
    
  }

}
