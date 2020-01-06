import { createStore, combineReducers, applyMiddleware } from "redux";
import { promise, logger } from "./middleware";
import { categories } from '../_reducers/Category'
import { events } from '../_reducers/Events';
import { upcoming } from '../_reducers/Today';
import { auth } from '../_reducers/Auth';
import { profile } from '../_reducers/User';
import { postevent } from '../_reducers/PostEvent'
import { eventCategory } from '../_reducers/CategoriesEvent'
const reducers = combineReducers({
  categories,
  events,
  upcoming,
  auth,
  profile,
  eventCategory,
  postevent
})


const store = createStore(reducers, applyMiddleware(promise, logger))

export default store;