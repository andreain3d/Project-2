$(function() {
  var game;

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

  $("#return").on("click", function() {
    location.href = "/view";
  });

  $(".feed").on("click", function() {
    var petname = $(this).attr("data-name");
    var fullness = $(this).attr("data-fullness");
    var image = $(this).attr("data-image");
    console.log(petname);

    window.petData = {
      image: image,
      petname: petname,
      fullness: fullness
    };

    if (fullness < 100) {
      var amountToAdd = 10;
      if (fullness > 90) {
        amountToAdd = 100 - fullness;
      }
      var petid = { id: $(this).attr("data-id"), type: "feed", amount: amountToAdd };

      $.ajax("/api/pets", { type: "PUT", data: petid }).then(function() {
        $(".main").hide();
        $("#return").show();

        var config = {
          type: Phaser.AUTO,
          width: 640,
          height: 480,
          scene: [bootScene, loadingScene, homeScene, gameScene],
          title: "Virtual Pet",
          pixelArt: false,
          backgroundColor: "ffffff",
          parent: "phaser-game"
        };
        console.log(game);
        game = new Phaser.Game(config);
        game.removeCanvas = true;
      });
    } else {
      alert(petname + " is not hungry right now.");
    }
  });

  $(".play").on("click", function() {
    var petname = $(this).attr("data-name");
    var fullness = $(this).attr("data-happiness");
    console.log(petname);
    if (fullness < 100) {
      var amountToAdd = 10;
      if (fullness > 90) {
        amountToAdd = 100 - fullness;
      }
      var petid = { id: $(this).attr("data-id"), type: "play", amount: amountToAdd };

      $.ajax("/api/pets", { type: "PUT", data: petid }).then(function() {
        // alert(petname + " is really excited to play!");
        location.href = "/play/" + petid.id;
      });

      // $.ajax("/api/pets", { type: "PUT", data: petid }).then(function() {
      //   alert(petname + " really enjoyed that!");
      //   location.href = "/view";
      // });
    } else {
      alert(petname + " is already perfectly content.  Maybe later?");
    }
  });
});
