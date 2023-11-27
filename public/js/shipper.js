document.addEventListener('DOMContentLoaded', function () {
    const completeButtons = document.querySelectorAll('.complete-btn');

    completeButtons.forEach(button => {
        button.addEventListener('click', async () => {
            const orderId = button.dataset.orderId;

            try {
                const response = await fetch(`/completeOrder/${orderId}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                if (response.ok) {
                    // Optionally, update the UI to reflect the completed status
                    button.disabled = true;
                    // You may want to show a success message to the user
                    console.log('Order marked as completed successfully.');
                } else {
                    console.error('Failed to mark order as completed.');
                }
            } catch (error) {
                console.error('Error:', error);
            }
        });
    });
});