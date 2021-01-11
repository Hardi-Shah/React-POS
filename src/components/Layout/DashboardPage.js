import React from 'react'
import { Grid, Card, CardHeader, CardMedia, CardContent, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
        margin: 'auto',
    },
    media: {
        height: 0,
        paddingTop: '56.25%',
        width: '76%',
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

function DashboardPage() {
    const classes = useStyles();
    return (
        <Grid
            container
            spacing={5}
            className={classes.gridContainer}
            justify="center"
        >
            <Grid item xs={12} sm={6}>
                Cart
            </Grid>
            <Grid item xs={12} sm={6}>
                <Grid container>
                    <Grid item xs={12} sm={6} md={3}>
                        <Card >
                            <CardHeader
                                title="Balaji"
                            />
                            <CardMedia
                                className={classes.media}
                                image="balaji.jpg"
                                title="Balaji Wafers"
                            />
                            <CardContent>
                                <Typography variant="body2" className={classes.cost} component="p">
                                    Cost(₹): 10
                        </Typography>
                                <Typography variant="body2" className={classes.quantity} component="p" >
                                    Quantity: 2
                        </Typography>
                            </CardContent>
                        </Card>
                    </Grid>

                    <Grid item xs={12} sm={6} md={3}>
                        <Card >
                            <CardHeader
                                title="Nescafe"
                            />
                            <CardMedia
                                className={classes.media}
                                image="coffee.jpg"
                                title="Nescafe Classic"
                            />
                            <CardContent>
                                <Typography variant="body2" className={classes.cost} component="p">
                                    Cost(₹): 10
                        </Typography>
                                <Typography variant="body2" className={classes.quantity} component="p" >
                                    Quantity: 2
                        </Typography>
                            </CardContent>
                        </Card>
                    </Grid>

                    <Grid item xs={12} sm={6} md={3}>
                        <Card >
                            <CardHeader
                                title="Red Label"
                            />
                            <CardMedia
                                className={classes.media}
                                image="red-label.jpg"
                                title="Red Label Tea"
                            />
                            <CardContent>
                                <Typography variant="body2" className={classes.cost} component="p">
                                    Cost(₹): 150
                        </Typography>
                                <Typography variant="body2" className={classes.quantity} component="p" >
                                    Quantity: 3
                        </Typography>
                            </CardContent>
                        </Card>
                    </Grid>

                    <Grid item xs={12} sm={6} md={3}>
                        <Card >
                            <CardHeader
                                title="Lays"
                            />
                            <CardMedia
                                className={classes.media}
                                image="lays.jpg"
                                title="Lays Wafers"
                            />
                            <CardContent>
                                <Typography variant="body2" className={classes.cost} component="p">
                                    Cost(₹): 10
                        </Typography>
                                <Typography variant="body2" className={classes.quantity} component="p" >
                                    Quantity: 4
                        </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>

    )
}
export default DashboardPage