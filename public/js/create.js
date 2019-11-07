/* eslint-disable */
$(function() {
  $("#logout").on("click", function() {
    location.href = "/logout";
  });

  $(".create-pet").on("submit", function(event) {
    event.preventDefault();

    var name = $("#pet-name")
      .val()
      .trim();

    if (!name) {
      alert("Please enter a name for your pet.");
      return;
    }

    var species = $("#pet-species").val();
    var color = $("#pet-color").val();

    var imgUrl;
    if (species === "Cat") {
      switch (color) {
        case "Red":
          imgUrl = "/images/cat-red.png";
          break;
        case "Blue":
          imgUrl = "/images/cat-blue.png";
          break;
        case "Green":
          imgUrl = "/images/cat-green.png";
          break;
        default:
          imgUrl = "/images/cat.png";
          break;
      }
    } else if (species === "Dog") {
      switch (color) {
        case "Red":
          imgUrl = "/images/dog-red.png";
          break;
        case "Blue":
          imgUrl = "/images/dog-blue.png";
          break;
        case "Green":
          imgUrl = "/images/dog-green.png";
          break;
        default:
          imgUrl = "/images/dog.png";
          break;
      }
    } else if (species === "Hamster") {
      switch (color) {
        case "Red":
          imgUrl = "/images/hamster-red.png";
          break;
        case "Blue":
          imgUrl = "/images/hamster-blue.png";
          break;
        case "Green":
          imgUrl = "/images/hamster-green.png";
          break;
        default:
          imgUrl = "/images/hamster.png";
          break;
      }
    }

    var newPet = {
      name: name,
      species: species,
      color: color,
      image: imgUrl
    };

    $.ajax("/api/pets", { type: "POST", data: newPet }).then(function() {
      location.href = "/view";
    });
  });
});
