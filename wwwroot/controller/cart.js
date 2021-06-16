let listShopping = [];

function getListShopping() {
  if (localStorage.getItem('cart') === null) {
    localStorage.setItem('cart', JSON.stringify([]));
  } else {
    listShopping = JSON.parse(localStorage.getItem('cart'));
  }
}

getListShopping();

function renderCart(item) {
  const cart = `<tr class="cart-table__item-${item.id}">
    <td class="product-thumbnail"><a href="single-product.html?id=${item.id}"><img src=${item.imageUrl === null ? "images/product/sm-3/1.jpg" : item.imageUrl} alt="product img"></a></td>
    <td class="product-name"><a href="#">${item.name}</a></td>
    <td class="product-price"><span class="amount">${item.price} VND</span></td>
    <td class="product-quantity"><input type="number" min="1" value="${item.amount}" class="product-quantity__input-${item.id} product-quantity__input"></td>
    <td class="product-subtotal">${item.amount * item.price} VND</td>
    <td class="product-remove"><a href="#" class="product-${item.id} product-remove__link">X</a></td>
  </tr>`
  $('.cart-table__content').append(cart);
}

function showListCart() {
  let total = 0;
  listShopping.forEach((key) => {
    total += key.amount * key.price;
    renderCart(key);
  });
  $('.cart__total__amount-price').text(`${total} VND`)
}

showListCart();

function removeCart(e) {
  e.preventDefault();
  const flag = window.confirm('Are you sure you want to delete this item?');
  if (flag === true) {
    const id = e.target.classList[0].split('-')[1];
    listShopping = listShopping.filter(item => item.id !== parseInt(id));
    localStorage.setItem('cart', JSON.stringify(lislistShopping));
    $(`.cart-table__item-${id}`).remove();
    if ($(`.miniproduct__${id}`)[0] !== undefined) {
      $(`.miniproduct__${id}`).remove();
      let total = 0;
      listShopping.forEach((key) => {
        total += key.amount * key.price;
      });
      $('.total_amount-price').text(`${total} VND`)
      $('.cart__total__amount-price').text(`${total} VND`)
      $('.item-total__num').text(`${lislistShopping.length} items`);
    }
    $('.product_qun').text(lislistShopping.length);
  }
}

$(document).ready(function () {
  $('.product-remove__link').click((e) => {
    removeCart(e)
  })
  $('.product-quantity__input').change((e) => {
    const id = e.target.classList[0].split('-')[2];
    let product = listShopping.find(item => item.id === parseInt(id));
    let index = listShopping.indexOf(product);
    // console.log(index);
    product.amount = e.target.value;
    listShopping[index] = product;
    console.log(listShopping[0]);
    localStorage.setItem('cart', JSON.stringify(listShopping));
    $(`.cart-table__item-${id} .product-subtotal`).text(`${product.amount * product.price} VND`);
    if ($(`.miniproduct__${id}`)[0] !== undefined) {
      $(`.miniproduct__${id} .product_prize .qun`).text(`Số lượng: ${product.amount}`)
      $(`.miniproduct__${id} .content .prize`).text(`${product.amount * product.price} VND`)
      let total = 0;
      listShopping.forEach((key) => {
        total += key.amount * key.price;
      });
      $('.total_amount-price').text(`${total} VND`)
      $('.cart__total__amount-price').text(`${total} VND`)
    }
  })
})