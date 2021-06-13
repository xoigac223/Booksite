const productItem = `<div class="product product__style--3">
<div class="col-lg-3 col-md-4 col-sm-6 col-12">
  <div class="product__thumb">
    <a class="first__img" href="single-product.html"><img src="images/books/11.jpg" alt="product image"></a>
    <a class="second__img animation1" href="single-product.html"><img src="images/books/2.jpg" alt="product image"></a>
    <div class="hot__box">
      <span class="hot-label">BEST SALER</span>
    </div>
  </div>
  <div class="product__content content--center content--center">
    <h4><a href="single-product.html">Ghost</a></h4>
    <ul class="prize d-flex">
      <li>$50.00</li>
      <li class="old_prize">$35.00</li>
    </ul>
    <div class="action">
      <div class="actions_inner">
        <ul class="add_to_links">
          <li><a class="cart" href="cart.html"><i class="bi bi-shopping-bag4"></i></a></li>
          <li><a class="wishlist" href="#"><i class="bi bi-shopping-cart-full"></i></a></li>
          <li><a class="compare" href="#"><i class="bi bi-heart-beat"></i></a></li>
          <li><a id="Quick-View-1" data-toggle="modal" title="Quick View" class="quickview modal-view detail-link" href="#productmodal"><i class="bi bi-search"></i></a></li>
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

const doubleProductItem = `<div class="single__product">
<div class="col-lg-3 col-md-4 col-sm-6 col-12">
  <div class="product product__style--3">
    <div class="product__thumb">
      <a class="first__img" href="single-product.html"><img src="images/books/1.jpg" alt="product image"></a>
      <a class="second__img animation1" href="single-product.html"><img src="images/books/2.jpg" alt="product image"></a>
      <div class="hot__box">
        <span class="hot-label">BEST SALER</span>
      </div>
    </div>
    <div class="product__content content--center content--center">
      <h4><a href="single-product.html">Ghost</a></h4>
      <ul class="prize d-flex">
        <li>$50.00</li>
        <li class="old_prize">$35.00</li>
      </ul>
      <div class="action">
        <div class="actions_inner">
          <ul class="add_to_links">
            <li><a class="cart" href="cart.html"><i class="bi bi-shopping-bag4"></i></a></li>
            <li><a class="wishlist" href="#"><i class="bi bi-shopping-cart-full"></i></a></li>
            <li><a class="compare" href="#"><i class="bi bi-heart-beat"></i></a></li>
            <li><a data-toggle="modal" title="Quick View" class="quickview modal-view detail-link" href="#productmodal"><i class="bi bi-search"></i></a></li>
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
</div>
<div class="col-lg-3 col-md-4 col-sm-6 col-12">
  <div class="product product__style--3">
    <div class="product__thumb">
      <a class="first__img" href="single-product.html"><img src="images/books/3.jpg" alt="product image"></a>
      <a class="second__img animation1" href="single-product.html"><img src="images/books/9.jpg" alt="product image"></a>
      <div class="hot__box">
        <span class="hot-label">BEST SALER</span>
      </div>
    </div>
    <div class="product__content content--center content--center">
      <h4><a href="single-product.html">Ghost</a></h4>
      <ul class="prize d-flex">
        <li>$50.00</li>
        <li class="old_prize">$35.00</li>
      </ul>
      <div class="action">
        <div class="actions_inner">
          <ul class="add_to_links">
            <li><a class="cart" href="cart.html"><i class="bi bi-shopping-bag4"></i></a></li>
            <li><a class="wishlist" href="#"><i class="bi bi-shopping-cart-full"></i></a></li>
            <li><a class="compare" href="#"><i class="bi bi-heart-beat"></i></a></li>
            <li><a data-toggle="modal" title="Quick View" class="quickview modal-view detail-link" href="#productmodal"><i class="bi bi-search"></i></a></li>
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
</div>
</div>`




$(document).ready(function () {
  // const url = '';
  // $.get()

  $('.add_to_links #Quick-View-1').click((e) => {
    console.log("Hello")
    console.log(e.target)
  })
})

$('#furniture--4__product-list').append(productItem)
$('#product__indicator--4__product-list').append(doubleProductItem)

