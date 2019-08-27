// The API object contains methods for each kind of request we'll make
var API = {
  addUser: user => {
    return $.ajax({
      url: "/api/users",
      type: "POST",
      data: JSON.stringify(user)
    });
  }
};

$("#signUp").submit(e => {
  e.preventDefault();

  let user = {
    username: $("#username")
      .val()
      .trim(),
    email: $("#email")
      .val()
      .trim(),
    password: $("#password")
      .val()
      .trim()
  };

  if (!(user.username && user.email && user.password)) {
    alert("You must enter data in all fields!");
    return;
  }

  console.log("checkpoint charly");
  console.log(user);

  API.addUser(user).then(() => {
    //TODO: Feeback to user
    alert("User info sent to API");
    console.log("checkpoint bravo");
  });

  console.log("checkpoint alpha");
  console.log(user);
});
