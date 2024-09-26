"use strict";
const productList = document.getElementById('product-list');
const price = parseFloat(document.getElementById('price').value);
const type = document.getElementById('type').value;
const unit = document.getElementById('unit').value;
const date = document.getElementById('date').value;
const supplier = document.getElementById('supplier').value;
function getProducts() {
    const products = localStorage.getItem('products');
    return products ? JSON.parse(products) : [];
}
function saveProducts(products) {
    localStorage.setItem('products', JSON.stringify(products));
}
function renderProducts(products) {
    productList.innerHTML = '';
    products.forEach(product => {
        const productItem = document.createElement('div');
        productItem.innerText = `${product.name} - ${product.price} - ${product.type} - ${product.unit} - ${product.date} - ${product.supplier}`;
        productList.appendChild(productItem);
    });
}
function addProduct() {
    const name = document.getElementById('name').value;
    if (name && !isNaN(price) && type && unit && date && supplier) {
        const products = getProducts();
        products.push({ name, price, type, unit, date, supplier });
        saveProducts(products);
        renderProducts(products);
        document.getElementById('name').value = '';
        document.getElementById('price').value = '';
        document.getElementById('type').value = '';
        document.getElementById('unit').value = '';
        document.getElementById('date').value = '';
        document.getElementById('supplier').value = '';
    }
    else {
        alert('Iltimos, barcha maydonlarni to\'ldiring!');
    }
}
function searchProducts() {
    const searchTerm = document.getElementById('search').value.toLowerCase();
    const products = getProducts();
    const filteredProducts = products.filter(product => product.name.toLowerCase().includes(searchTerm));
    renderProducts(filteredProducts);
}
document.getElementById('add-product').addEventListener('click', addProduct);
document.getElementById('search').addEventListener('input', searchProducts);
renderProducts(getProducts());
