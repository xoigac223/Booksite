$(document).ready(function() {
    listShopping = JSON.parse(localStorage.getItem('cart'));
    viewModel.amountCart(listShopping.length);
    let subTotal = 0;
    listShopping.forEach(function (item) {
        let total = item.price * item.amount;
        let template = '<li>' + item.name + ' × ' + item.amount + '<span>' + total + ' VNĐ </span></li>';
        $("#order_product").append(template);
        subTotal += total;
    });
    $("#cart_subtotal").append(subTotal + " VNĐ");
    let shipping = 30000;
    let orderTotal = subTotal + shipping; 
    $("#order_total").append(orderTotal + " VNĐ");
    $("#checkout_form").submit(function (event) {
        if ($("#checkout_form").valid()) {
            event.preventDefault();
            let username = viewModel.username() ? viewModel.username() : "guest";
            let formData = {
                username: username,
                fullname: $("#fullname_checkout").val(),
                address: $("#address_checkout").val(),
                phone: $("#phone_checkout").val(),
                email: $("#email_checkout").val(),
                dateBill: new Date().toISOString().slice(0, 19).replace('T', ' '),
                shipping: shipping,
                status: 0
            };
            $.ajax({
                type: "POST",
                url: "/api/Order",
                data: JSON.stringify(formData),
                contentType: "application/json",
                dataType: "json",
                encode: true,
                success: function (data) {
                    console.log(data);
                    let success = true;
                    listShopping.forEach(function (item) {
                        let detail = {
                            orderId: data.id,
                            bookId: item.id,
                            quantity: item.amount
                        };
                        $.ajax({
                            type: "POST",
                            url: "/api/OrderDetail",
                            data: JSON.stringify(detail),
                            contentType: "application/json",
                            dataType: "json",
                            encode: true,
                            error: function () {
                                success = false;
                            }
                        });
                    });
                    if (success) {
                        localStorage.removeItem("cart");
                        alert("Checkout Success");
                    }
                    location.reload();
                },
                error: function (jqXHR) {
                    console.log(jqXHR);
                }
            });
        }
    });
    
});

$("#form_register").validate({
    rules: {
        "fullname": {
            required: true
        },
        "address": {
            required: true
        },
        "phone": {
            matches: "[0-9]+",
            minlength:10,
            maxlength:10
        },
        "email": {
            required: true
        }
    }
});

checkoutLogin = function checkoutLogin() {
    var showLogin = $('.showlogin');
    var form = $('.checkout_login');
    showLogin.on('click', function (e) {
        e.preventDefault();
        form.slideToggle();
        form.remove('style');
    });
}