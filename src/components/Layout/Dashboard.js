import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { Drawer, CssBaseline, Toolbar, AppBar, Typography, IconButton, List, Divider } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';

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
import DashboardPage from './DashboardPage';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        maxwidth: 345,
    },
    title: {
        flexGrow:1
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
    paper: {
        padding: theme.spacing(2),
        width: '80%',
        height: 440,
        margin: 'auto',
        overflow: 'auto',
        flexDirection: 'column'
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
    const DashBoardPage = () => {
        return (
            <DashboardPage />
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

                    <Switch>
                        <Route exact path="/" component={DashBoardPage} />
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

                </main>
            </div>
        </Router>
    );
}