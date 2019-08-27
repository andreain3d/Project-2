var authController = require("../controllers/authController.js");
module.exports = function(app, passport) {
  app.get("/signup", authController.signup);
  app.get("/signin", authController.signin);
  app.post(
    "/signup",
    passport.authenticate("local-signup", {
      successRedirect: "/view",
      failureRedirect: "/"
    })
  );
  app.get("/view", isLoggedIn, authController.view);
  app.get("/create", isLoggedIn, authController.create);
  app.get("/logout", authController.logout);
  app.post(
    "/signin",
    passport.authenticate("local-signin", {
      successRedirect: "/view",
      failureRedirect: "/"
    })
  );
  function isLoggedIn(req, res, next) {
    console.log("are we logged in?");
    if (req.isAuthenticated()) {
      return next();
    }
    res.redirect("/");
  }
};
