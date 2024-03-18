import { Component, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MyApiService } from '../services/my-api.service';
import { CommonModule } from '@angular/common';
import { DialogService } from '../services/dialog.service';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule,MatButtonModule,MatCardModule,MatIconModule],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent implements OnInit {
  data: any = {};
  selectedCategoryId!: number;
  category: any;
  filteredProducts: any[] = []; 
  selectedProducts: any;

  constructor(private route: ActivatedRoute, private myApiService: MyApiService, private dialogService: DialogService) { }

  addProduct(product: any): void {
    this.dialogService.addProduct(product);
  }
  
  removeProduct(product: any): void {
    this.dialogService.removeProduct(product);
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.selectedCategoryId = +params['categoryId']; 
      console.log('Selected category ID:', this.selectedCategoryId);
      this.loadCategoryDetails(); 
    });
  }
  
  loadCategoryDetails() {
    this.myApiService.getData().subscribe(
      (data) => {
        console.log('Fetched data:', data);
        this.data = data;
        const selectedCategory = this.data.categories.find((cat: any) => cat.id === this.selectedCategoryId);
        console.log('Selected category:', selectedCategory);
        if (selectedCategory) {
          this.category = selectedCategory;
          this.filteredProducts = selectedCategory.products;
          console.log('Filtered products:', this.filteredProducts);
        }
      },
      (error) => {
        console.error('Error fetching categories:', error);
      }
    );
  }
  
}