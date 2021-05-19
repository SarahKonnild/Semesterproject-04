import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './production.css';

import { makeStyles } from '@material-ui/core/styles';
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
import { toast, ToastContainer } from 'react-toastify';

// THIS PAGE WAS DEVELOPED BY MAHMOD EL-SET and Kasper Svane

const useStyles = makeStyles(theme => ({
    mainContent: {
        margin: '3% auto',
        width: '80%',
        background: 'white',
        display: 'flex',
    },
    leftProd: {
        float: 'left',
        width: '50%',
        height: 'auto',
        background: 'white',
        position: 'relative',
    },
    rightProd: {
        float: 'left',
        width: '50%',
        height: '200px',
        background: 'white',
        position: 'relative',
    },
    headlines: {
        color: '#98DDCA',
        textTransform: 'uppercase',
        textAlign: 'center',
        fontSize: '26px',
    },
    controls: {
        margin: '3% auto',
        width: '60%',
        height: 'auto',
        background: 'white',
        borderRadius: '10px',
        padding: '5%',
        boxShadow: '0px 6px 3px 0px rgba(0,0,0,0.16)',
    },
    overview: {
        margin: '3% auto',
        width: '70%',
        height: 'auto',
        background: 'white',
        borderRadius: '10px',
        padding: '5%',
    },
    row: {
        width: '100%',
        background: 'white',
        display: 'flex',
        marginBottom: '20px',
    },
    rowIcons: {
        float: 'left',
        width: '25px',
        height: '25px',
        marginTop: '15px',
    },
    beerIcon: {
        float: 'left',
        width: '15px',
        height: '40px',
        marginTop: '10px',
        marginRight: '10px',
        marginLeft: '5px',
    },
    speedometerIcon: {
        float: 'left',
        width: '35px',
        height: '25px',
        marginTop: '15px',
        marginLeft: '-5px',
    },
    stopwatchIcon: {
        float: 'left',
        width: '25px',
        height: '30px',
        marginTop: '15px',
    },
    rowText: {
        float: 'left',
        width: '290px',
        marginLeft: '25px',
        marginRight: '50px',
        fontSize: '18px',
    },
    rowInput: {
        float: 'left',
        width: '150px',
        height: '40px',
        marginTop: '5px',
        borderRadius: '10px',
        borderColor: '#98DDCA',
        borderStyle: 'solid',
        textAlign: 'center',
        fontSize: '18px',
    },
    startBtn: {
        width: '100px',
        color: 'white',
        backgroundColor: '#98DDCA',
        marginRight: '4.4%',
        borderRadius: '10px',
        border: 'solid 2px white',
        '&:hover': {
            backgroundColor: 'white',
            color: '#98DDCA',
            border: 'solid 2px #98DDCA',
        },
    },
    resetBtn: {
        width: '100px',
        color: 'white',
        backgroundColor: '#FFD3B4',
        marginRight: '4.4%',
        borderRadius: '10px',
        border: 'solid 2px white',
        '&:hover': {
            backgroundColor: 'white',
            color: '#FFD3B4',
            border: 'solid 2px #FFD3B4',
        },
    },
    stopBtn: {
        width: '100px',
        color: 'white',
        backgroundColor: '#FFAAA7',
        marginRight: '4.4%',
        borderRadius: '10px',
        border: 'solid 2px white',
        '&:hover': {
            backgroundColor: 'white',
            color: '#FFAAA7',
            border: 'solid 2px #FFAAA7',
        },
    },
}));

