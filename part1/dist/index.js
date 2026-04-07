"use strict";
/**********************************************************
 * Author: Jialin Li
 * Assignment: PROG2005 Assignment 2
 * Module: Part 1 - TypeScript Inventory System
 * File: index.ts
 **********************************************************/
var Category;
(function (Category) {
    Category["Electronics"] = "Electronics";
    Category["Furniture"] = "Furniture";
    Category["Clothing"] = "Clothing";
    Category["Tools"] = "Tools";
    Category["Grocery"] = "Grocery";
})(Category || (Category = {}));
var StockStatus;
(function (StockStatus) {
    StockStatus["InStock"] = "In Stock";
    StockStatus["OutOfStock"] = "Out Of Stock";
    StockStatus["LowStock"] = "Low Stock";
})(StockStatus || (StockStatus = {}));
class InventoryService {
    constructor() {
        this.items = [];
    }
    addItem(item) {
        if (!item.itemId || !item.itemName || !item.supplierName) {
            return "Error: All required fields must be filled.";
        }
        const exists = this.items.some(i => i.itemId === item.itemId);
        if (exists)
            return "Error: Item ID already exists.";
        if (item.quantity < 0 || item.price < 0)
            return "Error: Value cannot be negative.";
        let status;
        if (item.quantity === 0)
            status = StockStatus.OutOfStock;
        else if (item.quantity < 5)
            status = StockStatus.LowStock;
        else
            status = StockStatus.InStock;
        const finalItem = Object.assign(Object.assign({}, item), { stockStatus: status });
        this.items.push(finalItem);
        return "Success: Item added.";
    }
    deleteItemByName(name) {
        if (!name)
            return "Error: Enter item name.";
        const originalLength = this.items.length;
        this.items = this.items.filter(i => i.itemName !== name);
        if (this.items.length < originalLength) {
            return "Success: Item deleted successfully.";
        }
        else {
            return "Error: Item not found.";
        }
    }
    searchByName(key) {
        if (!key)
            return [];
        const k = key.toLowerCase();
        return this.items.filter(i => i.itemName.toLowerCase().includes(k));
    }
    getAllItems() {
        return [...this.items];
    }
    getPopularItems() {
        return this.items.filter(i => i.isPopular);
    }
}
const inv = new InventoryService();
const msgBox = document.getElementById('msgBox');
const outputArea = document.getElementById('output');
function showMessage(text) {
    msgBox.innerText = text;
    msgBox.className = text.startsWith("Success") ? "message-box success" : "message-box error";
    setTimeout(() => {
        msgBox.className = "message-box";
        msgBox.innerText = "";
    }, 3000);
}
function renderItems(items) {
    if (items.length === 0) {
        outputArea.innerHTML = "<p class='empty-text'>No items found.</p>";
        outputArea.style.display = "block";
        return;
    }
    let html = "";
    items.forEach(i => {
        html += `
        <div class="item-card">
            <h3>${i.itemName}</h3>
            <p>ID: ${i.itemId}</p>
            <p>Category: ${i.category}</p>
            <p>Quantity: ${i.quantity}</p>
            <p>Price: $${i.price}</p>
            <p>Supplier: ${i.supplierName}</p>
            <p>Status: ${i.stockStatus}</p>
            <p>Popular: ${i.isPopular ? "✅ YES" : "❌ NO"}</p>
            ${i.comment ? `<p>Comment: ${i.comment}</p>` : ""}
        </div>`;
    });
    outputArea.innerHTML = html;
    outputArea.style.display = "block";
}
window.addItem = function () {
    const id = document.getElementById("itemId").value;
    const name = document.getElementById("itemName").value;
    const cat = document.getElementById("itemCategory").value;
    const qty = Number(document.getElementById("quantity").value);
    const price = Number(document.getElementById("price").value);
    const sup = document.getElementById("supplier").value;
    const com = document.getElementById("itemComment").value;
    const isPopular = document.getElementById("isPopular").checked;
    if (!cat) {
        showMessage("Error: Select category");
        return;
    }
    const item = {
        itemId: id, itemName: name, category: cat, quantity: qty, price: price,
        supplierName: sup, stockStatus: StockStatus.InStock, isPopular: isPopular, comment: com
    };
    const msg = inv.addItem(item);
    showMessage(msg);
    document.getElementById("itemId").value = "";
    document.getElementById("itemName").value = "";
    document.getElementById("itemCategory").selectedIndex = 0;
    document.getElementById("quantity").value = "";
    document.getElementById("price").value = "";
    document.getElementById("supplier").value = "";
    document.getElementById("itemComment").value = "";
    document.getElementById("isPopular").checked = false;
};
// ✅ 修复：删除后一定有反馈
window.deleteItem = function () {
    const name = document.getElementById("deleteName").value;
    const resultMessage = inv.deleteItemByName(name);
    showMessage(resultMessage); // 显示提示
    renderItems(inv.getAllItems()); // 刷新列表
};
window.searchItem = function () {
    const key = document.getElementById("searchInput").value;
    const results = inv.searchByName(key);
    if (results.length === 0 && key) {
        showMessage("Error: No matching items found.");
        outputArea.style.display = "none";
        return;
    }
    renderItems(results);
};
window.showAll = function () {
    renderItems(inv.getAllItems());
};
window.showPopularOnly = function () {
    const popularItems = inv.getPopularItems();
    if (popularItems.length === 0) {
        showMessage("Error: No popular items yet.");
        outputArea.style.display = "none";
        return;
    }
    renderItems(popularItems);
};
