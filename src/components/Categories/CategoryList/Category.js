import React, { useState, useEffect, useCallback } from "react";
import { useHistory, useParams } from "react-router-dom";
import { getCategoryServiceById } from "../../../Services/CategoryService";

const Category = () => {
    let history = useHistory();
    const [category, setCategory] = useState({
        name: ""
    });
    const { id } = useParams();

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

    return (
        <div className="container py-4">
            <h1 className="display-4">Category Id: {id}</h1>
            <hr />
            <ul className="list-group w-50">
                <li className="list-group-item">CategoryName: {category.name}</li>
            </ul>
        </div>
    );
};

export default Category;