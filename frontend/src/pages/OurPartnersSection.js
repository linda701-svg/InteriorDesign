import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { motion } from 'framer-motion';

const partners = [
    { id: 1, logo: 'https://kits.roxthemes.com/archevo/wp-content/uploads/2025/09/logoipsum-white-6-min.png' },
    { id: 2, logo: 'https://kits.roxthemes.com/archevo/wp-content/uploads/2025/09/logoipsum-white-5-min.png' },
    { id: 3, logo: 'https://kits.roxthemes.com/archevo/wp-content/uploads/2025/09/logoipsum-white-4-min.png' },
    { id: 4, logo: 'https://kits.roxthemes.com/archevo/wp-content/uploads/2025/09/logoipsum-white-3-min.png' },
    { id: 5, logo: 'https://kits.roxthemes.com/archevo/wp-content/uploads/2025/09/logoipsum-white-2-min.png' },
    { id: 6, logo: 'https://kits.roxthemes.com/archevo/wp-content/uploads/2025/09/logoipsum-white1-min.png' },
];

const OurPartnersSection = () => {
    return (
        <section className="section-padding bg-dark text-white">
            <Container>
                <Row className="align-items-center">
                    <Col lg={4}>
                        <div className="d-flex align-items-center gap-2 mb-3">
                            <span className="text-orange small">🏠</span>
                            <span className="text-uppercase tracking-widest small fw-bold text-white-50">Our Partners</span>
                        </div>
                        <h2 className="fw-bold mb-4">Our Partners</h2>
                        <p className="text-white-50">Dummy text of the printing and typesetting industry printing.</p>
                    </Col>
                    <Col lg={8}>
                        <Row className="justify-content-center align-items-center g-4">
                            {partners.map((partner, index) => (
                                <Col key={partner.id} xs={6} md={3}>
                                    <motion.div
                                        initial={{ opacity: 0, y: 30 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.5, delay: index * 0.1 }}
                                        className="d-flex justify-content-center align-items-center"
                                    >
                                        <img src={partner.logo} alt={`Partner ${partner.id}`} className="img-fluid" style={{ maxHeight: '40px', filter: 'brightness(0) invert(1)', opacity: 0.6, transition: 'all 0.3s' }} onMouseOver={e => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.filter = 'none'; }} onMouseOut={e => { e.currentTarget.style.opacity = '0.6'; e.currentTarget.style.filter = 'brightness(0) invert(1)'; }} />
                                    </motion.div>
                                </Col>
                            ))}
                        </Row>
                    </Col>
                </Row>
            </Container>
        </section>
    );
};

export default OurPartnersSection;
