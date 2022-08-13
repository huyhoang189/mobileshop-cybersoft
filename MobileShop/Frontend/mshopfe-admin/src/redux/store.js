import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import rootSaga from "./root-saga";
import userSlice from "./user/userSlice";
import manufactureSlice from "./manufacture/manufactureSlice";
import serieSlice from "./serie/serieSlice";
import productSlice from "./product/productSlice";
import authSlice from "./auth/authSlice";
import roleSlice from "./role/roleSlice";
// disalbe thunk and add redux-saga middleware
const sagaMiddleware = createSagaMiddleware();
const middleware = [...getDefaultMiddleware({ thunk: false }), sagaMiddleware];
export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    manufacture: manufactureSlice.reducer,
    serie: serieSlice.reducer,
    product: productSlice.reducer,
    auth: authSlice.reducer,
    role: roleSlice.reducer,
  },
  middleware,
});
sagaMiddleware.run(rootSaga);
