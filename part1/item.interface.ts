/**********************************************************
 * Author: Jialin Li
 * Assignment: PROG2005 Assignment 2
 * Module: Part 1 - TypeScript Inventory System
 * File: item.interface.ts
 * Description: Defines data types for inventory items
 **********************************************************/

export enum Category {
  Electronics = 'Electronics',
  Furniture = 'Furniture',
  Clothing = 'Clothing',
  Tools = 'Tools',
  Grocery = 'Grocery'
}

export enum StockStatus {
  InStock = 'In Stock',
  OutOfStock = 'Out Of Stock',
  LowStock = 'Low Stock'
}

export interface Item {
  itemId: string;               // Unique item identifier
  itemName: string;             // Name of the item
  category: Category;           // Item category
  quantity: number;             // Stock quantity
  price: number;                // Unit price
  supplierName: string;         // Supplier name
  stockStatus: StockStatus;     // Inventory status
  isPopular: boolean;           // Whether it's a popular item
  comment?: string;             // Optional item comment
}