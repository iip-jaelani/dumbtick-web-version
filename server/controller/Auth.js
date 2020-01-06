const jwt = require('jsonwebtoken');
const userModel = require('../models').User;
const bcrypt = require('bcrypt');

//----------------------- LOGIN ----------------------
exports.Login = (req, res) => {
  const {
    email,
    password
  } = req.body;

  userModel.findOne({
    where: {
      email
    }
  }).then(user => {

    const decrypt = bcrypt.compareSync(password, user.password);
    console.log(decrypt)
    if (user) {
      if (decrypt) {

        const token = jwt.sign({
          id: user.id,
          email: user.email,
          author: user.fullname
        }, 'secretCodeKey')
        res.send({
          id: user.id,
          email: user.email,
          token
        })
      } else {
        res.send({
          error: true,
          message: 'Wrong Password! ;('
        })
      }
    } else {
      res.send({
        error: true,
        message: 'Wrong email not register!'
      })
    }
  })
    .catch(err => {
      res.status(500).json({
        msg: 'Internal Server Error',
        Error: err
      });
    });

}

//----------------------- REGISTER ----------------------

exports.Register = (req, res) => {
  const { name, email } = req.body;
  userModel.findOne({
    where: {
      email,
      name
    }

  }).then(account => {
    if (account > 0) {

      res.send({
        error: true,
        message: 'account alredy use another users'
      })

    } else {

      var hash = bcrypt.hashSync(req.body.password, 9);

      let RegisterData = {
        name: req.body.name,
        email: req.body.email,
        password: hash,
        image: 'https://png.pngitem.com/pimgs/s/168-1689599_male-user-filled-icon-user-icon-100-x.png',
        birth_day: '16-10-2000',
        no_tlp: '00000x000x00x00',
        is_active: 1,
      }

      const token = jwt.sign({
        id: email
      }, 'secretCodeKey')

      userModel.create(RegisterData).then(data => {
        res.send({
          message: "account success register",
          email: data.email,
          password: data.password,
          token
        })

      })
        .catch(err => {
          res.status(500).json({
            msg: 'Internal Server Error',
            Error: err
          });
        });
    }
  })
}

