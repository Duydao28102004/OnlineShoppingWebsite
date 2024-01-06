// Function to add a product to the local storage basket
function addToBasket(productId, productName ,productPrice, productImage, quantity) {
    // Get the existing basket from local storage or create an empty one
    const basket = JSON.parse(localStorage.getItem('basket')) || [];

    // Check if the product is already in the basket
    const existingItemIndex = basket.findIndex(item => item.productId === productId);

    if (existingItemIndex !== -1) {
        // If the product is already in the basket, update the quantity
        basket[existingItemIndex].quantity += quantity;
    } else {
        // If the product is not in the basket, add it as a new item
        basket.push({
            productId,
            productName,
            productImage,
            productPrice,
            quantity,
            
        });
    }

    // Save the updated basket to local storage
    localStorage.setItem('basket', JSON.stringify(basket));

    // Log the basket content to the console
    console.log('Basket:', basket); 
    notify('Product added to basket');
    checkBasket();
}

function notify(message) {
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.className = 'notification';
    document.body.appendChild(notification);
    setTimeout(() => {
        document.body.removeChild(notification);
    }, 3000);
}

function deleteLocalStorage() {
    localStorage.clear();
}

// Function to check if the basket has products
function checkBasket() {
    // Get the existing basket from local storage or create an empty one
    const basket = JSON.parse(localStorage.getItem('basket')) || [];

    console.log(basket);
    var reddot = document.querySelector('.reddot');

    // If the basket has products, add the 'cartimage-with-product' class to the cart image
    if (basket.length > 0) {
        console.log('Basket has products');
        reddot.classList.add('reddotdisplay');
    } else {
        reddot.classList.remove('reddotdisplay');
    }
}

// Get the query parameters from the page URL
const urlParams = new URLSearchParams(window.location.search);
const filter = urlParams.get('filter');
const category = urlParams.get('category');

// Set the selected options to the query parameters
if (filter) {
    document.getElementById('filter').value = filter;
}
if (category) {
    document.getElementById('category').value = category;
}

// Add event listeners to the select elements
document.getElementById('filter').addEventListener('change', updateQueryParams);
document.getElementById('category').addEventListener('change', updateQueryParams);

function updateQueryParams() {
    const filter = document.getElementById('filter').value;
    const category = document.getElementById('category').value;
    window.location.href = '/customer?filter=' + filter + '&category=' + category;
}

// Call the checkBasket function when the page loads
checkBasket();