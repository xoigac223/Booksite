$(document).ready(function() {
    Object.keys(sessionStorage).forEach(function (item) {
        const element = JSON.parse(sessionStorage.getItem(item));
        let template = '<li>' + element.name + ' × ' + element.amount + '<span>' + element.price * element.amount + ' VNĐ </span></li>';
        $("#order_product").append(template);
    });
});