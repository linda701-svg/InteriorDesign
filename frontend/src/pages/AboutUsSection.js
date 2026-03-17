import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const AboutUsSection = () => {
    return (
        <section className="section-padding bg-white">
            <Container>
                <Row className="align-items-center">
                    <Col lg={6} className="position-relative mb-5 mb-lg-0">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            className="pe-lg-5"
                        >
                            <div className="position-relative">
                                <img
                                    src="https://kits.roxthemes.com/archevo/wp-content/uploads/2025/08/img-about-2.jpg"
                                    alt="About Us 1"
                                    className="img-fluid w-75 shadow-lg"
                                />
                                <div className="position-absolute bottom-0 end-0 w-75" style={{ transform: 'translate(20px, 40px)' }}>
                                    <img
                                        src="https://kits.roxthemes.com/archevo/wp-content/uploads/2025/08/img-about-1.jpg"
                                        alt="About Us 2"
                                        className="img-fluid border border-5 border-white shadow-lg"
                                    />
                                </div>
                                <div className="position-absolute top-50 start-0 translate-middle-y bg-dark p-4 shadow-lg text-white border-start border-5 border-orange" style={{ transform: 'translateX(-20px)', width: '200px' }}>
                                    <h2 className="fw-bold mb-0 text-orange">19+</h2>
                                    <p className="small mb-3 text-white-50">Years Of Experiences</p>
                                    <Button as={Link} to="/about" variant="link" className="text-white p-0 text-decoration-none small text-uppercase fw-bold">Read More <span className="ms-1 text-orange">→</span></Button>
                                </div>
                            </div>
                        </motion.div>
                    </Col>
                    <Col lg={6}>
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <div className="d-flex align-items-center gap-2 mb-3">
                                <span className="text-orange small">🏠</span>
                                <span className="text-secondary text-uppercase tracking-widest small fw-bold">Who We Are</span>
                            </div>
                            <h2 className="fw-bold mb-4 display-6">We combine expertise, innovation, and dedication to deliver results that matter.</h2>

                            <Row className="mb-5">
                                <Col md={6} className="mb-4 mb-md-0">
                                    <div className="border-start border-3 border-orange ps-3">
                                        <h5 className="fw-bold mb-3">Our Vision</h5>
                                        <p className="text-muted small">Our vision is to shape spaces that inspire, blending innovation with functionality to create timeless architecture.</p>
                                    </div>
                                </Col>
                                <Col md={6}>
                                    <div className="border-start border-3 border-orange ps-3">
                                        <h5 className="fw-bold mb-3">Our Mission</h5>
                                        <p className="text-muted small">Our mission is to design meaningful spaces that combine creativity, functionality, and sustainability to improve the way people live and work.</p>
                                    </div>
                                </Col>
                            </Row>

                            <Row className="gx-3">
                                <Col xs={6}>
                                    <div className="bg-dark text-white p-4 text-center">
                                        <h6 className="small text-white-50 mb-3 text-uppercase">Across the Globe</h6>
                                        <div className="fs-1 text-orange mb-2">🏢</div>
                                        <h3 className="fw-bold mb-0">90 +</h3>
                                        <p className="small text-white-50 mb-0">Office Worldwide</p>
                                    </div>
                                </Col>
                                <Col xs={6}>
                                    <div className="bg-dark text-white p-4 text-center">
                                        <h6 className="small text-white-50 mb-3 text-uppercase">Regional Insight</h6>
                                        <div className="fs-1 text-orange mb-2">🧑‍💼</div>
                                        <h3 className="fw-bold mb-0">1,550 +</h3>
                                        <p className="small text-white-50 mb-0">Employees</p>
                                    </div>
                                </Col>
                            </Row>
                        </motion.div>
                    </Col>
                </Row>
            </Container>
        </section>
    );
};

export default AboutUsSection;