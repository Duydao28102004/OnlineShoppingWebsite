// display information of product dynamically
$(document).on('click', '.display-product', function () {
    var product_id = $(this).attr('data-product-id');
    var data = {
        product_id: product_id
    };
    $.ajax({
        url: '/product/display-product',
        type: 'POST',
        data: data,
        success: function (response) {
            if (response.status == 'success') {
                $('#product-detail').html(response.html);
            } else {
                alert(response.message);
            }
        }
    });
});