const Production = props => {
    const classes = useStyles();
    const [batchId, setBatchId] = useState('');
    const [batchSize, setBatchSize] = useState('');
    const [beerType, setBeerType] = useState({});
    const [speed, setSpeed] = useState('');
    const [production, setProduction] = useState(null);
    const [start, setStart] = useState('start');
    const [stop, setStop] = useState('stop');
    const [reset, setReset] = useState('reset');
    const [succesMessage, setSuccesMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    //START PRODUCTION

    const startProduction = () => {
        const production = {
            batchId: batchId,
            batchSize: batchSize,
            beerType: beerType,
            speed: speed,
        };
        axios
            .post('http://localhost:5000/brewster/startProduction', production)
            .then(response => {
                setBatchId('');
                setBatchSize('');
                setBeerType('');
                setSpeed('');
                if (response.data.statusCode === 200) {
                    setSuccesMessage(response.data.message);
                    toast.success(response.data.message);
                    console.log(response.data.message);
                }
                if (response.data.statusCode === 400) {
                    let errorMessage = JSON.parse(
                        localStorage.getItem('Error')
                    );
                    if (errorMessage === null) {
                        errorMessage = [];
                    }

                    errorMessage.push(response.data.message);

                    localStorage.setItem('Error', JSON.stringify(errorMessage));

                    setErrorMessage(errorMessage.message);

                    toast.error(response.data.message, {
                        autoClose: true,
                    });
                }
                console.log(response.data.message);
            })
            .catch(error => {
                let errorMessage = JSON.parse(localStorage.getItem('Error'));

                if (errorMessage === null) {
                    errorMessage = [];
                }

                errorMessage.push(error.message);

                localStorage.setItem('Error', JSON.stringify(errorMessage));

                setErrorMessage(error.message);

                toast.error(error.message, {
                    autoClose: true,
                });
            });
    };

    //STOP PRODUCTION
    const stopProduction = () => {
        axios
            .get('http://localhost:5000/brewster/stopProduction')
            .then(response => {
                if (response.data.statusCode === 200) {
                    setSuccesMessage(response.data.message);
                    toast.success(response.data.message);
                }
                if (response.data.statusCode === 400) {
                    let errorMessage = JSON.parse(
                        localStorage.getItem('Error')
                    );
                    if (errorMessage === null) {
                        errorMessage = [];
                    }

                    errorMessage.push(response.data.message);

                    localStorage.setItem('Error', JSON.stringify(errorMessage));

                    setErrorMessage(errorMessage.message);

                    toast.error(response.data.message, {
                        autoClose: true,
                    });
                }
            })
            .catch(error => {
                let errorMessage = JSON.parse(localStorage.getItem('Error'));

                if (errorMessage === null) {
                    errorMessage = [];
                }

                errorMessage.push(error.message);

                localStorage.setItem('Error', JSON.stringify(errorMessage));

                setErrorMessage(error.message);

                toast.error(error.message, {
                    autoClose: true,
                });
            });
    };

    //RESET PRODUCTION
    const resetProduction = () => {
        axios
            .get('http://localhost:5000/brewster/resetProduction')
            .then(response => {
                if (response.data.statusCode === 200) {
                    setSuccesMessage(response.data.message);
                    toast.success(response.data.message);
                }
                if (response.data.statusCode === 400) {
                    let errorMessage = JSON.parse(
                        localStorage.getItem('Error')
                    );
                    if (errorMessage === null) {
                        errorMessage = [];
                    }

                    errorMessage.push(response.data.message);

                    localStorage.setItem('Error', JSON.stringify(errorMessage));

                    setErrorMessage(errorMessage.message);

                    toast.error(response.data.message, {
                        autoClose: true,
                    });
                }
            })
            .catch(error => {
                let errorMessage = JSON.parse(localStorage.getItem('Error'));

                if (errorMessage === null) {
                    errorMessage = [];
                }

                errorMessage.push(error.message);

                localStorage.setItem('Error', JSON.stringify(errorMessage));

                setErrorMessage(error.message);

                toast.error(error.message, {
                    autoClose: true,
                });
            });
    };

    return (
        <>
            <ToastContainer autoClose={5000} />
            <div className={classes.mainContent}>
                <div className={classes.leftProd}>
                    <h1 className={classes.headlines}>Production controls</h1>
                    <div className={classes.controls}>
                        <div className={classes.row}>
                            <img
                                src={HashtagIcon}
                                className={classes.rowIcons}
                                alt=''
                            />
                            <p className={classes.rowText}>Batch ID</p>
                            <input
                                type='text'
                                className={classes.rowInput}
                                id='batchId'
                                value={batchId}
                                onChange={e => setBatchId(e.target.value)}
                            />
                        </div>
                        <div className={classes.row}>
                            <img
                                src={BeersIcon}
                                className={classes.rowIcons}
                                alt=''
                            />
                            <p className={classes.rowText}>Batch size</p>
                            <input
                                type='text'
                                className={classes.rowInput}
                                id='batchSize'
                                value={batchSize}
                                onChange={e => setBatchSize(e.target.value)}
                            />
                        </div>
                        <div className={classes.row}>
                            <img
                                src={BeerIcon}
                                className={classes.beerIcon}
                                alt=''
                            />
                            <p className={classes.rowText}>Beer type</p>
                            <select
                                className='dropdownInput'
                                labelId='beerType'
                                id='beerType'
                                value={beerType}
                                onChange={e => setBeerType(e.target.value)}
                            >
                                <option value={0} selected>
                                    Pilsner
                                </option>
                                <option value={1}>Wheat</option>
                                <option value={2}>IPA</option>
                                <option value={3}>Stout</option>
                                <option value={4}>Ale</option>
                                <option value={5}>Alcohol Free</option>
                            </select>
                        </div>
                        <div className={classes.row}>
                            <img
                                src={SpeedometerIcon}
                                className={classes.speedometerIcon}
                                alt=''
                            />
                            <p className={classes.rowText}>Speed</p>
                            <input
                                type='text'
                                className={classes.rowInput}
                                id='speed'
                                value={speed}
                                onChange={e => setSpeed(e.target.value)}
                            />
                        </div>
                        <div className={classes.row}>
                            <img
                                src={StopwatchIcon}
                                className={classes.stopwatchIcon}
                                alt=''
                            />
                            <Tooltip title='Estimated Production Time (EPT)'>
                                <p className={classes.rowText}>
                                    EPT
                                    <InfoIcon color='action' fontSize='small' />
                                </p>
                            </Tooltip>
                            <input type='text' className={classes.rowInput} />
                        </div>

                        <Button
                            className={classes.startBtn}
                            color='action'
                            type='submit'
                            onClick={startProduction}
                        >
                            <PlayArrowRoundedIcon />
                            Start
                        </Button>
                        <Button
                            className={classes.resetBtn}
                            type='submit'
                            color='action'
                            onClick={resetProduction}
                        >
                            <ReplayOutlinedIcon /> Reset
                        </Button>
                        <Button
                            className={classes.stopBtn}
                            type='submit'
                            color='action'
                            onClick={stopProduction}
                        >
                            <StopRoundedIcon color='action' /> Stop
                        </Button>
                    </div>
                </div>

                <div className={classes.rightProd}>
                    <h1 className={classes.headlines}>Production overview</h1>
                    <div className={classes.overview}>
                        <div className={classes.row}>
                            <img
                                src={HashtagIcon}
                                className={classes.rowIcons}
                                alt=''
                            />
                            <p className={classes.rowText}>Batch ID</p>
                            <input
                                type='text'
                                className={classes.rowInput}
                                style={{ border: '0' }}
                            />
                        </div>
                        <div className={classes.row}>
                            <img
                                src={BeersIcon}
                                className={classes.rowIcons}
                                alt=''
                            />
                            <p className={classes.rowText}>Batch size</p>
                            <input
                                type='text'
                                className={classes.rowInput}
                                value='1234'
                                style={{ border: '0' }}
                            />
                        </div>
                        <div className={classes.row}>
                            <img
                                src={BeerIcon}
                                className={classes.beerIcon}
                                alt=''
                            />
                            <p className={classes.rowText}>Beer type</p>
                            <input
                                type='text'
                                className={classes.rowInput}
                                value='Wheat'
                                style={{ border: '0' }}
                            />
                        </div>
                        <div className={classes.row}>
                            <img
                                src={SpeedometerIcon}
                                className={classes.speedometerIcon}
                                alt=''
                            />
                            <p className={classes.rowText}>Speed</p>
                            <input
                                type='text'
                                className={classes.rowInput}
                                value='1234'
                                style={{ border: '0' }}
                            />
                        </div>
                        <div className={classes.row}>
                            {/* <img src={SpeedometerIcon} className={classes.speedometerIcon}/> */}
                            <AdjustIcon
                                style={{
                                    color: green[400],
                                    paddingTop: '10px',
                                    marginLeft: '-5px',
                                }}
                                fontSize='large'
                            />
                            <p className={classes.rowText}>Machine state</p>
                            <input
                                type='text'
                                className={classes.rowInput}
                                value='1234'
                                style={{ border: '0' }}
                            />
                        </div>
                        <div className={classes.row}>
                            <CheckCircleRoundedIcon
                                style={{
                                    color: green[400],
                                    paddingTop: '10px',
                                    marginLeft: '-5px',
                                }}
                                fontSize='large'
                            />
                            <p className={classes.rowText}>Produced</p>
                            <input
                                type='text'
                                className={classes.rowInput}
                                value='1234'
                                style={{ border: '0' }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Production;
