import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup
  constructor(private authService: AuthService, private toastrService: ToastrService, private formBuilder: FormBuilder, private router: Router) { }
  ngOnInit(): void {
    this.createLoginForm();
  }

  createLoginForm() {
    this.loginForm = this.formBuilder.group({
      email: ["", Validators.required],
      password: ["", Validators.required]
    })
  }

  login() {
    var productListString = localStorage.getItem("menus");
    var productList = productListString ? JSON.parse(productListString) : [];
    if (this.loginForm.valid) {
      let model = Object.assign({}, this.loginForm.value);
      this.authService.login(model).subscribe(response => {
        if (response.success) {
          if (localStorage.getItem("menus")) {
            if (response.data.customerId == productList[0].customerId) {
              null
            }
            else {
              localStorage.removeItem('menus')
            }
          }
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("customerId", response.data.customerId)
          this.toastrService.success("Giriş Başarılı", "Başarılı");
          setTimeout(() => {
            this.router.navigate(["/"])
          }
            , 500);
        }
      }, error => {
        this.toastrService.error(error.error)
      })
    }
    else {
      this.toastrService.info("Lütfen bilgileri doldurunuz.", "HATA")
    }
  }

}

/* 
login() {
    if (this.loginForm.valid) {
      var productListString = localStorage.getItem("menus");
      var productList = productListString ? JSON.parse(productListString) : [];
      let model = Object.assign({}, this.loginForm.value);
      this.authService.login(model).subscribe(response => {
        if (response.success) {
          if (localStorage.getItem(productList) == null) {
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("customerId", response.data.customerId)
            this.toastrService.success("Giriş Başarılı", "Başarılı");
            setTimeout(() => {
              this.router.navigate(["/"])
            }, 500);
          }
          else {
            if (response.data.customerId != localStorage.getItem(productList[0].customerId)) {
              localStorage.removeItem('menus');
            }
          }
        }
      }, error => {
        this.toastrService.error(error.error)
      })
    }
    else {
      this.toastrService.info("Lütfen bilgileri doldurunuz.", "HATA")
    }
  }*/