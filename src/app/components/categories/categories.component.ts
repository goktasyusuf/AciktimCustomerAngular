import { Component, OnInit } from '@angular/core';
import { CategoryDto } from 'src/app/models/category/categoryDto';
import { CategoryService } from 'src/app/services/category/category.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  categories:CategoryDto[];
  constructor(private categoryService:CategoryService){}
  ngOnInit(): void {
    this.getAllCategories();
  }

  getAllCategories() {
    this.categoryService.getAllCategories().subscribe(response=>{
        if(response.success) {
          this.categories = response.data;
        }
    })
  }

  getImagePath(categoryDto:CategoryDto) {
    let url="http://127.0.0.1:4200/Category/" + categoryDto.id +"/" +  categoryDto.imagePath
    return url;
  }

}
