import { call, put, all, takeEvery } from "redux-saga/effects";
import authSlice from "./authSlice";
import { login } from "../../services/authService";
import { notification } from "antd";
import { useNavigate } from "react-router-dom";
function* checkAuthorization() {
  try {
    let jwt = localStorage.getItem("jwt");
    if (jwt) {
      yield put(authSlice.actions.loginSuccess(JSON.parse(jwt)));
      window.location.href = "./";
    } else {
      yield put(authSlice.actions.loginError());
    }
  } catch (error) {}
}

function* logout() {
  try {
    localStorage.removeItem("jwt");
    yield put(authSlice.actions.checkAuthorization());
  } catch (error) {
    console.log(error);
  }
}

function* SignIn({ payload }) {
  try {
    const response = yield call(login, payload);
    if (response.data.data.login.token != "NOT FOUND") {
      localStorage.setItem(
        "jwt",
        JSON.stringify(response.data.data.login.token)
      );
      notification.success({
        message: "Login success",
      });
    } else {
      notification.error({
        message: "Login error",
      });
    }
    yield put(authSlice.actions.checkAuthorization());
  } catch (error) {
    console.log(error);
    yield put(authSlice.actions.loginError());
  }
}

export default function* authSaga() {
  yield all([
    yield takeEvery(
      authSlice.actions.checkAuthorization().type,
      checkAuthorization
    ),
    yield takeEvery(authSlice.actions.logout().type, logout),
    yield takeEvery(authSlice.actions.login().type, SignIn),
  ]);
}
