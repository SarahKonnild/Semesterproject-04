import * as React from 'react';

import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import Button from '@material-ui/core/Button';

import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import LastPageIcon from '@material-ui/icons/LastPage';
import ArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import ArrowRight from '@material-ui/icons/KeyboardArrowRight';


const useStyles = makeStyles(theme => ({
    arrow:{
        '&:hover':{
            backgroundColor:'#98DDCA'
        }
    },
    button:{
        borderRadius:"5px",
        textDecoration: 'none', 
        color:'#8a8a8a',
        backgroundColor:'#FFD3B4',
        textTransform: 'uppercase',
        padding:theme.spacing(2),
        margin: theme.spacing(3),
        marginLeft: theme.spacing(6),
        border:"none",
        '&:hover': {
            backgroundColor: '#98DDCA !important',
        },
    },
    chosen:{

    },
    data:{
        '&:hover':{
            backgroundColor:'#D5ECC2',
        },
        '&:.Mui-selected':{
            backgroundColor:'#cbac3b'
        },
    },
    date:{
        color:'#8a8a8a',
    },
    header:{
        
    },
    id:{
        color:'#8a8a8a',
    },
    root:{
        flexShrink:0,
        marginLeft:theme.spacing(2.5),
    },
    rows:{

    },
    size:{
        color:'#8a8a8a',
    },
    table:{
        paddingLeft:"12.5%",
        paddingRight:"12.5%",
        paddingTop:"1.5%",
        maxWidth:"75%",
        border:"2px",
    },
    title:{
        textTransform:'uppercase',
        color:'#8a8a8a',
        fontSize:'16px',
    },
    type:{
        color:'#8a8a8a',
    },
}));

//use when connected to backend
function createData(id, date, type, size){
    return {id, date, type, size};
}

const rows = [
    {id:1, date:"03.03.2021", type:"Wheat", size:1000},
    {id:2, date:"03.04.2021", type:"Wheat", size:2000},
    {id:3, date:"03.05.2021", type:"Wheat", size:3000},
    {id:4, date:"03.06.2021", type:"Wheat", size:4000},
    {id:5, date:"03.07.2021", type:"Wheat", size:5000},
    {id:6, date:"03.08.2021", type:"Wheat", size:6000},
    {id:7, date:"03.09.2021", type:"Wheat", size:1000},
    {id:8, date:"03.10.2021", type:"Wheat", size:2000},
    {id:9, date:"03.11.2021", type:"Wheat", size:3000},
    {id:10, date:"03.12.2021", type:"Wheat", size:4000},
    {id:11, date:"03.01.2022", type:"Wheat", size:5000},
    {id:12, date:"03.02.2022", type:"Wheat", size:6000},
    {id:13, date:"03.03.2022", type:"Wheat", size:1000},
    {id:14, date:"03.04.2022", type:"Wheat", size:2000},
    {id:15, date:"03.05.2022", type:"Wheat", size:3000},
    {id:16, date:"03.06.2022", type:"Wheat", size:4000},
    {id:17, date:"03.07.2022", type:"Wheat", size:5000},
    {id:18, date:"03.08.2022", type:"Wheat", size:6000},
    {id:19, date:"03.09.2022", type:"Wheat", size:1000},
    {id:20, date:"03.10.2022", type:"Wheat", size:2000},
    {id:21, date:"03.11.2022", type:"Wheat", size:3000},
    {id:22, date:"03.12.2022", type:"Wheat", size:4000},
].sort((a, b) => (a.id < b.id ? -1 : 1));

PaginationActions.propTypes = {
    count: PropTypes.number.isRequired,
    onChangePage: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired
}

function PaginationActions(props){
    const classes = useStyles();
    const theme = useTheme();
    const {count, page, rowsPerPage, onChangePage} = props;

    const handleFirstPageButtonClick = (event) => {
        onChangePage(event, 0);
    }

    const handleBackButtonClick = (event) => {
        onChangePage(event, page-1);
    }

    const handleNextButtonClick = (event) => {
        onChangePage(event, page + 1);
    }
    
    const handleLastPageButtonClick = (event) => {
        onChangePage(event, Math.max(0, Math.ceil(count/rowsPerPage) -1));
    }

    return(
        <div className={classes.root}>
            <IconButton className={classes.arrow} onClick={handleFirstPageButtonClick} disabled={page === 0}>{theme.direction === 'rtl' ? <LastPageIcon/> : <FirstPageIcon/>}</IconButton>
            <IconButton className={classes.arrow} onClick={handleBackButtonClick} disabled={page === 0}>{theme.direction === 'rtl' ? <ArrowRight/> : <ArrowLeft/>}</IconButton>
            <IconButton className={classes.arrow} onClick={handleNextButtonClick} disabled={page >= Math.ceil(count/rowsPerPage) - 1}>{theme.direction === 'rtl' ? <ArrowLeft/> : <ArrowRight/>}</IconButton>
            <IconButton className={classes.arrow} onClick={handleLastPageButtonClick} disabled={page >= Math.ceil(count/rowsPerPage) - 1}>{theme.direction === 'rtl' ? <FirstPageIcon/> : <LastPageIcon/>}</IconButton>
        </div>
    )
}



export default function Batches() {
    const classes = useStyles();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage] = React.useState(10);
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    }

    const handleBatchSelected = (event) => {
        console.log("FUUCK YOUUU For clicking this");
    }

    return (
        <TableContainer className={classes.table}>
            <Table >
                <TableHead>
                    <TableRow className={classes.header}>
                        <TableCell className={classes.title} align="left">Batch ID</TableCell>
                        <TableCell className={classes.title} align="left">Date Produced</TableCell>
                        <TableCell className={classes.title} align="left">Beer Type</TableCell>
                        <TableCell className={classes.title} align="left">Batch Size</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {(rowsPerPage>0 ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) : rows).map((row) =>(
                        <TableRow className={classes.data} key={row.name} onClick={handleBatchSelected}>
                            <TableCell className={classes.id} align="left">{row.id}</TableCell>
                            <TableCell className={classes.date} align="left">{row.date}</TableCell>
                            <TableCell className={classes.type} align="left">{row.type}</TableCell>
                            <TableCell className={classes.size} align="left">{row.size}</TableCell>
                        </TableRow>
                    ))}
                    {emptyRows > 0 && (
                        <TableRow style={{height:53 * emptyRows}}>
                            <TableCell colSpan={4}/>
                        </TableRow>
                    )}
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TablePagination
                            rowsPerPageOptions={1}
                            colSpan={2}
                            count={rows.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onChangePage={handleChangePage}
                            ActionsComponent={PaginationActions}
                        />
                        <Button to="/details+{rows.id}" className={classes.button} align="right">
                            Details <ArrowRight/>
                        </Button>
                    </TableRow>
                </TableFooter>
            </Table>
        </TableContainer>
    );
}