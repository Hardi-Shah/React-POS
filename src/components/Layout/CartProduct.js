import React, { useState, useEffect } from 'react'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination, Modal, Link, Paper } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    table: {
        margin: 'auto',
    },
    paper: {
        margin: 'auto',
        width: '540px',
        marginLeft: '-25px'
    },
    headcolor: {
        fontWeight: 600
    },
    paper1: {
        position: 'absolute',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}))

function CartProduct(props) {
    const classes = useStyles();
    const [cart, setCart] = useState([]);

    const { cartitem, addToCart, removeFromCart } = props;

    const itemsPrice = cartitem.reduce((a, c) => a + c.price * c.quantity + (c.price * c.quantity * c.gst / 100), 0);
    const taxPrice = itemsPrice * 0.14;
    const shippingPrice = itemsPrice > 2000 ? 0 : 20;
    const totalPrice = itemsPrice + taxPrice + shippingPrice 

    useEffect(() => {
        const { cartitem } = props
        setCart({ cartitem })
    }, [props]);

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = event => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const body = (
        <div className={classes.paper1}>
            <h2 id="simple-modal-title">Thank you for shopping with us!!</h2>
            <p id="simple-modal-description">
                {cart.name}
            </p>
        </div>
    );
    return (
        <>
            <div>{cartitem.length === 0 && <p>Cart is empty</p>}</div>
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
                        {cartitem && cartitem
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
                                        <button onClick={() => addToCart(product)} className="btn fa fa-plus  mr-2" ></button>
                                        <button onClick={() => removeFromCart(product)} className="btn fa fa-minus  mr-2" > </button>
                                    </TableCell>
                                    <TableCell>{product.price * product.quantity + (product.price * product.quantity * product.gst / 100)}</TableCell>
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
                <TablePagination
                    rowsPerPageOptions={[3, 8, 10, 15]}
                    component="div"
                    count={cartitem.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                />
            </TableContainer >
            {cartitem.length !== 0 && (
                <>
                    <hr></hr>
                    <div className="row">
                        <div className="text-right">
                            <strong>Total Price:₹{totalPrice.toFixed(2)}</strong>
                        </div>
                    </div>
                </>
            )}


            <button className='btn btn-primary' onClick={handleOpen}>
                Invoice
         </button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                {body}
            </Modal>
        </>
    )
}

export default CartProduct