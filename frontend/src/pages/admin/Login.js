import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const ADMIN_NAME = 'Admin';
const ADMIN_EMAIL = 'admin@archevo.com';
const ADMIN_PASSWORD = 'Admin@123';

const Login = () => {
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        // Simulate a brief loading state then check password
        setTimeout(() => {
            if (password === ADMIN_PASSWORD) {
                // Store a simple auth flag so protected routes know user is logged in
                localStorage.setItem('adminLoggedIn', 'true');
                localStorage.setItem('adminName', ADMIN_NAME);
                navigate('/admin/dashboard', { replace: true });
            } else {
                setError('Incorrect password. Please try again.');
            }
            setLoading(false);
        }, 600);
    };

    return (
        <section className="vh-100 d-flex align-items-center" style={{ backgroundColor: '#f8f9fa' }}>
            <Container>
                <Row className="justify-content-center">
                    <Col md={5}>
                        <Card className="border-0 shadow-lg rounded-0 overflow-hidden">

                            {/* Card Header */}
                            <div className="bg-dark text-white p-5 text-center position-relative overflow-hidden">
                                <div className="position-relative">
                                    <h3 className="fw-bold mb-0">
                                        ARCHEVO<span className="text-warning">.</span>
                                    </h3>
                                    <p className="small text-white-50 mb-0 mt-1">Admin Control Panel</p>
                                </div>
                            </div>

                            <Card.Body className="p-5">

                                {/* Admin Avatar + Name */}
                                <div className="text-center mb-4">
                                    <div
                                        className="rounded-circle d-inline-flex align-items-center justify-content-center bg-dark text-white mb-3"
                                        style={{ width: 62, height: 62, fontSize: 26 }}
                                    >
                                        <i className="bi bi-person-fill" />
                                    </div>
                                    <h5 className="fw-bold mb-0">{ADMIN_NAME}</h5>
                                    <p className="text-muted small mb-0">{ADMIN_EMAIL}</p>
                                </div>

                                {error && (
                                    <Alert variant="danger" className="rounded-0 small">
                                        {error}
                                    </Alert>
                                )}

                                <Form onSubmit={handleSubmit}>
                                    <Form.Group className="mb-4">
                                        <Form.Label className="small fw-bold text-uppercase text-muted">
                                            Password
                                        </Form.Label>
                                        <Form.Control
                                            type="password"
                                            placeholder="••••••••"
                                            className="rounded-0 p-3 shadow-none border-secondary-subtle"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            required
                                            minLength={6}
                                            autoFocus
                                        />
                                    </Form.Group>

                                    <Button
                                        variant="dark"
                                        type="submit"
                                        className="w-100 py-3 fw-bold rounded-0 text-uppercase"
                                        disabled={loading}
                                    >
                                        {loading ? 'Logging in...' : 'Login to Dashboard'}
                                    </Button>
                                </Form>
                            </Card.Body>
                        </Card>

                        <div className="text-center mt-4">
                            <a href="/" className="text-muted small text-decoration-none">
                                <i className="bi bi-arrow-left me-1" /> Return to Home
                            </a>
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
    );
};

export default Login;
