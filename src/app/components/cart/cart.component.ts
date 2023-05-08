import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Customer } from 'src/app/models/customer/customer';
import { CustomerAddress } from 'src/app/models/customer/customerAddress';
import { OrderDto } from 'src/app/models/order/orderDto';
import { RestaurantMenu } from 'src/app/models/restaurant/restaurantMenu';
import { AuthService } from 'src/app/services/auth/auth.service';
import { CustomerService } from 'src/app/services/customer/customer.service';
import { OrderService } from 'src/app/services/order/order.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  itemsInCart: RestaurantMenu[] = []
  totalPrice: number = 0;
  customer: Customer;
  customerId: string;
  description: string = "";
  selectedOption: string;
  createOrderForm: FormGroup;
  customerAddress: CustomerAddress[];
  restaurantName: string;
  restaurantId: string;
  constructor(private authService: AuthService, private orderService: OrderService, private customerService: CustomerService, private toastrService: ToastrService,
    private router: Router, private formBuilder: FormBuilder, private activatedRoute: ActivatedRoute) { }
  ngOnInit(): void {
    this.getItemsInCart();
    this.getCustomerId();
    this.getCustomerDetailsByCustomerId();
    this.getCustomerAddress();
    this.getRestaurantId();
  }

  getItemsInCart() {
    var productListString = localStorage.getItem("menus");
    this.itemsInCart = productListString ? JSON.parse(productListString) : [];
  }
  getCustomerAddress() {
    this.customerService.getAddressDetailsByCustomerId(this.customerId).subscribe(response => {
      if (response.success) {
        this.customerAddress = response.data
      }
    })
  }


  getRestaurantId() {
    this.itemsInCart.length !==0 ? this.restaurantId = this.itemsInCart[0].restaurantId : "asd"
   
  }

  createOrder() {
    if (this.itemsInCart.length == 0) {
      this.toastrService.info("Sepetinizde herhangi bir ürün bulunmamaktadır!", "HATA")
    }
    else {
      if (this.customer.nationalityId == null) {
        this.toastrService.info("Profil bilgilerinizi güncellemeden sipariş veremezsiniz.", "HATA");
      }
      else {
        let restaurantName = this.itemsInCart[0].restaurantName
        this.createOrderForm = this.formBuilder.group({
          customerId: [this.customerId, Validators.required],
          orderDescription: [this.description],
          firstName: [this.customer.firstName, Validators.required],
          lastName: [this.customer.lastName, Validators.required],
          address: [this.selectedOption, Validators.required],
          phoneNumber: [this.customer.phoneNumber, Validators.required],
          orderStatus: ["Alındı", Validators.required],
          estimatedTime: ["30 Dk", Validators.required],
          restaurantName: [restaurantName, Validators.required],
          orderDate: [new Date().toLocaleString().replace(',', ''), Validators.required],
          menus: this.formBuilder.array([]),
          restaurantId: [this.restaurantId, Validators.required]
        });
        for (let i = 0; i < this.itemsInCart.length; i++) {
          const creds = this.createOrderForm.controls.menus as FormArray;
          creds.push(
            this.formBuilder.group({
              orderPrice: this.itemsInCart[i].menuPrice,
              restaurantId: this.itemsInCart[i].restaurantId,
              menuName: this.itemsInCart[i].menuTitle,
              quantity: this.itemsInCart[i].quantity,
              menuImage: this.itemsInCart[i].menuImage
            })
          );
        }
        let model = Object.assign({}, this.createOrderForm.value);
        if (this.createOrderForm.valid) {
          this.orderService.add(model).subscribe((response) => {
            if (response.success) {
              this.toastrService.success("Siparişiniz başarıyla alındı", "BAŞARILI");
              setTimeout(() => {
                localStorage.removeItem('menus');
                this.router.navigate(["/orders"])
              }, 1000)
            }
          });
        }
        else {
          this.toastrService.info("Lütfen bilgileri eksiksiz şekilde doldurun", "HATA");
        }

      }

    }
  }

  getCustomerId() {
    this.customerId = localStorage.getItem("customerId")!;
  }

  getCustomerDetailsByCustomerId() {
    this.authService.getById(this.customerId).subscribe(response => {
      if (response.success) {
        this.customer = response.data;
      }
    }, errResponse => {
      console.log(errResponse)
    });

  }

  calculatePrice(restaurantDto: RestaurantMenu) {
    let totalPrice = restaurantDto.quantity * restaurantDto.menuPrice
    this.totalPrice = totalPrice;
    return totalPrice
  }

  increase(restaurantDto: RestaurantMenu) {
    var productListString = localStorage.getItem("menus");
    var productList = productListString ? JSON.parse(productListString) : []; //eski liste
    for (let i = 0; i < productList.length; i++) {
      if (productList[i].id == restaurantDto.id) {
        if (productList[i].quantity > 0) { // Check if quantity is greater than 1
          productList[i].quantity++; // Decrease quantity by 1
        }
        localStorage.setItem('menus', JSON.stringify(productList));
        this.getItemsInCart();
        break;
      }
    }
  }

  decrease(restaurantDto: RestaurantMenu) {
    if (restaurantDto.quantity >= 0) {
      var productListString = localStorage.getItem("menus");
      var productList = productListString ? JSON.parse(productListString) : []; 
      for (let i = 0; i < productList.length; i++) {
        if (productList[i].id == restaurantDto.id) {
          if (productList[i].quantity > 1) { // Check if quantity is greater than 1
            productList[i].quantity--; // Decrease quantity by 1
          }else {
            productList.splice(i, 1);
            localStorage.removeItem('menus')
            this.toastrService.success("Ürün başarıyla sepetten kaldırıldı","BAŞARILI")
          }
          localStorage.setItem('menus', JSON.stringify(productList));
          this.getItemsInCart();
          break;
        }
      }
    }
  }
  calculateTotal() {
    var productListString = localStorage.getItem("menus");
    let totalPrice = 0;
    var productList = productListString ? JSON.parse(productListString) : []; //menulermız
    for (let i = 0; i < productList.length; i++) {
      totalPrice += productList[i].menuPrice * productList[i].quantity
    }
    return totalPrice;
  }
}
