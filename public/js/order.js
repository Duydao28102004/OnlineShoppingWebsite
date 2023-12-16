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
