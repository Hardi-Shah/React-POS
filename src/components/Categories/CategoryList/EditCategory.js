import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import './Category.css';
import { editCategoryService, getCategoryServiceById } from "../../../Services/CategoryService";
import TextError from "./TextError";

const EditCategory = () => {
    let history = useHistory();
    const { id } = useParams();
    const [category, setCategory] = useState({
        name: ""
    });
    const handleChange = e => {
        setCategory({ ...category, [e.target.name]: e.target.value })
    };
    const initialValues = {
        name: ""
    };
    const validationSchema = Yup.object({
        name: Yup.string().required('CategoryName is Reuired')
    })
    const onSubmit = async values => {
        await editCategoryService(id, values)
        history.push("/Category");
    }

    useEffect(() => {
        loadCategory();
    }, []);

    const loadCategory = async () => {
        await getCategoryServiceById(id)
            .then(res => setCategory(res.data))
            .catch(err => {
                history.push("/NotFound");
            })
    };
    const { name } = category;
    return (
        <div className="container">
            <div className="w-75 mx-auto shadow p-5 AddStyle" >
                <h2 className="text-center mb-4">Edit A Category</h2>
                <Formik initialValues={category || initialValues}
                    onSubmit={onSubmit} loadCategory={loadCategory}
                    enableReinitialize={true}
                    validationSchema={validationSchema}>
                    {
                        formik => (
                            <Form>
                                <div >
                                    <label>Category Name</label>
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

export default EditCategory