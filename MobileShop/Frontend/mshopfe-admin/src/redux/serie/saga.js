import { call, put, all, takeEvery } from "redux-saga/effects";
import serieSlice from "./serieSlice";
import { getSeries, addSerie, deleteSerie } from "../../services/serieService";
function* getAllSeries() {
  try {
    const response = yield call(getSeries);
    const data = response.data.data.series;
    if (data) {
      yield put(serieSlice.actions.getSeriesSuccess(data));
    }
  } catch (error) {
    console.log(error);
  }
}

function* handSerie({ payload }) {
  console.log(payload);
  try {
    if (payload.actionName == "ADD") {
      const response = yield call(addSerie, payload.serie);

      if (response) {
        yield put(serieSlice.actions.handSerieSuccess());
      }
    } else if (payload.actionName == "DELETE") {
      const response = yield call(deleteSerie, payload.serie);

      if (response) {
        yield put(serieSlice.actions.handSerieSuccess());
      }
    }

    yield put(serieSlice.actions.getSeries());
  } catch (error) {
    console.log(error);
  }
}

export default function* serieSaga() {
  yield all([
    yield takeEvery(serieSlice.actions.getSeries().type, getAllSeries),
    yield takeEvery(serieSlice.actions.handSerie().type, handSerie),
  ]);
}
