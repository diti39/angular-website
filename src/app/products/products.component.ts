import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { RouterModule } from '@angular/router';
import { MyApiService } from '../services/my-api.service';
import { Category } from '../category';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, RouterModule, MatListModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent {
  @Input() category!: Category;
  data: any = {};


  constructor(private myApiService: MyApiService) { }

  ngOnInit() {
    this.myApiService.getData().subscribe(
      (data) => {
        this.data = data;
      },
      (error) => {
        console.error('Error fetching categories:', error);
      }
    );
  }

}
