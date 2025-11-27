import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import ProductList from './components/ProductList';
import ProductForm from './components/ProductForm';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/products" element={<ProductList />} />
                <Route path="/add" element={<ProductForm />} />
                <Route path="/edit/:id" element={<ProductForm />} />
                <Route path="/" element={<Login />} />
            </Routes>
        </Router>
    );
}

export default App;
