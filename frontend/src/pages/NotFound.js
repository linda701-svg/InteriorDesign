import React from 'react';
import { Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const NotFound = () => {
    return (
        <section className="vh-100 d-flex align-items-center text-center">
            <Container>
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    <h1 className="display-1 fw-bold tracking-tighter mb-0" style={{ fontSize: '15rem', opacity: 0.1 }}>404</h1>
                    <div className="mt-n5 position-relative">
                        <h2 className="fw-bold mb-4">Page Not Found</h2>
                        <p className="text-muted mb-5">The space you are looking for doesn't exist or has been moved.</p>
                        <Button as={Link} to="/" variant="primary" className="rounded-0 px-5 py-3 fw-bold">Return to Home</Button>
                    </div>
                </motion.div>
            </Container>
        </section>
    );
};

export default NotFound;
