/**********************************************************
 * Author: Jialin Li
 * Assignment: PROG2005 Assignment 2
 * Module: Part 1 - TypeScript Inventory System
 * File: item.interface.ts
 * Description: Defines data types for inventory items
 **********************************************************/
export var Category;
(function (Category) {
    Category["Electronics"] = "Electronics";
    Category["Furniture"] = "Furniture";
    Category["Clothing"] = "Clothing";
    Category["Tools"] = "Tools";
    Category["Grocery"] = "Grocery";
})(Category || (Category = {}));
export var StockStatus;
(function (StockStatus) {
    StockStatus["InStock"] = "In Stock";
    StockStatus["OutOfStock"] = "Out Of Stock";
    StockStatus["LowStock"] = "Low Stock";
})(StockStatus || (StockStatus = {}));
