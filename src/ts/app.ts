const productList = document.getElementById('product-list')!;
const price = parseFloat((document.getElementById('price') as HTMLInputElement).value);
const type = (document.getElementById('type') as HTMLInputElement).value;
const unit = (document.getElementById('unit') as HTMLInputElement).value;
const date = (document.getElementById('date') as HTMLInputElement).value;
const supplier = (document.getElementById('supplier') as HTMLInputElement).value;


interface Product {
    name: string;
    price: number;
    type: string;
    unit: string;
    date: string;
    supplier: string;
}

function getProducts(): Product[] {
    const products = localStorage.getItem('products');
    return products ? JSON.parse(products) : [];
}

function saveProducts(products: Product[]): void {
    localStorage.setItem('products', JSON.stringify(products));
}

function renderProducts(products: Product[]): void {
    productList.innerHTML = '';
    products.forEach(product => {
        const productItem = document.createElement('div');
        productItem.innerText = `${product.name} - ${product.price} - ${product.type} - ${product.unit} - ${product.date} - ${product.supplier}`;
        productList.appendChild(productItem);
    });
}

function addProduct(): void {

    const name = (document.getElementById('name') as HTMLInputElement).value;

    if (name && !isNaN(price) && type && unit && date && supplier) {
        const products = getProducts();
        products.push({ name, price, type, unit, date, supplier });
        saveProducts(products);
        renderProducts(products);

        (document.getElementById('name') as HTMLInputElement).value = '';
        (document.getElementById('price') as HTMLInputElement).value = '';
        (document.getElementById('type') as HTMLInputElement).value = '';
        (document.getElementById('unit') as HTMLInputElement).value = '';
        (document.getElementById('date') as HTMLInputElement).value = '';
        (document.getElementById('supplier') as HTMLInputElement).value = '';
    } else {
        alert('Iltimos, barcha maydonlarni to\'ldiring!');
    }
}

function searchProducts(): void {
    const searchTerm = (document.getElementById('search') as HTMLInputElement).value.toLowerCase();
    const products = getProducts();
    const filteredProducts = products.filter(product => product.name.toLowerCase().includes(searchTerm));
    renderProducts(filteredProducts);
}

document.getElementById('add-product')!.addEventListener('click', addProduct);
document.getElementById('search')!.addEventListener('input', searchProducts);

renderProducts(getProducts());
