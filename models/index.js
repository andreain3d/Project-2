"use strict";

const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const basename = path.basename(module.filename); // index.js
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.json")[env];
let db = {};

if (config.connectionURI) {
  var sequelize = new Sequelize(process.env[config.connectionURI]);
} else {
  var sequelize = new Sequelize(config.database, config.username, config.password, config);
}

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch(err => {
    console.error("Unable to connect to the database:", err);
  });

fs.readdirSync(__dirname)
  .filter(function(file) {
    return file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js";
  })
  .forEach(function(file) {
    let model = sequelize.import(path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(function(modelName) {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
