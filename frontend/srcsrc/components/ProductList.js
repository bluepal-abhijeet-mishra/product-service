import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ProductList = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            const token = localStorage.getItem('token');
            const response = await axios.get('http://localhost:8080/api/products', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setProducts(response.data);
        };
        fetchProducts();
    }, []);

    const deleteProduct = async (id) => {
        const token = localStorage.getItem('token');
        await axios.delete(`http://localhost:8080/api/products/${id}`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        setProducts(products.filter(product => product.id !== id));
    };

    return (
        <div>
            <h2>Products</h2>
            <Link to="/add">Add Product</Link>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Price</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map(product => (
                        <tr key={product.id}>
                            <td>{product.name}</td>
                            <td>{product.description}</td>
                            <td>{product.price}</td>
                            <td>
                                <Link to={`/edit/${product.id}`}>Edit</Link>
                                <button onClick={() => deleteProduct(product.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ProductList;
