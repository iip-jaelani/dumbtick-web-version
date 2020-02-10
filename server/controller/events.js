const model = require('../models');
const Users = model.User;
const Category = model.category;
const Events = model.event;
const Order = model.order;


exports.getAllEvents = (req, res) => {
  Events.findAll({
    where: {
      start_time: req.query.start_time
    },
    include: [{
      model: Category,
      as: 'category'
    },
    {
      model: Users,
      as: "user"
    }
    ]
  }).then(data => {
    res.send(data)

  }).catch(err => {
    res.status(500).json({
      message: "Internal server error",
      Erros: err
    })
  })
}



const result = data => {
  const newData = data.map(item => {
    let newItem = {
      id: item.id,
      title: item.title,
      category: {
        id: item.category.id,
        name: item.category.name
      },
      startTime: item.start_time,
      endTime: item.end_time,
      price: item.price,
      description: item.deskription,
      address: item.address,
      urlMaps: item.url_maps,
      image: item.image,
      createdBy: {
        id: item.user.id,
        name: item.user.name,
        phone: item.user.no_tlp,
        email: item.user.email,
        img: item.user.image
      }
    };
    return newItem;
  });
  return newData;
};




exports.getEvents = (req, res) => {
  const { title } = req.query
  Events.findAll({
    where: {
      title: title
    },
    include: [{
      model: Category,
      as: 'category'
    },
    {
      model: Users,
      as: "user"
    }
    ]
  }).then(data => {
    if (data != 0) {
      res.send(result(data))
    } else {
      res.send({
        message: "Data Not Found"
      })
    }
  }).catch(err => {
    res.status(500).json({
      message: "Internal server error",
      Erros: err
    })
  })
}

const resultdetail = data => {
  let newData = {
    id: data.id,
    title: data.title,
    idCAt: data.category.id,
    name: data.category.name,
    startTime: data.start_time,
    endTime: data.end_time,
    price: data.price,
    description: data.deskription,
    address: data.address,
    urlMaps: data.url_maps,
    image: data.image,
    idUser: data.user.id,
    nameUser: data.user.name,
    phone: data.user.no_tlp,
    email: data.user.email,
    img: data.user.image
  };
  return newData;
};

exports.eventDetail = (req, res) => {
  Events.findOne({
    where: {
      id: req.params.id
    },
    include: [
      {
        model: Category,
        as: 'category'
      },
      {
        model: Users,
        as: "user"
      }
    ]
  }).then(data => {
    if (data) {
      res.send(resultdetail(data))
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
//-----------------------------post Order----------------------------------

exports.orderEvent = (req, res) => {
  Events.findOne({
    where: {
      id: req.body.event_id
    },
    include: [
      {
        model: Category,
        as: 'category'
      },
      {
        model: Users,
        as: "user"
      }
    ]
  }).then(data => {
    if (!data) {
      res.status(404).json({
        message: "data not found"
      })
    } else {
      let input = {
        user_id: req.id,
        article_id: req.body.event_id,
        quantity: req.body.quantity,
        price: req.body.quantity * data.price,
        status: 'pending',
      }
      Order.create(input).then(result => (
        res.send({
          result, data
        })
      ))
    }
  }).catch(err => {
    res.status(500).json({
      message: "Internal server error",
      Error: err
    })
  })
}


//-----------------------------UPDATE ORDER----------------------------------

exports.updateOrder = (req, res) => {
  let input = {
    status: req.body.status
  }
  Order.findOne({
    where: {
      id: req.params.id
    },
    include: [
      {
        model: Users,
        as: 'user'
      },
      {
        model: Category,
        as: 'category'
      },
      {
        model: Events,
        as: 'event'
      }
    ]
  }).then(data => {
    if (data) {
      if (data.user_id == req.id) {
        Order.update(input, {
          where: {
            id: req.params.id
          }
        }).then(result => {
          console.log(result);
          if (result > 0) {
            res.send(data)
          } else {
            res.send({
              message: "Failed to update data"
            })
          }
        })
      } else {
        res.send({
          message: "Access forbiden"
        })
      }
    } else {
      res.send({
        message: "Data Not Found"
      })
    }
  })
}


//-----------------------------POST EVENT----------------------------------


exports.addEvent = (req, res) => {
  let input = {
    title: req.body.title,
    category_id: req.body.category,
    start_time: req.body.startTime,
    end_time: req.body.endTime,
    price: req.body.price,
    deskription: req.body.deskription,
    address: req.body.address,
    url_maps: req.body.urlMaps,
    image: req.body.gambar,
    author_id: req.id
  }

  Events.create(input).then(ress => {
    res.send({
      message: 'success',
      data: ress
    })
  })
}



exports.deleteEvent = (req, res) => {
  Events.findOne({
    where: {
      id: req.params.id
    }
  }).then(ress => {
    if (ress) {
      Events.destroy({
        where: {
          id: req.params.id
        }
      }).then(ress => {
        res.send({
          message: 'Success'
        })
      })
    }
  })
}