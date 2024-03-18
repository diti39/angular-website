import { Component, OnInit } from '@angular/core';
import {
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContainer,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { DialogService } from '../services/dialog.service';
import { NgFor } from '@angular/common';
import { PaymentDialogComponent } from '../payment-dialog/payment-dialog.component';

@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose, MatButtonModule, MatDialogContainer, NgFor],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.scss'
})

export class DialogComponent implements OnInit {
  selectedProducts: any[] = [];
  totalPrice: number = 0;

  constructor(private dialogService: DialogService, private dialog: MatDialog, private dialogRef: MatDialogRef<DialogComponent>) { }

  ngOnInit(): void {
    this.dialogService.getSelectedProducts().subscribe(products => {
      console.log('Selected products updated:', products);
      this.selectedProducts = products;
      this.calculateTotalPrice();
    });
  }
  calculateTotalPrice() {
    this.totalPrice = this.selectedProducts.reduce((total, product) => {
      return total + (product.unitPrice * product.quantity);
    }, 0);
  }
  

  openPaymentDialog() {
    const dialogRef = this.dialog.open(PaymentDialogComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The payment dialog was closed');
      this.dialogService.resetSelectedProducts(); 
    });
  }
}

