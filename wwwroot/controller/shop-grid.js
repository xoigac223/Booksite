let listProduct;

$.urlParam = function (name) {
  var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
  if (results == null) {
    return null;
  }
  return decodeURI(results[1]) || 0;
}

const category = $.urlParam('category');

function handlerProduct(data, i) {
  const item = data.id === undefined ? data.bookNavigation : data;
  const product = `<div class="col-lg-4 col-md-4 col-sm-6 col-12">
  <div class="product">
    <div class="product__thumb">
      <a class="first__img" href="single-product.html?id=${item.id}"><img src=${item.imageUrl === null ? "images/product/1.jpg" : item.imageUrl} alt="product image"></a>
      <a class="second__img animation1" href="single-product.html?id=${item.id}"><img src=${item.imageUrl === null ? "images/product/2.jpg" : item.imageUrl} alt="product image"></a>
      <div class="new__box">
        <span class="new-label">Product</span>
      </div>
      <ul class="prize position__right__bottom d-flex">
        <li>${item.price} VND</li>
      </ul>
      <div class="action">
        <div class="actions_inner">
          <ul class="add_to_links">
            <li><a class="cart" href="cart.html"></a></li>
            <li><a class="wishlist" href="#"></a></li>
            <li><a class="compare" href="#"></a></li>
            <li><a data-toggle="modal" title="Quick View" class="quickview modal-view detail-link" href="#productmodal"></a></li>
          </ul>
        </div>
      </div>
    </div>
    <div class="product__content">
      <h4><a href="single-product.html?id=${item.id}">${item.name}</a></h4>
      <ul class="rating d-flex">
        <li class="on"><i class="fa fa-star-o"></i></li>
        <li class="on"><i class="fa fa-star-o"></i></li>
        <li class="on"><i class="fa fa-star-o"></i></li>
        <li><i class="fa fa-star-o"></i></li>
        <li><i class="fa fa-star-o"></i></li>
      </ul>
    </div>
  </div>
  </div>`
  const listViewProduct = `<div class="list__view ${i == 0 ? '' : 'mt--40'}">
  <div class="thumb">
    <a class="first__img" href="single-product.html?id=${item.id}"><img src=${item.imageUrl === null ? "images/product/1.jpg" : item.imageUrl}
        alt="product images"></a>
    <a class="second__img animation1" href="single-product.html?id=${item.id}"><img src=${item.imageUrl === null ? "images/product/2.jpg" : item.imageUrl}
        alt="product images"></a>
  </div>
  <div class="content">
    <h2><a href="single-product.html?id=${item.id}">${item.name}</a></h2>
    <ul class="rating d-flex">
      <li class="on"><i class="fa fa-star-o"></i></li>
      <li class="on"><i class="fa fa-star-o"></i></li>
      <li class="on"><i class="fa fa-star-o"></i></li>
      <li class="on"><i class="fa fa-star-o"></i></li>
      <li><i class="fa fa-star-o"></i></li>
      <li><i class="fa fa-star-o"></i></li>
    </ul>
    <ul class="prize__box">
      <li>${item.price} VND</li>
    </ul>
    <p>${item.description}</p>
    <ul class="cart__action d-flex">
      <li class="cart"><a href="cart.html" class="cart-${i} cart__action-link">Add to cart</a></li>
    </ul>

  </div>
  </div>`
  $('.shop-grid .row').append(product);
  $('.shop-grid .list__view__wrapper').append(listViewProduct);
}

function handlerAddCart(e) {
  const index = e.target.classList[0].split('-')[1];
  let product = listProduct[index].id === undefined ? listProduct[index].bookNavigation : listProduct[index];
  if (sessionStorage.getItem(product.id) === null) {
    product.amount = 1;
    sessionStorage.setItem(product.id, JSON.stringify(product));
  } else {
    product = JSON.parse(sessionStorage.getItem(product.id));
    product.amount++;
    sessionStorage.setItem(product.id, JSON.stringify(product));
  }
  alert('Add item success!');
}

function getFilterProduct(page) {
  $('.shop-grid .row').empty();
  $('.shop-grid .list__view__wrapper').empty();
  $.get(`${category == 0 ? `https://localhost:5001/api/Search/book?Page=${page}&PageSize=6` : `https://localhost:5001/api/Search?Filters=category%3D%3D${category}&Sorts=price&Page=${page}&PageSize=6`}`, (res) => {
    let i = 0;
    listProduct = res;
    res.forEach((item) => {
      handlerProduct(item, i);
      i++;
    })
    $('.cart__action-link').click((e) => {
      handlerAddCart(e);
    })
  })
}

$(document).ready(function () {
  $.get('https://localhost:5001/api/Category', (res) => {
    $('.wedget__categories-list').append(`<li class="wedget__categories-item">
        <a class="${category == 0 ? 'actived' : ''}" href="shop-grid.html?category=0">Tất cả sản phẩm</a>
      </li>`
    );
    res.forEach((item) => {
      $('.wedget__categories-list').append(`<li class="wedget__categories-item ">
          <a class="${category == item.id ? 'actived' : ''}" href="shop-grid.html?category=${item.id}">${item.name}</a>
        </li>`
      );
    })
  })
  getFilterProduct(1);
  $('.wn__pagination input[name=pagination]').change(function() {
    getFilterProduct($(this).val());
  })
});