import { all } from "redux-saga/effects";
import userSagas from "./user/saga";
import manufactureSagas from "./manufacture/saga";
import serieSagas from "./serie/saga";
import productSagas from "./product/saga";
import roleSagas from "./role/saga";
import authSagas from "./auth/saga";
export default function* rootSaga() {
  yield all([
    userSagas(),
    manufactureSagas(),
    serieSagas(),
    productSagas(),
    roleSagas(),
    authSagas(),
  ]);
}
