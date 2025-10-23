import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import { firestoreapi } from "./firestoreAPI";

export const store = () => {
  return configureStore({
    reducer: {
      User: userReducer,
      [firestoreapi.reducerPath]: firestoreapi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(firestoreapi.middleware),
  });
};

export type AppStore = ReturnType<typeof store>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
