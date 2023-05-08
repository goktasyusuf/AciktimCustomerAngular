import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth/auth.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup
  verifyPassword: string;
  password: string;
  isChecked: boolean;
  visible: boolean = false;
  constructor(private toastrService: ToastrService, private authservice: AuthService
    , private formBuilder: FormBuilder, private router: Router,private dialogRef:MatDialog) { }
  ngOnInit(): void {
    this.createRegisterForm();
  }
  createRegisterForm() {
    this.registerForm = this.formBuilder.group({
      email: ["", Validators.required],
      password: ["", Validators.required],
      firstName: ["", Validators.required],
      lastName: ["", Validators.required],
      registerDate: [new Date().toLocaleDateString(), Validators.required]
    })
  }
  register() {
    if (this.registerForm.valid) {
      let model = Object.assign({}, this.registerForm.value);
      if (this.password == this.verifyPassword) {
        if (this.isChecked) {
          this.authservice.register(model).subscribe(response => {
            localStorage.setItem("registerToken", response.data.token);
            this.toastrService.info("E-Mailinize doğrulama linki gönderilmiştir.", "Kayıt Başarılı")
            setTimeout(() => {
              this.router.navigate(["auth/login"]);
            }, 2700)

          }, errResponse => {
            console.log(errResponse)
          })
        }
        else {
          this.toastrService.error("Lütfen bilgilendirme yazısını okuyup kabul ediniz.", "HATA")
        }
      }
      else {
        this.toastrService.info("Şifreler eşleşmiyor.")
      }
    }

    else {
      this.toastrService.info("Lütfen Bilgileri Doldurun", "HATA")
    }
  }

  toggleEditable() {
    this.isChecked = !this.isChecked;
  }

  toggleLiveDemo() {
    this.visible = !this.visible;
  }

  handleLiveDemoChange(event: any) {
    this.visible = event;
  }

}