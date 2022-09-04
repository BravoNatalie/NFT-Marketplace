import React, { useState,useEffect} from "react";
import Sidebar from "../../components/SideBar/Sidebar";
import {useStyles} from './styles.js'

const UserSetting = () => {
    const classes = useStyles();
    return (
        <box className={classes.userSetting}>
            <section>
                <Sidebar/>
            </section>
        </box>

    );
};

export default UserSetting;
