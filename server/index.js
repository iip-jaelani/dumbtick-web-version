require("express-group-routes");
const express = require("express");
const cors = require("cors");
const app = express();
const port = 7000
const bodyparser = require('body-parser');

app.use(cors());
app.use(bodyparser.json());

//-------------------------Controllers-------------------------
//auth 
const ControllerAuth = require('./controller/Auth');
//Users
const ControllerUsers = require('./controller/Users');
//Categories
const ControllerCategory = require('./controller/categories');
//favorite
const ControllerFaVorite = require('./controller/Favorite');
//events
const ControllerEvents = require('./controller/events');
//middleware
const { authorized } = require("./middleware");

app.get("/", (req, res, next) => {
  res.send("<h1>hi!!!!</h1>");
});

app.group("/", router => {

  //get user with token
  router.get("/user", authorized, ControllerUsers.userid);

  //get favorite
  router.get("/favorite", authorized, ControllerFaVorite.getFavorite);
  //add favorute
  router.post('/favorite', authorized, ControllerFaVorite.addFavorite)
  //get all events 
  // router.get('/events', ControllerEvents.getAllEvents);
  //start time events (today)
  router.get('/events', ControllerEvents.getAllEvents);
  //get events
  // router.get('/events', ControllerEvents.getEvents);
  //categories
  router.get('/categories', ControllerCategory.getCategories);
  //gategories wit id n event
  router.get('/category/:id/events', ControllerCategory.getCategorydetail);
  //get arditcle detail where id
  router.get("/event/:id", ControllerEvents.eventDetail);
  // post order
  router.post("/event/order", authorized, ControllerEvents.orderEvent);
  //post event
  router.post('/add-event', authorized, ControllerEvents.addEvent);
  // register
  router.post('/register', ControllerAuth.Register);
  //login
  router.post('/login', ControllerAuth.Login);
  //get all users
  router.get('/users', ControllerUsers.user);
  //get user with id
  router.get('/user/:id', ControllerUsers.userid);
  //get faforite
  router.get('/user/:id/favorite', ControllerUsers.userFavorite);
  //get ticket
  router.get('/orders', authorized, ControllerUsers.getTicket);
  // update order 
  router.put('/order/:id', authorized, ControllerEvents.updateOrder)

  //ticket 
});

app.use((err, req, res, next) => {
  if (err.name === "Unexpected token") {
    res.status(400).json({ message: "You are not authorized." });
  } else {
    next(err);
  }
});

//Server must to listen to port
app.listen(port, () => console.log(`Server is listening to Port: ${port}`));
