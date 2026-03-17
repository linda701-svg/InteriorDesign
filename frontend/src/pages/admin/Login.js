import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Login = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login, register } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!isLogin && password !== confirmPassword) {
            return setError('Passwords do not match');
        }

        setLoading(true);
        try {
            if (isLogin) {
                await login(email, password);
            } else {
                await register(email, password);
            }
            navigate('/admin/dashboard', { replace: true });
        } catch (err) {
            setError(err.response?.data?.message || `Failed to ${isLogin ? 'login' : 'register'}. Please check your details.`);
        } finally {
            setLoading(false);
        }
    };

    const toggleMode = () => {
        setIsLogin(!isLogin);
        setError('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
    };

    return (
        <section className="vh-100 d-flex align-items-center" style={{ backgroundColor: '#f8f9fa' }}>
            <Container>
                <Row className="justify-content-center">
                    <Col md={5}>
                        <Card className="border-0 shadow-lg rounded-0 overflow-hidden">
                            <div className="bg-dark text-white p-5 text-center position-relative overflow-hidden">
                                <div className="position-relative z-index-1">
                                    <h3 className="fw-bold mb-0">ARCHEVO<span className="text-warning">.</span></h3>
                                    <p className="small text-white-50 mb-0 mt-2">
                                        {isLogin ? 'Admin Control Panel' : 'Join Administrative Team'}
                                    </p>
                                </div>
                            </div>
                            <Card.Body className="p-5">
                                {error && <Alert variant="danger" className="rounded-0 small">{error}</Alert>}
                                <Form onSubmit={handleSubmit}>
                                    <Form.Group className="mb-3">
                                        <Form.Label className="small fw-bold text-uppercase text-muted">Email Address</Form.Label>
                                        <Form.Control
                                            type="email"
                                            placeholder="name@company.com"
                                            className="rounded-0 p-3 shadow-none border-secondary-subtle"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            required
                                        />
                                    </Form.Group>
                                    <Form.Group className="mb-4">
                                        <Form.Label className="small fw-bold text-uppercase text-muted">Password</Form.Label>
                                        <Form.Control
                                            type="password"
                                            placeholder="••••••••"
                                            className="rounded-0 p-3 shadow-none border-secondary-subtle"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            required
                                            minLength={6}
                                        />
                                    </Form.Group>

                                    {!isLogin && (
                                        <Form.Group className="mb-4">
                                            <Form.Label className="small fw-bold text-uppercase text-muted">Confirm Password</Form.Label>
                                            <Form.Control
                                                type="password"
                                                placeholder="••••••••"
                                                className="rounded-0 p-3 shadow-none border-secondary-subtle"
                                                value={confirmPassword}
                                                onChange={(e) => setConfirmPassword(e.target.value)}
                                                required
                                                minLength={6}
                                            />
                                        </Form.Group>
                                    )}

                                    <Button
                                        variant="dark"
                                        type="submit"
                                        className="w-100 py-3 fw-bold rounded-0 text-uppercase tracking-wider"
                                        disabled={loading}
                                    >
                                        {loading ? (isLogin ? 'Logging in...' : 'Creating Account...') : (isLogin ? 'Login' : 'Create Account')}
                                    </Button>
                                </Form>

                                <div className="text-center mt-4">
                                    <p className="small text-muted mb-0">
                                        {isLogin ? "Don't have an account? " : "Already have an account? "}
                                        <button
                                            onClick={toggleMode}
                                            className="btn btn-link p-0 text-dark fw-bold text-decoration-none small text-uppercase"
                                        >
                                            {isLogin ? 'Sign Up' : 'Login'}
                                        </button>
                                    </p>
                                </div>
                            </Card.Body>
                        </Card>
                        <div className="text-center mt-4">
                            <a href="/" className="text-muted small text-decoration-none hover-underline">
                                <i className="bi bi-arrow-left me-1"></i> Return to Home
                            </a>
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
    );
};

export default Login;

