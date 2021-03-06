import React from "react";
import { useHistory } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import './Category.css';
import { addCategoryService } from "../../../Services/CategoryService";
import TextError from "./TextError";
import { addCategories } from "../../../Redux/Category/categoryAction";
import { connect } from 'react-redux'

const AddCategory = ({addCategories}) => {
    let history = useHistory();
    const initialValues = {
        name: ""
    };
    const validationSchema = Yup.object({
        name: Yup.string().required('CategoryName is Reuired')
    })
    const onSubmit = values => {
        addCategories(values);
        // await addCategoryService(values)
         history.push("/Category");
    }

    return (
        <div className="container">
            <div className="w-75 mx-auto shadow p-5 AddStyle" >
                <h2 className="text-center mb-4">Add A Category</h2>
                <Formik initialValues={initialValues}
                    onSubmit={onSubmit}
                    validationSchema={validationSchema}>
                    {
                        formik => (
                            <Form>
                                <div >
                                    <label>Category Name</label>
                                    <Field name="name" type="text" placeholder='Enter Category Name' />
                                    <ErrorMessage name="name" component={TextError} />
                                </div>     
                                <button type='submit' disabled={!formik.isValid} className="btn btn-success btn-block">Add Category</button>
                            </Form>
                        )
                    }
                </Formik>

            </div>
        </div>
    )
};
const mapStateToProps = state => {
    return {
        categoryData: state.category
    }
}
const mapDispatchToProps = dispatch => {
    return {
        addCategories: (values) => dispatch(addCategories(values))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(AddCategory)
