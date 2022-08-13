import { call, put, all, takeEvery } from "redux-saga/effects";
import homeSlice from "./homeSlice";
import {
  getManufactures,
  getProducts,
  getProductsMultiSearch,
} from "../../services/homeSerives";
function* getAllManufactures() {
  try {
    const response = yield call(getManufactures);

    const data = response.data.data.manufactures;
    if (data) {
      yield put(homeSlice.actions.getManufacturesSuccess(data));
    }
  } catch (error) {
    console.log(error);
  }
}

function* getAllProducts() {
  try {
    const response = yield call(getProducts);

    const data = response.data.data.products;
    if (data) {
      yield put(homeSlice.actions.getProductsSuccess(data));
    }
  } catch (error) {
    console.log(error);
  }
}

function* updateSearchOptions({ payload }) {
  try {
    const response = yield call(getProductsMultiSearch, payload);
    const data = response.data.data.productsMultiSearch;
    if (data) {
      yield put(homeSlice.actions.getProductsSuccess(data));
    }
  } catch (error) {
    console.log(error);
  }
}

export default function* homeSaga() {
  yield all([
    yield takeEvery(
      homeSlice.actions.getManufactures().type,
      getAllManufactures
    ),
    yield takeEvery(homeSlice.actions.getProducts().type, getAllProducts),
    yield takeEvery(
      homeSlice.actions.updateSearchOptions().type,
      updateSearchOptions
    ),
  ]);
}
