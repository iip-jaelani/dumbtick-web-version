import { LOGIN_USER, REGISTER_USER } from "../config/constant";

const initialState = {
  data: [],
  res: [],
  isLoading: false,
  isPost: false,
  error: false
}

export const auth = (state = initialState, action) => {
  switch (action.type) {
    case `${REGISTER_USER}_PENDING`:
      return {
        ...state,
        isLoading: true,
        isPost: false
      };
    case `${REGISTER_USER}_FULFILLED`:
      return {
        ...state,
        data: state.data.concat(action.payload.data),
        res: action.payload.data,
        isLoading: false,
        isPost: true
      }
    case `${REGISTER_USER}_REJECTED`:
      return {
        ...state,
        error: true,
        isLoading: false
      };
    //-----------------------------------------------------------------
    case `${LOGIN_USER}_PENDING`:
      return {
        ...state,
        isLoading: true,
        isPost: false
      };
    case `${LOGIN_USER}_FULFILLED`:
      return {
        ...state,
        data: state.data.concat(action.payload.data),
        res: action.payload.data,
        isLoading: false,
        isPost: true
      }
    case `${LOGIN_USER}_REJECTED`:
      return {
        ...state,
        error: true,
        isLoading: false
      };
    default:
      return state
  }
}

export default auth;