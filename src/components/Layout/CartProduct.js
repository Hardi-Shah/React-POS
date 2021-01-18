import React, { useState, useEffect } from 'react'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination, Modal, Paper } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import './ListItem.css';

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
    modalpaper: {
        position: 'absolute',
        width: '560px',
        marginLeft: '456px',
        marginTop: '100px',
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    }
}))

function CartProduct(props) {
    const classes = useStyles();
    const [cart, setCart] = useState([]);

    const { cartitem, addToCart, removeFromCart } = props;

    const itemsPrice = cartitem.reduce((a, c) => a + c.price * c.quantity + (c.price * c.quantity * c.gst / 100) - c.discount, 0);
    const totalPrice = itemsPrice

    useEffect(() => {
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
        <TableContainer className={classes.modalpaper} component={Paper} >
            <button
                className="btn fa fa-times modalclose"
                onClick={handleClose}
            >
            </button>
            <Table className={classes.table} aria-label="simple table">
                <TableHead >
                    <TableRow className={classes.head}>
                        <TableCell className={classes.headcolor}>Sr No.</TableCell>
                        <TableCell className={classes.headcolor}>Item</TableCell>
                        <TableCell className={classes.headcolor}>Cost per Item(₹)</TableCell>
                        <TableCell className={classes.headcolor}>Quantity</TableCell>
                        <TableCell className={classes.headcolor}>GST(%)</TableCell>
                        <TableCell className={classes.headcolor}>Total</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {cartitem
                        .map((cart, index) => (
                            <TableRow key={cart.id} className={classes.root}>
                                <TableCell component="th" scope="row">
                                    {index + 1}
                                </TableCell>
                                <TableCell>{cart.name}</TableCell>
                                <TableCell>{cart.price}</TableCell>
                                <TableCell>{cart.quantity}</TableCell>
                                <TableCell>{cart.gst}</TableCell>
                                <TableCell>{totalPrice.toFixed(2)}</TableCell>
                            </TableRow>
                        ))}
                </TableBody>
            </Table>
            <h2 id="simple-modal-title">Thank you for shopping with us!!</h2>
        </TableContainer >
    );
    return (
        <>
            <div>{cartitem.length === 0 && <strong>Cart is empty</strong>}</div>
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
                        {cartitem
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((cart, index) => (
                                <TableRow key={cart.id} className={classes.root}>
                                    <TableCell component="th" scope="row">
                                        {index + 1}
                                    </TableCell>
                                    <TableCell>{cart.name}</TableCell>
                                    <TableCell>{cart.price}</TableCell>
                                    <TableCell>{cart.quantity}</TableCell>
                                    <TableCell>{cart.gst}</TableCell>
                                    <TableCell>
                                        <button  onClick={() => addToCart(cart)} className="btn fa fa-plus  mr-2" ></button>
                                        <button onClick={() => removeFromCart(cart)} className="btn fa fa-minus  mr-2" > </button>
                                    </TableCell>
                                    <TableCell>{cart.price * cart.quantity + (cart.price * cart.quantity * cart.gst / 100) - cart.discount}</TableCell>
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
                    <br></br>
                    <div className="row">
                        <div className="text-right">
                            <strong>Total Price:₹{totalPrice.toFixed(2)}</strong>
                        </div>
                    </div>
                </>
            )}

            <button className='btn btn-primary invoice' onClick={handleOpen}>
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