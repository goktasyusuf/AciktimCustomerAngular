import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { SupportService } from 'src/app/services/support/support.service';

@Component({
  selector: 'app-support',
  templateUrl: './support.component.html',
  styleUrls: ['./support.component.css']
})
export class SupportComponent implements OnInit {
  customerId: string
  supportForm: FormGroup
  constructor(private toastrService: ToastrService, private supportService: SupportService, private formBuilder: FormBuilder) { }
  ngOnInit(): void {
    this.getCustomerId();
    this.createSupportForm();
  }

  createSupportForm() {
    this.supportForm = this.formBuilder.group({
      customerId: [this.customerId, Validators.required],
      mail: ["", Validators.required],
      content: ["", Validators.required],
      subject: ["", Validators.required]
    })
  }

  getCustomerId() {
    this.customerId = localStorage.getItem('customerId');
  }

  addSupportMessage() {
    //ilk önce giriş yapsın
    if (!localStorage.getItem('customerId')) {
      this.toastrService.error("Lütfen ilk önce giriş yapınız", "HATA");
    }
    else {
      if (this.supportForm.valid) {
        let model = Object.assign({},this.supportForm.value);
        this.supportService.addSupportMessage(model).subscribe(response=>{
          if(response.success) {
            this.toastrService.success("Mesajınız başarıyla gönderildi!","BAŞARILI");
          }
        })
        
      }
      else {
        this.toastrService.error("Lütfen gerekli yerleri doldurunuz.","HATA");
      }

    }

  }

}

