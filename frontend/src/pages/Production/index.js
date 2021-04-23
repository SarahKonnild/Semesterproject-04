import React from 'react';

import {makeStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import HashtagIcon from '../../assets/img/icon-hashtag.png';
import BeersIcon from '../../assets/img/icon-beers.png';
import BeerIcon from '../../assets/img/icon-beer.png';
import SpeedometerIcon from '../../assets/img/icon-speedometer.png';
import StopwatchIcon from '../../assets/img/icon-stopwatch.png';

const useStyles = makeStyles((theme) => ({

    mainContent:{
        margin: "3% auto",
        width: "80%",
        background: "grey",
        display: "flex"
        },
    leftProd:{
        float: "left",
        width: "50%",
        height: "auto",
        background: "grey",
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
        width: "65%",
        height: "auto",
        background: "white",
        borderRadius: "10px",
        padding: "5%",
        boxShadow: "1px 3px 6px 0px #000000",
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
    rowText:{
        float: "left",
        width: "90px",
        marginLeft: "15px",
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
                        <img src={BeerIcon} className={classes.rowIcons}/>
                        <p className={classes.rowText}>Beer type</p>
                        <input type="text" className={classes.rowInput}/> 
                    </div>
                    <div className={classes.row}>
                        <img src={SpeedometerIcon} className={classes.rowIcons}/>
                        <p className={classes.rowText}>Speed</p>
                        <input type="text" className={classes.rowInput}/> 
                    </div>
                    <div className={classes.row}>
                        <img src={StopwatchIcon} className={classes.rowIcons}/>
                        <p className={classes.rowText}>EPT</p>
                        <input type="text" className={classes.rowInput}/> 
                    </div>
                    <p>bare noget fyld <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /></p>
                </div>
        </div> 

        <div className={classes.rightProd}>
        <h1 className={classes.headlines}>Production overview</h1>
        </div>

</div>
        </>
    )
}