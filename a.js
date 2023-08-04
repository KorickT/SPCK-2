 // Lắng nghe sự kiện submit form
 document.getElementById('signup-form').addEventListener('submit', function (event) {
  event.preventDefault(); // Ngăn chặn việc submit form

  var email = document.getElementById('email').value;
  var phone = document.getElementById('phone').value;
  var password = document.getElementById('password').value;
  var address = document.getElementById('address').value;

  // Đăng ký người dùng bằng email và mật khẩu
  firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(function (user) {
      // Thực hiện các hành động sau khi đăng ký thành công
      console.log('Đăng ký thành công!', user);
      // Ở đây, bạn có thể lưu thông tin người dùng vào cơ sở dữ liệu của mình hoặc thực hiện các hành động khác
      db.collection("users").add({
        email: email,
        phone: phone,
        address: address
      })
    })
    .catch(function (error) {
      // Xử lý lỗi đăng ký
      console.log('Đăng ký thất bại!', error);
    });
});