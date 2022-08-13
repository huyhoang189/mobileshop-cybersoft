import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import rootSaga from "./root-saga";
import homeSlice from "./home/homeSlice";
// disalbe thunk and add redux-saga middleware
const sagaMiddleware = createSagaMiddleware();
const middleware = [...getDefaultMiddleware({ thunk: false }), sagaMiddleware];
export const store = configureStore({
  reducer: {
    home: homeSlice.reducer,
  },
  middleware,
});
sagaMiddleware.run(rootSaga);
