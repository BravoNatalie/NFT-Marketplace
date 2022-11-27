import React, {useState} from 'react';
import {useSelector} from "react-redux";
import {Grid, Paper, Avatar, TextField, Button, Typography, Link} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import CancelOutlinedIcon from "@material-ui/icons/CancelOutlined";
import SignUp from "./signup";
import { useEffect } from 'react';

import ParticlesBg from "particles-bg";
import {api} from "../../services/api";
import { useHistory } from 'react-router-dom';
import {ex} from '../../common/global.js'
import { setCookie, getCookie, removeCookie } from '../../common/rememberPwd';

const Login = () => {
    /*
        MetaMask钱包地址
        当用户登录时，用于判断当前钱包地址是否和用户注册时所填写的钱包地址一致
     */
    const accountAddress = useSelector((state) => state.allNft.account);
    // console.log(accountAddress);
    const [formData, setFormData] = useState({
        uname: "",
        pwd: "",
        isRem: false,
        isFirst: true,
    });
    const history = useHistory()
    useEffect(()=>{
        if (getCookie('uname') !== '' && getCookie('pwd') !== '') {
            var username = getCookie('uname')
            var password = getCookie('pwd')
            document.getElementById('uname').value=username
            document.getElementById('pwd').value=password
            setFormData({...formData, ["isRem"]:true, ["uname"]:username, ["pwd"]:password})
        }
    },[])
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
    
    // console.log("111",document.getElementsByName('uname').value)
    function rmbpsw(e){
        setFormData({ ...formData, ["isRem"]: e.target.checked });  
        console.log(formData)     
    }
    // function test(){
    //     document.getElementById('uname').value=123
    //     console.log("三影片",document.getElementById('uname').value)
    // }
    // test()
    // console.log("yes???????")
    // console.log(getCookie('uname'))
    // console.log(getCookie('pwd'))
    // if (getCookie('uname') !== '' && getCookie('pwd') !== '') {
    //     this.props.form.setFieldsValue({
    //     uname: getCookie('uname'),
    //     pwd: getCookie('pwd'),
    //     });
    //     setFormData({...formData, ["isRem"]:true})
    // }
    function handleInputChange(event) {
        let { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
        console.log("哈哈哈",name, value,formData)
        // if(event.target.name=='uname'){
        //     if(formData['isFirst']){
        //         console.log("first time")
        //         setFormData({...formData, ["isFirst"]:false})
        //         document.getElementById("pwd").value=""
        //         setFormData({...formData, ["isRem"]:false})
        //     }else{
        //         console.log("not first")
        //     }
        // }
    }
    //接受用户输入参数
    
    function logOut(){
        ex.clear()
        history.push('/')
        console.log("三影片",ex)
    }
    async function login(event){
        console.log("登陆")
        console.log(formData)
        event.preventDefault();
        var Tname = document.getElementById("uname").value
        var Tpwd = document.getElementById("pwd").value
        setFormData({...formData, ["uname"]:Tname, ["pwd"]:Tpwd})
        if(formData["isRem"]){
            setCookie('uname',Tname,1)
            setCookie('pwd',Tpwd,1)
        }else{
            removeCookie('uname')
            removeCookie('pwd')
        }
        console.log("???",Tname)
        console.log(formData)
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
        <Grid >
            <ParticlesBg type="custom" config={config} bg={true}/>
            <Paper elevation={10} style={paperStyle}>
                <Grid align='center'>
                    <Avatar style={avatarStyle}><LockOutlinedIcon/></Avatar>
                    <h2>上商NFT平台</h2>
                </Grid>
                <div style={{display:ex.isLogin?'none':'block'}}>
                <TextField id='uname' onChange={handleInputChange} label='用户名' placeholder='输入用户名' name="uname" fullWidth required/>
                <TextField id='pwd' onChange={handleInputChange} label='密码' placeholder='输入密码' name="pwd" type='password' fullWidth required/>
                <FormControlLabel id='rmb' onChange={rmbpsw} checked={formData["isRem"]}
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