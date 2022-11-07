import React, {useState, useEffect} from "react";
import {useStyles} from './styles.js'
import avatar from '../../assets/user.jpg';
import {ex} from '../../common/global.js';
import {api} from "../../services/api";

// async function Signup() {
//     var Fdata = {};
//     Fdata["uname"] = ex.uname;

//     //发送请求
//     try {
//         console.log(Fdata)
//         const response = await api.post("/find", Fdata, {
//             headers: {
//                 // "Content-Type": `multipart/form-data; boundary=${Fdata._boundary}`,
//             },
//         });
//         console.log("response:", response)
//         var userData = response.data[0];
//         ex.setfullData(userData)
//         console.log("三影片", ex)
//     } catch (error) {
//         console.log(error);
//     }
// }
const UserInfo = () => {
    
    // Signup()
    const classes = useStyles();
    console.log("???",ex.college)
    var uname = ex.uname;
    var gender = ex.gender;
    var email = ex.email;
    var address =ex.address;
    var college = ex.college;
    var major = ex.major;
    var phone = ex.phone;
    return (
        <section className={classes.content}>
            <div className={classes.title}>
                <h1 >基本信息</h1>
            </div>
            <div className={classes.row}>
                <div>
                    <img src={avatar} alt="user" className={classes.images}/>
                </div>
                <div className={classes.Info}>
                    <span><h1>姓名：{uname}</h1></span>
                    {/* <h1>民族：汉族</h1>
                    <h1>生日：1900/01/01</h1> */}
                    <span><h1>性别：{gender}</h1></span>
                    <span><h1>地址：{address}</h1></span>
                    <span><h1>邮箱：{email}</h1></span>
                    <span><h1>学院：{college}</h1></span>
                    <span><h1>专业：{major}</h1></span>
                    {/* <h1>年级班级：21信息一班</h1> */}
                    {/* <h1>学号：M210000000</h1> */}
                    <span><h1>联系电话：{phone}</h1></span>
                </div>

            </div>
        </section>
    )
};

export default UserInfo;