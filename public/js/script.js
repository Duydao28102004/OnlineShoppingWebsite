console.log("Testing!")

// display products
function displayProducts(products) {
    const productsContainer = document.querySelector(".products-container");
    productsContainer.innerHTML = "";
    products.forEach((product) => {
        productsContainer.innerHTML += `
        <div class="product">
            <img src="${product.image}" alt="${product.name}" />
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <p>Price: ${product.price}</p>
            <button onclick="addToCart(${product.id})">Add To Cart!</button>
        </div>
        `;
    });
}

// display order
function displayOrder(order) {
    const orderContainer = document.querySelector(".order-container");
    orderContainer.innerHTML = "";
    order.forEach((item) => {
        orderContainer.innerHTML += `
        <div class="order">
            <h3>${item.name}</h3>
            <p>Price: ${item.price}</p>
            <p>Quantity: ${item.quantity}</p>
            <button onclick="removeFromCart(${item.id})">Remove</button>
        </div>
        `;
    });
}

// lead to order details page
function orderDetails() {
    window.location.href = "/order";
}