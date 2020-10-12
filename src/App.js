import React from "react";
import "./App.css";
import Overlay from "./components/Overlay";
import { AppProvider, useAppContext } from "./hooks";
import Routes from "./routes";

function App() {
  return (
    <AppProvider>
      <Overlay />
      <Routes />
    </AppProvider>
  );
}

export default App;
