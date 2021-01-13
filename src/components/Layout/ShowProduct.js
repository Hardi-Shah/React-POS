import React, { useState, useEffect } from 'react'
import { Grid, Card, CardHeader, CardMedia, CardContent, Typography, CardActionArea, Link, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { getProductService } from '../../Services/ProductService';
import CartProduct from './CartProduct';

const useStyles = makeStyles((theme) => ({
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
        margin: 'auto',
    },
    media: {
        height: 0,
        paddingTop: '56.25%',
        marginLeft: '22px',
        marginRight: '22px'
    },
    title: {
        fontSize: 14,
    },
    gridContainer: {
        paddingLeft: "30px",
        paddingRight: "30px",
        marginTop: 30
    },
    cost: {
        float: "left",
        marginLeft: '-15px'
    },
    quantity: {
        float: "right",
        marginRight: '-15px'
    },
    grid: {
        marginRight: '-50px'
    },
    card: {
        maxWidth: 150,
        marginBottom: '20px'
    }
}))

function ShowProduct() {
    const classes = useStyles();
    const [products, setProduct] = useState([]);

    const [cart, setCart] = useState([]);
    useEffect(() => {
        loadProducts();
    }, []);

    const loadProducts = async () => {
        const result = await getProductService()
        setProduct(result.data);
    };

    const addToCart = (Product) => {
        const exist = cart.find((x) => x.id === Product.id);
        if (exist) {
            setCart(
                cart.map((x) =>
                    x.id === Product.id ? { ...exist, quantity: exist.quantity + 1 } : x
                )
            );
        } else {
            setCart([...cart, { ...Product, quantity: 1 }]);
        }
    };

    const removeFromCart = (Product) => {
        const exist = cart.find((x) => x.id === Product.id);
        if (exist.quantity === 1) {
            setCart(
                cart.filter((x) => x.id !== Product.id)
            );
        } else {
            setCart(
                cart.map((x) =>
                    x.id === Product.id ? { ...exist, quantity: exist.quantity - 1 } : x
                )
            );
        }
    };

    return (
        <Grid
            container
            spacing={3}
            className={classes.gridContainer}
            justify="center"
        >
            <Grid item xs={12} sm={6} md={6}>
                <CartProduct cartitem={cart} addToCart={addToCart} removeFromCart={removeFromCart} />
            </Grid>
            <Grid item xs={12} sm={6} md={6} className={classes.grid}>
                <Grid container
                    justify="center">
                    {products.map(Product => {
                        return (
                            <Grid item xs={4} key={Product.id}  >
                                <Card className={classes.card}  >
                                    <CardActionArea onClick={() => addToCart(Product)}>
                                        <CardHeader
                                            title={Product.name}
                                        />
                                        <CardMedia
                                            className={classes.media}
                                            image={Product.image}
                                            title={Product.name}
                                        />
                                        <CardContent>
                                            <Typography variant="body2" className={classes.cost} component="p">
                                                Cost(₹):{Product.price}
                                            </Typography>
                                            <Typography variant="body2" className={classes.quantity} component="p" >
                                                Quantity:{Product.quantity}
                                            </Typography>
                                        </CardContent>
                                    </CardActionArea>
                                </Card>
                            </Grid>
                        )
                    })}
                </Grid>
            </Grid>
        </Grid>

    )
}
export default ShowProduct