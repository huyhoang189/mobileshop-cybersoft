import { call, put, all, takeEvery } from "redux-saga/effects";
import userSlice from "./userSlice";
import { getUsers, addUser, deleteUser } from "../../services/userService";
import { getRoles } from "../../services/roleService";
function* getAllUsers() {
  try {
    const response = yield call(getUsers);

    const data = response.data.data.users;
    if (data) {
      yield put(userSlice.actions.getUsersSuccess(data));
    }
  } catch (error) {
    console.log(error);
  }
}

function* handUser({ payload }) {
  try {
    if (payload.actionName == "ADD") {
      const response = yield call(addUser, payload.user);

      if (response) {
        yield put(userSlice.actions.handUserSuccess());
      }
    } else if (payload.actionName == "DELETE") {
      const response = yield call(deleteUser, payload.user);

      if (response) {
        yield put(userSlice.actions.handUserSuccess());
      }
    }

    yield put(userSlice.actions.getUsers());
  } catch (error) {
    console.log(error);
  }
}

function* getAllRoles() {
  try {
    const response = yield call(getRoles);
    console.log(response);
    const data = response.data.data.roles;
    if (data) {
      yield put(userSlice.actions.getRolesSuccess(data));
    }
  } catch (error) {
    console.log(error);
  }
}

export default function* userSaga() {
  yield all([
    yield takeEvery(userSlice.actions.getUsers().type, getAllUsers),
    yield takeEvery(userSlice.actions.handUser().type, handUser),
    yield takeEvery(userSlice.actions.getRoles().type, getAllRoles),
  ]);
}
