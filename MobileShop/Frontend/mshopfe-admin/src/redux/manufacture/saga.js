import { call, put, all, takeEvery } from "redux-saga/effects";
import manufactureSlice from "./manufactureSlice";
import {
  getManufactures,
  addManufacture,
  deleteManufacture,
} from "../../services/manufactureService";
function* getAllManufactures() {
  try {
    const response = yield call(getManufactures);
    console.log(response);
    const data = response.data.data.manufactures;
    if (data) {
      yield put(manufactureSlice.actions.getManufacturesSuccess(data));
    }
  } catch (error) {
    console.log(error);
  }
}

function* handManufacture({ payload }) {
  console.log(payload);
  try {
    if (payload.actionName == "ADD") {
      const response = yield call(addManufacture, payload.manufacture);

      if (response) {
        yield put(manufactureSlice.actions.handManufactureSuccess());
      }
    } else if (payload.actionName == "DELETE") {
      const response = yield call(deleteManufacture, payload.manufacture);

      if (response) {
        yield put(manufactureSlice.actions.handManufactureSuccess());
      }
    }

    yield put(manufactureSlice.actions.getManufactures());
  } catch (error) {
    console.log(error);
  }
}

export default function* manufactureSaga() {
  yield all([
    yield takeEvery(
      manufactureSlice.actions.getManufactures().type,
      getAllManufactures
    ),
    yield takeEvery(
      manufactureSlice.actions.handManufacture().type,
      handManufacture
    ),
  ]);
}
