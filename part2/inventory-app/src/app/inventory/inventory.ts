// Author: Jialin Li
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './inventory.html',
  styleUrls: ['./inventory.css']
})
export class InventoryComponent {
  items: any[] = [];
  itemId = '';
  itemName = '';
  category = '';
  quantity = 0;
  price = 0;
  supplierName = '';
  isPopular = false;
  comment = '';

  addItem() {
    let stockStatus = 'In Stock';
    if (this.quantity === 0) stockStatus = 'Out of Stock';
    else if (this.quantity < 5) stockStatus = 'Low Stock';

    this.items.push({
      itemId: this.itemId,
      itemName: this.itemName,
      category: this.category,
      quantity: this.quantity,
      price: this.price,
      supplierName: this.supplierName,
      stockStatus: stockStatus,
      isPopular: this.isPopular,
      comment: this.comment
    });
  }
}