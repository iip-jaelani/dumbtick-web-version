'use strict';
module.exports = (sequelize, DataTypes) => {
  const favorite = sequelize.define('favorite', {
    user_id: DataTypes.INTEGER,
    event_id: DataTypes.INTEGER
  }, {});
  favorite.associate = function (models) {
    favorite.belongsTo(models.User, { foreignKey: "user_id", as: "user" });
    favorite.belongsTo(models.event, { foreignKey: "event_id", as: "event" });

  };
  return favorite;
};