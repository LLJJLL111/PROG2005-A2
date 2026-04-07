// Author: Jialin Li
import { Injectable } from '@angular/core';

export interface InventoryItem {
  itemId: string;
  itemName: string;
  category: string;
  quantity: number;
  price: number;
  supplierName: string;
  stockStatus: string;
  isPopular: boolean;
  comment: string;
}

@Injectable({
  providedIn: 'root'
})
export class InventoryService {
  private readonly items: InventoryItem[] = [];

  addItem(item: InventoryItem): string {
    const hasRequiredValues =
      item.itemId.trim() &&
      item.itemName.trim() &&
      item.category.trim() &&
      item.supplierName.trim();

    if (!hasRequiredValues) {
      return 'Error: Please fill in all required fields.';
    }

    const duplicated = this.items.some(existing => existing.itemId === item.itemId);
    if (duplicated) {
      return 'Error: Item ID already exists.';
    }

    if (item.quantity < 0 || item.price < 0) {
      return 'Error: Quantity and price cannot be negative.';
    }

    this.items.push(item);
    return 'Success: Item added successfully.';
  }

  getAllItems(): InventoryItem[] {
    return [...this.items];
  }

  searchByName(keyword: string): InventoryItem[] {
    const key = keyword.trim().toLowerCase();
    if (!key) {
      return this.getAllItems();
    }
    return this.items.filter(item => item.itemName.toLowerCase().includes(key));
  }
}
