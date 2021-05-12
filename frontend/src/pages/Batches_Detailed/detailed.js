import React, { useEffect } from 'react';

import {makeStyles} from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import Typography from "@material-ui/core/Typography";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';

import axios from 'axios';

import LeftArrow from '@material-ui/icons/ArrowLeft';

import {
    ArgumentAxis,
    ValueAxis,
    Chart,
    LineSeries,
    Legend,
    Title, 
} from '@devexpress/dx-react-chart-material-ui';
import { NavLink } from 'react-router-dom';

/**
 * The primary @author Sarah Manon Pradel
 * 
 * This page contains all of the functionality and layout related to the batches details page. 
 * Please feel free to collapse the useStyles constant.
 * 
 * All complex functionality in here will be documented.
 */

const useStyles = makeStyles((theme) => ({
    arrow:{
        marginRight:theme.spacing(1),
        marginTop:theme.spacing(1.5),
    },
    back:{
        backgroundColor:"#FFAAA7",
        textDecoration:"none",
        color:"#8a8a8a",
        display:"flex",
        borderRadius:"4px",
        height:"50px",
        margin:theme.spacing(3),
        '&:hover':{
            backgroundColor:"#98DDCA"
        }
    },
    buttonText:{
        marginTop:theme.spacing(1.5),
        marginRight:theme.spacing(1.5),
        textTransform:"uppercase",

    },
    chart:{
        width:"650px",
        margin:theme.spacing(2),
    },
    chartCard:{
        minWidth:"600px",
        width:"40%",
        height:"90%",
        margin:"5% 10%",
        backgroundColor:"#ffffff",
        borderRadius:"4px",
        borderWidth:"2px",
        borderColor:"#98DDCA",
        borderStyle:"solid",

    },
    chartTitle:{
        textTransform:"uppercase",
        color:"#8a8a8a",
    },
    container:{
        width:"100%",
        display:"inline-flex",
    },
    export:{
        backgroundColor:"#FFD3B4",
        padding:theme.spacing(1.5),
        marginTop:theme.spacing(5),
        marginBottom:theme.spacing(6.5),
        marginLeft:"30%",
        color:"#8a8a8a",
        '&:hover':{
            backgroundColor:"#98DDCA"
        }
    },
    info:{
        minWidth:"350px",
        margin:"5% 5%",
        width:"25%",
        height:"80%",
        backgroundColor:"#ffffff",
        borderRadius:"4px",
        borderWidth:"2px",
        borderColor:"#98DDCA",
        borderStyle:"solid",
    },
    label:{
        textTransform:"uppercase",
        color:"#8a8a8a",
    },
    row:{
        margin:theme.spacing(5),
    },
    table:{
        marginLeft: "7.5%",
        marginRight: "7.5%",
        maxWidth:"85%",
        marginTop: theme.spacing(3),
    },
    title:{
        fontSize:"22px",
        padding:theme.spacing(1),
        margin: theme.spacing(1),
        textTransform:"uppercase",
        color:"#8a8a8a",

    },
    value:{
        color:"#8a8a8a",
    }
}));

const temp = [
    {argument:1, value:10},
    {argument:2, value:20},
    {argument:3, value:30},
]

/**
 * Simple function used to simplify the Ctrl+P hotkey for printing the screen
 */
function printScreen(){
    window.print();
}

/**
 * 
 * This is the React function that returns the page. It is called in the App.js file, 
 * and can always be accessed through the /details path. Be aware though, that this will
 * leave the fields and graph empty, because there is no database ID referenced in the URL
 * 
 * @returns the graphical user interface developed in MaterialUI
 */
export default function Batches(){
    const [data, setData] = React.useState('');
    const classes = useStyles();
    //json value for humidity: humidity, vibrations: vibrations, temperature: temperature
    //I WOULD LIKE THE DATA TO COME IN AN ARRAY OF ARRAYS WITH: [[time:a, temperature:b, humidity:c, vibrations:d], [time:a, temperature:b, humidity:c, vibrations:d],...]

    /**
     * Takes the URL for the current page and splices it into an array, separated by '/'
     * Then takes the 5th index ([4]) of the array, and uses that as the database ID. It 
     * then uses the API_Gateway to access the information stored in relation to that
     * database ID and sets the JSON object as the data React.state value.
     * 
     * NOTE: if accessing the page as /details/, the console will throw an error here. 
     */
    function getBatch(){
        const url = window.location.href;
        const array = url.split('/');
        const id = array[4];

        axios.get('http://localhost:5000/batches/'+ id).then(
            res => setData(res.data),
        )
    }

    /**
     * Simply enables the getBatch() function on reload, to ensure that the correct data
     * is always there
     */
    useEffect(() => {
        getBatch()
    }, []);

    return(
        <Box className={classes.container}>
                <NavLink to="/batches" className={classes.back}>
                    <LeftArrow className={classes.arrow} align="center"/><Typography className={classes.buttonText} align="center">back</Typography>
                </NavLink>
                <Card className={classes.info}>
                    <Typography align="center" className={classes.title}>Batch Details</Typography>
                    <Table className={classes.table}>
                        <TableBody>
                            <TableRow className={classes.row}>
                                <TableCell className={classes.label}>Batch ID</TableCell>
                                <TableCell className={classes.value}>{data._id}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className={classes.label}>Date</TableCell>
                                <TableCell className={classes.value}>{data.dateProduced}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className={classes.label}>Beer Type</TableCell>
                                <TableCell className={classes.value}>{data.beerType}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className={classes.label}>Batch Size</TableCell>
                                <TableCell className={classes.value}>{data.batchSize}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className={classes.label}>Correct Beers</TableCell>
                                <TableCell className={classes.value}>{data.valid}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className={classes.label}>Defective Beers</TableCell>
                                <TableCell className={classes.value}>{data.defects}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                    <Button align="center" className={classes.export} onClick={printScreen}>Export to PDF</Button>
                </Card>
                <Card className={classes.chartCard}>
                    {/* <Chart className={classes.chart} data={data.readings}> */}
                    <Chart className={classes.chart} data={temp}>
                        <Title className={classes.chartTitle} text={'Detailed value readings during the production'}/>
                        <ArgumentAxis />
                        <ValueAxis/>
                        <LineSeries name="Temperature" valueField="temperature" argumentField="time"/>
                        <LineSeries name="Humidity" valueField="humidity" argumentField="time"/>
                        <LineSeries name="Vibrations" valueField="vibrations" argumentField="time"/>
                        <Legend position="bottom"/>
                    </Chart>
                </Card>
        </Box>
    )
        
    
}