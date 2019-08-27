var exports = (module.exports = {});
var db = require("../models");

exports.signup = function(req, res) {
  res.render("index", { signin: true });
};

exports.signin = function(req, res) {
  res.render("index", { signin: true });
};

exports.view = function(req, res) {
  // console.log(req.session);
  db.User.findOne({ where: { id: req.session.passport.user }, include: [db.Pet] }).then(function(
    user
  ) {
    var user = { email: user.dataValues.email, id: user.dataValues.id, pets: user.Pets };
    // console.log(user);
    res.render("view", user);
  });
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
