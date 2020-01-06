const model = require('../models');
const Users = model.User;
const Category = model.category;
const Events = model.event;
const Order = model.order;

exports.getTicket = (req, res) {
  Order.findAll({
    where: {
      user_id: req.id
    },
    include: [
      {
        model: Users,
        as: 'user'
      },
      {
        model: Events,
        as: 'event'
      }
    ]
  }).then(data => res.send(data))
}