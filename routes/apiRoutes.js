var db = require("../models");

// module.exports = function(app) {
//   // Get all examples
//   app.get("/api/examples", function(req, res) {
//     db.Example.findAll({}).then(function(dbExamples) {
//       res.json(dbExamples);
//     });
//   });

//   // Create a new example
//   app.post("/api/examples", function(req, res) {
//     db.Example.create(req.body).then(function(dbExample) {
//       res.json(dbExample);
//     });
//   });

//   // Delete an example by id
//   app.delete("/api/examples/:id", function(req, res) {
//     db.Example.destroy({ where: { id: req.params.id } }).then(function(dbExample) {
//       res.json(dbExample);
//     });
//   });
// };

module.exports = app => {
  // Add a user to the db
  app.post("api/users", (req, res) => {
    db.User.create(req.body).then(user => {
      res.json(user);
    });
  });

  app.post("/api/pets", function(req, res) {
    db.Pet.create({
      name: req.body.name,
      species: req.body.species,
      color: req.body.color,
      image: req.body.image,
      happiness: 80,
      fullness: 80,
      UserId: req.user.id
    }).then(function(data) {
      res.json(data);
    });
  });

  app.put("/api/pets", function(req, res) {
    console.log(req.body.id);
    db.Pet.update(
      { fullness: db.sequelize.literal("fullness + 10") },
      {
        where: {
          id: req.body.id
        }
      }
    ).then(function(data) {
      res.json(data);
    });
  });

  app.delete("/api/pets", function(req, res) {
    db.Pet.destroy({
      where: {
        id: req.body.id
      }
    }).then(function(data) {
      res.json(data);
    });
  });
};
