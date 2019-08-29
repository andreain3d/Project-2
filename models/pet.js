module.exports = function(sequelize, DataTypes) {
  var Pet = sequelize.define("Pet", {
    name: DataTypes.STRING,
    species: DataTypes.STRING,
    image: DataTypes.STRING,
    happiness: {
      type: DataTypes.INTEGER
      // validate: {
      //   customValidator(value) {
      //     if (value < 0) {
      //       throw new Error("happiness can't be less than 0");
      //     }
      //   }
      // }
    },
    fullness: {
      type: DataTypes.INTEGER
      // validate: {
      //   customValidator(value) {
      //     if (value < 0) {
      //       throw new Error("fullness can't be less than 0");
      //     }
      //   }
      // }
    }
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
