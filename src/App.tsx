import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { Provider } from "react-redux";
import CountryInfo from "./components/CountryInfo";
import store  from "./redux/store";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <CountryInfo />
        {/* Add other components here */}
      </div>
    </Provider>
  );
}

export default App;
