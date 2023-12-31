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

    // Display a notification
    const notification = document.getElementById('notification');
    notification.textContent = 'Product added to basket successfully';
    notification.style.display = 'block';

    // Hide the notification after 3 seconds
    setTimeout(() => {
        notification.style.display = 'none';
    }, 3000);
}