import React, {useState, useEffect} from "react";
import {useStyles} from './styles.js'
import avatar from '../../assets/user.jpg';

const UserInfo = () => {
    const classes = useStyles();

    return (
        <section className={classes.content}>
            <div className={classes.title}>
                <h1>基本信息</h1>
            </div>
            <div className={classes.row}>
                <div>
                    <img src={avatar} alt="user" className={classes.images}/>
                </div>
                <div className={classes.Info}>
                    <h1>姓名：张三</h1>
                    <h1>民族：汉族</h1>
                    <h1>生日：1900/01/01</h1>
                    <h1>学院：信息学院</h1>
                    <h1>专业：电子信息</h1>
                    <h1>年级班级：21信息一班</h1>
                    <h1>学号：M210000000</h1>
                    <h1>联系电话：18888888888</h1>
                </div>

            </div>
        </section>
    )
};

export default UserInfo;