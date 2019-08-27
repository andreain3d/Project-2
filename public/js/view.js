$(function() {
  $("#logout").on("click", function() {
    location.href = "/logout";
  });

  $("#create-btn").on("click", function() {
    location.href = "/create";
  });

  $(".delete").on("click", function() {
    if (
      confirm(
        "Are you sure you want to give up " +
          $(this).attr("data-name") +
          "?  Giving up a pet is permanent and cannot be undone."
      )
    ) {
      var petid = { id: $(this).attr("data-id") };

      $.ajax("/api/pets", { type: "DELETE", data: petid }).then(function() {
        location.href = "/view";
      });
    }
  });

  $(".feed").on("click", function() {
    var petname = $(this).attr("data-name");
    console.log(petname);
    if ($(this).attr("data-fullness") < 100) {
      var petid = { id: $(this).attr("data-id") };

      $.ajax("/api/pets", { type: "PUT", data: petid }).then(function() {
        alert(petname + " really enjoyed that!");
        location.href = "/view";
      });
    } else {
      alert(petname + " is not hungry right now.");
    }
  });
});
