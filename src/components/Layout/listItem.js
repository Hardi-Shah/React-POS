import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import CategoryIcon from '@material-ui/icons/Category';
import { Link } from 'react-router-dom';
import './ListItem.css';

export const MainListItems = (
<div>
    <Link to="/" >
        <ListItem button  >
            <ListItemIcon>
                <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
        </ListItem>
    </Link>
    <Link to="/Category" >
        <ListItem button >
            <ListItemIcon>
                <CategoryIcon/>
            </ListItemIcon>
            <ListItemText primary="Categories" />
        </ListItem>
    </Link >
    <Link to="/Product">
        <ListItem button >
            <ListItemIcon>
                <ShoppingCartIcon />
            </ListItemIcon>
            <ListItemText primary="Products" />
        </ListItem>
    </Link>
</div>
);

