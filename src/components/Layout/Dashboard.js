import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import {Drawer,CssBaseline,Toolbar,AppBar,Typography,IconButton,List,Divider} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import {Grid,Card,CardHeader,CardMedia,CardContent} from '@material-ui/core';

import { MainListItems } from './ListItem';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import AddCategory from '../Categories/CategoryList/AddCategory';
import EditCategory from '../Categories/CategoryList/EditCategory';
import Category from '../Categories/CategoryList/Category';
import NotFound from '../Categories/Pages/NotFound';
import CategoryList from '../Categories/Pages/CategoryList';
import ProductList from '../Products/Pages/ProductList';
import ProductNotFound from '../Products/Pages/ProductNotFound';
import AddProduct from '../Products/ProductList/AddProduct';
import EditProduct from '../Products/ProductList/EditProduct';
import Product from '../Products/ProductList/Product';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        maxwidth: 345,
    },
    title: {
        fontSize: 14,
    },
    toolbar: {
        paddingRight: 24,
    },
    toolbarIcon: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar,
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: 36,
    },
    menuButtonHidden: {
        display: 'none',
    },
    title: {
        flexGrow: 1,
        fontSize:14
    },
    drawerPaper: {
        position: 'relative',
        whiteSpace: 'nowrap',
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerPaperClose: {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9),
        },
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
    },
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
        margin: 'auto',
    },
    media: {
        height: 0,
        paddingTop: '56.25%',
        width:'76%',
        marginLeft:'38px' // 16:9
    },
    paper: {
        padding: theme.spacing(2),
        width: '80%',
        height: 440,
        margin: 'auto',
        overflow: 'auto',
        flexDirection: 'column'
    },
    gridContainer: {
        paddingLeft: "30px",
        paddingRight: "30px",
        marginTop:30
    },
    cost:{
        float:"left"
    },
    quantity:{
        float:"right"
    }
}));

export default function Dashboard() {
    const classes = useStyles();
    const [open, setOpen] = React.useState(true);
    const handleDrawerOpen = () => {
        setOpen(true);
    };
    const handleDrawerClose = () => {
        setOpen(false);
    };
    const DashboardPage = () => {
        return (
            <Grid
            container
            spacing={5}
            className={classes.gridContainer}
            justify="center"
        >
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
        )
    }

    return (
        <Router>
            <div className={classes.root} >
                <CssBaseline />
                <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
                    <Toolbar className={classes.toolbar}>
                        <IconButton
                            edge="start"
                            color="inherit"
                            aria-label="open drawer"
                            onClick={handleDrawerOpen}
                            className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
                            Dashboard
          </Typography>
                    </Toolbar>
                </AppBar>
                <Drawer
                    variant="permanent"
                    classes={{
                        paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
                    }}
                    open={open}
                >
                    <div className={classes.toolbarIcon}>
                        <IconButton onClick={handleDrawerClose}>
                            <ChevronLeftIcon />
                        </IconButton>
                    </div>
                    <Divider />
                    <List>{MainListItems}</List>
                </Drawer>
                <main className={classes.content}>
                    <div className={classes.appBarSpacer} />
                    <Router>
                        <Switch>
                            <Route exact path="/" component={DashboardPage} />
                            <Route exact path="/Category" component={CategoryList} />
                            <Route exact path="/categories/add" component={AddCategory} />
                            <Route exact path="/categories/edit/:id" component={EditCategory} />
                            <Route exact path="/categories/:id" component={Category} />
                            <Route exact path="/NotFound" component={NotFound} />
                            <Route exact path="/Product" component={ProductList} />
                            <Route exact path="/products/add" component={AddProduct} />
                            <Route exact path="/products/edit/:id" component={EditProduct} />
                            <Route exact path="/products/:id" component={Product} />
                            <Route exact path="/ProductNotFound" component={ProductNotFound} />
                        </Switch>
                    </Router>
                </main>
            </div>
        </Router>
    );
}