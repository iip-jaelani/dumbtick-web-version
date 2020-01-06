'use strict';
module.exports = (sequelize, DataTypes) => {
  const order = sequelize.define('order', {
    user_id: DataTypes.INTEGER,
    article_id: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER,
    price: DataTypes.INTEGER,
    status: DataTypes.STRING
  }, {});
  order.associate = function (models) {
    order.belongsTo(models.event, { foreignKey: "article_id", as: "event" });
    order.belongsTo(models.User, { foreignKey: "user_id", as: "user" });
    order.belongsTo(models.category, { foreignKey: "article_id", as: "category" });

  };
  return order;
};