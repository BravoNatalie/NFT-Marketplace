import React, {useState} from 'react';
import {useSelector} from "react-redux";
import {Grid, Paper, Avatar, TextField, Button, Typography, Link} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import CancelOutlinedIcon from "@material-ui/icons/CancelOutlined";
import SignUp from "./signup";

import ParticlesBg from "particles-bg";
import {api} from "../../services/api";
import { useHistory } from 'react-router-dom';
import {ex} from '../../common/global.js'

const Login = () => {
    /*
        MetaMask钱包地址
        当用户登录时，用于判断当前钱包地址是否和用户注册时所填写的钱包地址一致
     */
    const accountAddress = useSelector((state) => state.allNft.account);
    // console.log(accountAddress);
    const history = useHistory()
    const paperStyle = {padding: 20, height: '70vh', width: 500, margin: "20px auto"}
    const avatarStyle = {backgroundColor: '#1b5cbd'}
    const btnstyle = {margin: '8px 0'}
    let config = {
        num: [4, 7],
        rps: 0.1,
        radius: [5, 40],
        life: [1.5, 3],
        v: [2, 3],
        tha: [-40, 40],
        alpha: [0.6, 0],
        scale: [.1, 0.4],
        position: "all",
        color: ["random", "#ff0000"],
        cross: "dead",
        // emitter: "follow",
        random: 15
    };

    if (Math.random() > 0.85) {
        config = Object.assign(config, {
            onParticleUpdate: (ctx, particle) => {
                ctx.beginPath();
                ctx.rect(
                    particle.p.x,
                    particle.p.y,
                    particle.radius * 2,
                    particle.radius * 2
                );
                ctx.fillStyle = particle.color;
                ctx.fill();
                ctx.closePath();
            }
        });
    }
    function handleInputChange(event) {
        let { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    }
    //接受用户输入参数
    const [formData, setFormData] = useState({
        uname: "",
        pwd: "",
    });
    function logOut(){
        var temp = {
            'uname':"",
            'address':'',
            'college':'',
            'email':'',
            'gender':'',
            'id':'',
            'major':'',
            'phone':''
        }
        ex.setfullData(temp);
        ex.logOut();
        history.push('/')
        console.log("三影片",ex)
    }
    async function login(event){
        console.log("登陆")
        console.log(formData)
        event.preventDefault();
        const {uname,pwd} = formData;
        if(uname===""){
            alert("请输入用户名")
            return
        }
        if(pwd===""){
            alert("请输入密码")
            return
        }
        var Fdata = {}
        Fdata["uname"] = uname
        Fdata["pwd"] = pwd
        //发送请求
        try {
            console.log(Fdata)
            const response = await api.post("/login", Fdata, {
                headers: {
                    // "Content-Type": `multipart/form-data; boundary=${Fdata._boundary}`,
                },
            });
            console.log("response:", response.data)
            if(response.data === 'OK'){
                ex.setData(uname)
                try {
                    console.log(Fdata)
                    const response = await api.post("/find", Fdata, {
                        headers: {
                            // "Content-Type": `multipart/form-data; boundary=${Fdata._boundary}`,
                        },
                    });
                    console.log("response:", response)
                    var userData = response.data[0];
                    ex.setfullData(userData)
                    console.log("三影片", ex)
                } catch (error) {
                    console.log(error);
                }
                console.log("存储的用户名", ex.uname)
                alert("登陆成功")
                history.push('/')
            }else{
                alert("用户名不存在或密码错误")
            }
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <Grid>
            <ParticlesBg type="custom" config={config} bg={true}/>
            <Paper elevation={10} style={paperStyle}>
                <Grid align='center'>
                    <Avatar style={avatarStyle}><LockOutlinedIcon/></Avatar>
                    <h2>上商NFT平台</h2>
                </Grid>
                <div style={{display:ex.isLogin?'none':'block'}}>
                <TextField onChange={handleInputChange} label='用户名' placeholder='输入用户名' name="uname" fullWidth required/>
                <TextField onChange={handleInputChange} label='密码' placeholder='输入密码' name="pwd" type='password' fullWidth required/>
                <FormControlLabel
                    control={
                        <Checkbox
                            name="checkedB"
                            color="primary"
                        />
                    }
                    label="记住密码"
                />
                {/*<Link href="/">*/}
                    <Button onClick={login} type='submit' color='primary' variant="contained" style={btnstyle} fullWidth>登录</Button>
                {/*</Link>*/}
                <Typography>
                    <Link href="#">
                        忘记密码 ?
                    </Link>
                </Typography>
                <Typography>
                    <Link href="SignUp">
                        注册
                    </Link>
                </Typography>
                </div>
                <div style={{display:ex.isLogin?'block':'none'}}>
                    <h1>已登陆用户:{ex.uname}</h1>
                    <button onClick={logOut}>退出登陆</button>
                </div>

            </Paper>
        </Grid>
    )
}

export default Login;