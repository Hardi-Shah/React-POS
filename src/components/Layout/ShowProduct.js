import React, { useState, useEffect } from 'react'
import { Grid, Card, CardHeader, CardMedia, CardContent, Typography, Link, Paper } from '@material-ui/core';
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
        marginLeft: '38px'
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
        float: "left"
    },
    quantity: {
        float: "right"
    }
}))

function ShowProduct() {
    const classes = useStyles();
    const [products, setProduct] = useState([]);
    useEffect(() => {
        loadProducts();
    }, []);

    const loadProducts = async () => {
        const result = await getProductService()
        setProduct(result.data);
    };
    return (
        <Grid
            container
            spacing={3}
            className={classes.gridContainer}
            justify="center"
        >
            <Grid item xs={12} sm={6} md={6}>    
             <CartProduct />
            </Grid>

            <Grid item xs={12} sm={6} md={6}>
                <Grid container
                    justify="center">
                    {products.map(Product => {
                        return (
                            <Grid item xs={4} key={Product.id}  >
                                <Card style={{ maxWidth: 150 }} >
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