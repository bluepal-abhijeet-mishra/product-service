import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams, Link } from 'react-router-dom';

const ProductForm = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { id } = useParams();
    const username = localStorage.getItem('username');

    useEffect(() => {
        if (id) {
            fetchProduct();
        }
    }, [id]);

    const fetchProduct = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`http://localhost:8080/api/products/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setName(response.data.name);
            setDescription(response.data.description);
            setPrice(response.data.price);
        } catch (error) {
            setError('Failed to load product');
            if (error.response?.status === 401 || error.response?.status === 403) {
                navigate('/login');
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        if (!name || !description || !price) {
            setError('Please fill in all fields');
            setLoading(false);
            return;
        }

        if (isNaN(price) || parseFloat(price) <= 0) {
            setError('Please enter a valid price');
            setLoading(false);
            return;
        }

        try {
            const product = { name, description, price: parseFloat(price) };
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
        } catch (error) {
            setError(error.response?.data?.message || 'Failed to save product. You may not have permission.');
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        navigate('/');
    };

    return (
        <div className="form-container">
            <nav className="navbar">
                <div className="navbar-content">
                    <div className="navbar-brand">ProductHub</div>
                    <div className="navbar-links">
                        <Link to="/products" className="nav-link">My Products</Link>
                        <span className="nav-link">Welcome, {username}</span>
                        <button onClick={handleLogout} className="btn-logout">Logout</button>
                    </div>
                </div>
            </nav>

            <div className="form-card">
                <h1 className="form-title">{id ? 'Edit Product' : 'Add New Product'}</h1>

                {error && <div className="error-message">{error}</div>}

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label className="form-label">Product Name</label>
                        <input
                            type="text"
                            className="form-input"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Enter product name"
                            disabled={loading}
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label">Description</label>
                        <input
                            type="text"
                            className="form-input"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Enter product description"
                            disabled={loading}
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label">Price ($)</label>
                        <input
                            type="number"
                            step="0.01"
                            className="form-input"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            placeholder="0.00"
                            disabled={loading}
                        />
                    </div>

                    <div className="form-actions">
                        <Link to="/products" className="btn-secondary">
                            Cancel
                        </Link>
                        <button type="submit" className="btn-primary" disabled={loading}>
                            {loading ? 'Saving...' : (id ? 'Update Product' : 'Add Product')}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ProductForm;
