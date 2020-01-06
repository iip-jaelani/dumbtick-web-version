const models = require('../models');
const Favorites = models.favorite
const Events = models.event


// exports.getFavorite = (req, res) => {
//   Favorites.findAll().then(data => res.send(data))
// }


exports.addFavorite = (req, res) => {
  let input = {
    user_id: req.id,
    event_id: req.body.like
  }
  Favorites.findOne({
    where: {
      user_id: req.id,
      event_id: req.body.like
    }
  }).then(data => {
    if (!data) {
      Events.findOne({
        where: {
          id: req.body.like
        }
      }).then(result => {
        if (result) {
          Favorites.create(input).then(data => res.send({
            message: 'Succes like',
            data
          }))
        } else {
          res.send({
            message: 'Event Not found'
          })
        }
      })
    } else {
      res.send({
        message: 'your has been like'
      })
    }
  }).catch(err => {
    res.status(500).json({
      message: 'Error',
      Error: err
    })
  })
}


exports.getFavorite = (req, res) => {
  Favorites.findAll({
    where: {
      user_id: req.id
    },
    include: [
      {
        model: Events,
        as: 'event'
      }
    ]
  }).then(data => res.send(data))
}