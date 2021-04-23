import React from 'react';

import {makeStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import SvgIcon from '@material-ui/core/SvgIcon';
import PlayArrowRoundedIcon from '@material-ui/icons/PlayArrowRounded';
import ReplayOutlinedIcon from '@material-ui/icons/ReplayOutlined';
import StopRoundedIcon from '@material-ui/icons/StopRounded';
import { grey } from '@material-ui/core/colors';
import InfoIcon from '@material-ui/icons/Info';
import Tooltip from '@material-ui/core/Tooltip';

import HashtagIcon from '../../assets/img/icon-hashtag.png';
import BeersIcon from '../../assets/img/icon-beers.png';
import BeerIcon from '../../assets/img/icon-beer.png';
import SpeedometerIcon from '../../assets/img/icon-speedometer.png';
import StopwatchIcon from '../../assets/img/icon-stopwatch.png';

const useStyles = makeStyles((theme) => ({

    mainContent:{
        margin: "3% auto",
        width: "80%",
        background: "white",
        display: "flex"
        },
    leftProd:{
        float: "left",
        width: "50%",
        height: "auto",
        background: "white",
        position: "relative",
        },
    rightProd:{
        float: "left",
        width: "50%",
        height: "200px",
        background: "blue",
        position: "relative",
        },
    headlines:{
        color: "#98DDCA",
        textTransform: "uppercase",
        textAlign: "center",
        fontSize: "26px",
    },
    controls:{
        margin: "3% auto",
        width: "60%",
        height: "auto",
        background: "white",
        borderRadius: "10px",
        padding: "5%",
        boxShadow: "0px 6px 3px 0px rgba(0,0,0,0.16)",
    },
    row:{
        width: "100%",
        background: "white",
        display: "flex",
        marginBottom: "20px",
    },
    rowIcons:{
        float: "left",
        width: "25px",
        height: "25px",
        marginTop: "15px",
    },
    beerIcon:{
        float: "left",
        width: "15px",
        height: "40px",
        marginTop: "10px",
        marginRight: "10px",
    },
    speedometerIcon:{
        float: "left",
        width: "35px",
        height: "25px",
        marginTop: "15px",
        marginLeft: "-5px",
    },
    stopwatchIcon:{
        float: "left",
        width: "25px",
        height: "30px",
        marginTop: "15px",
    },
    rowText:{
        float: "left",
        width: "90px",
        marginLeft: "25px",
        marginRight: "50px",
        fontSize: "18px",
    },
    rowInput:{
        float: "left",
        width: "150px",
        height: "40px",
        marginTop: "5px",
        borderRadius: "10px",
        borderColor: "#98DDCA",
        borderStyle: "solid",
        textAlign: "center",
        fontSize: "18px",
    },
    startBtn:{
        width: "100px",
        color: "white",
        backgroundColor: "#98DDCA",
        marginRight: "4.4%",
        borderRadius: "10px",
        border: "solid 2px white",
        "&:hover": {
            backgroundColor: "white",
            color:  "#98DDCA",
            border: "solid 2px #98DDCA",
          },
    },
    resetBtn:{
        width: "100px",
        color: "white",
        backgroundColor: "#FFD3B4",
        marginRight: "4.4%",
        borderRadius: "10px",
        border: "solid 2px white",
        "&:hover": {
            backgroundColor: "white",
            color:  "#FFD3B4",
            border: "solid 2px #FFD3B4",
          },
    },
    stopBtn:{
        width: "100px",
        color: "white",
        backgroundColor: "#FFAAA7",
        marginRight: "4.4%",
        borderRadius: "10px",
        border: "solid 2px white",
        "&:hover": {
            backgroundColor: "white",
            color:  "#FFAAA7",
            border: "solid 2px #FFAAA7",
          },
    },
}));

export default function Production(props){
    const classes = useStyles();

    return(
        <>
<div className={classes.mainContent}>

        <div className={classes.leftProd}>
            <h1 className={classes.headlines}>Production controls</h1>
                <div className={classes.controls}>
                    <div className={classes.row}>
                        <img src={HashtagIcon} className={classes.rowIcons}/>
                        <p className={classes.rowText}>Batch ID</p>
                        <input type="text" className={classes.rowInput}/> 
                    </div> 
                    <div className={classes.row}>
                        <img src={BeersIcon} className={classes.rowIcons}/>
                        <p className={classes.rowText}>Batch size</p>
                        <input type="text" className={classes.rowInput}/> 
                    </div>
                    <div className={classes.row}>
                        <img src={BeerIcon} className={classes.beerIcon}/>
                        <p className={classes.rowText}>Beer type</p>
                        <input type="text" className={classes.rowInput}/> 
                    </div>
                    <div className={classes.row}>
                        <img src={SpeedometerIcon} className={classes.speedometerIcon}/>
                        <p className={classes.rowText}>Speed</p>
                        <input type="text" className={classes.rowInput}/> 
                    </div>
                    <div className={classes.row}>
                        <img src={StopwatchIcon} className={classes.stopwatchIcon}/>
                        <Tooltip title="Estimated Production Time (EPT)">
                        <p className={classes.rowText}>EPT<InfoIcon color="action" fontSize="small" /></p>
                        </Tooltip>
                        <input type="text" className={classes.rowInput}/> 
                    </div>
                    
                    <Button className={classes.startBtn}><PlayArrowRoundedIcon color="action"/> Start</Button>
                    <Button className={classes.resetBtn}><ReplayOutlinedIcon color="action"/> Reset</Button>
                    <Button className={classes.stopBtn}><StopRoundedIcon color="action"/> Stop</Button>
                </div>
        </div> 

        <div className={classes.rightProd}>
        <h1 className={classes.headlines}>Production overview</h1>
        </div>

</div>
        </>
    )
}