import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getCategoryService, deleteCategoryServiceById } from "../../../Services/CategoryService";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TablePagination from "@material-ui/core/TablePagination";
import '../../Categories/CategoryList/Category.css';
import { useHistory } from "react-router-dom";
import { Paper } from "@material-ui/core";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure()

const useStyles = makeStyles((theme) => ({
    table: {
        width: '90%',
        margin: 'auto',
        marginTop: 50
    },
    head: {
        backgroundColor: 'darkblue'
    },
    headcolor: {
        color: 'white'
    },
    paper: {
        marginTop:102,
        width: '80%',
        margin: 'auto'
    },
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover
        }
    }
}));

export default function CategoryList() {
    let history = useHistory();
    const classes = useStyles();
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        loadCategories();
    }, []);

    const loadCategories = async () => {
        const result = await getCategoryService()
        setCategories(result.data.reverse());

    };
    const deleteCategory = async id => {
        if (window.confirm("Do you want to continue ?")) {
            await deleteCategoryServiceById(id)
            toast.success('Deleted successfully!')
            history.push("/Category");
        }
    }
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
        <div className="container">
            <TableContainer className={classes.paper} component={Paper} >
                <Link className="btn btn-outline-primary AddCategory" to="/categories/add">Add Category</Link>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead >
                        <TableRow className={classes.head}>
                            <TableCell className={classes.headcolor}>#</TableCell>
                            <TableCell className={classes.headcolor}>Name</TableCell>
                            <TableCell className={classes.headcolor}>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {categories
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((category, index) => (
                                <TableRow key={category.id} className={classes.root}>
                                    <TableCell component="th" scope="row">
                                        {index + 1}
                                    </TableCell>
                                    <TableCell >{category.name}</TableCell>
                                    <TableCell>
                                        <Link className="btn fa fa-eye btn-primary mr-3" to={`/categories/${category.id}`}>View</Link>
                                        <Link className="btn fa fa-edit btn-outline-primary mr-3" to={`/categories/edit/${category.id}`}> Edit</Link>
                                        <Link className="btn fa fa-trash  btn-danger " to="" onClick={() => deleteCategory(category.id)}> Delete</Link>
                                    </TableCell>
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={categories.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                />
            </TableContainer>
        </div>
    );
}
