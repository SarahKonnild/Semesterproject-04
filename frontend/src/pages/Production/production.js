import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import "./production.css";

import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import PlayArrowRoundedIcon from "@material-ui/icons/PlayArrowRounded";
import ReplayOutlinedIcon from "@material-ui/icons/ReplayOutlined";
import StopRoundedIcon from "@material-ui/icons/StopRounded";
import AdjustIcon from "@material-ui/icons/Adjust";
import { green } from "@material-ui/core/colors";
import InfoIcon from "@material-ui/icons/Info";
import Tooltip from "@material-ui/core/Tooltip";
import CheckCircleRoundedIcon from "@material-ui/icons/CheckCircleRounded";

import BeersIcon from "../../assets/img/icon-beers.png";
import BeerIcon from "../../assets/img/icon-beer.png";
import SpeedometerIcon from "../../assets/img/icon-speedometer.png";
import StopwatchIcon from "../../assets/img/icon-stopwatch.png";
import { toast, ToastContainer } from "react-toastify";
import Navbar from "../../components/Navigation/navbar";
import Footer from "../../components/Footer/footer";
import Aux from "../../hoc/Auxiliary/Auxiliary";

import "../../pages/Production/production.css";

// THIS PAGE WAS DEVELOPED BY MAHMOD EL-SET and Kasper Svane

const useStyles = makeStyles((theme) => ({
	mainContent: {
		margin: "3% auto",
		width: "80%",
		background: "white",
		display: "flex"
	},
	leftProd: {
		float: "left",
		width: "50%",
		height: "auto",
		background: "white",
		position: "relative"
	},
	rightProd: {
		float: "left",
		width: "50%",
		height: "200px",
		background: "white",
		position: "relative"
	},
	headlines: {
		color: "#98DDCA",
		textTransform: "uppercase",
		textAlign: "center",
		fontSize: "26px"
	},
	controls: {
		margin: "3% auto",
		width: "60%",
		height: "auto",
		background: "white",
		borderRadius: "10px",
		padding: "5%",
		boxShadow: "0px 6px 3px 0px rgba(0,0,0,0.16)"
	},
	overview: {
		margin: "3% auto",
		width: "70%",
		height: "auto",
		background: "white",
		borderRadius: "10px",
		padding: "5%"
	},
	row: {
		width: "100%",
		background: "white",
		display: "flex",
		marginBottom: "20px"
	},
	rowIcons: {
		float: "left",
		width: "25px",
		height: "25px",
		marginTop: "15px"
	},
	beerIcon: {
		float: "left",
		width: "15px",
		height: "40px",
		marginTop: "10px",
		marginRight: "10px",
		marginLeft: "5px"
	},
	speedometerIcon: {
		float: "left",
		width: "35px",
		height: "25px",
		marginTop: "15px",
		marginLeft: "-5px"
	},
	stopwatchIcon: {
		float: "left",
		width: "25px",
		height: "30px",
		marginTop: "15px"
	},
	rowText: {
		float: "left",
		width: "290px",
		marginLeft: "25px",
		marginRight: "50px",
		fontSize: "18px"
	},
	rowInput: {
		float: "left",
		width: "150px",
		height: "40px",
		marginTop: "5px",
		borderRadius: "10px",
		borderColor: "#98DDCA",
		borderStyle: "solid",
		textAlign: "center",
		fontSize: "18px"
	},
	startBtn: {
		"width": "100px",
		"color": "white",
		"backgroundColor": "#98DDCA",
		"marginRight": "4.4%",
		"borderRadius": "10px",
		"border": "solid 2px white",
		"&:hover": {
			backgroundColor: "white",
			color: "#98DDCA",
			border: "solid 2px #98DDCA"
		}
	},
	resetBtn: {
		"width": "100px",
		"color": "white",
		"backgroundColor": "#FFD3B4",
		"marginRight": "4.4%",
		"borderRadius": "10px",
		"border": "solid 2px white",
		"&:hover": {
			backgroundColor: "white",
			color: "#FFD3B4",
			border: "solid 2px #FFD3B4"
		}
	},
	stopBtn: {
		"width": "100px",
		"color": "white",
		"backgroundColor": "#FFAAA7",
		"marginRight": "4.4%",
		"borderRadius": "10px",
		"border": "solid 2px white",
		"&:hover": {
			backgroundColor: "white",
			color: "#FFAAA7",
			border: "solid 2px #FFAAA7"
		}
	}
}));

