import React from 'react'
import { Grid, Paper, Avatar, Typography, TextField, Button } from '@material-ui/core'
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { Link } from "react-router-dom";
import ParticlesBg from "particles-bg";

const Signup = () => {
  const paperStyle = { padding: '30px 20px', width: 500, margin: "20px auto" }
  const headerStyle = { margin: 0 }
  const avatarStyle = { backgroundColor: '#073cad' }
  const marginTop = { marginTop: 5 }
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
  return (
      <Grid>
        <ParticlesBg type="custom" config={config} bg={true} />
        <Paper elevation={20} style={paperStyle}>
          <Grid align='center'>
            <Avatar style={avatarStyle}>
              <AddCircleOutlineOutlinedIcon />
            </Avatar>
            <h2 style={headerStyle}>注册</h2>

          </Grid>
          <form>
            <TextField fullWidth label='用户名' placeholder="请输入用户名" />
            <TextField fullWidth label='邮箱' placeholder="请输入邮箱" />
            <FormControl component="fieldset" style={marginTop}>
              <FormLabel component="legend">性别</FormLabel>
              <RadioGroup aria-label="Gender" name="gender" style={{ display: 'initial' }}>
                <FormControlLabel value="Female" control={<Radio />} label="女" />
                <FormControlLabel value="male" control={<Radio />} label="男" />
              </RadioGroup>
            </FormControl>
            <TextField fullWidth label='电话号码' placeholder="请输入电话号码" />
            <TextField fullWidth label='密码' placeholder="请输入密码"/>
            <TextField fullWidth label='确认密码' placeholder="确认密码"/>
            <FormControlLabel
                control={<Checkbox name="checkedA" />}
                label="同意所有条件"
            />
            <Link to="/Login">
                <Button type='submit' variant='contained' color='primary' fullWidth>注册</Button>
            </Link>
          </form>
        </Paper>
      </Grid>
  )
}

export default Signup;