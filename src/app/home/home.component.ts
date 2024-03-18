import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsComponent } from '../products/products.component';
import { MyApiService } from '../services/my-api.service';
import {MatListModule} from '@angular/material/list';
import { RouterModule } from '@angular/router';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule,RouterModule,ProductsComponent,MatListModule,FormsModule,MatFormFieldModule, MatListModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  categories: any[] = [];
  data: any = {};

  filteredCategories: any[] = []; 
  searchTerm: string = '';


  constructor(private myApiService: MyApiService) {
  }

  ngOnInit() {
    this.myApiService.getData().subscribe(
      (data) => {
        this.data = data;
        this.filteredCategories = this.data.categories;
      },
      (error) => {
        console.error('Error fetching categories:', error);
      }
    );
  }

  search(): void {
    this.filteredCategories = this.data.categories.filter((category: { name: string; }) =>
      category.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
  
}
