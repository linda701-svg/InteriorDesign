import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const features = [
    { title: 'Inventive & Functional Design', icon: '🏗️', description: 'Functional architecture crafted with inventive solutions.' },
    { title: 'Cutting-Edge Architecture', icon: '📐', description: 'Pushing the boundaries of design with innovative solutions.' },
    { title: 'Modern & Inspiring Architecture', icon: '🏛️', description: 'Blending innovation and elegance to create spaces that inspire.' },
    { title: 'Reimagining Spaces with Innovation', icon: '💡', description: 'Transforming spaces through creative and forward-thinking design.' },
];

const FeaturesSection = () => {
    return (
        <section className="section-padding bg-dark text-white">
            <Container>
                <div className="d-flex justify-content-between align-items-end mb-5">
                    <div style={{ maxWidth: '600px' }}>
                        <div className="d-flex align-items-center gap-2 mb-3">
                            <span className="text-orange small">🏠</span>
                            <span className="text-secondary text-uppercase tracking-widest small fw-bold">Features Project</span>
                        </div>
                        <h2 className="fw-bold mb-3 display-6">Our Commitment To Outstanding Design.</h2>
                    </div>
                    <Button as={Link} to="/contact" variant="primary" className="rounded-0 px-4">Learn More <span className="ms-1">→</span></Button>
                </div>

                <Row className="gy-4 align-items-center">
                    <Col lg={6}>
                        <Row className="gy-4">
                            {features.map((feature, index) => (
                                <Col key={index} md={6}>
                                    <motion.div
                                        whileHover={{ y: -10 }}
                                        className="p-4 bg-black border border-secondary border-opacity-25 h-100 transition-all"
                                    >
                                        <div className="fs-1 text-orange mb-3">{feature.icon}</div>
                                        <h6 className="fw-bold mb-3">{feature.title}</h6>
                                        <p className="small text-white-50 mb-0">{feature.description}</p>
                                    </motion.div>
                                </Col>
                            ))}
                        </Row>
                    </Col>
                    <Col lg={6}>
                        <div className="ps-lg-5">
                            <img
                                src="https://kits.roxthemes.com/archevo/wp-content/uploads/2025/08/img-features.jpg"
                                alt="Features"
                                className="img-fluid shadow-lg"
                            />
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
    );
};

export default FeaturesSection;
