import "./Sidebar.css";
import SideMenu, { menuItems } from "./SideMenu";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useState } from "react";
import UserInfo from "../UserInfo/index";
import Wallet from "../Wallet/index";
import TransactionRecord from "../TransactionRecord/index";
import UploadRecord from "../UploadRecord/index";
import AuditCenter from "../AuditCenter/index"
import Integral from "../Integral/index";
import MyCollections from "../MyCollections/index"
function Sidebar() {

    const [inactive, setInactive] = useState(false);

    return (
        <div className="Sidebar">
            <Router>
                <SideMenu
                    onCollapse={(inactive) => {
                        console.log(inactive);
                        setInactive(inactive);
                    }}
                />

                <div className={`container ${inactive ? "inactive" : ""}`}>
                    <Switch>
                        <Route exact path={"/User/Info"}>
                            <UserInfo/>
                        </Route>
                        <Route exact path={"/User/TransactionRecord"}>
                            <TransactionRecord/>
                        </Route>
                        <Route exact path={"/User/UploadRecord"}>
                            <UploadRecord/>
                        </Route>
                        <Route exact path={"/MyCollections"}>
                            <MyCollections/>
                        </Route>
                        <Route exact path={"/AuditCenter"}>
                            <AuditCenter/>
                        </Route>
                        <Route path={"/Wallet/integral"}>
                            <Integral/>
                        </Route>
                        <Route path={"/Wallet/metamask"}>
                            <Wallet/>
                        </Route>
                    </Switch>
                </div>
            </Router>
        </div>
    );
}

export default Sidebar;
