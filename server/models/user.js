'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    image: DataTypes.STRING,
    birth_day: DataTypes.STRING,
    no_tlp: DataTypes.STRING,
    is_active: DataTypes.INTEGER
  }, {});
  User.associate = function (models) {
    User.belongsTo(models.order, { foreignKey: "id", as: "order" });
  };
  return User;
};