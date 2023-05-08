import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { RestaurantComment } from 'src/app/models/restaurant/restaurantComment';
import { RestaurantDto } from 'src/app/models/restaurant/restaurantDto';
import { RestaurantMenu } from 'src/app/models/restaurant/restaurantMenu';
import { RestaurantService } from 'src/app/services/restaurant/restaurant.service';

@Component({
  selector: 'app-restaurant-detail',
  templateUrl: './restaurant-detail.component.html',
  styleUrls: ['./restaurant-detail.component.css']
})
export class RestaurantDetailComponent implements OnInit {
  restaurant: RestaurantDto;
  star: number;
  addCommentForm: FormGroup;
  rate = new Array(0)
  remainderRate = new Array(0)
  restaurantMenuDetails: RestaurantMenu[]
  filtered: string;
  restaurantId: string;
  restaurantImage: string;
  comments: RestaurantComment[];
  id: any; // parametreden gelen restoran id
  restaurantRate = new Array(0);
  constructor(private restaurantService: RestaurantService, private activatedRoute: ActivatedRoute, private toastrService: ToastrService, private formBuilder: FormBuilder) { }
  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.getRestaurantDetail(params["restaurantId"])
      this.getRestaurantMenusByRestaurantId(params["restaurantId"])
      this.id = this.activatedRoute.snapshot.paramMap.get('restaurantId');
      this.getRestaurantCommentsByRestaurantId();
      this.createAddForm();
    })
  }

  createAddForm() {
    this.addCommentForm = this.formBuilder.group({
      restaurantId: [this.id, Validators.required],
      customerId: [localStorage.getItem('customerId'), Validators.required],
      commentTitle: ["", Validators.required],
      commentContent: ["", Validators.required],
      commentDate: [new Date().toLocaleDateString(), Validators.required],
      restaurantRate:["",Validators.required],
    });
  }

  getRate(element:number) {
    this.restaurantRate = new Array(element)
    return this.restaurantRate
  }

  addComment() {
    if (localStorage.getItem('customerId')) {
      if (this.addCommentForm.valid) {
        let model = Object.assign({}, this.addCommentForm.value)
        this.restaurantService.addComment(model).subscribe(response => {
          if (response.success) {
            this.toastrService.success("Yorumunuz başarıyla eklendi!", "BAŞARILI");
            this.getRestaurantCommentsByRestaurantId();
          }
        }, error => this.toastrService.error(error.error))
      }
      else {
        this.toastrService.info("Lütfen ilgili alanları doldurunuz!", "HATA")
      }
    }
    else {
      this.toastrService.error("Yorum yapmak için önce giriş yapınız!", "HATA")
    }
  }

  getRestaurantDetail(restaurantId: string) {
    this.restaurantService.getRestaurantDetails(restaurantId).subscribe(response => {
      if (response.success) {
        this.restaurant = response.data;
        this.star = response.data.restaurantRate;
        this.rate = new Array(Math.floor(this.restaurant.restaurantRate))
        this.remainderRate = new Array(5 - Math.floor(this.restaurant.restaurantRate))
        this.restaurantImage = response.data.imagePath
      }
    })
  }

  getImagePath(restaurantDto: RestaurantDto): string {
    let url: string;
    return restaurantDto.imagePath != null ? "http://127.0.0.1:4200/Restaurant/"
      + restaurantDto.id + "/" + restaurantDto.imagePath : "http://127.0.0.1:4200/Restaurant/noImage.png";
  }

  getRestaurantMenusByRestaurantId(restaurantId: string) {
    this.restaurantService.getRestaurantMenusByRestaurantId(restaurantId).subscribe(response => {
      if (response.success) {
        this.restaurantMenuDetails = response.data;
      }
    })
  }

  getMenusImagePath(restaurantDto: RestaurantMenu): string {
    return restaurantDto.menuImage == null ? "http://127.0.0.1:4200/Restaurant/noImage.png"
      : "http://127.0.0.1:4200/Menu/" + restaurantDto.id + "/" + restaurantDto.menuImage

  }

  addCart(menu: RestaurantMenu) {
    var newItem = {
      'menuTitle': menu.menuTitle,
      'menuImage': menu.menuImage == null ? "http://127.0.0.1:4200/Menu/noImage.png" : "http://127.0.0.1:4200/Menu/" + menu.id + "/" + menu.menuImage,
      'menuPrice': menu.menuPrice,
      'id': menu.id,
      'menuDescription': menu.menuDescription,
      'restaurantName': menu.restaurantName,
      'quantity': 1,
      'customerId': localStorage.getItem('customerId'),
      'restaurantId': menu.restaurantId,
      'restaurantImage': this.restaurantImage
    };
    var productListString = localStorage.getItem("menus");
    var productList = productListString ? JSON.parse(productListString) : [];

    if (productList.length != 0) {
      var temp = productList[0]
      this.restaurantId = temp.restaurantId;
    }
    if (this.restaurantId == this.id || productList.length == 0) {
      var productAlreadyExists: boolean = false;
      var productListString = localStorage.getItem("menus");
      var productList = productListString ? JSON.parse(productListString) : [];

      for (let i = 0; i < productList.length; i++) {
        if (productList[i].id == menu.id) {
          productList[i].quantity += 1;
          productAlreadyExists = true;
          this.toastrService.success("Ürün başarıyla sepete eklendi!","BAŞARILI");
          break;
        }
      }
      if (productAlreadyExists == false) {
        this.toastrService.success("Ürün başarıyla sepete eklendi!","BAŞARILI");
        productList.push(newItem);
      }
      localStorage.setItem("menus", JSON.stringify(productList));
    }
    else {
      this.toastrService.info("Sepetinizde zaten başka bir restoranın ürünü var!", "HATA")
    }
  }

  getRestaurantCommentsByRestaurantId() {
    this.restaurantService.getRestaurantCommentsByRestaurantId(this.id).subscribe(response => {
      if (response.success) {
        this.comments = response.data;
        this.comments = this.comments.reverse();
      }
    })
  }

}
