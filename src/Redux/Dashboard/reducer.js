import { SET_DASHBOARD_DATA } from "./constants";

const initialState = {
  dashboardData: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_DASHBOARD_DATA: {
      return {
        ...state,
        dashboardData: action.payload,
      };
    }
    default: {
      return state;
    }
  }
};
