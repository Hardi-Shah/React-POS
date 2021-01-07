import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import './Product.css';
import { editProductService, getProductServiceById } from "../../../Services/ProductService";
import TextError from "./TextError";

const EditProduct = () => {
    let history = useHistory();
    const { id } = useParams();
    const [product, setProduct] = useState({
        name: ""
    });
    const handleChange = e => {
        setProduct({ ...product, [e.target.name]: e.target.value })
    };
    const initialValues = {
        name: ""
    };
    const validationSchema = Yup.object({
        name: Yup.string().required('ProductName is Reuired')
    })
    const onSubmit = async values => {
        await editProductService(id, values)
        history.push("/");
    }

    useEffect(() => {
        loadProduct();
    }, []);

    const loadProduct = async () => {
        await getProductServiceById(id)
            .then(res => setProduct(res.data))
            .catch(err => {
                history.push("/NotFound");
            })
    };
    const { name } = product;
    return (
        <div className="container">
            <div className="w-75 mx-auto shadow p-5 AddStyle" >
                <h2 className="text-center mb-4">Edit A Product</h2>
                <Formik initialValues={product || initialValues}
                    onSubmit={onSubmit} loadProduct={loadProduct}
                    enableReinitialize={true}
                    validationSchema={validationSchema}>
                    {
                        formik => (
                            <Form>
                                <div >
                                    <label>Product Name</label>
                                    <Field name="name" type="text" value={name} onChange={handleChange} placeholder='Enter Category Name' />
                                    <ErrorMessage name="name" component={TextError} />
                                </div>
                                <button type='submit' disabled={!formik.isValid} className="btn btn-warning btn-block ">Edit User</button>
                            </Form>
                        )
                    }
                </Formik>
            </div>
        </div>
    )
}

export default EditProduct