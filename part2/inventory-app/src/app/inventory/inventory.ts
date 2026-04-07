// Author: Jialin Li
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './inventory.html',
  styleUrls: ['./inventory.css']
})
export class InventoryComponent {
  allItems: any[] = [];
  message = '';

  itemId = '';
  itemName = '';
  category = '';
  quantity = 0;
  price = 0;
  supplierName = '';
  isPopular = false;
  comment = '';

  constructor() {
    // 页面加载时读取本地存储的数据
    const saved = localStorage.getItem('inventory');
    if (saved) {
      this.allItems = JSON.parse(saved);
    }
  }

  addItem() {
    if (!this.itemId.trim() || !this.itemName.trim() || !this.category.trim()) {
      this.message = 'Error: Please fill required fields.';
      return;
    }

    const duplicated = this.allItems.some(item => item.itemId === this.itemId);
    if (duplicated) {
      this.message = 'Error: Item ID already exists.';
      return;
    }

    if (this.quantity < 0 || this.price < 0) {
      this.message = 'Error: Quantity and price cannot be negative.';
      return;
    }

    let stockStatus = 'In Stock';
    if (this.quantity === 0) stockStatus = 'Out of Stock';
    else if (this.quantity < 5) stockStatus = 'Low Stock';

    this.allItems.push({
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

    // 关键：添加后立刻保存到本地
    localStorage.setItem('inventory', JSON.stringify(this.allItems));
    this.message = 'Success: Item added.';

    // 清空表单
    this.itemId = '';
    this.itemName = '';
    this.category = '';
    this.quantity = 0;
    this.price = 0;
    this.supplierName = '';
    this.isPopular = false;
    this.comment = '';
  }

  deleteItem(itemId: string) {
    const originalLength = this.allItems.length;
    this.allItems = this.allItems.filter(item => item.itemId !== itemId);

    if (this.allItems.length === originalLength) {
      this.message = 'Error: Item not found.';
      return;
    }

    localStorage.setItem('inventory', JSON.stringify(this.allItems));
    this.message = 'Success: Item deleted.';
  }
}