import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaHome, FaSun, FaCheckDouble } from 'react-icons/fa';
import '../Style/PricingSection.css';

const pricingPlans = [
    {
        id: 1,
        name: 'Starter',
        tagline: 'Indivijureal',
        price: '65',
        features: [
            'Conceptual design sketches',
            'Floor plan layouts',
            'Basic 2D drawings',
            'Initial consultation',
            'Initial consultation',
            'Cost-effective solution'
        ]
    },
    {
        id: 2,
        name: 'Premium',
        tagline: 'Business',
        price: '85',
        features: [
            'Detailed architec drawings',
            '3D visualizations',
            'Interior space planning',
            'Material & finish suggestions',
            'Material & finish suggestions',
            'Project cost estimation'
        ]
    },
    {
        id: 3,
        name: 'Ultimate',
        tagline: 'Enterprise',
        price: '99',
        features: [
            'Architec & interior design',
            'Advanced 3D renders & walkthroughs',
            'Structural & engineering coordination',
            'Project management support'
        ]
    }
];

const PricingSection = () => {
    return (
        <section className="pricing-section section-padding">
            <Container>
                <Row className="text-center mb-5">
                    <Col lg={8} className="mx-auto">
                        <div className="pricing-header-top mb-3">
                            <FaHome className="pricing-home-icon" />
                            <span className="pricing-subtitle ms-2">Choose Your Perfect Plan</span>
                        </div>
                        <h2 className="pricing-main-title">Pricing Plans For Everyone</h2>
                        <p className="pricing-main-desc">Our pricing is designed to be clear and tailored to your project needs. From concept to completion, we offer flexible packages that suit different budgets while ensuring high-quality design and execution.</p>
                    </Col>
                </Row>
                <Row className="gy-4">
                    {pricingPlans.map((plan) => (
                        <Col key={plan.id} lg={4} md={6}>
                            <motion.div
                                whileHover={{ y: -10 }}
                                className="pricing-card"
                            >
                                <div className="pricing-card-header">
                                    <h3 className="plan-name">{plan.name}</h3>
                                    <p className="plan-tagline">{plan.tagline}</p>
                                    <h2 className="plan-price">${plan.price} <span className="plan-duration">/Month</span></h2>
                                </div>

                                <div className="pricing-separator">
                                    <div className="separator-line"></div>
                                    <FaSun className="separator-icon" />
                                    <div className="separator-line"></div>
                                </div>

                                <div className="pricing-features-container">
                                    <p className="features-intro">
                                        {plan.id === 1 && "Perfect for small projects and initial concepts."}
                                        {plan.id === 2 && "Ideal for homeowners and medium-scale projects."}
                                        {plan.id === 3 && "Comprehensive solution for large-scale or luxury projects."}
                                    </p>
                                    <ul className="features-list">
                                        {plan.features.map((feature, idx) => (
                                            <li key={idx} className="feature-item">
                                                <FaCheckDouble className="check-icon" />
                                                <span>{feature}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <Button as={Link} to="/contact" className="pricing-choose-btn">
                                    Choose Plan
                                </Button>
                            </motion.div>
                        </Col>
                    ))}
                </Row>
            </Container>
        </section>
    );
};

export default PricingSection;
