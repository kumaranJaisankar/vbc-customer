import {
  fetchSessionHistory,
  fetchSessionHistorySuccess,
} from "../Redux/SessionHistory/sagas";
import { call, put, takeEvery, takeLatest, all } from "redux-saga/effects";


export default function* rootSaga() {
  yield all([fetchSessionHistory(), fetchSessionHistorySuccess()]);
}