function Production(props) {
	const classes = useStyles();
	const [batchSize, setBatchSize] = useState("");
	const [beerType, setBeerType] = useState({});
	const [productionSpeed, setProductionSpeed] = useState("");
	const [readings, setReadings] = useState([]);
	const [defects, setDefects] = useState("");
	const [valid, setValid] = useState("");
	const [, setSuccesMessage] = useState("");
	const [, setErrorMessage] = useState("");
	const [estimatedProductionTime, setEstimatedProductionTime] = useState("");
	const [machineStatus, setMachineStatus] = useState("");
	let timer;

	//START PRODUCTION

	const getMachineStatus = useCallback(() => {
		axios.get("http://localhost:5000/brewster/getMachineStatus").then((response) => {
			setMachineStatus(response.data.message);
			if (response.data.message === 17) {
				clearTimeout(timer);
			}
		});
	}, [timer]);

	timer = setTimeout(getMachineStatus, 1000); // milliseconds

	useEffect(() => {
		getMachineStatus();
	}, [getMachineStatus]);

	const setupRefresh = () => {
		axios
			.get("http://localhost:5000/brewster/getMachineStatus")
			.then((response) => {
				if (!response.data.statusCode === 200) {
					toast.error("Something went wrong");
				}

				if (response.data.message === 17) {
					getReadings();
					getProductionCount();
					clearTimeout(timer);
					setBatchSize(batchSize);
					setBeerType(beerType);
					setProductionSpeed(productionSpeed);
					const dataToSave = {
						beerType: beerType,
						batchSize: batchSize,
						productionSpeed: productionSpeed,
						readings: readings,
						valid: valid,
						defects: defects
					};
					saveToDatabase(dataToSave);
				}
			})
			.catch((error) => {
				clearTimeout(timer);
				toast.error(error.message);
			});
		timer = setTimeout(setupRefresh, 1000); // milliseconds
	};

	const getReadings = () => {
		axios
			.get("http://localhost:5000/brewster/getSubValues")
			.then((response) => {
				setReadings(response.data.readings);
			})
			.catch((error) => {
				toast.error(error.message)
			});
	};

	const getProductionCount = () => {
		axios.get("http://localhost:5000/brewster/getProductionCount").then((response) => {
			setValid(response.data.acceptable);
			setDefects(response.data.defective);
		});
	};

	function saveToDatabase(dataToSave) {
		axios
			.post("http://localhost:5000/batches/add", dataToSave)
			.then((response) => {
				toast.success("Batch saved successfully");
			})
			.catch((error) => {
				toast.error("Could not save the batch");
			});
	}

	const startProduction = () => {
		const production = {
			beerType: beerType,
			batchSize: batchSize,
			productionSpeed: productionSpeed
		};
		axios
			.post("http://localhost:5000/brewster/startProduction", production)
			.then((response) => {
				setBatchSize("");
				setBeerType("");
				setProductionSpeed("");
				if (response.data.statusCode === 201) {
					setSuccesMessage(response.data.message);
					toast.success("Production Started");
				}
				if (response.data.statusCode === 400) {
					let errorMessage = JSON.parse(localStorage.getItem("Error"));
					if (errorMessage === null) {
						errorMessage = [];
					}
					errorMessage.push(response.data.message);
					localStorage.setItem("Error", JSON.stringify(errorMessage));
					setErrorMessage(errorMessage.message);
					toast.error(response.data.message, {
						autoClose: true
					});
				}
				setupRefresh();
			})
			.catch((error) => {
				let errorMessage = JSON.parse(localStorage.getItem("Error"));
				if (errorMessage === null) {
					errorMessage = [];
				}
				errorMessage.push(error.message);
				localStorage.setItem("Error", JSON.stringify(errorMessage));
				setErrorMessage(error.message);
				toast.error(error.message, {
					autoClose: true
				});
			});
	};

	//STOP PRODUCTION
	const stopProduction = () => {
		axios
			.get("http://localhost:5000/brewster/stopProduction")
			.then((response) => {
				if (response.data.statusCode === 200) {
					setSuccesMessage(response.data.message);
					toast.success(response.data.message);
				}
				if (response.data.statusCode === 400) {
					let errorMessage = JSON.parse(localStorage.getItem("Error"));
					if (errorMessage === null) {
						errorMessage = [];
					}
					errorMessage.push(response.data.message);
					localStorage.setItem("Error", JSON.stringify(errorMessage));
					setErrorMessage(errorMessage.message);
					toast.error(response.data.message, {
						autoClose: true
					});
				}
			})
			.catch((error) => {
				let errorMessage = JSON.parse(localStorage.getItem("Error"));
				if (errorMessage === null) {
					errorMessage = [];
				}
				errorMessage.push(error.message);
				localStorage.setItem("Error", JSON.stringify(errorMessage));
				setErrorMessage(error.message);
				toast.error(error.message, {
					autoClose: true
				});
			});
	};

	//RESET PRODUCTION
	const resetProduction = () => {
		axios
			.get("http://localhost:5000/brewster/resetProduction")
			.then((response) => {
				if (response.data.statusCode === 200) {
					setSuccesMessage(response.data.message);
					toast.success(response.data.message);
				}
				if (response.data.statusCode === 400) {
					let errorMessage = JSON.parse(localStorage.getItem("Error"));
					if (errorMessage === null) {
						errorMessage = [];
					}
					errorMessage.push(response.data.message);
					localStorage.setItem("Error", JSON.stringify(errorMessage));
					setErrorMessage(errorMessage.message);
					toast.error(response.data.message, {
						autoClose: true
					});
				}
			})
			.catch((error) => {
				let errorMessage = JSON.parse(localStorage.getItem("Error"));
				if (errorMessage === null) {
					errorMessage = [];
				}
				errorMessage.push(error.message);
				localStorage.setItem("Error", JSON.stringify(errorMessage));
				setErrorMessage(error.message);
				toast.error(error.message, {
					autoClose: true
				});
			});
	};

	useEffect(() => {
		const simulation = {
			batch: batchSize,
			speed: productionSpeed
		};
		axios.post("http://localhost:5000/optimization/calculateEstimatedProductionTime", simulation).then((response) => {
			setEstimatedProductionTime(response.data.time);
		});
	});

	return (
		<Aux>
			<Navbar />
			<ToastContainer autoClose={5000} />
			<div className={classes.mainContent}>
				<div className={classes.leftProd}>
					<h1 className={classes.headlines}>Production controls</h1>
					<div className={classes.controls}>
						<div className={classes.row}>
							<img src={BeersIcon} className={classes.rowIcons} alt="" />
							<p className={classes.rowText}>Batch size</p>
							<input type="number" className={classes.rowInput} id="batchSize" value={batchSize} onChange={(e) => setBatchSize(e.target.value)}/>
						</div>
						<div className={classes.row}>
							<img src={BeerIcon} className={classes.beerIcon} alt="" />
							<p className={classes.rowText}>Beer type</p>
							<select className="dropdownInput" labelId="beerType" id="beerType" value={beerType} onChange={(e) => setBeerType(e.target.value)}>
								<option value="none" selected hidden> Select an Option </option>
								<option value={0}>Pilsner</option>
								<option value={1}>Wheat</option>
								<option value={2}>IPA</option>
								<option value={3}>Stout</option>
								<option value={4}>Ale</option>
								<option value={5}>Alcohol Free</option>
							</select>
						</div>
						<div className={classes.row}>
							<img src={SpeedometerIcon} className={classes.speedometerIcon} alt="" />
							<p className={classes.rowText}>Speed</p>
							<input type="text" className={classes.rowInput} id="speed" value={productionSpeed} onChange={(e) => setProductionSpeed(e.target.value)}/>
						</div>
						<div className={classes.row}>
							<img src={StopwatchIcon} className={classes.stopwatchIcon} alt="" />
							<Tooltip title="Estimated Production Time (EPT)">
								<p className={classes.rowText}> EPT <InfoIcon color="action" fontSize="small" /></p>
							</Tooltip>
							<input type="text" className={classes.rowInput} value={estimatedProductionTime} />
						</div>

						<Button className={classes.startBtn} color="action" type="submit" onClick={startProduction}><PlayArrowRoundedIcon/>Start</Button>
						<Button className={classes.resetBtn} type="submit" color="action" onClick={resetProduction}><ReplayOutlinedIcon/>Reset</Button>
						<Button className={classes.stopBtn} type="submit" color="action" onClick={stopProduction}><StopRoundedIcon color="action"/>Stop</Button>
					</div>
				</div>

				<div className={classes.rightProd}>
					<h1 className={classes.headlines}>Production overview</h1>
					<div className={classes.overview}>
						<div className={classes.row}>
							<img src={BeersIcon} className={classes.rowIcons} alt="" />
							<p className={classes.rowText}>Batch size</p>
							<input type="text" aria-label="showSize" className={classes.rowInput} value={batchSize} style={{ border: "0" }}/>
						</div>
						<div className={classes.row}>
							<img src={BeerIcon} className={classes.beerIcon} alt="" />
							<p className={classes.rowText}>Beer type</p>
							<input type="text" aria-label="showType" className={classes.rowInput} value={beerType} style={{ border: "0" }}/>
						</div>
						<div className={classes.row}>
							<img src={SpeedometerIcon} className={classes.speedometerIcon} alt="" />
							<p className={classes.rowText}>Speed</p>
							<input type="text" aria-label="showSpeed" className={classes.rowInput} value={productionSpeed} style={{ border: "0" }}/>
						</div>
						<div className={classes.row}>
							<AdjustIcon style={{color: green[400], paddingTop: "10px", marginLeft: "-5px"}} fontSize="large"/>
							<p className={classes.rowText}>Machine state</p>
							<input type="text" aria-label="showState" className={classes.rowInput} style={{ border: "0" }} value={machineStatus}/>
						</div>
						<div className={classes.row}>
							<CheckCircleRoundedIcon style={{color: green[400], paddingTop: "10px", marginLeft: "-5px"}} fontSize="large"/>
							<p className={classes.rowText}>Produced</p>
							<input type="text" aria-label="showProduced" className={classes.rowInput} value={valid} style={{ border: "0" }}/>
						</div>
					</div>
				</div>
			</div>
			<Footer />
		</Aux>
	);
}

export default Production;
