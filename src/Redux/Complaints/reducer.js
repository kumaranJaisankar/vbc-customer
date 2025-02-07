import { SET_RATING_INFO } from "./constants";

const initialState = {
  ratingInfo: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_RATING_INFO: {
      return {
        ...state,
        ratingInfo: action.payload,
      };
    }
    default: {
      return state;
    }
  }
};
