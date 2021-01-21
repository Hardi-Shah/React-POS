import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getCategoryService, deleteCategoryServiceById } from "../../../Services/CategoryService";
import { makeStyles } from "@material-ui/core/styles";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination } from "@material-ui/core";
import '../../Categories/CategoryList/Category.css';
import { useHistory } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Dialog, Button, DialogActions, DialogContent, DialogContentText, DialogTitle, Paper } from '@material-ui/core';

toast.configure()

const useStyles = makeStyles((theme) => ({
    table: {
        width: '90%',
        margin: 'auto',
        marginTop: 50
    },
    head: {
        backgroundColor: 'darkblue'
    },
    headcolor: {
        color: 'white'
    },
    paper: {
        marginTop: 102,
        width: '80%',
        margin: 'auto',
        boxShadow: theme.shadows[5],
    },
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover
        }
    }
}));

export default function CategoryList() {
    let history = useHistory();
    const classes = useStyles();
    const [categories, setCategories] = useState([]);
    const [id, setId] = useState();
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        loadCategories();
    }, []);

    const loadCategories = async () => {
        const result = await getCategoryService()
        setCategories(result.data.reverse());

    };
    const deleteCategory = async id => {
        await deleteCategoryServiceById(id)
        setOpen(false)
        toast.success('Deleted successfully!')
        history.push("/Category");
        loadCategories();
    }
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = event => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <div className="container">
            <TableContainer className={classes.paper} component={Paper} >
                <Link className="btn btn-outline-primary AddCategory" to="/categories/add">Add Category</Link>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead >
                        <TableRow className={classes.head}>
                            <TableCell className={classes.headcolor}>#</TableCell>
                            <TableCell className={classes.headcolor}>Name</TableCell>
                            <TableCell className={classes.headcolor}>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {categories
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((category, index) => (
                                <TableRow key={category.id} className={classes.root}>
                                    <TableCell component="th" scope="row">
                                        {index + 1}
                                    </TableCell>
                                    <TableCell >{category.name}</TableCell>
                                    <TableCell>
                                        <Link className="btn fa fa-eye btn-primary mr-3" to={`/categories/${category.id}`}>View</Link>
                                        <Link className="btn fa fa-edit btn-outline-primary mr-3" to={`/categories/edit/${category.id}`}> Edit</Link>
                                        <button className="btn fa fa-trash btn-danger mr-2" to="/Category" onClick={()=>{setId(category.id);handleClickOpen()}}> Delete</button>
                                    </TableCell>
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={categories.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                />
            </TableContainer>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Delete Product"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                       Are You Sure to Delete???
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                     </Button>
                    <Button onClick={() => deleteCategory(id)} color="primary" autoFocus>
                      Ok
                     </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
