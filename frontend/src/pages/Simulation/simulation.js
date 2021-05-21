import React from 'react';

import {makeStyles} from '@material-ui/core/styles';

import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

import '../Simulation/simulation.css';
import Navbar from '../../components/Navigation/navbar';
import Footer from '../../components/Footer/footer';
import Aux from '../../hoc/Auxiliary/Auxiliary';

import axios from 'axios';

/**
 * The primary @author Sarah Manon Pradel
 * 
 * This page contains all of the functionality and layout related to the batches details page. 
 * Please feel free to collapse the useStyles constant.
 * 
 * All complex functionality in here will be documented.
 */

const useStyles = makeStyles((theme) => ({
    reset:{
        backgroundColor:"#FFAAA7",
        padding:theme.spacing(2),
        margin:"15%",
        color:"#8a8a8a",
        '&:hover':{
            backgroundColor:"#98DDCA"
        }
    },
    row:{
        margin:theme.spacing(5),
    },
    simulate:{
        backgroundColor:"#FFD3B4",
        padding:theme.spacing(2),
        margin:"15%",
        color:"#8a8a8a",
        '&:hover':{
            backgroundColor:"#98DDCA"
        }
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

export default function Simulation(props){
    const classes = useStyles();
    const [beerType, setBeerType] = React.useState('');
    const [batchSize, setBatchSize] = React.useState('');
    const [validBeers, setValidBeers] = React.useState('');
    const [timeAllotted, setTimeAllotted] = React.useState('');
    const [optimalSpeed, setOptimalSpeed] = React.useState('');


    /**
     * Sets the beer type as a react state. Note, that the value will be numerical 
     * and in accordance with the value written in the project description
     */
    const handleChange = (event) => {
        setBeerType(event.target.value);
    }

    //Resets the react.state but does not empty the fields. 
    const reset = () => {
        setBatchSize(0);
        setValidBeers(0);
        setTimeAllotted(0);
        setBeerType('');
        setOptimalSpeed(0);
    }

    /**
     * Creates an object that can be sent to the optimization controller. It will then make the
     * required post-request to the controller, bringing the object along. After making the 
     * post-request, there is a promise to set the optimalSpeed react.state value to the
     * result, but if there is an error caught, it will set the optimal speed to the "Error,
     * invalid input" message, to notify the user of the impossibility of their desired production
     */
    const simulate = () => {
        const sim ={
            batch: batchSize,
            margin: validBeers,
            time: timeAllotted
        };

        axios.post('http://localhost:5000/optimization/calculateOptimalSpeedUsingValids', sim).then(
            res => {
                setOptimalSpeed(res.data.speed);
            }
        ).catch(setOptimalSpeed("Error, invalid input"));
    }

    return(
        <Aux>
            <Navbar/>
            <Box  className='container'>
                <Card className='info'>
                    <Typography align="center" className={classes.title}>Optimize Production</Typography>
                    <Table className={classes.table}>
                        <TableBody>
                            <TableRow className={classes.row}>
                                <TableCell className='label'>Beer Type</TableCell>
                                <TableCell className={classes.value}>
                                    <Select className='beerType' labelId="beerType" id="beerType" value={beerType} onChange={handleChange}>
                                        <MenuItem className='menuItem' value={0}>Pilsner</MenuItem>
                                        <MenuItem className='menuItem' value={1}>Wheat</MenuItem>
                                        <MenuItem className='menuItem' value={2}>IPA</MenuItem>
                                        <MenuItem className='menuItem' value={3}>Stout</MenuItem>
                                        <MenuItem className='menuItem' value={4}>Ale</MenuItem>
                                        <MenuItem className='menuItem' value={5}>Alcohol Free</MenuItem>
                                    </Select>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className='label'>Batch Size</TableCell>
                                <TableCell className='value' id="batchSize" onChange={event => setBatchSize(event.target.value)}><TextField className={classes.inputFields}></TextField></TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className='label'>Valid Beers</TableCell>
                                <TableCell className='value' id="validBeers" onChange={event => setValidBeers(event.target.value)}><TextField className={classes.inputFields}></TextField></TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className='label'>Time Allotted</TableCell>
                                <TableCell className='value' id="timeAllotted" onChange={event => setTimeAllotted(event.target.value)}><TextField className={classes.inputFields}></TextField></TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className='label'>Optimal Speed</TableCell>
                                <TableCell className='value'>{optimalSpeed}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                    <Box className='buttons'>
                        <Button align="center" className={classes.simulate} id="simButton" onClick={simulate}>Simulate</Button>
                        <Button align="center" className={classes.reset} id="resetButton" onClick={reset}>Reset</Button>
                    </Box>
                </Card>
            </Box>
            <Footer/>
        </Aux>
        
        
    )
}