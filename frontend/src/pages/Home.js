import React, { useState, useEffect } from 'react';
import '../Style/HeroSection.css';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import ServicesSection from './ServicesSection';
import RecentProjectsSection from './RecentProjectsSection';
import TestimonialSection from './TestimonialSection';
import TeamSection from './TeamSection';
import PricingSection from './PricingSection';
import FAQSection from './FAQSection';
import BlogSection from './BlogSection';
import ContactUs from '../components/layout/ContactUs';
import { FaHouse, FaArrowRight, FaBuilding, FaUsers, FaPlay } from 'react-icons/fa6';
import { TbStack2, TbVectorTriangle } from 'react-icons/tb';
import { FaUniversity } from 'react-icons/fa';
import { MdApartment, MdArrowOutward } from 'react-icons/md';

const Home = () => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const heroImages = [
        "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2000&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=2000&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1616137466211-f939a420be84?q=80&w=2000&auto=format&fit=crop"
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
        }, 5000); // Change image every 5 seconds
        return () => clearInterval(interval);
    }, [heroImages.length]);

    return (
        <div>
            {/* Hero Section */}
            <section className="hero-section">
                <Container>
                    <Row className="align-items-start">
                        <Col lg={7}>
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8 }}
                            >
                                <div className="hero-subtitle-wrapper" style={{ marginTop: '80px' }}>
                                    <FaHouse className="hero-subtitle-icon" />
                                    <span className="hero-subtitle-text">Crafting architecture that shapes the future.</span>
                                </div>
                                <h1 className="hero-main-title">CRAFTING SPACES <br /> WITH PURPOSE</h1>
                            </motion.div>
                        </Col>
                        <Col lg={5}>
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.2 }}
                            >
                                <p className="hero-description">
                                    We design innovative spaces that blend functionality with timeless elegance,
                                    creating environments where people truly belong. "Creating architecture that inspires generations."
                                </p>
                                <div className="hero-buttons-top">
                                    <Link to="/contact" className="btn-contact">
                                        Contact us <MdArrowOutward />
                                    </Link>
                                    <div className="watch-process-wrapper d-none d-lg-flex">
                                        <div className="play-button-icon">
                                            <FaPlay />
                                        </div>
                                        <span className="watch-process-text">Watch Our Process</span>
                                    </div>
                                </div>
                            </motion.div>
                        </Col>
                    </Row>

                    <Row>
                        <Col xs={12}>
                            <motion.div
                                className="hero-image-container"
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 1, delay: 0.4 }}
                            >
                                <div className="hero-image-slider" style={{ position: 'relative', overflow: 'hidden', borderRadius: '20px' }}>
                                    {heroImages.map((img, index) => (
                                        <motion.img
                                            key={index}
                                            src={img}
                                            className="hero-image-main"
                                            alt={`Luxury Interior ${index + 1}`}
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: currentImageIndex === index ? 1 : 0 }}
                                            transition={{ duration: 1.5 }}
                                            style={{
                                                position: index === 0 ? 'relative' : 'absolute',
                                                top: 0,
                                                left: 0,
                                                width: '100%',
                                                display: 'block'
                                            }}
                                        />
                                    ))}
                                </div>
                                <div className="hero-overlay-card">
                                    <p className="hero-overlay-text">
                                        From concept to completion, our team transforms bold visions into iconic structures
                                        that stand the test of time.
                                    </p>
                                    <h6 className="hero-overlay-title">MINIMALIST INTERIOR MODELS</h6>
                                    <span className="hero-overlay-tag">MODELS</span>

                                    {/* Slider dots (dynamic) */}
                                    <div className="d-flex justify-content-center gap-2 mt-3">
                                        {heroImages.map((_, index) => (
                                            <div
                                                key={index}
                                                className="bg-white rounded-circle"
                                                style={{
                                                    width: '6px',
                                                    height: '6px',
                                                    opacity: currentImageIndex === index ? 1 : 0.3,
                                                    transition: 'opacity 0.3s ease'
                                                }}
                                            ></div>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        </Col>
                    </Row>

                    {/* CTA Buttons Strip (Moved inside Hero Container context for layout) */}
                    <div className="hero-bottom-strip d-flex flex-column flex-md-row">
                        <button className="hero-bottom-btn">Explore Designs</button>
                        <button className="hero-bottom-btn">View Services</button>
                        <button className="hero-bottom-btn">Request Estimate</button>
                    </div>
                </Container>
            </section>

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


            {/* Services Section */}
            <ServicesSection />

            <section className="feature-project-section">
                <Container fluid className="p-0">
                    <div className="feature-layout-grid">
                        <div className="feature-left-panel">
                            <div className="feature-header">
                                <div className="feature-subtitle">
                                    <FaHouse /> Features Project
                                </div>
                                <h2 className="feature-title">Our Commitment to <br />Outstanding Design.</h2>
                                <a href="/projects" className="feature-cta-btn">
                                    Learn More <span className="btn-arrow-icon"><FaArrowRight /></span>
                                </a>
                            </div>

                            <div className="feature-grid-cards">
                                {/* Card 1 */}
                                <div className="feature-card-item" data-aos="fade-left" data-aos-delay="200">
                                    <div className="feature-card-icon">
                                        <TbStack2 />
                                    </div>
                                    <h4 className="feature-card-title">Inventive & Functional Design</h4>
                                    <p className="feature-card-desc">Functional architecture crafted with inventive solutions.</p>
                                </div>

                                {/* Card 2 */}
                                <div className="feature-card-item" data-aos="fade-right" data-aos-delay="200">
                                    <div className="feature-card-icon">
                                        <MdApartment />
                                    </div>
                                    <h4 className="feature-card-title">Cutting-Edge Architecture</h4>
                                    <p className="feature-card-desc">Pushing the boundaries of design with innovative solutions.</p>
                                </div>

                                {/* Card 3 */}
                                <div className="feature-card-item" data-aos="fade-left" data-aos-delay="200">
                                    <div className="feature-card-icon">
                                        <FaUniversity />
                                    </div>
                                    <h4 className="feature-card-title">Modern & Inspiring Architecture</h4>
                                    <p className="feature-card-desc">Blending innovation and elegance to create spaces that inspire.</p>
                                </div>

                                {/* Card 4 */}
                                <div className="feature-card-item" data-aos="fade-right" data-aos-delay="200">
                                    <div className="feature-card-icon">
                                        <TbVectorTriangle />
                                    </div>
                                    <h4 className="feature-card-title">Reimagining Spaces with Innovation</h4>
                                    <p className="feature-card-desc">Transforming spaces through creative and forward-thinking design.</p>
                                </div>
                            </div>
                        </div>
                        <div className="feature-right-panel">
                            {/* Background Image handled in CSS */}
                        </div>
                    </div>
                </Container>
            </section>


            {/* Recent Projects Section */}
            <RecentProjectsSection />

            {/* Testimonial Section */}
            <TestimonialSection />

            {/* Team Section */}
            <TeamSection />

            {/* Pricing Section */}
            <PricingSection />

            {/* FAQ Section */}
            <FAQSection />

            {/* Blog Section */}
            <BlogSection />

            <ContactUs />
        </div>
    );
};

export default Home;
