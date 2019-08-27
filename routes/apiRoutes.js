var db = require("../models");

module.exports = app => {
  // Add a user to the db
  app.post("/api/users", (req, res) => {
    db.user.create(req.body).then(user => {
      res.json(user);
    });
  });
};
