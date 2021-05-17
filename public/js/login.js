$(document).ready(function () {

  const root = document.documentElement
  const eye = document.querySelector(".eye")
  passwordInput = document.querySelectorAll(".user")[1]
  eye.addEventListener("click", function () {
    root.classList.toggle("active")
    eye.classList.toggle("fa-eye-slash")
    passwordInput.type = passwordInput.type === 'password' ? 'text' : 'password'
    passwordInput.focus();
  })



  // $("#username").on("click", () => {
  //   $("#username").css({
  //     "border": "none"
  //   });
  // })
  // $("#email").on("click", () => {
  //   $("#email").css({
  //     "border": "none"
  //   });
  // })
  // $("#password").on("click", () => {
  //   $("#password").css({
  //     "border": "none"
  //   });
  // })
  // $("#password_verify").on("click", () => {
  //   $("#password_verify").css({
  //     "border": "none"
  //   });
  // })

  $("#container").click(function (e) {

    $(`#${e.target.id}`).css({
      "border": "none"
    });

  });


  $("#email").keyup(() => {
    if (email_validate($("#email").val())) {

      $("#email").css({
        "border": "none"
      });
    } else {
      $("#email").css({
        "border": " 1px solid red"
      });
    }
  })


  $("#username").keyup(() => {
    if (input_validate($("#username").val())) {

      $("#username").css({
        "border": "none"
      });
    } else {
      $("#username").css({
        "border": " 1px solid red"
      });
    }

  })

  $("#login_btn").click(function (e) {




    $.ajax({
      type: "POST",
      url: "/login",
      data: {
        username: $("#username").val(),
        password: $("#password").val(),
      },
      success: function (response) {
        console.log(100);
        window.location.reload();
      },
      error: function (err) {
        console.log(err);
      }
    });


  });

  const user = {
    username: 1,
    password: 1,
    email: 1,
  }

  $.ajax({
    type: "method",
    url: "url",
    data: "data",
    dataType: "dataType",
    success: function (response) {

    }
  });



});



function email_validate(value) {
  let reg = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  if (!reg.test(value)) {
    return false;
  }
  return true
}

function input_validate(value) {
  let reg = /(['"><.,~!@#$%^&*()-+=])/;
  console.log('==>', reg.test(value));
  if (reg.test(value)) {
    return false;
  }
  return true
}


function check_input(array) {

  if ($(username).val() && $(email).val() && $(password).val() && $(confirm_password).val()) {
    if ($(password).val() !== $(confirm_password).val()) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Your Password is not match!',
        footer: '<a href>Why do I have this issue?</a>'
      })
      return false;
    }
    if ($(password).val().length < 8) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Password must be longer than 8 characters!',
        footer: '<a href>Why do I have this issue?</a>'
      })
      return false;
    }
    return true;
  } else {
    Swal.fire({
      position: 'top-end',
      icon: 'error',
      title: 'Please fill in all fields',
      showConfirmButton: false,
      timer: 1500
    })
    return false;
  }

}