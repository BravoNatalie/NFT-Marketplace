import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Header from "./components/Header/index";
import Footer from "./components/Footer/index";
import Home from "./pages/Home";
import CreateNFT from "./pages/CreateNFT/index";
import Item from "./pages/Item/index";
import Transfer from "./pages/Transfer/index";
import MyNFTs from "./pages/My NFTs";
import Login from "./pages/Login/index";
import SignUp from "./pages/Login/signup";
import Tab from "./pages/Tab/Tab";
import UserSetting from "./pages/UserSetting/index";
import Welcome from "./pages/Welcome/index";
import Product from "./pages/Product/index";
import "./App.css";



function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/Welcome" component={Welcome}/>
          <Route path="/create-nft" component={CreateNFT} />
          <Route path="/nft/:nftId" component={Item} />
          <Route path="/my-nft" component={MyNFTs} />
          <Route path="/transfer/:nftId" component={Transfer} />
          <Route path="/Login" component={Login} />
          <Route path="/SignUp" component={SignUp} />
          <Route path="/Tab" component={Tab}/>
          <Route path="/UserSetting" component={UserSetting}/>
          <Route path="/product" component={Product} />
          <Route>404 Not Found!</Route>
        </Switch>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
