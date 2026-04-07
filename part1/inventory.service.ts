/**********************************************************
 * Author: Jialin Li
 * Assignment: PROG2005 Assignment 2
 * Module: Part 1 - TypeScript Inventory System
 * File: inventory.service.ts
 * Description: Core business logic with data validation
 **********************************************************/

import { Item, Category, StockStatus } from './item.interface.js';

export class InventoryService {
  private items: Item[] = [];

  // Add new item with validation
  addItem(item: Item): string {
    if (!item.itemId || !item.itemName || !item.supplierName) {
      return 'Error: All required fields (ID, Name, Supplier) must be filled.';
    }

    const idExists = this.items.some(i => i.itemId === item.itemId);
    if (idExists) {
      return 'Error: Item ID already exists. ID must be unique.';
    }

    if (item.quantity < 0 || item.price < 0) {
      return 'Error: Quantity and price cannot be negative values.';
    }

    this.items.push(item);
    return 'Success: Item added successfully.';
  }

  // Delete item by name (exact match)
  deleteItemByName(itemName: string): string {
    const originalLength = this.items.length;
    this.items = this.items.filter(i => i.itemName !== itemName);
    return this.items.length < originalLength 
      ? 'Success: Item deleted successfully.' 
      : 'Error: Item not found.';
  }

  // Search items by name (fuzzy match)
  searchByName(keyword: string): Item[] {
    const lowerKeyword = keyword.toLowerCase();
    return this.items.filter(i => 
      i.itemName.toLowerCase().includes(lowerKeyword)
    );
  }

  // Get all inventory items
  getAllItems(): Item[] {
    return [...this.items];
  }

  // Get only popular items
  getPopularItems(): Item[] {
    return this.items.filter(i => i.isPopular);
  }
}