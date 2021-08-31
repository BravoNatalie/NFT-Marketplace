import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./pages/Home/index";
import Header from "./components/Header/index";
import "./App.css";
import NftDetails from "./components/NftDetails";
// import NftForm from "./containers/NftForm"

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        {/* <NftForm/> */}
        <Switch>
          {/* <Route path="/" exact component={NftForm} /> */}
          <Route path="/" exact component={Home} />
          <Route path="/nft/:nftId" component={NftDetails} />
          <Route>404 Not Found!</Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
