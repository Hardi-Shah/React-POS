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
        <ListItem button >
            <ListItemIcon>
                <DashboardIcon className='icon'/>
            </ListItemIcon>
            <ListItemText primary="Dashboard" className='itemtext'/>
        </ListItem>
    </Link>
    <Link to="/Category" >
        <ListItem button >
            <ListItemIcon>
                <CategoryIcon className='icon'/>
            </ListItemIcon>
            <ListItemText primary="Categories" className='itemtext' />
        </ListItem>
    </Link >
    <Link to="/Product">
        <ListItem button >
            <ListItemIcon>
                <ShoppingCartIcon className='icon'/>
            </ListItemIcon>
            <ListItemText primary="Products" className='itemtext'/>
        </ListItem>
    </Link>
</div>
);

