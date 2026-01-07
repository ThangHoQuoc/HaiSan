const products = [
    { id: 1, name: 'Cồi Sò Điệp khô – Gói 500g', category: 'Hải sản khô', price: 375000, oldPrice: 390000, icon: '🦪', sale: true },
    { id: 2, name: 'Khô cá bò – Gói 500g', category: 'Hải sản khô', price: 140000, icon: '🐟' },
    { id: 3, name: 'Khô cá bóng lá trầu – Gói 500g', category: 'Hải sản khô', price: 175000, icon: '🐠' },
    { id: 4, name: 'Khô cá chỉ vàng – Gói 500g', category: 'Hải sản khô', price: 105000, icon: '🐡' },
    { id: 5, name: 'Khô cá cơm – Gói 500g', category: 'Cá', price: 75000, icon: '🐟' },
    { id: 6, name: 'Khô cá lãi trứng – Gói 500g', category: 'Hải sản khô', price: 105000, icon: '🐠' },
    { id: 7, name: 'Khô cá Sặc – Gói 500G', category: 'Hải sản khô', price: 125000, icon: '🐡' },
    { id: 8, name: 'Khô cá đù – Gói 500g', category: 'Hải sản khô', price: 110000, icon: '🐟' },
    { id: 9, name: 'Khô cá đuối – Gói 1kg', category: 'Hải sản khô', price: 750000, icon: '🐠' },
    { id: 10, name: 'Khô mực câu size 12-14con – Gói 500g', category: 'Hải sản khô', price: 675000, icon: '🦑' },
    { id: 11, name: 'Khô mực câu size 35-40con – Gói 500g', category: 'Hải sản khô', price: 440000, icon: '🦑' },
    { id: 12, name: 'Khô mực nguyên con – gói 500g', category: 'Hải sản khô', price: 160000, icon: '🦑' },
    { id: 13, name: 'Tép khô – Gói 500g', category: 'Hải sản khô', price: 75000, icon: '🦐' },
    { id: 14, name: 'Tôm biển khô size trung – Gói 500g', category: 'Hải sản khô', price: 340000, oldPrice: 375000, icon: '🦐', sale: true },
    { id: 15, name: 'Tôm khô nhỏ (Tôm canh) – Gói 500g', category: 'Hải sản khô', price: 275000, icon: '🦐' },
    { id: 16, name: 'Tôm khô đại size đại – gói 500g', category: 'Hải sản khô', price: 410000, icon: '🦐' }
];

let cart = [];

function formatPrice(price) {
    return price.toLocaleString('vi-VN') + '₫';
}

function renderProducts(productsToRender = products) {
    const grid = document.getElementById('productsGrid');
    grid.innerHTML = '';

    productsToRender.forEach(product => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <div class="product-image">
                ${product.sale ? '<div class="sale-badge">SALE</div>' : ''}
                <span style="font-size: 80px;">${product.icon}</span>
            </div>
            <div class="product-info">
                <div class="product-category">${product.category}</div>
                <div class="product-name">${product.name}</div>
                <div class="product-price">
                    <span class="current-price">${formatPrice(product.price)}</span>
                    ${product.oldPrice ? `<span class="old-price">${formatPrice(product.oldPrice)}</span>` : ''}
                </div>
                <button class="add-to-cart" onclick="addToCart(${product.id})">
                    Thêm vào giỏ
                </button>
            </div>
        `;
        grid.appendChild(card);
    });
}

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    cart.push(product);
    updateCartCount();
    alert(`Đã thêm "${product.name}" vào giỏ hàng!`);
}

function updateCartCount() {
    document.getElementById('cartCount').textContent = cart.length;
}

function showCart() {
    if (cart.length === 0) {
        alert('Giỏ hàng của bạn đang trống!');
    } else {
        let cartContent = 'Giỏ hàng của bạn:\n\n';
        let total = 0;
        cart.forEach((item, index) => {
            cartContent += `${index + 1}. ${item.name} - ${formatPrice(item.price)}\n`;
            total += item.price;
        });
        cartContent += `\nTổng cộng: ${formatPrice(total)}`;
        alert(cartContent);
    }
}

function filterProducts(sortType) {
    let sortedProducts = [...products];

    switch(sortType) {
        case 'price-low':
            sortedProducts.sort((a, b) => a.price - b.price);
            break;
        case 'price-high':
            sortedProducts.sort((a, b) => b.price - a.price);
            break;
        case 'popularity':
            sortedProducts.sort(() => Math.random() - 0.5);
            break;
        case 'newest':
            sortedProducts.reverse();
            break;
    }

    renderProducts(sortedProducts);
}

renderProducts();
