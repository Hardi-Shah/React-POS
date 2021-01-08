import React, { useState, useEffect, useCallback } from "react";
import { useHistory, useParams } from "react-router-dom";
import { getProductServiceById } from "../../../Services/ProductService";

const Product = () => {
    let history = useHistory();
    const [product, setProduct] = useState({
        name: ""
    });
    const { id } = useParams();

    useEffect(() => {
        loadProduct();
    }, []);

    const loadProduct = async () => {
        await getProductServiceById(id)
            .then(res => setProduct(res.data))
            .catch(err => {
                history.push("/ProductNotFound");
            })
    };
    return (
        <div className="container py-4">
            <h1 className="display-4">Product Id: {id}</h1>
            <hr />
            <ul className="list-group w-50">
                <li className="list-group-item">ProductName: {product.name}</li>
            </ul>
        </div>
    );
};

export default Product;