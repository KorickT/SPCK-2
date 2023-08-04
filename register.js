document.getElementById('signup-form').addEventListener('submit', function (e) {
  // chặn sự kiện load trang
  e.preventDefault()

  // lấy thông tin các trường dữ liệu trong form dựa vào id của input
  const email = document.getElementById('email').value
  const password = document.getElementById('password').value
  const phone = document.getElementById('phone').value
  const address = document.getElementById('address').value

  // gom các thông tin vào object để quản lý
  const user = {
    email,
    password,
    phone,
    address
  }

  firebase.auth()
    .createUserWithEmailAndPassword(user.email, user.password)
    .then(function (response) {
      // console.log('đăng kí thành công', response.user)
      Swal.fire({
        title: 'Success!',
        text: 'Đăng ky thanh cong',
        html: `
          <button class="btn btn-warning" >
            <a href="./login.html">dang nhap</a>
          </button>
        `,
        icon: 'success',
        showConfirmButton: false,
      })
      db.collection('users').add({
        email,
        phone,
        address
      })
    })
    .catch(function (error) {
      Swal.fire({
        title: 'Error!',
        text: error.message,
        icon: 'error',
      })
    })
  console.log('submit form ne', user)
})