import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const ProductForm = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        if (id) {
            const fetchProduct = async () => {
                const token = localStorage.getItem('token');
                const response = await axios.get(`http://localhost:8080/api/products/${id}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setName(response.data.name);
                setDescription(response.data.description);
                setPrice(response.data.price);
            };
            fetchProduct();
        }
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const product = { name, description, price };
        const token = localStorage.getItem('token');
        if (id) {
            await axios.put(`http://localhost:8080/api/products/${id}`, product, {
                headers: { Authorization: `Bearer ${token}` }
            });
        } else {
            await axios.post('http://localhost:8080/api/products', product, {
                headers: { Authorization: `Bearer ${token}` }
            });
        }
        navigate('/products');
    };

    return (
        <div>
            <h2>{id ? 'Edit' : 'Add'} Product</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name</label>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div>
                    <label>Description</label>
                    <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
                </div>
                <div>
                    <label>Price</label>
                    <input type="text" value={price} onChange={(e) => setPrice(e.target.value)} />
                </div>
                <button type="submit">Save</button>
            </form>
        </div>
    );
};

export default ProductForm;
