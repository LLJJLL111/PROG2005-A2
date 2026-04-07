/**********************************************************
 * Author: Jialin Li
 * Assignment: PROG2005 Assignment 2
 * Module: Part 1 - TypeScript Inventory System
 * File: index.ts
 **********************************************************/

enum Category {
    Electronics = "Electronics",
    Furniture = "Furniture",
    Clothing = "Clothing",
    Tools = "Tools",
    Grocery = "Grocery"
}

enum StockStatus {
    InStock = "In Stock",
    OutOfStock = "Out Of Stock",
    LowStock = "Low Stock"
}

interface Item {
    itemId: string;
    itemName: string;
    category: Category;
    quantity: number;
    price: number;
    supplierName: string;
    stockStatus: StockStatus;
    isPopular: boolean;
    comment?: string;
}

class InventoryService {
    private items: Item[] = [];

    addItem(item: Item): string {
        if (!item.itemId || !item.itemName || !item.supplierName) {
            return "Error: All required fields must be filled.";
        }
        const exists = this.items.some(i => i.itemId === item.itemId);
        if (exists) return "Error: Item ID already exists.";
        if (item.quantity < 0 || item.price < 0) return "Error: Value cannot be negative.";
        
        let status: StockStatus;
        if (item.quantity === 0) status = StockStatus.OutOfStock;
        else if (item.quantity < 5) status = StockStatus.LowStock;
        else status = StockStatus.InStock;

        const finalItem = { ...item, stockStatus: status };
        this.items.push(finalItem);
        return "Success: Item added.";
    }

    deleteItemByName(name: string): string {
        if (!name) return "Error: Enter item name.";
        const originalLength = this.items.length;
        this.items = this.items.filter(i => i.itemName !== name);
        if (this.items.length < originalLength) {
            return "Success: Item deleted successfully.";
        } else {
            return "Error: Item not found.";
        }
    }

    searchByName(key: string): Item[] {
        if (!key) return [];
        const k = key.toLowerCase();
        return this.items.filter(i => 
            i.itemName.toLowerCase().includes(k)
        );
    }

    getAllItems(): Item[] {
        return [...this.items];
    }

    getPopularItems(): Item[] {
        return this.items.filter(i => i.isPopular);
    }
}

const inv = new InventoryService();
const msgBox = document.getElementById('msgBox') as HTMLDivElement;
const outputArea = document.getElementById('output') as HTMLDivElement;

function showMessage(text: string) {
    msgBox.innerText = text;
    msgBox.className = text.startsWith("Success") ? "message-box success" : "message-box error";
    setTimeout(() => {
        msgBox.className = "message-box";
        msgBox.innerText = "";
    }, 3000);
}

function renderItems(items: Item[]) {
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

(window as any).addItem = function () {
    const id = (document.getElementById("itemId") as HTMLInputElement).value;
    const name = (document.getElementById("itemName") as HTMLInputElement).value;
    const cat = (document.getElementById("itemCategory") as HTMLSelectElement).value as Category;
    const qty = Number((document.getElementById("quantity") as HTMLInputElement).value);
    const price = Number((document.getElementById("price") as HTMLInputElement).value);
    const sup = (document.getElementById("supplier") as HTMLInputElement).value;
    const com = (document.getElementById("itemComment") as HTMLInputElement).value;
    const isPopular = (document.getElementById("isPopular") as HTMLInputElement).checked;

    if (!cat) { showMessage("Error: Select category"); return; }

    const item: Item = {
        itemId: id, itemName: name, category: cat, quantity: qty, price: price,
        supplierName: sup, stockStatus: StockStatus.InStock, isPopular: isPopular, comment: com
    };

    const msg = inv.addItem(item);
    showMessage(msg);

    (document.getElementById("itemId") as HTMLInputElement).value = "";
    (document.getElementById("itemName") as HTMLInputElement).value = "";
    (document.getElementById("itemCategory") as HTMLSelectElement).selectedIndex = 0;
    (document.getElementById("quantity") as HTMLInputElement).value = "";
    (document.getElementById("price") as HTMLInputElement).value = "";
    (document.getElementById("supplier") as HTMLInputElement).value = "";
    (document.getElementById("itemComment") as HTMLInputElement).value = "";
    (document.getElementById("isPopular") as HTMLInputElement).checked = false;
};

// ✅ 修复：删除后一定有反馈
(window as any).deleteItem = function () {
    const name = (document.getElementById("deleteName") as HTMLInputElement).value;
    const resultMessage = inv.deleteItemByName(name);
    showMessage(resultMessage); // 显示提示
    renderItems(inv.getAllItems()); // 刷新列表
};

(window as any).searchItem = function () {
    const key = (document.getElementById("searchInput") as HTMLInputElement).value;
    const results = inv.searchByName(key);
    
    if (results.length === 0 && key) {
        showMessage("Error: No matching items found.");
        outputArea.style.display = "none";
        return;
    }
    renderItems(results);
};

(window as any).showAll = function () {
    renderItems(inv.getAllItems());
};

(window as any).showPopularOnly = function () {
    const popularItems = inv.getPopularItems();
    if (popularItems.length === 0) {
        showMessage("Error: No popular items yet.");
        outputArea.style.display = "none";
        return;
    }
    renderItems(popularItems);
};