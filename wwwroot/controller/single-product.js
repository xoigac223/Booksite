
$.urlParam = function (name) {
  var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
  if (results == null) {
    return null;
  }
  return decodeURI(results[1]) || 0;
}
const id = $.urlParam('id');

function renderProduct(res) {
  const product = `<div class="row">
  <div class="col-lg-6 col-12">
    <div class="wn__fotorama__wrapper">
      <div class="fotorama wn__fotorama__action" data-nav="thumbs">
          <a href="1.jpg"><img src="images/product/1.jpg" alt=""></a>
      </div>
    </div>
  </div>
  <div class="col-lg-6 col-12">
    <div class="product__info__main">
      <h1>${res.name}</h1>
      <div class="product-info-stock-sku d-flex">
        <p>Availability:<span> In stock</span></p>
        <p>SKU:<span> MH01</span></p>
      </div>
      <div class="product-reviews-summary d-flex">
        <ul class="rating-summary d-flex">
        <li><i class="zmdi zmdi-star-outline"></i></li>
        <li><i class="zmdi zmdi-star-outline"></i></li>
        <li><i class="zmdi zmdi-star-outline"></i></li>
        <li class="off"><i class="zmdi zmdi-star-outline"></i></li>
        <li class="off"><i class="zmdi zmdi-star-outline"></i></li>
        </ul>
        <div class="reviews-actions d-flex">
          <a href="#">(1 Review)</a>
          <a href="#">Add Your Review</a>
        </div>
      </div>
      <div class="price-box">
        <span>${res.price} VND</span>
      </div>
      <div class="box-tocart d-flex">
        <span>Qty</span>
        <input id="qty" class="input-text qty box-tocart__qty" name="qty" min="1" value="1" title="Qty" type="number">
        <div class="addtocart__actions">
          <button class="tocart" type="submit" title="Add to Cart">Add to Cart</button>
        </div>
      </div>
      <div class="product__overview">
        <p>${res.description}</p>
      </div>
    </div>
  </div>
  </div>`
  $('.wn__single__product').append(product);
}

function handlerAddToCart(res) {
  const amount = parseInt($('.box-tocart__qty').val());
  let product = res;
  if(sessionStorage.getItem(product.id) === null) {
    product.amount = amount;
    sessionStorage.setItem(product.id, JSON.stringify(product));
  } else {
    product = JSON.parse(sessionStorage.getItem(product.id));
    product.amount = parseInt(product.amount);
    product.amount += amount;
    sessionStorage.setItem(product.id, JSON.stringify(product));
  }
  alert('Add item success!');
  window.location.href = '/cart.html';
}

$(document).ready(function () {
  $.get(`https://localhost:5001/api/Book/${id}`, (res) => {
    renderProduct(res)

    $('.addtocart__actions .tocart').click(() => {
      handlerAddToCart(res);
    })
  })
})