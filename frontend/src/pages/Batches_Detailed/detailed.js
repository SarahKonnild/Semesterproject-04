import React, { useEffect } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';

import './detailed.css';
import Navbar from '../../components/Navigation/navbar';
import Footer from '../../components/Footer/footer';
import Aux from '../../hoc/Auxiliary/Auxiliary';

import LeftArrow from '@material-ui/icons/ArrowLeft';

import {
    ArgumentAxis,
    ValueAxis,
    Chart,
    LineSeries,
    Title,
    Legend,
} from '@devexpress/dx-react-chart-material-ui';
import { NavLink } from 'react-router-dom';

/**
 * @author Sarah Manon Pradel
 * 
 * This page contains all of the functionality and layout related to the batches details page. 
 * Please feel free to collapse the useStyles constant.
 * 
 * All complex functionality in here will be documented.
 */
const useStyles = makeStyles(theme => ({
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
        height:"55px",
        margin:theme.spacing(3),
        '&:hover':{
            backgroundColor:"#98DDCA"
        }
    },
    buttonText: {
        marginTop: theme.spacing(2),
        marginRight: theme.spacing(1.5),
        textTransform: 'uppercase',
    },
    chart: {
        width: '600px',
        margin: theme.spacing(2),
    },
    export: {
        backgroundColor: '#FFD3B4',
        padding: theme.spacing(1.5),
        marginTop: theme.spacing(3),
        marginLeft: "130px",
        color: '#8a8a8a',
        '&:hover': {
            backgroundColor: '#98DDCA',
        },
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
}));

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
    const [isLoading, setLoading] = React.useState(true);
    const classes = useStyles();

    

    useEffect(() => {
        /**
     * Takes the URL for the current page and splices it into an array, separated by '/'
     * Then takes the 5th index ([4]) of the array, and uses that as the database ID. It 
     * then uses the API_Gateway to access the information stored in relation to that
     * database ID and sets the JSON object as the data React.state value.
     * 
     * NOTE: if accessing the page as /details/, the console will throw an error here. 
     */
        async function getBatch(){
            const url = window.location.href;
            const array = url.split('/');
            const id = array[4];

            const request = fetch('http://localhost:5000/batches/'+ id);
            const response = await request;
            const parsed = await response.json();
            setData(parsed);
            setLoading(false);
        }
        getBatch();
    }, []);

    return(
        <Aux>
            <Navbar/>
            <Box className="box">
                <NavLink to="/batches" className={classes.back}>
                    <LeftArrow className={classes.arrow} align="center"/><Typography className={classes.buttonText} align="center">back</Typography>
                </NavLink>
                <Card className='info'>
                    <Typography align="center" className={classes.title}>Batch Details</Typography>
                    <Table className={classes.table}>
                        <TableBody>
                            <TableRow className={classes.row}>
                                <TableCell className="label">Batch ID</TableCell>
                                <TableCell className="value">{data._id}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className="label">Date</TableCell>
                                <TableCell className="value">{data.dateProduced}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className="label">Beer Type</TableCell>
                                <TableCell className="value">{data.beerType}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className="label">Batch Size</TableCell>
                                <TableCell className="value">{data.batchSize}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className="label">Correct Beers</TableCell>
                                <TableCell className="value">{data.valid}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className="label">Defective Beers</TableCell>
                                <TableCell className="value">{data.defects}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                    <Button align="center" className={classes.export} onClick={printScreen}>Export to PDF</Button>
                </Card>
                <Card className="chartCard">
                    {isLoading ? <p>Loading...</p> : 
                        <Chart className={classes.chart} data={data.readings}>
                            <Title className="chartTitle" text={'Detailed value readings during the production'}/>
                            <ArgumentAxis />
                            <ValueAxis/>
                            <LineSeries name="Temperature" valueField="temperature" argumentField="time"/>
                            <LineSeries name="Humidity" valueField="humidity" argumentField="time"/>
                            <LineSeries name="Vibrations" valueField="vibrations" argumentField="time"/>
                            <Legend position="bottom"/>
                        </Chart>
                    }
                </Card>
            </Box>
            <Footer/>
        </Aux>
        
    )
}
