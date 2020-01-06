import { POST_EVENTS } from "../config/constant";

const initialState = {
  addEvent: [],
  isLoading: false,
  error: false
}


export const postevent = (state = initialState, action) => {
  switch (action.type) {
    case `${POST_EVENTS}_PENDING`:
      return {
        ...state,
        isLoading: true,
      }
    case `${POST_EVENTS}_FULFILLED`:
      return {
        ...state,
        addEvent: action.payload.data,
        isLoading: false,
        isPost: true
      }
    case `${POST_EVENTS}_REJECTED`:
      return {
        ...state,
        error: true,
        isLoading: false
      }
    default:
      return state;
  }
}
export default postevent;