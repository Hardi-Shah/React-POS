import React from "react";
import { useHistory } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import './Product.css';
import { addProductService } from "../../../Services/ProductService";
import TextError from "./TextError";

const AddProduct = () => {
    let history = useHistory();
    const initialValues = {
        name: ""
    };
    const validationSchema = Yup.object({
        name: Yup.string().required('ProductName is Reuired')
    })
    const onSubmit = async values => {
        await addProductService(values)
        history.push("/");
    }

    return (
        <div className="container">
            <div className="w-75 mx-auto shadow p-5 AddStyle" >
                <h2 className="text-center mb-4">Add A Product</h2>
                <Formik initialValues={initialValues}
                    onSubmit={onSubmit}
                    validationSchema={validationSchema}>
                    {
                        formik => (
                            <Form>
                                <div >
                                    <label>Product Name</label>
                                    <Field name="name" type="text" placeholder='Enter Product Name' />
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
export default AddProduct;