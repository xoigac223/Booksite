let productList;
let listShopping = [];

function getListShopping() {
  if (localStorage.getItem('cart') === null) {
    localStorage.setItem('cart', JSON.stringify([]));
  } else {
    listShopping = JSON.parse(localStorage.getItem('cart'));
  }
}

getListShopping();

function handlerQuickview(e) {
  $('.modal-body').empty();
  const index = e.target.classList[0].split('-')[1] - 1;
  let product = productList[index];

  const modalProduct = `<div class="modal-product">
  <!-- Start product images -->
  <div class="product-images">
    <div class="main-image images">
      <img alt="big images" src=${product.imageUrl === null ? "images/product/big-img/1.jpg" : product.imageUrl}>
    </div>
  </div>
  <!-- end product images -->
  <div class="product-info">
    <h1>${product.name}</h1>
    <div class="rating__and__review">
      <ul class="rating">
        <li><span class="ti-star"></span></li>
        <li><span class="ti-star"></span></li>
        <li><span class="ti-star"></span></li>
        <li><span class="ti-star"></span></li>
        <li><span class="ti-star"></span></li>
      </ul>
      <div class="review">
        <a href="#">4 customer reviews</a>
      </div>
    </div>
    <div class="price-box-3">
      <div class="s-price-box">
        <span class="new-price">${product.price} VND</span>
      </div>
    </div>
    <div class="quick-desc">
      ${product.description}
    </div>
    <div class="social-sharing">
      <div class="widget widget_socialsharing_widget">
        <h3 class="widget-title-modal">Share this product</h3>
        <ul class="social__net social__net--2 d-flex justify-content-start">
          <li class="facebook"><a href="#" class="rss social-icon"><i class="zmdi zmdi-rss"></i></a></li>
          <li class="linkedin"><a href="#" class="linkedin social-icon"><i
                class="zmdi zmdi-linkedin"></i></a></li>
          <li class="pinterest"><a href="#" class="pinterest social-icon"><i
                class="zmdi zmdi-pinterest"></i></a></li>
          <li class="tumblr"><a href="#" class="tumblr social-icon"><i class="zmdi zmdi-tumblr"></i></a>
          </li>
        </ul>
      </div>
    </div>
    <div class="addtocart-btn">
      <a href="#" class="addtocart-btn__link">Add to cart</a>
    </div>
  </div>
</div>`
  $('.modal-body').append(modalProduct);
  $('.addtocart-btn .addtocart-btn__link').click((e) => {
    e.preventDefault();

    if(listShopping.find(item => item.id === product.id) === undefined) {
      product.amount = 1;
      listShopping.push(product);
      localStorage.setItem('cart', JSON.stringify(listShopping));
    } else {
      product = listShopping.find(item => item.id === product.id);
      let index = listShopping.indexOf(product);
      product.amount++;
      listShopping[index] = product;
      localStorage.setItem('cart', JSON.stringify(listShopping));
    }
    alert('Add success!');
    window.location.reload();
  })
}



function setListProduct(product) {
  const productItem = `<div class="col-lg-3 col-md-4 col-sm-6 col-12">
    <div class="product product__style--3">
      <div class="product__thumb">
        <a class="first__img" href="single-product.html?id=${product.id}"><img src=${product.imageUrl === null ? "images/books/1.jpg" : product.imageUrl} alt="product image"></a>
        <a class="second__img animation1" href="single-product.html?id=${product.id}"><img src=${product.imageUrl === null ? "images/books/2.jpg" : product.imageUrl} alt="product image"></a>
        <div class="hot__box">
          <span class="hot-label">NEW PRODUCT</span>
        </div>
      </div>
      <div class="product__content content--center content--center">
        <h4><a href="single-product.html?id=${product.id}">${product.name}</a></h4>
        <ul class="prize d-flex">
          <li>${product.price} VND</li>
        </ul>
        <div class="action">
          <div class="actions_inner">
            <ul class="add_to_links">
              <li><a class="cart" href="cart.html"><i class="bi bi-shopping-bag4"></i></a></li>
              <li><a class="wishlist" href="#"><i class="bi bi-shopping-cart-full"></i></a></li>
              <li><a class="compare" href="#"><i class="bi bi-heart-beat"></i></a></li>
              <li><a data-toggle="modal" title="Quick View" class="quickview-${product.id} quickview modal-view detail-link" href="#productmodal"><i class="quickview-${product.id} bi bi-search"></i></a></li>
            </ul>
          </div>
        </div>
        <div class="product__hover--content">
          <ul class="rating d-flex">
            <li class="on"><i class="fa fa-star-o"></i></li>
            <li class="on"><i class="fa fa-star-o"></i></li>
            <li class="on"><i class="fa fa-star-o"></i></li>
            <li><i class="fa fa-star-o"></i></li>
            <li><i class="fa fa-star-o"></i></li>
          </ul>
        </div>
      </div>
    </div>
  </div>`
  $(`${product.id % 2 === 0 ? '#product__indicator--4__product-list' : '#product__indicator--5__product-list'}`).append(productItem);

}

function slideShow(className) {
  $(className).owlCarousel({
    loop: true,
    margin: 0,
    nav: true,
    autoplay: false,
    autoplayTimeout: 10000,
    items: 4,
    navText: ['<i class="zmdi zmdi-chevron-left"></i>', '<i class="zmdi zmdi-chevron-right"></i>'],
    dots: false,
    lazyLoad: true,
    responsive: {
      0: {
        items: 1
      },
      576: {
        items: 2
      },
      768: {
        items: 3
      },
      992: {
        items: 4
      },
      1920: {
        items: 4
      }
    }
  });
}

$(document).ready(function () {
  $.get('https://localhost:5001/api/Book', (res) => {
    productList = res;
    for (let i = 0; i < productList.length; i++) {
      setListProduct(productList[i])
    }
    slideShow('.product__indicator--4');
    slideShow('.product__indicator--5');
    $('.add_to_links .quickview').click((e) => {
      handlerQuickview(e);
    });
  });
})



// $('#furniture--4__product-list').append(productItem)
// $('#product__indicator--4__product-list').append(doubleProductItem)

