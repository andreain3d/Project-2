module.exports = function(sequelize, DataTypes) {
  var Pet = sequelize.define("Pet", {
    name: DataTypes.STRING,
    species: DataTypes.STRING,
    image: DataTypes.STRING,
    happiness: DataTypes.INTEGER,
    fullness: DataTypes.INTEGER
  });

  Pet.associate = function(models) {
    Pet.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Pet;
};
