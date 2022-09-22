import React, {useState} from 'react'
import {Grid, Paper, Avatar, Typography, TextField, Button} from '@material-ui/core'
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import FormLabel from '@material-ui/core/FormLabel';
import Checkbox from '@material-ui/core/Checkbox';
import {Link} from "react-router-dom";
import ParticlesBg from "particles-bg";
import {api} from "../../services/api";

const Signup = () => {
    const paperStyle = {padding: '30px 20px', width: 500, margin: "20px auto"}
    const headerStyle = {margin: 0}
    const avatarStyle = {backgroundColor: '#073cad'}
    const marginTop = {marginTop: 5}
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
        // if(name === 'image'){
        //   value = event.target.files[0];
        // }
        setFormData({ ...formData, [name]: value });
    }
    const [formData, setFormData] = useState({
        uname: "",
        pwd: "",
        cPwd:"",
        address: "",
        email: "",
        gender: "",
        phone: "",
        college: "",
        major:"",
    });

    async function Signup(event) {
        console.log(formData)
        if(formData.pwd !== formData.cPwd){
            event.preventDefault()
            alert("两次输入的密码不一致")
            return
        }
        event.preventDefault();
        const {uname,pwd, address, email, gender, phone, college, major} = formData;
        // let Fdata = new FormData();
        // Fdata.append('uname', uname);
        // Fdata.append('address', address);
        // Fdata.append('pwd', pwd);
        // Fdata.append('email', email);
        // Fdata.append('gender', gender);
        // Fdata.append('phone', phone);
        // Fdata.append('college', college);
        // Fdata.append('major', major);
        var Fdata = {}
        Fdata["uname"] = uname
        Fdata["pwd"] = pwd
        Fdata["address"] = address
        Fdata["email"] = email
        Fdata["gender"] = gender
        Fdata["phone"] = phone
        Fdata["college"] = college
        Fdata["major"] = major
        try {
            console.log(Fdata)
            const response = await api.post("/signup", Fdata, {
                headers: {
                    // "Content-Type": `multipart/form-data; boundary=${Fdata._boundary}`,
                },
            });
            console.log("response:", response)
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Grid>
            <ParticlesBg type="custom" config={config} bg={true}/>
            <Paper elevation={20} style={paperStyle}>
                <Grid align='center'>
                    <Avatar style={avatarStyle}>
                        <AddCircleOutlineOutlinedIcon/>
                    </Avatar>
                    <h2 style={headerStyle}>注册</h2>
                </Grid>
                <form onSubmit={Signup}>
                    <TextField fullWidth label='用户名' name="uname" value={formData.uname} onChange={handleInputChange} placeholder="请输入用户名"/>
                    <TextField fullWidth label='账户地址' name="address"value={formData.address} onChange={handleInputChange} placeholder="请输入账户地址"/>
                    <TextField fullWidth label='邮箱' name="email" value={formData.email} onChange={handleInputChange} placeholder="请输入邮箱"/>
                    <FormControl component="fieldset" style={marginTop}>
                        <FormLabel component="legend">性别</FormLabel>
                        <RadioGroup aria-label="Gender" onChange={handleInputChange} name="gender" style={{display: 'initial'}}>
                            <FormControlLabel value="0" control={<Radio/>} label="女"/>
                            <FormControlLabel value="1" control={<Radio/>} label="男"/>
                        </RadioGroup>
                    </FormControl>
                    
                    <FormControl fullWidth>
                    <InputLabel id="demo-controlled-open-select-label">所属学院</InputLabel>
                    <Select
                        labelId="demo-controlled-open-select-label"
                        id="demo-controlled-open-select"
                        name='college'
                        value={formData.college}
                        onChange={handleInputChange}
                    >
                        <MenuItem value="">
                        <em>None</em>
                        </MenuItem>
                        <MenuItem value={1}>工商管理学院</MenuItem>
                        <MenuItem value={2}>财务金融学院</MenuItem>
                        <MenuItem value={3}>商务经济学院</MenuItem>
                        <MenuItem value={4}>酒店管理学院</MenuItem>
                        <MenuItem value={5}>商务外语学院</MenuItem>
                        <MenuItem value={6}>艺术设计学院</MenuItem>
                        <MenuItem value={7}>商务信息学院</MenuItem>
                        <MenuItem value={8}>文法学院</MenuItem>
                        <MenuItem value={9}>马克思主义学院</MenuItem>
                        <MenuItem value={10}>上海洛桑酒店管理学院</MenuItem>
                        <MenuItem value={11}>现代流通国家级实验教学示范中心</MenuItem>
                        <MenuItem value={12}>国际教育学院、商务部国际商务官员研修基地（上海）</MenuItem>
                    </Select>

                    </FormControl>
                    <TextField fullWidth label='专业' name="major" value={formData.major} onChange={handleInputChange} placeholder="请输入所在专业"/>
                    <TextField fullWidth label='电话号码' name="phone" value={formData.phone} onChange={handleInputChange} placeholder="请输入电话号码"/>
                    <TextField fullWidth label='密码' name="pwd" type='password' value={formData.pwd} onChange={handleInputChange} placeholder="请输入密码"/>
                    <TextField fullWidth label='确认密码' name='cPwd' type='cPwd' value={formData.cPwd} onChange={handleInputChange} placeholder="确认密码"/>
                    <FormControlLabel
                        control={<Checkbox name="checkedA"/>}
                        label="同意所有条件"
                    />
                    {/*<Link to="/Login">*/}
                        <Button type='submit' variant='contained' color='primary' fullWidth>注册</Button>
                    {/*</Link>*/}
                </form>
            </Paper>
        </Grid>
    )
}

export default Signup;