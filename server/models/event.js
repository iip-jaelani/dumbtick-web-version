'use strict';
module.exports = (sequelize, DataTypes) => {
  const event = sequelize.define('event', {
    title: DataTypes.STRING,
    category_id: DataTypes.INTEGER,
    start_time: DataTypes.STRING,
    end_time: DataTypes.STRING,
    price: DataTypes.INTEGER,
    deskription: DataTypes.STRING,
    address: DataTypes.STRING,
    url_maps: DataTypes.STRING,
    image: DataTypes.STRING,
    author_id: DataTypes.INTEGER
  }, {});
  event.associate = function (models) {
    event.belongsTo(models.User, { foreignKey: "author_id", as: "user" });
    event.belongsTo(models.category, { foreignKey: "category_id", as: "category" });
    event.belongsTo(models.order, { foreignKey: "id", as: "order" });
  };
  return event;
};