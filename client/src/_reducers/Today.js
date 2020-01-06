import { GET_EVENTS_TODAY } from "../config/constant";

const initialState = {
  upcoming: [],
  isLoading: false,
  error: false
}


export const upcoming = (state = initialState, action) => {
  switch (action.type) {
    case `${GET_EVENTS_TODAY}_PENDING`:
      return {
        ...state,
        isLoading: true
      };
    case `${GET_EVENTS_TODAY}_FULFILLED`:
      return {
        ...state,
        upcoming: action.payload.data,
        isLoading: false
      };
    case `${GET_EVENTS_TODAY}_REJECTED`:
      return {
        ...state,
        error: true,
        isLoading: false
      };
    default:
      return state;
  }
}
export default upcoming;