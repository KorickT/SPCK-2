let productList = [];
let productPickedList = JSON.parse(localStorage.getItem("khanh_cart")) || [];
document.getElementById("count-products").innerHTML = productPickedList.length;
const formatVNDCurrency = (number) => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(number);
};

const calcBill = (productPickedList) => {
  const totalBill = productPickedList.reduce(
    (accumulator, productPicked) => accumulator + productPicked.salePrice,
    0
  );
  document.getElementById("total-money").innerHTML =
    formatVNDCurrency(totalBill);
};

calcBill(productPickedList);

// khai báo hàm xoá sản phẩm
const removeItem = (index) => {
  // xoá sản phẩm từ index nhận vào của hàm
  productPickedList.splice(index, 1);
  // cập nhật local storage
  localStorage.setItem("khanh_cart", JSON.stringify(productPickedList));

  renderCart(productPickedList);
  calcBill(productPickedList);
};

const renderCart = (myCart) => {
  // xu ly hien thi gio hang khi moi vao trang web
  if (myCart.length > 0) {
    // gio hang co san pham
    let htmlString = "";
    myCart.map((cartItem, index) => {
      htmlString += `
        <div class="cart-item d-flex my-3">
          <div class="position-relative">
            <img
              class="me-3"
              src="${cartItem.img}"
              alt=""
              style="width: 120px; height: 120px; border-radius: 8px"
            />
            <button class="position-absolute btn-trash-icon btn" onclick="removeItem(${index})">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash trash-icon" viewBox="0 0 16 16">
                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z"/>
                <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z"/>
              </svg>
            </button>
           
          </div>
          <div class="">
            <h4>${cartItem.name}</h4>
            <small class="text-primary">
              ${formatVNDCurrency(cartItem.salePrice)}
            </small>
            <div class=""></div>
            <small class="text-decoration-line-through">
              ${formatVNDCurrency(cartItem.price)}
            </small>
          </div>
        </div>
      `;
    });
    document.getElementById("cart-body").innerHTML = htmlString;
  } else {
    // gio hang rong
    document.getElementById("cart-body").innerHTML = `
    <div class="flex-fill">
      <img class="w-100" src="./empty-cart.svg" alt="" />
      <p class="text-center">Chưa có sản phẩm nào bên trong giỏ hàng</p>
    </div> 
  `;
  }
};

renderCart(productPickedList);

/**
 * lấy ra cái id khi ấn vào btn
 * dùng cái mảng danh sách. filter. find tìm ra thông tin sản phẩm từ id
 * thêm phẩn tử vừa tìm dc vào mảng product picked list
 *
 */
const addToCart = (id) => {
  const productPicked = productList.find((product) => product.id === id);
  productPickedList.push(productPicked);
  localStorage.setItem("khanh_cart", JSON.stringify(productPickedList));
  document.getElementById("count-products").innerHTML =
    productPickedList.length;
  let newProductPickedList =
    JSON.parse(localStorage.getItem("khanh_cart")) || [];
  renderCart(newProductPickedList);
  calcBill(productPickedList);
};

const order = () => {
  const address = localStorage.getItem("address");
  if (productPickedList.length > 0) {
    localStorage.removeItem("khanh_cart");
    renderCart([]);
    calcBill([]);
    Swal.fire({
      title: "Success!",
      text: "Đặt hàng thành công",
      html: `
            Đơn hàng của bạn sẽ được giao tới  ${address}
          `,
      icon: "success",
      showConfirmButton: false,
    });
  } else {
    Swal.fire({
      title: "Error",
      text: "Đặt hàng thất bại",
      html: `
            Đơn hàng của bạn sẽ được giao tới  ${address}
          `,
      icon: "error",
      showConfirmButton: false,
    });
  }
};

fetch("https://649ed17a245f077f3e9cf17e.mockapi.io/cars")
  .then(function (res) {
    return res.json();
  })
  .then(function (data) {
    productList = [...data];
    let htmlString = "";
    data.map((productItem) => {
      htmlString += `
        <div class="col-6 col-lg-4 col-xl-3">
          <div class="product-item card border-0 shadow-sm px-2">
            <img src="${productItem.img}" class="card-img-top"
              alt="...">
            <div class="card-body">
              <h5 class="card-title">${productItem.name}</h5>
              <span class="text-primary">
                ${formatVNDCurrency(productItem.salePrice)}
              </span>
              <span class="text-decoration-line-through">
                ${formatVNDCurrency(productItem.price)}
              </span>
              <button class="btn bg-warning w-50 add-to-cart-btn" onClick="addToCart(${
                productItem.id
              })">
                Add to cart
              </button>
            </div>
          </div>
        </div>
      `;
    });
    document.getElementById("product-list").innerHTML = htmlString;
  });
