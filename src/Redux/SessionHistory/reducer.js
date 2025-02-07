import { SessionHistory } from "./constants";

const initialState = {
  sessionHistoryTableData: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SessionHistory.setSessionHistory: {
      return {
        ...state,
        sessionHistoryTableData: [...action.payload],
      };
    }
    default: {
      return state;
    }
  }
};
