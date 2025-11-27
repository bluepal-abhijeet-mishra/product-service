import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const username = localStorage.getItem('username');

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const token = localStorage.getItem('token');
            console.log('Token from localStorage:', token);
            console.log('Token length:', token ? token.length : 0);
            
            if (!token) {
                navigate('/login');
                return;
            }
            
            const response = await axios.get('http://localhost:8080/api/products', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setProducts(response.data);
        } catch (error) {
            console.error('Fetch products error:', error);
            if (error.response?.status === 401 || error.response?.status === 403) {
                localStorage.removeItem('token');
                localStorage.removeItem('username');
                navigate('/login');
            }
        } finally {
            setLoading(false);
        }
    };

    const deleteProduct = async (id) => {
        if (!window.confirm('Are you sure you want to delete this product?')) {
            return;
        }

        try {
            const token = localStorage.getItem('token');
            await axios.delete(`http://localhost:8080/api/products/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setProducts(products.filter(product => product.id !== id));
        } catch (error) {
            alert(error.response?.data?.message || 'Failed to delete product. You may not have permission.');
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        navigate('/');
    };

    if (loading) {
        return (
            <div className="products-container">
                <nav className="navbar">
                    <div className="navbar-content">
                        <div className="navbar-brand">ProductHub</div>
                    </div>
                </nav>
                <div style={{ textAlign: 'center', padding: '4rem', color: '#718096' }}>
                    Loading products...
                </div>
            </div>
        );
    }

    return (
        <div className="products-container">
            <nav className="navbar">
                <div className="navbar-content">
                    <div className="navbar-brand">ProductHub</div>
                    <div className="navbar-links">
                        <span className="nav-link">Welcome, {username}</span>
                        <button onClick={handleLogout} className="btn-logout">Logout</button>
                    </div>
                </div>
            </nav>

            <div className="products-header">
                <div className="products-header-content">
                    <h1 className="products-title">My Products</h1>
                    <Link to="/add" className="btn-add">+ Add New Product</Link>
                </div>
            </div>

            {products.length === 0 ? (
                <div className="empty-state">
                    <div className="empty-state-icon">📦</div>
                    <h2 className="empty-state-title">No products yet</h2>
                    <p>Start by adding your first product</p>
                    <Link to="/add" className="btn-add" style={{ marginTop: '1.5rem' }}>
                        Add Your First Product
                    </Link>
                </div>
            ) : (
                <div className="products-grid">
                    {products.map(product => (
                        <div key={product.id} className="product-card">
                            <h3 className="product-name">{product.name}</h3>
                            <p className="product-description">{product.description}</p>
                            <div className="product-price">${product.price.toFixed(2)}</div>
                            <div className="product-actions">
                                <Link to={`/edit/${product.id}`} className="btn-edit">
                                    Edit
                                </Link>
                                <button onClick={() => deleteProduct(product.id)} className="btn-delete">
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ProductList;
