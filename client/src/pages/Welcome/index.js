import React, {useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from '@material-ui/core/Button';

import video_welcome from '../../assets/Welcome.mp4'
import {useStyles} from "../Item/styles";


const Welcome=()=>{

    const classes = useStyles();

    return(

      <div className={classes.pageWelcome}>

          <body>
                <video width={360} src={video_welcome} autoPlay loop muted controls></video>
          </body>
      </div>

  )
}

export default Welcome;