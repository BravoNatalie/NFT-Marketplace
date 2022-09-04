import React from 'react'
import { Grid,Paper, Avatar, TextField, Button, Typography,Link } from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import CancelOutlinedIcon from "@material-ui/icons/CancelOutlined";
import SignUp from "./signup";

import ParticlesBg from "particles-bg";

const Login=()=>{

  const paperStyle={padding :20,height:'70vh',width:500, margin:"20px auto"}
  const avatarStyle={backgroundColor:'#1b5cbd'}
  const btnstyle={margin:'8px 0'}
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
  return(
      <Grid>
          <ParticlesBg type="custom" config={config} bg={true} />
        <Paper elevation={10} style={paperStyle}>
          <Grid align='center'>
            <Avatar style={avatarStyle}><LockOutlinedIcon/></Avatar>
            <h2>上商NFT教务系统</h2>
          </Grid>
          <TextField label='用户名' placeholder='输入用户名' fullWidth required/>
          <TextField label='密码' placeholder='输入密码' type='password' fullWidth required/>
          <FormControlLabel
              control={
                <Checkbox
                    name="checkedB"
                    color="primary"
                />
              }
              label="记住密码"
          />
          <Link href="/">
            <Button type='submit' color='primary' variant="contained" style={btnstyle} fullWidth>登录</Button>
          </Link>
          <Typography >
            <Link href="#" >
              忘记密码 ?
            </Link>
          </Typography>
          <Typography >
            <Link href="SignUp" >
              注册
            </Link>
          </Typography>
        </Paper>
      </Grid>
  )
}

export default Login;