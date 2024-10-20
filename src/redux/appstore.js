import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import feedReducer from "./feedSlice";
import connectionSlice from "./connectionSlice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // Default: localStorage for web

// Config for redux-persist
const persistConfig = {
  key: "root", // You can specify a custom key
  storage, // Specifies using localStorage
};

// Create a persisted reducer for the user slice
const persistedUserReducer = persistReducer(persistConfig, userReducer);

// Configure the store with persisted reducers
export const store = configureStore({
  reducer: {
    user: persistedUserReducer, // Now userReducer is persisted
    feed: feedReducer, // Non-persisted feed reducer
    connection: connectionSlice,
  },
});

// Create the persistor
export const persistor = persistStore(store);
