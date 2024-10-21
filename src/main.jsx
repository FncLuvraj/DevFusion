import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./redux/appstore.js";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    {/* PersistGate delays the rendering of the app until the state is rehydrated */}
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>
);
