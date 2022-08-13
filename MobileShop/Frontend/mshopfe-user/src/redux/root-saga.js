import { all } from "redux-saga/effects";
import homeSagas from "./home/saga";
export default function* rootSaga() {
  yield all([homeSagas()]);
}
