// change order status
$(document).on('click', '.change-order-status', function () {
    var order_id = $(this).attr('data-order-id');
    var status = $(this).attr('data-status');
    var data = {
        order_id: order_id,
        status: status
    };
    $.ajax({
        url: '/shipper/change-order-status',
        type: 'POST',
        data: data,
        success: function (response) {
            if (response.status == 'success') {
                alert(response.message);
                location.reload();
            } else {
                alert(response.message);
            }
        }
    });
});

// display order to shipper
$(document).on('click', '.display-order', function () {
    var order_id = $(this).attr('data-order-id');
    var data = {
        order_id: order_id
    };
    $.ajax({
        url: '/shipper/display-order',
        type: 'POST',
        data: data,
        success: function (response) {
            if (response.status == 'success') {
                $('#order-detail').html(response.html);
            } else {
                alert(response.message);
            }
        }
    });
});
