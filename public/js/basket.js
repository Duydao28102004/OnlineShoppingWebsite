// basket.js

// Function to render the basket
function renderBasket() {
    // Get the existing basket from local storage or create an empty one
    const basket = JSON.parse(localStorage.getItem('basket')) || [];

    // Get the container element to display the basket
    const basketContainer = document.getElementById('basket-container');

    // Clear the container before rendering
    basketContainer.innerHTML = '';

    // Loop through each item in the basket and render it
    basket.forEach(item => {
        const itemContainer = document.createElement('div');
        itemContainer.classList.add('basket-item');

        // Display product information with styles
        const productInfo = document.createElement('div');
        productInfo.classList.add('product-info');

        // Display product image with styles
        const productImage = document.createElement('img');
        productImage.src = item.productImage;
        productImage.alt = item.productName;
        productImage.classList.add('product-image');

        // Container for product details
        const productDetails = document.createElement('div');
        productDetails.classList.add('product-details');
        productDetails.innerHTML = `
            <strong>${item.productName}</strong>
            <p>Quantity: ${item.quantity}</p>
            <p>Price: ${item.productPrice}$</p>
        `;

        productInfo.appendChild(productImage);
        productInfo.appendChild(productDetails);

        // Buttons container with styles
        const buttonsContainer = document.createElement('div');
        buttonsContainer.classList.add('buttons-container');

        // Button to increase quantity
        const increaseButton = document.createElement('button');
        increaseButton.innerText = '+';
        increaseButton.addEventListener('click', () => {
            updateQuantity(item.productId, item.quantity + 1);
        });

        // Button to decrease quantity
        const decreaseButton = document.createElement('button');
        decreaseButton.innerText = '-';
        decreaseButton.addEventListener('click', () => {
            updateQuantity(item.productId, Math.max(item.quantity - 1, 0));
        });

        // Button to delete the item
        const deleteButton = document.createElement('button');
        deleteButton.innerText = 'Delete';
        deleteButton.addEventListener('click', () => {
            deleteItemFromBasket(item.productId);
        });

        // Append elements to the item container
        buttonsContainer.appendChild(increaseButton);
        buttonsContainer.appendChild(decreaseButton);
        buttonsContainer.appendChild(deleteButton);

        itemContainer.appendChild(productInfo);
        itemContainer.appendChild(buttonsContainer);

        // Append the item container to the basket container
        basketContainer.appendChild(itemContainer);
    });
    updatePrice();
}

// Call the renderBasket function to display the initial basket content
renderBasket();


// Function to update the quantity of a product in the basket
function updateQuantity(productId, newQuantity) {
    const basket = JSON.parse(localStorage.getItem('basket')) || [];

    // Find the index of the product in the basket
    const productIndex = basket.findIndex(item => item.productId === productId);

    if (productIndex !== -1) {
        if (newQuantity <= 0) {
            // If the new quantity is less than or equal to 0, remove the item from the basket
            basket.splice(productIndex, 1);
        } else {
            // Update the quantity
            basket[productIndex].quantity = newQuantity;
        }

        // Save the updated basket to local storage
        localStorage.setItem('basket', JSON.stringify(basket));

        // Render the updated basket
        renderBasket();
    }
}

// Function to delete an item from the basket
function deleteItemFromBasket(productId) {
    const basket = JSON.parse(localStorage.getItem('basket')) || [];

    // Filter out the item with the specified productId
    const updatedBasket = basket.filter(item => item.productId !== productId);

    // Save the updated basket to local storage
    localStorage.setItem('basket', JSON.stringify(updatedBasket));

    // Render the updated basket
    renderBasket();
}

function calculateProductPrice() {
    // Get the existing basket from local storage or create an empty one
    const basket = JSON.parse(localStorage.getItem('basket')) || [];
    let productPrice = 0;

    // Calculate the total price
    basket.forEach(item => {
        const priceAsInt = parseInt(item.productPrice, 10);
        const priceWithQuantity = priceAsInt * item.quantity;
        productPrice = productPrice + priceWithQuantity;
        console.log(item.productPrice);
    });

    return productPrice;
}

function calculateTax() {
    const productPrice = calculateProductPrice();
    const tax = productPrice/100*10;
    return tax;
}


function updatePrice() {
    // Get the calculated total price
    const productPrice = calculateProductPrice();
    const tax = calculateTax();
    const shippingFee = 8.00;
    const totalCost = productPrice + tax + shippingFee;

    // Update the HTML element with the new  price
    const productPriceElement = document.getElementById('total-price');
    productPriceElement.textContent = productPrice.toFixed(2);

    const TaxElement = document.getElementById("tax");
    TaxElement.textContent = tax.toFixed(2);
    
    
    const ShippingFeeElement = document.getElementById("shipping-fee");
    ShippingFeeElement.textContent = shippingFee.toFixed(2);

    
    const TotalCostElement = document.getElementById("total-cost");
    TotalCostElement.textContent = totalCost.toFixed(2);
}

function sendBasketToServer() {
    const productPrice = calculateProductPrice();
    const tax = calculateTax();
    const shippingFee = 8.00;
    const totalCost = productPrice + tax + shippingFee;
    let addressInput = document.getElementById('address-input');
    let phoneNumberInput = document.getElementById('phone-number-input');

    let phoneNumber = phoneNumberInput.value;
    let address = addressInput.value;
    const basket = JSON.parse(localStorage.getItem('basket')) || [];

    const dataToSend = {
        basket: basket,
        totalCost: totalCost,
        address: address,
        phoneNumber: phoneNumber,
    };

    // Make a POST request to the server
    fetch('http://localhost:3000/api/submit-basket', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSend),
    })
        .then(response => response.json())
        .then(data => {
            console.log('Server Response:', data);

            // Display the server response to the user
            const messageContainer = document.getElementById('message-container');
            
            if (data.error) {
                // Display the error message in red
                messageContainer.textContent = data.error;
                messageContainer.style.color = 'red';
            } else {
                // Display the success message in green
                messageContainer.textContent = data.message;
                messageContainer.style.color = 'green';
                setTimeout(() => {
                    window.location.href = '/';
                }, 3000);
            }
        })
        .catch(error => {
            // Display the error message to the user in red
            const messageContainer = document.getElementById('message-container');
            messageContainer.textContent = 'Error sending basket to the server: ' + error.message;
            messageContainer.style.color = 'red';
            console.error('Error sending basket to the server:', error);
        });
}

function resetBasket() {
    // Clear the local storage
    localStorage.clear();

    // Log a message indicating that the basket has been reset
    console.log('Basket has been reset.');

    renderBasket();
}


// Call the function to update the total price whenever needed
updatePrice();
