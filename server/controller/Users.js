const model = require('../models');
const Users = model.User;
const Events = model.event;
const Orders = model.order;

exports.user = (req, res) => {
  Users.findAll().then(data => (res.send(data)));
}




const result = data => {
  let newItem = {
    id: data.id,
    name: data.name,
    email: data.email,
    img: data.image,
    Notlp: data.no_tlp,
    BirthDay: data.birth_day
  };
  return newItem;
};


exports.userid = (req, res) => {
  Users.findOne({
    where: {
      id: req.id
    }
  }).then(data => {
    if (data) {
      res.send(result(data))
    } else {
      res.send({
        message: "Data not found"
      })
    }
  }).catch(err => {
    res.status(500).json({
      message: "Internal Server Error",
      Error: err
    })
  })
}



exports.userFavorite = (req, res) => {
  Orders.findAll({
    where: {
      user_id: req.params.id
    },
    include: [
      {
        model: Events,
        as: 'event'
      }
    ]
  }).then(data => {
    if (data != 0) {
      res.send(data)
    } else {
      res.send({
        message: "Data not found"
      })
    }
  }).catch(err => {
    res.status(500).json({
      message: "internal server error",
      Error: err
    })
  })
}

//-----------------get tiket Aproved

exports.getTicket = (req, res) => {
  Orders.findAll({
    where: {
      user_id: req.id,
      status: req.query.status
    },
    include: [
      {
        model: Events,
        as: 'event'
      },
      {
        model: Users,
        as: 'user'
      }
    ]
  }).then(data => {
    if (data) {
      res.send(data)
    } else {
      res.send({
        message: "Data Not found"
      })
    }
  }).catch(err => {
    res.status(500).json({
      message: "Internal server error",
      Error: err
    })
  })
}
