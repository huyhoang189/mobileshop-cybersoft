import { call, put, all, takeEvery } from "redux-saga/effects";
import roleSlice from "./roleSlice";
import { getRoles, addRole, deleteRole } from "../../services/roleService";
function* getAllRoles() {
  try {
    const response = yield call(getRoles);
    console.log(response);
    const data = response.data.data.roles;
    if (data) {
      yield put(roleSlice.actions.getRolesSuccess(data));
    }
  } catch (error) {
    console.log(error);
  }
}

function* handRole({ payload }) {
  try {
    if (payload.actionName == "ADD") {
      const response = yield call(addRole, payload.role);

      if (response) {
        yield put(roleSlice.actions.handRoleSuccess());
      }
    } else if (payload.actionName == "DELETE") {
      const response = yield call(deleteRole, payload.role);

      if (response) {
        yield put(roleSlice.actions.handRoleSuccess());
      }
    }

    yield put(roleSlice.actions.getRoles());
  } catch (error) {
    console.log(error);
  }
}

export default function* roleSaga() {
  yield all([
    yield takeEvery(roleSlice.actions.getRoles().type, getAllRoles),
    yield takeEvery(roleSlice.actions.handRole().type, handRole),
  ]);
}
