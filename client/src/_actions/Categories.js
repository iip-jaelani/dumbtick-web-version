import { GET_CATEGORIES, GET_CATEGORY_EVENTS } from "../config/constant"
import axios from "axios";

export const getCategories = () => {
  return {
    type: GET_CATEGORIES,
    payload: axios(
      {
        method: "GET",
        url: "http://localhost:7000/categories"
      }
    )
  }
}

export const getCategoriesWhereId = id => {
  return {
    type: GET_CATEGORY_EVENTS,
    payload: axios(
      {
        method: "GET",
        url: `http://localhost:7000/category/${id}/events`
      }
    )
  }
}
