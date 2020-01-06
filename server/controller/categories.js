const model = require('../models');
const Users = model.User;
const Category = model.category;
const Events = model.event;

const result = data => {
  const newData = data.map(item => {
    let newItem = {
      id: item.id,
      name: item.name,
      bg: item.bacground
    };
    return newItem;
  });
  return newData;
};


exports.getCategories = (req, res) => {
  Category.findAll().then(data => res.send(result(data)))
}


const categoryDetail = data => {
  const newData = data.map(item => {
    let newItem = {
      id: item.id,
      title: item.title,
      idCat: item.category.id,
      nameCat: item.category.name,
      startTime: item.start_time,
      endTime: item.end_time,
      price: item.price,
      description: item.deskription,
      address: item.address,
      urlMaps: item.url_maps,
      image: item.image,
      id: item.user.id,
      name: item.user.name,
      phone: item.user.no_tlp,
      email: item.user.email,
      img: item.user.image

    };
    return newItem;
  });
  return newData;
};


exports.getCategorydetail = (req, res) => {
  Events.findAll({
    where: {
      category_id: req.params.id
    },
    include: [{
      model: Category,
      as: 'category'
    },
    {
      model: Users,
      as: 'user'
    }
    ]
  }).then(data => {
    if (data) {
      res.send((data))
    } else {
      res.send({
        message: "data not found"
      })
    }
  })
}