import { LOGIN_USER, REGISTER_USER } from "../config/constant";
import axios from "axios";

export const loginUser = user => {
  return {
    type: LOGIN_USER,
    payload: axios({
      method: "POST",
      url: 'http://localhost:7000/login',
      data: user
    })
  }
}



export const registerUser = data => {
  return {
    type: REGISTER_USER,
    payload: axios({
      method: "POST",
      url: 'http://localhost:7000/register',
      data: data
    })
  }
}

