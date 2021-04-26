import React, { useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import axios from 'axios'

import {makeStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import SvgIcon from '@material-ui/core/SvgIcon';
import PlayArrowRoundedIcon from '@material-ui/icons/PlayArrowRounded';
import ReplayOutlinedIcon from '@material-ui/icons/ReplayOutlined';
import StopRoundedIcon from '@material-ui/icons/StopRounded';
import AdjustIcon from '@material-ui/icons/Adjust';
import { grey } from '@material-ui/core/colors';
import { green } from '@material-ui/core/colors';
import InfoIcon from '@material-ui/icons/Info';
import Tooltip from '@material-ui/core/Tooltip';
import CheckCircleRoundedIcon from '@material-ui/icons/CheckCircleRounded';

import HashtagIcon from '../../assets/img/icon-hashtag.png';
import BeersIcon from '../../assets/img/icon-beers.png';
import BeerIcon from '../../assets/img/icon-beer.png';
import SpeedometerIcon from '../../assets/img/icon-speedometer.png';
import StopwatchIcon from '../../assets/img/icon-stopwatch.png';

// THIS PAGE WAS DEVELOPED BY MAHMOD EL-SET

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
        background: "white",
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
    overview:{
        margin: "3% auto",
        width: "70%",
        height: "auto",
        background: "white",
        borderRadius: "10px",
        padding: "5%",
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
        marginLeft: "5px",
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
        width: "290px",
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

    // Declare a new state variable, which we'll call "count"
    const [count, setCount] = useState(0);

    const classes = useStyles();
    const [data, setData] = useState([]);
    const [start, setStart] = useState('start');
    const [stop, setStop] = useState('stop');
    const [reset, setReset] = useState('reset');

// CONNECTION TO API
    useEffect(() => {
        axios.get('http://localhost:5000/brewster/').then(
            res => setData(res.data),
            res => console.log(res.data)
        )}, []);

    const startMachine = (event) => {
        //Code to start the machine

        console.log("Machine started!")
     }    
    const stopMachine = (event) => {
        //Code to stop the machine

        console.log("Machine stopped!")
     }    
    const resetMachine = (event) => {
        //Code to reset the machine

        console.log("Machine resetted!")
     }    

    
        
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
                    
                    <Button className={classes.startBtn}><PlayArrowRoundedIcon color="action" onClick={startMachine}/> Start</Button>
                    <Button className={classes.resetBtn}><ReplayOutlinedIcon color="action" onClick={resetMachine}/> Reset</Button>
                    <Button className={classes.stopBtn}><StopRoundedIcon color="action" onClick={stopMachine}/> Stop</Button>
                </div>
        </div> 

        <div className={classes.rightProd}>
        <h1 className={classes.headlines}>Production overview</h1>
        <div className={classes.overview}>
                    <div className={classes.row}>
                        <img src={HashtagIcon} className={classes.rowIcons}/>
                        <p className={classes.rowText}>Batch ID</p>
                        <input type="text" className={classes.rowInput} value="1234" style={{ border: "0" }}/> 
                    </div> 
                    <div className={classes.row}>
                        <img src={BeersIcon} className={classes.rowIcons}/>
                        <p className={classes.rowText}>Batch size</p>
                        <input type="text" className={classes.rowInput} value="1234" style={{ border: "0" }}/> 
                    </div>
                    <div className={classes.row}>
                        <img src={BeerIcon} className={classes.beerIcon}/>
                        <p className={classes.rowText}>Beer type</p>
                        <input type="text" className={classes.rowInput} value="Wheat" style={{ border: "0" }}/> 
                    </div>
                    <div className={classes.row}>
                        <img src={SpeedometerIcon} className={classes.speedometerIcon}/>
                        <p className={classes.rowText}>Speed</p>
                        <input type="text" className={classes.rowInput} value="1234" style={{ border: "0" }} /> 
                    </div>
                    <div className={classes.row}>
                        {/* <img src={SpeedometerIcon} className={classes.speedometerIcon}/> */}
                        <AdjustIcon style={{ color: green[400], paddingTop: "10px", marginLeft: "-5px" }} fontSize="large" />
                        <p className={classes.rowText}>Machine state</p>
                        <input type="text" className={classes.rowInput} value="1234" style={{ border: "0" }}/> 
                    </div>
                    <div className={classes.row}>
                    <CheckCircleRoundedIcon style={{ color: green[400], paddingTop: "10px", marginLeft: "-5px"}} fontSize="large" />
                        <p className={classes.rowText}>Produced</p>
                        <input type="text" className={classes.rowInput} value="1234" style={{ border: "0" }}/> 
                    </div>          
                    
                </div>
        </div>

</div>
        </>
    )
}