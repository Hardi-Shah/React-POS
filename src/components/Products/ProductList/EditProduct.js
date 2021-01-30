import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import './Product.css';
import { editProductService, getProductServiceById} from "../../../Services/ProductService";
import { getCategoryService } from "../../../Services/CategoryService";
import TextError from "./TextError";
import { editProducts, loadProducts } from "../../../Redux/Product/ProductAction";
import {connect} from 'react-redux'

const EditProduct = ({editProducts,loadProducts}) => {
    let history = useHistory();
    const { id } = useParams();
    const [categories, setCategory] = useState([]);
    const [product, setProduct] = useState({
        name: "",
        price: "",
        quantity: "",
        catName: '',
        gst: "",
        discount: "",
        image:""
    });
    const handleChange = e => {
        setProduct({ ...product, [e.target.name]: e.target.value })
    };
//    const  handleFileUpload = (event) => {
//         setProduct({image: event.currentTarget.files[0]})}
//         }
    
    const initialValues = {
        name: "",
        price: "",
        quantity: "",
        catName:'',
        gst: "",
        discount: "",
        image:""
    };
    const validationSchema = Yup.object({
        name: Yup.string().required('ProductName is Reuired'),
        image:Yup.mixed().required('Product image is Required'),
        price: Yup.number().typeError("That doesn't look like a  number")
            .positive("A price number can't start with a minus").required('Price is Reuired'),
        quantity: Yup.number().typeError("That doesn't look like a  number")
            .positive("A price  can't start with a minus")
            .integer("A price  can't include a decimal point").required('Quantity is Reuired'),
        catName: Yup.string().required('Select Category is Reuired'),
        gst: Yup.number().typeError("That doesn't look like a  number")
            .positive("A GST number can't start with a minus")
            .integer("A GST number can't include a decimal point").required('GST is Reuired'),
        discount: Yup.number().typeError("That doesn't look like a  number")
            .positive("A discount number can't start with a minus")
            .integer("A discount number can't include a decimal point").required('Discount is Reuired')
    })
    const onSubmit = async values => {
        editProducts(id,values);
        //await editProductService(id, values)
        history.push("/Product");
    }

    useEffect(() => {
        loadProduct();
    }, []);

    const loadProduct = async () => {
        loadProducts(id)
        // await getProductServiceById(id)
        //     .then(res => setProduct(res.data))
        //     .catch(err => {
        //         history.push("/ProductNotFound");
        //     })
    };
    
    const { name, price, quantity, gst, discount,image,catName } = product;
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
                                    <Field name="name" type="text" value={name} onChange={handleChange} placeholder='Enter Product Name' />
                                    <ErrorMessage name="name" component={TextError} />
                                </div>
                                <div >
                                    <label>Price </label>
                                    <Field name="price" value={price} onChange={handleChange} type="text" placeholder=' Price' />
                                    <ErrorMessage name="price" component={TextError} />
                                </div>
                                <div >
                                    <label>Quantity </label>
                                    <Field name="quantity" value={quantity} onChange={handleChange} type="text" placeholder=' Quantity' />
                                    <ErrorMessage name="quantity" component={TextError} />
                                </div>
                                <div >
                                    <label>Category Name</label>
                                    <Field as='select' name='catName' value={catName} onChange={handleChange}>
                                        <option value=''>Select Category</option>
                                        {categories.map(Category => {
                                            return (
                                                <option key={Category.name} value={Category.name}>{Category.name}</option>
                                            )
                                        })}
                                    </Field>
                                    <ErrorMessage name="catName" component={TextError} />
                                </div>
                                <div >
                                    <label>GST </label>
                                    <Field name="gst" value={gst} onChange={handleChange} type="text" placeholder=' GST' />
                                    <ErrorMessage name="gst" component={TextError} />
                                </div>
                                <div >
                                    <label>Discount</label>
                                    <Field name="discount" value={discount} onChange={handleChange} type="text" placeholder=' Discount' />
                                    <ErrorMessage name="discount" component={TextError} />
                                </div>
                                <button type='submit' disabled={!formik.isValid} className="btn btn-warning btn-block ">Edit Product</button>
                            </Form>
                        )
                    }
                </Formik>
            </div>
        </div>
    )
}
const mapStateToProps = state => {
    return {
        productData: state.product
    }
}
const mapDispatchToProps = dispatch => {
    return {
        editProducts:(id,values)=>dispatch(editProducts(id,values)),
        loadProducts:(id)=>dispatch(loadProducts(id))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(EditProduct)