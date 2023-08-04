document.getElementById("signin-form").addEventListener("submit", function (e) {
  // chặn sự kiện load trang
  e.preventDefault();

  // lấy thông tin các trường dữ liệu trong form dựa vào id của input
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const user = {
    email,
    password,
  };

  firebase
    .auth()
    .signInWithEmailAndPassword(user.email, user.password)
    .then(function (response) {
      console.log(response);
      db.collection("users")
        .where("email", "==", user.email)
        .get()
        .then((snapshot) => {
          snapshot.docs.map((item) => {
            // chuyển về data
            const user = item.data();

            localStorage.setItem("address", JSON.stringify(user.address));
          });
        });

      // chuyển user về trang index.html
      window.location.href = "index.html";
    })
    .catch(function (error) {
      // xử lý lỗi
      console.log(error);
    });
});
