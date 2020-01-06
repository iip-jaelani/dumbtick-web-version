const jwt = require("jsonwebtoken");

exports.authorized = (req, res, next) => {
  let tokenHeader = req.headers["authorization"];

  if (!tokenHeader) {
    return res.status(403).json({
      msg: "Token is not defined"
    })
  }

  let token = tokenHeader.slice(7, tokenHeader.length);

  if (token) {
    jwt.verify(token, "secretCodeKey", (err, result) => {
      if (err) {
        return res.status(403).json({
          msg: "Token is not valid"
        });
      }
      req.id = result.id;
      req.author = result.author;
      req.email = result.email
      next();
    });
  }
};


