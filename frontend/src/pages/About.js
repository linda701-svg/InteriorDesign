import React from 'react';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaHouse, FaArrowRight, FaBuilding, FaUsers } from 'react-icons/fa6';
import ContactUs from '../components/layout/ContactUs';
import TestimonialSection from '../pages/TestimonialSection';
import ServicesSection from '../pages/ServicesSection';
import TeamSection from '../pages/TeamSection';
import '../Style/WhoWeAre.css';
import AOS from 'aos';
import 'aos/dist/aos.css';
import '../Style/Contact.css';

const About = () => {
    return (
        <div className="about-page">
            {/* Hero Section */}
            <section className="contact-hero">
                <Container>
                    <h1 style={{ color: 'white',marginTop: '65px' }}>About Us</h1>
                    <div className="breadcrumb-item">
                        <a href="/">Home</a>
                        <span><FaArrowRight size={12} /></span>
                        <span>About Us</span>
                    </div>
                </Container>
            </section>


            {/* Who We Are Section */}
            <section className="who-we-are-section">
                <Container>
                    <Row className="gy-4">
                        {/* Left Column: Images + Stats Card */}
                        <Col lg={5}>
                            <div className="who-we-are-images-column">
                                <img
                                    src="/images/section1.jpg"
                                    alt="Who We Are Team"
                                    className="who-we-are-main-image"
                                />
                                <div className="who-we-are-stats-card" data-aos="fade-left" data-aos-delay="200">
                                    <div className="who-we-are-stats-number">19+</div>
                                    <div className="who-we-are-stats-label">Years Of Experiences</div>
                                    <Button as={Link} to="/contact" className="who-we-are-read-more-btn">
                                        Read More
                                        <div className="bg-white rounded-circle d-flex align-items-center justify-content-center" style={{ width: '24px', height: '24px' }}>
                                            <FaArrowRight style={{ color: '#FFB23F', fontSize: '12px' }} />
                                        </div>
                                    </Button>
                                </div>
                            </div>
                        </Col>

                        {/* Right Column: Content + Stats */}
                        <Col lg={7}>
                            <div className="who-we-are-content-column" >
                                <div className="who-we-are-label-wrapper">
                                    <FaHouse className="who-we-are-label-icon" />
                                    <span>Who We Are</span>
                                </div>
                                <h2 className="who-we-are-title">
                                    We combine expertise, innovation, and dedication to deliver results that matter.
                                </h2>

                                <Row className="gy-4">
                                    <Col md={6}>
                                        <img
                                            src="/images/architucture-hero1.webp"
                                            alt="Architecture Design"
                                            className="who-we-are-center-image" data-aos="fade-up" data-aos-delay="200"
                                        />
                                    </Col>
                                    <Col md={6}>
                                        <div className="who-we-are-cards-wrapper">
                                            <div className="who-we-are-card">
                                                <h4>Our Vision</h4>
                                                <p>
                                                    Our vision is to shape spaces that inspire, blending innovation with functionality to create timeless architecture.
                                                </p>
                                            </div>
                                            <div className="who-we-are-card">
                                                <h4>Our Mission</h4>
                                                <p>
                                                    Our mission is to design meaningful spaces that combine creativity, functionality, and sustainability to improve the way people live and work.
                                                </p>
                                            </div>
                                        </div>
                                    </Col>
                                </Row>

                                <div className="who-we-are-bottom-stats">
                                    <div className="who-we-are-stat-card">
                                        <div className="who-we-are-stat-card-label">Across the Globe</div>
                                        <FaBuilding className="who-we-are-stat-icon" />
                                        <div className="who-we-are-stat-number">90+</div>
                                        <div className="who-we-are-stat-text">Office Worldwide</div>
                                    </div>
                                    <div className="who-we-are-stat-card">
                                        <div className="who-we-are-stat-card-label">Regional Insight</div>
                                        <FaUsers className="who-we-are-stat-icon" />
                                        <div className="who-we-are-stat-number">1,550+</div>
                                        <div className="who-we-are-stat-text">Employees</div>
                                    </div>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>

            {/* Our Partners Section */}
            <section className="our-partners-section" style={{
                backgroundImage: 'url("/images/modern-villa-interior-with-sparkle-floor-2024-10-18-09-40-13-utc-scaled-1.webp")',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundBlendMode: 'overlay',
                padding: '80px 0',
                position: 'relative'
            }}>
                <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    backgroundColor: 'rgba(12, 12, 12, 0.85)',
                    zIndex: 1
                }}></div>
                <Container style={{ position: 'relative', zIndex: 2 }}>
                    <Row className="align-items-center gy-4">
                        <Col lg={4}>
                            <h3 style={{
                                fontSize: '3rem',
                                fontWeight: '700',
                                marginBottom: '10px',
                                color: 'white'
                            }}>Our Partners</h3>
                            <p style={{
                                fontSize: '1rem',
                                color: 'rgba(255, 255, 255, 0.7)',
                                marginBottom: 0,
                                fontWeight: '400'
                            }}>Dummy text of the printing and typesetting industry printing.</p>
                        </Col>
                        <Col lg={8}>
                            <Row className="gx-4 gy-4 align-items-center justify-content-center opacity-75">
                                <Col xs={6} md={3}><img src="https://kits.roxthemes.com/archevo/wp-content/uploads/2025/09/logoipsum-white-3-min.png" alt="Partner 1" className="img-fluid grayscale-hover" /></Col>
                                <Col xs={6} md={3}><img src="https://kits.roxthemes.com/archevo/wp-content/uploads/2025/09/logoipsum-white-4-min.png" alt="Partner 2" className="img-fluid grayscale-hover" /></Col>
                                <Col xs={6} md={3}><img src="https://kits.roxthemes.com/archevo/wp-content/uploads/2025/09/logoipsum-white-5-min.png" alt="Partner 3" className="img-fluid grayscale-hover" /></Col>
                                <Col xs={6} md={3}><img src="https://kits.roxthemes.com/archevo/wp-content/uploads/2025/09/logoipsum-white-6-min.png" alt="Partner 4" className="img-fluid grayscale-hover" /></Col>
                            </Row>
                        </Col>
                    </Row>
                </Container>
            </section>

            {/* Our Team Section */}
            <TeamSection />

            {/* Specialization Section */}
            <ServicesSection />
            {/* Testimonial Section */}
            <TestimonialSection />



            {/* Contact Us Section */}
            <ContactUs />
        </div>
    );
};

export default About;
