$(function() {
  $(".new-user").on("submit", function(event) {
    event.preventDefault();

    var newUser = {
      email: $("#new-email")
        .val()
        .trim(),
      password: $("#new-password")
        .val()
        .trim()
    };

    console.log(newUser);

    $.ajax("/signup", {
      type: "POST",
      data: newUser
    }).then(function(res) {
      console.log("attempting signup", res);
    });
  });

  $(".login-form").on("submit", function() {
    var userLogin = {
      email: $("#email")
        .val()
        .trim(),
      password: $("#password")
        .val()
        .trim()
    };

    console.log(userLogin);

    // $.ajax("/signin", {
    //   type: "POST",
    //   data: userLogin
    // }).then(function(res) {
    //   console.log("attempting signin", res);
    // });
  });
});
