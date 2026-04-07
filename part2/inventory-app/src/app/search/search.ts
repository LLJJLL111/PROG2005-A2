// Author: Jialin Li
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './search.html',
  styleUrls: ['./search.css']
})
export class SearchComponent {
  searchKeyword = '';
  items: any[] = [];
  filteredItems: any[] = [];

  constructor() {
    // 👇 从本地读取所有物品
    const saved = localStorage.getItem('inventory');
    if (saved) this.items = JSON.parse(saved);
  }

  searchItems() {
    if (!this.searchKeyword.trim()) {
      this.filteredItems = [];
      return;
    }

    this.filteredItems = this.items.filter(item =>
      item.itemName.toLowerCase().includes(this.searchKeyword.toLowerCase())
    );
  }

  showPopularItems() {
    this.searchKeyword = '';
    this.filteredItems = this.items.filter(item => item.isPopular);
  }
}