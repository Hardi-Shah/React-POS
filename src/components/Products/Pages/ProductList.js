import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getProductService, deleteProductServiceById } from "../../../Services/ProductService";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { useHistory } from "react-router-dom";
import TablePagination from "@material-ui/core/TablePagination";
import '../../Products/ProductList/Product.css';
import { Paper } from "@material-ui/core";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure()

const useStyles = makeStyles((theme) => ({
    table: {
        width: '90%',
        margin: 'auto',
        marginTop: 50
    },
    paper: {
        marginTop: 80,
        width: '80%',
        margin: 'auto'
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

    useEffect(() => {
        loadProducts();
    }, []);

    const loadProducts = async () => {
        const result = await getProductService()
        setProducts(result.data.reverse());

    };
    const deleteProduct = async id => {
        if (window.confirm("Do you want to continue ?")) {
            await deleteProductServiceById(id)
            toast.success('Deleted successfully!')
            history.push("/Product");
        }
        history.push("/Product");
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
                                        <Link className="btn fa fa-trash btn-danger mr-2" to="" onClick={() => deleteProduct(product.id)}> Delete</Link>
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
        </div>
    );
}
