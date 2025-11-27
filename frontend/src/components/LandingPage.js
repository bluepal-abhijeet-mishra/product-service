import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
    const currentYear = new Date().getFullYear();

    return (
        <div className="landing-container">
            <nav className="navbar-landing">
                <div className="navbar-content">
                    <div className="navbar-brand">
                        <span className="brand-icon">📦</span>
                        ProductHub
                    </div>
                    <div className="navbar-links">
                        <a href="#features" className="nav-link">Features</a>
                        <a href="#about" className="nav-link">About</a>
                        <Link to="/login" className="nav-link">Login</Link>
                        <Link to="/register" className="btn-nav-cta">Get Started</Link>
                    </div>
                </div>
            </nav>
            
            <div className="hero-section">
                <div className="hero-content">
                    <div className="hero-badge">🚀 Modern Product Management</div>
                    <h1 className="hero-title">Manage Your Products with Ease</h1>
                    <p className="hero-subtitle">
                        A powerful and intuitive platform to organize, track, and manage your product inventory. 
                        Built with modern technology for seamless performance and reliability.
                    </p>
                    <div className="hero-buttons">
                        <Link to="/register" className="btn-hero btn-hero-primary">
                            Get Started Free
                        </Link>
                        <Link to="/login" className="btn-hero btn-hero-secondary">
                            Sign In
                        </Link>
                    </div>
                    <div className="hero-stats">
                        <div className="stat-item">
                            <div className="stat-number">1000+</div>
                            <div className="stat-label">Active Users</div>
                        </div>
                        <div className="stat-item">
                            <div className="stat-number">50K+</div>
                            <div className="stat-label">Products Managed</div>
                        </div>
                        <div className="stat-item">
                            <div className="stat-number">99.9%</div>
                            <div className="stat-label">Uptime</div>
                        </div>
                    </div>
                </div>
            </div>

            <section id="features" className="features-section">
                <div className="container">
                    <div className="section-header">
                        <h2 className="section-title">Powerful Features</h2>
                        <p className="section-subtitle">Everything you need to manage your products efficiently</p>
                    </div>
                    <div className="features-grid">
                        <div className="feature-card">
                            <div className="feature-icon">⚡</div>
                            <h3 className="feature-title">Lightning Fast</h3>
                            <p className="feature-description">
                                Experience blazing fast performance with our optimized platform built on modern technology.
                            </p>
                        </div>
                        <div className="feature-card">
                            <div className="feature-icon">🔒</div>
                            <h3 className="feature-title">Secure & Private</h3>
                            <p className="feature-description">
                                Your data is protected with enterprise-grade security and JWT authentication.
                            </p>
                        </div>
                        <div className="feature-card">
                            <div className="feature-icon">📊</div>
                            <h3 className="feature-title">Easy Management</h3>
                            <p className="feature-description">
                                Intuitive interface makes it simple to add, edit, and organize your products.
                            </p>
                        </div>
                        <div className="feature-card">
                            <div className="feature-icon">📱</div>
                            <h3 className="feature-title">Responsive Design</h3>
                            <p className="feature-description">
                                Access your products from any device - desktop, tablet, or mobile.
                            </p>
                        </div>
                        <div className="feature-card">
                            <div className="feature-icon">🎨</div>
                            <h3 className="feature-title">Beautiful UI</h3>
                            <p className="feature-description">
                                Modern, clean interface designed for the best user experience.
                            </p>
                        </div>
                        <div className="feature-card">
                            <div className="feature-icon">🚀</div>
                            <h3 className="feature-title">Real-time Updates</h3>
                            <p className="feature-description">
                                See changes instantly with our real-time synchronization system.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <section id="about" className="about-section">
                <div className="container">
                    <div className="about-content">
                        <div className="about-text">
                            <h2 className="about-title">Built for Modern Businesses</h2>
                            <p className="about-description">
                                ProductHub is designed to streamline your product management workflow. 
                                Whether you're a small business or a growing enterprise, our platform 
                                scales with your needs.
                            </p>
                            <ul className="about-list">
                                <li>✓ Easy product creation and editing</li>
                                <li>✓ Secure user authentication</li>
                                <li>✓ Role-based access control</li>
                                <li>✓ Clean and intuitive interface</li>
                                <li>✓ Fast and reliable performance</li>
                            </ul>
                            <Link to="/register" className="btn-about">
                                Start Managing Products
                            </Link>
                        </div>
                        <div className="about-image">
                            <div className="about-image-placeholder">
                                <span className="placeholder-icon">📦</span>
                                <p>Product Management Dashboard</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="cta-section">
                <div className="container">
                    <div className="cta-content">
                        <h2 className="cta-title">Ready to Get Started?</h2>
                        <p className="cta-subtitle">Join thousands of users managing their products efficiently</p>
                        <div className="cta-buttons">
                            <Link to="/register" className="btn-cta btn-cta-primary">
                                Create Free Account
                            </Link>
                            <Link to="/login" className="btn-cta btn-cta-secondary">
                                Sign In
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            <footer className="footer">
                <div className="container">
                    <div className="footer-content">
                        <div className="footer-section">
                            <div className="footer-brand">
                                <span className="brand-icon">📦</span>
                                ProductHub
                            </div>
                            <p className="footer-description">
                                The modern way to manage your products. Simple, secure, and efficient.
                            </p>
                            <div className="social-links">
                                <a href="#" className="social-link" aria-label="Twitter">🐦</a>
                                <a href="#" className="social-link" aria-label="LinkedIn">💼</a>
                                <a href="#" className="social-link" aria-label="GitHub">💻</a>
                            </div>
                        </div>
                        <div className="footer-section">
                            <h4 className="footer-heading">Product</h4>
                            <ul className="footer-links">
                                <li><a href="#features">Features</a></li>
                                <li><a href="#about">About</a></li>
                                <li><Link to="/register">Sign Up</Link></li>
                                <li><Link to="/login">Login</Link></li>
                            </ul>
                        </div>
                        <div className="footer-section">
                            <h4 className="footer-heading">Company</h4>
                            <ul className="footer-links">
                                <li><a href="#about">About Us</a></li>
                                <li><a href="#contact">Contact</a></li>
                                <li><a href="#careers">Careers</a></li>
                                <li><a href="#blog">Blog</a></li>
                            </ul>
                        </div>
                        <div className="footer-section">
                            <h4 className="footer-heading">Support</h4>
                            <ul className="footer-links">
                                <li><a href="#help">Help Center</a></li>
                                <li><a href="#docs">Documentation</a></li>
                                <li><a href="#api">API Reference</a></li>
                                <li><a href="#status">Status</a></li>
                            </ul>
                        </div>
                        <div className="footer-section">
                            <h4 className="footer-heading">Legal</h4>
                            <ul className="footer-links">
                                <li><a href="#privacy">Privacy Policy</a></li>
                                <li><a href="#terms">Terms of Service</a></li>
                                <li><a href="#security">Security</a></li>
                                <li><a href="#cookies">Cookie Policy</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="footer-bottom">
                        <p className="footer-copyright">
                            © {currentYear} ProductHub. All rights reserved.
                        </p>
                        <p className="footer-made">
                            Made with ❤️ for product managers everywhere
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default LandingPage;
