var exports = (module.exports = {});
var db = require("../models");
var moment = require("moment");

exports.signup = function(req, res) {
  res.render("index", { signin: true });
};

exports.signin = function(req, res) {
  res.render("index", { signin: true });
};

exports.view = function(req, res) {
  // console.log(req.session);
  var lastLogin;
  var timeDiff;
  db.User.findOne({ where: { id: req.session.passport.user } }).then(function(user) {
    console.log(user.lastLogin);
    lastLogin = moment(user.lastLogin);
    timeDiff = moment().diff(lastLogin, "hours") * 3;
    console.log(timeDiff);
    if (timeDiff > 0) {
      db.Pet.update(
        {
          happiness: db.sequelize.literal("happiness - " + timeDiff),
          fullness: db.sequelize.literal("fullness - " + timeDiff)
        },
        {
          where: {
            UserId: req.session.passport.user
          }
        }
      ).then(function() {
        db.User.update(
          { lastLogin: db.sequelize.literal("CURRENT_TIMESTAMP") },
          {
            where: { id: req.session.passport.user }
          }
        ).then(function() {
          db.User.findOne({ where: { id: req.session.passport.user }, include: [db.Pet] }).then(
            function(user) {
              var user = { email: user.dataValues.email, id: user.dataValues.id, pets: user.Pets };
              // console.log(user);
              res.render("view", user);
            }
          );
        });
      });
    } else {
      db.User.findOne({ where: { id: req.session.passport.user }, include: [db.Pet] }).then(
        function(user) {
          var user = { email: user.dataValues.email, id: user.dataValues.id, pets: user.Pets };
          // console.log(user);
          res.render("view", user);
        }
      );
    }
  });
};

exports.play = function(req, res) {
  var user;
  db.User.findOne({ where: { id: req.user.id } })
    .then(function(userdata) {
      user = { email: userdata.dataValues.email, id: userdata.dataValues.id, pets: userdata.Pets };
    })
    .then(
      db.Pet.findOne({ where: { id: req.params.id } }).then(function(pet) {
        var gameData = { user: user, petimage: pet.dataValues.image };
        res.render("play", gameData);
      })
    );
};

exports.create = function(req, res) {
  // console.log("this one" + req.user.id);
  db.User.findOne({ where: { id: req.user.id }, include: [db.Pet] }).then(function(user) {
    var user = { email: user.dataValues.email, id: user.dataValues.id, pets: user.Pets };
    // console.log(user);
    res.render("createPet", user);
  });
};

exports.logout = function(req, res) {
  req.session.destroy(function(err) {
    res.redirect("/");
  });
};
