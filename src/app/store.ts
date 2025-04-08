import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "@reduxjs/toolkit";
import {
  PersistStore,
  persistReducer,
  FLUSH,
  PAUSE,
  PURGE,
  REHYDRATE,
  REGISTER,
  PERSIST,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

import authReducer from "../features/auth/authSlice";
import persistStore from "redux-persist/es/persistStore";

const rootReducer = combineReducers({
  auth: authReducer,
});

const PersistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(PersistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, PURGE, REHYDRATE, REGISTER, PERSIST, PAUSE],
      },
    });
  },
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
