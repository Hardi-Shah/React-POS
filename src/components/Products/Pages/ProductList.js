import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getProductService, deleteProductServiceById } from "../../../Services/ProductService";
import { makeStyles } from "@material-ui/core/styles";
import {Table,TableBody,TableCell,TableContainer,TableHead,TableRow,TablePagination} from "@material-ui/core";
import { useHistory } from "react-router-dom";
import '../../Products/ProductList/Product.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Dialog,Button,DialogActions,DialogContent,DialogContentText,DialogTitle,Paper} from '@material-ui/core';

toast.configure()

const useStyles = makeStyles((theme) => ({
    table: {
        width: '90%',
        margin: 'auto',
        marginTop: 50
    },
    paper: {
        marginTop: 44,
        width: '80%',
        margin: 'auto',
        boxShadow: theme.shadows[5],
    },
    head: {
        backgroundColor: 'darkblue'
    },
    headcolor: {
        color: 'white'
    },
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover
        }
    }
}));

export default function ProductList() {
    let history = useHistory();
    const classes = useStyles();
    const [products, setProducts] = useState([]);
    const [id,setId]=useState();
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    useEffect(() => {
        loadProducts();
    }, []);

    const loadProducts = async () => {
        const result = await getProductService()
        setProducts(result.data.reverse());

    };
    const deleteProduct = async id => {
        await deleteProductServiceById(id)
        setOpen(false)
        toast.success('Deleted successfully!')
        history.push("/Product");
        loadProducts();
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
            <TableContainer className={classes.paper} component={Paper}>
                <Link className="btn  btn-outline-primary AddBtn" to="/products/add">Add Product</Link>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead >
                        <TableRow className={classes.head}>
                            <TableCell className={classes.headcolor}>#</TableCell>
                            <TableCell className={classes.headcolor}>Name</TableCell>
                            <TableCell className={classes.headcolor}>Price(₹)</TableCell>
                            <TableCell className={classes.headcolor}>Quantity</TableCell>
                            <TableCell className={classes.headcolor}>GST(%)</TableCell>
                            <TableCell className={classes.headcolor}>Discount</TableCell>
                            <TableCell className={classes.headcolor}>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {products
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((product, index) => (
                                <TableRow key={product.id} className={classes.root}>
                                    <TableCell component="th" scope="row">
                                        {index + 1}
                                    </TableCell>
                                    <TableCell>{product.name}</TableCell>
                                    <TableCell>{product.price}</TableCell>
                                    <TableCell>{product.quantity}</TableCell>
                                    <TableCell>{product.gst}</TableCell>
                                    <TableCell>{product.discount}</TableCell>
                                    <TableCell>
                                        <Link className="btn fa fa-eye btn-primary mr-2" to={`/products/${product.id}`}>View</Link>
                                        <Link className="btn fa fa-edit btn-outline-primary mr-2" to={`/products/edit/${product.id}`}> Edit</Link>
                                        <button className="btn fa fa-trash btn-danger mr-2" to="/Product" onClick={()=>{setId(product.id);handleClickOpen()}}> Delete</button>
                                    </TableCell>
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={products.length}
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
                       Are You Sure to Delete?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                     </Button>
                    <Button onClick={() => deleteProduct(id)} color="primary" autoFocus>
                      Ok
                     </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
