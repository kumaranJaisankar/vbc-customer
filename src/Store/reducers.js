import { combineReducers } from 'redux';

import sessionHistoryReducer from '../Redux/SessionHistory/reducer';
import CommonReducer from '../Redux/Common/reducers';
import DashboardReducer from "../Redux/Dashboard/reducer";
import ComplaintsReducer from "../Redux/Complaints/reducer";

const rootReducer = combineReducers({
  sessionHistory : sessionHistoryReducer,
  common: CommonReducer,
  dashBoard: DashboardReducer,
  complaints: ComplaintsReducer
});

export default rootReducer;
