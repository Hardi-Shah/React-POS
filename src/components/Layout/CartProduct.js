import React, { useState, useEffect } from 'react'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination, Link, Paper } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import { getProductService } from '../../Services/ProductService';

const useStyles = makeStyles((theme) => ({
    table: {
        margin: 'auto',
    },
    paper: {
        margin: 'auto',
        width: '537px',
        marginLeft: '-25px'
    },
    headcolor: {
        fontWeight: 600
    }
}))

function CartProduct() {
    const classes = useStyles();
    const [products, setProduct] = useState([]);
    useEffect(() => {
        loadProducts();
    }, []);

    const loadProducts = async () => {
        const result = await getProductService()
        setProduct(result.data);
    };
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
        <TableContainer className={classes.paper} component={Paper}>
            <Table className={classes.table} aria-label="simple table">
                <TableHead >
                    <TableRow className={classes.head}>
                        <TableCell className={classes.headcolor}>Sr No.</TableCell>
                        <TableCell className={classes.headcolor}>Item</TableCell>
                        <TableCell className={classes.headcolor}>Cost per Item(₹)</TableCell>
                        <TableCell className={classes.headcolor}>Quantity</TableCell>
                        <TableCell className={classes.headcolor}>GST(%)</TableCell>
                        <TableCell className={classes.headcolor}>Action</TableCell>
                        <TableCell className={classes.headcolor}>Total</TableCell>
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
                                <TableCell>
                                    <button className="btn fa fa-plus  mr-2" ></button>
                                    <button className="btn fa fa-minus  mr-2" > </button>
                                </TableCell>
                                <TableCell></TableCell>
                            </TableRow>
                        ))}
                </TableBody>
            </Table>
            <TablePagination
                rowsPerPageOptions={[3, 8, 10, 15]}
                component="div"
                count={products.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
            />
        </TableContainer >
    )
}

export default CartProduct