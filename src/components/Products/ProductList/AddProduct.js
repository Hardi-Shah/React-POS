import React,{useEffect,useState} from "react";
import { useHistory } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import './Product.css';
import { addProductService } from "../../../Services/ProductService";
import TextError from "./TextError";
import { getCategoryService } from "../../../Services/CategoryService";
import { addProducts } from "../../../Redux/Product/ProductAction";
import {connect} from 'react-redux'

const AddProduct = ({addProducts}) => {
    let history = useHistory();
    const initialValues = {
        name: "",
        price: "",
        quantity: "",
        catName:'',
        gst: "",
        discount: "",
        image:""
    };
    const [categories, setCategory] = useState([]);
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
    const onSubmit = async (values) => {
        addProducts(values);
        //await addProductService(values)
        history.push("/Product");
    }
    useEffect(() => {
        loadCategories();
    }, []);

    const loadCategories = async () => {
        const result = await getCategoryService()
        setCategory(result.data.reverse());
    };

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
                                <div >
                                    <label>Price </label>
                                    <Field name="price" type="text" placeholder=' Price' />
                                    <ErrorMessage name="price" component={TextError} />
                                </div>
                                <div >
                                    <label>Quantity </label>
                                    <Field name="quantity" type="text" placeholder=' Quantity' />
                                    <ErrorMessage name="quantity" component={TextError} />

                                </div>
                                <div >
                                    <label>Category Name</label>
                                    <Field as='select' name='catName'>
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
                                    <Field name="gst" type="text" placeholder=' GST' />
                                    <ErrorMessage name="gst" component={TextError} />
                                </div>
                                <div >
                                    <label>Discount</label>
                                    <Field name="discount" type="text" placeholder=' Discount' />
                                    <ErrorMessage name="discount" component={TextError} />
                                </div>
                                <div >
                                    <label>Image</label>
                                    <Field name="image" type="file" placeholder='image' />
                                    <ErrorMessage name="image" component={TextError} />
                                </div>
                                <button type='submit' disabled={!formik.isValid} className="btn btn-success btn-block">Add Product</button>
                            </Form>
                        )
                    }
                </Formik>

            </div>
        </div >
    )
};
const mapStateToProps = state => {
    return {
        productData: state.product
    }
}
const mapDispatchToProps = dispatch => {
    return {
        addProducts: (values) => dispatch(addProducts(values))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(AddProduct)
