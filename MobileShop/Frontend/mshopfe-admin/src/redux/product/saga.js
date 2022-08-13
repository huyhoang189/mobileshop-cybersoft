import { call, put, all, takeEvery } from "redux-saga/effects";
import productSlice from "./productSlice";
import {
  getProducts,
  addProduct,
  updateProduct,
  deleteProduct,
  getManufactures,
  getSerieByIdManufacture,
} from "../../services/productService";

function* getAllProducts() {
  try {
    const response = yield call(getProducts);
    const data = response.data.data.products;
    if (data) {
      yield put(productSlice.actions.getProductsSuccess(data));
    }
  } catch (error) {
    console.log(error);
  }
}

function* handProduct({ payload }) {
  console.log(payload);
  try {
    if (payload.actionName == "ADD") {
      const response = yield call(addProduct, {
        ...payload.product,
        serie_id: payload.selectedSerie.id,
      });

      if (response) {
        yield put(productSlice.actions.handProductSuccess());
      }
    } else if (payload.actionName == "DELETE") {
      const response = yield call(deleteProduct, payload.product);

      if (response) {
        yield put(productSlice.actions.handProductSuccess());
      }
    } else if (payload.actionName == "UPDATE") {
      const response = yield call(updateProduct, payload.product);

      if (response) {
        yield put(productSlice.actions.handProductSuccess());
      }
    }

    yield put(productSlice.actions.getProducts());
  } catch (error) {
    console.log(error);
  }
}

function* getAllManufactures() {
  try {
    const response = yield call(getManufactures);
    const data = response.data.data.manufactures;
    if (data.length > 0) {
      yield put(productSlice.actions.getManufacturesSuccess(data));
      yield put(productSlice.actions.getSerieByIdManufacture(data[0]));
    }
  } catch (error) {
    console.log(error);
  }
}

function* getAllSerieByIdManufacture({ payload }) {
  try {
    const response = yield call(getSerieByIdManufacture, payload);
    const data = response.data.data.manufactureById.serie;
    // console.log(data);

    if (data.length > 0) {
      yield put(productSlice.actions.getSerieByIdManufactureSuccess(data));
      yield put(productSlice.actions.updateSelectedSerie(data[0]));
    } else
      yield put(
        productSlice.actions.updateSelectedSerie({
          id: 0,
          name: "",
        })
      );
  } catch (error) {
    console.log(error);
  }
}

export default function* productSaga() {
  yield all([
    yield takeEvery(productSlice.actions.getProducts().type, getAllProducts),
    yield takeEvery(productSlice.actions.handProduct().type, handProduct),
    yield takeEvery(
      productSlice.actions.getManufactures().type,
      getAllManufactures
    ),
    yield takeEvery(
      productSlice.actions.getSerieByIdManufacture().type,
      getAllSerieByIdManufacture
    ),
    yield takeEvery(
      productSlice.actions.updateSelectedManufacture().type,
      getAllSerieByIdManufacture
    ),
  ]);
}
