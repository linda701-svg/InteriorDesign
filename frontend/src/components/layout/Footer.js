import React, { useState, useEffect } from 'react';
import { Container, Row, Col, FormControl, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import {
    FaFacebookF,
    FaXTwitter,
    FaLinkedinIn,
    FaInstagram,
    FaChevronRight,
    FaPhone,
    FaEnvelope,
    FaGlobe,
    FaArrowUp
} from 'react-icons/fa6';
import { IoLocationSharp } from 'react-icons/io5';
import { PiPhoneCallFill } from 'react-icons/pi';
import { IoPaperPlaneOutline } from 'react-icons/io5';
import '../../Style/Footer.css';
import '../../Style/Navbar.css';

const Footer = () => {
    const [showBackToTop, setShowBackToTop] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    useEffect(() => {
        const handleScroll = () => {
            const scrolled = window.scrollY > 50;
            setShowBackToTop(window.scrollY > 300);
            setIsScrolled(scrolled);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);


    return (
        <footer className="footer-main text-white pt-5 pb-0 mt-auto">
            <Container className="pb-5">
                <Row className="gy-5">
                    {/* Brand & Description */}
                    <Col lg={3} md={6}>
                        <div className="d-flex align-items-center gap-2 mb-4">

                            <div className="logo-icon">
                                <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                                    <path d="M12 2L4 18h16L12 2z" />
                                    <circle cx="12" cy="13" r="3" fill="white" />
                                    <path d="M12 2L4 18h16L12 2z" fill="none" stroke="currentColor" strokeWidth="2" />
                                </svg>
                            </div>
                            <h2 className="footer-brand-title fw-bold mb-0">
                                <span className="brand-arch">Arch</span>
                                <span className="brand-evo">Evo</span>
                            </h2>

                        </div>
                        <p className="footer-description mb-4 text-white">
                            Dedicated to crafting functional, aesthetic, and sustainable architectural solutions for every vision.
                        </p>
                        <div className="d-flex gap-3">
                            {[
                                { icon: <FaFacebookF />, link: '#' },
                                { icon: <FaXTwitter />, link: '#' },
                                { icon: <FaLinkedinIn />, link: '#' },
                                { icon: <FaInstagram />, link: '#' }
                            ].map((social, idx) => (
                                <Link key={idx} to={social.link} className="footer-social-link transition">
                                    {social.icon}
                                </Link>
                            ))}
                        </div>
                    </Col>

                    {/* Quick Link */}
                    <Col lg={2} md={6}>
                        <h4 className="footer-section-title footer-title-ivory fw-bold mb-4">Quick Link</h4>
                       <ul className="list-unstyled">
    <li className="mb-3 d-flex align-items-center gap-2">
        <FaChevronRight className="footer-link-marker" />
        <Link to="/" className="footer-nav-link text-white text-decoration-none transition opacity-75">
            Home
        </Link>
    </li>

    <li className="mb-3 d-flex align-items-center gap-2">
        <FaChevronRight className="footer-link-marker" />
        <Link to="/about" className="footer-nav-link text-white text-decoration-none transition opacity-75">
            About Us
        </Link>
    </li>

    <li className="mb-3 d-flex align-items-center gap-2">
        <FaChevronRight className="footer-link-marker" />
        <Link to="/services" className="footer-nav-link text-white text-decoration-none transition opacity-75">
            Services
        </Link>
    </li>

    <li className="mb-3 d-flex align-items-center gap-2">
        <FaChevronRight className="footer-link-marker" />
        <Link to="/admin/login" className="footer-nav-link text-white text-decoration-none transition opacity-75">
            Login
        </Link>
    </li>

    <li className="mb-3 d-flex align-items-center gap-2">
        <FaChevronRight className="footer-link-marker" />
        <Link to="/contact" className="footer-nav-link text-white text-decoration-none transition opacity-75">
            Contact
        </Link>
    </li>
</ul>

                    </Col>

                    {/* Contact Us */}
                    <Col lg={3} md={6}>
                        <h4 className="footer-section-title fw-bold mb-4">Contact Us</h4>
                        <ul className="list-unstyled">
                            <li className="mb-3 d-flex align-items-start gap-3">
                                <IoLocationSharp className="footer-contact-icon footer-contact-icon-lg mt-1" />
                                <span className="footer-contact-text text-white">Kazipur 6710, Sirajganj, DB</span>
                            </li>
                            <li className="mb-3 d-flex align-items-center gap-3">
                                <PiPhoneCallFill className="footer-contact-icon footer-contact-icon-lg" />
                                <span className="footer-contact-text text-white">+(234) 567 8912</span>
                            </li>
                            <li className="mb-3 d-flex align-items-center gap-3">
                                <FaPhone className="footer-contact-icon footer-contact-icon-sm" />
                                <span className="footer-contact-text text-white">789 456 0123</span>
                            </li>
                            <li className="mb-3 d-flex align-items-center gap-3">
                                <FaEnvelope className="footer-contact-icon footer-contact-icon-md" />
                                <span className="footer-contact-text text-white">Support@domain.com</span>
                            </li>
                            <li className="mb-3 d-flex align-items-center gap-3">
                                <FaGlobe className="footer-contact-icon footer-contact-icon-md" />
                                <span className="footer-contact-text text-white">RoxThemes.com</span>
                            </li>
                        </ul>
                    </Col>

                    {/* Newsletter */}
                    <Col lg={4} md={6}>
                        <h4 className="footer-section-title fw-bold mb-4">Subscribe To Newsletter</h4>
                        <p className="footer-newsletter-text mb-4 text-white">Follow our journey of design, innovation, and creativity.</p>
                        <div className="position-relative">
                            <FormControl
                                placeholder="Email address"
                                className="footer-newsletter-input bg-transparent text-white rounded-pill py-3 px-4 shadow-none"
                            />
                            <Button
                                variant="primary"
                                className="footer-newsletter-btn position-absolute end-0 top-50 translate-middle-y me-1 rounded-circle d-flex align-items-center justify-content-center p-0"
                            >
                                <IoPaperPlaneOutline className="footer-newsletter-btn-icon" />
                            </Button>
                        </div>
                    </Col>
                </Row>
            </Container>

            {/* Copyright Bar */}
            <div className="footer-copyright-bar py-4 border-top border-secondary border-opacity-25">
                <Container>
                    <p className="footer-copyright-text text-center mb-0 text-white">
                        Copyright &copy; {new Date().getFullYear()} Archivo By Roxthemes. All Rights Reserved.
                    </p>
                </Container>
            </div>
            {showBackToTop && (
                <button
                    className="back-to-top"
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    aria-label="Back to top"
                >
                    <FaArrowUp />
                </button>
            )}
        </footer>
    );
};

export default Footer;
