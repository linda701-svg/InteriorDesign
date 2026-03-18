import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import { inquiryService } from '../../services/api';
import {
    FaFacebookF,
    FaXTwitter,
    FaLinkedinIn,
    FaInstagram,
    FaHouse
} from 'react-icons/fa6';
import { HiOutlineMail } from 'react-icons/hi';
import { IoLocationOutline } from 'react-icons/io5';
import { MdOutlinePhonelinkSetup } from 'react-icons/md';
import AOS from 'aos';
import 'aos/dist/aos.css';
import '../../Style/Contact.css';

const ContactUs = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        message: ''
    });
    const [status, setStatus] = useState({ type: '', msg: '' });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        AOS.init({
            duration: 1000,
            once: true,
            offset: 100
        });
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setStatus({ type: '', msg: '' });
        try {
            // Mapping for backend if needed, or update backend to accept separate names
            const submissionData = {
                name: `${formData.firstName} ${formData.lastName}`,
                email: formData.email,
                message: formData.message
            };
            await inquiryService.submitInquiry(submissionData);
            setStatus({ type: 'success', msg: 'Thank you for your inquiry! We will get back to you soon.' });
            setFormData({ firstName: '', lastName: '', email: '', message: '' });
        } catch (err) {
            setStatus({ type: 'danger', msg: 'Something went wrong. Please try again later.' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="contact-page">


            {/* Main Contact Section */}
            <section className="contact-main-section">
                <Container fluid className="p-0">
                    <Row className="g-0">
                        {/* Left Side: Form */}
                        <Col lg={7} className="contact-form-side">
                            <Container className="form-inner-container w-100">
                                <div className="contact-label-wrapper">
                                    <FaHouse className="contact-label-icon" />
                                    <span>Contact Us</span>
                                </div>
                                <h2 className="contact-title">Get In Touch With Us</h2>
                                <p className="contact-desc">
                                    Get in touch with us to transform your space into something truly inspiring.
                                    Our design experts are ready to bring your vision to life.
                                </p>

                                <Form onSubmit={handleSubmit} className="contact-form">
                                    {status.msg && <Alert variant={status.type} className="rounded-pill mb-4">{status.msg}</Alert>}
                                    <Row>
                                        <Col md={6}>
                                            <Form.Control
                                                type="text"
                                                name="firstName"
                                                value={formData.firstName}
                                                onChange={handleChange}
                                                placeholder="First Name"
                                                required
                                            />
                                        </Col>
                                        <Col md={6}>
                                            <Form.Control
                                                type="text"
                                                name="lastName"
                                                value={formData.lastName}
                                                onChange={handleChange}
                                                placeholder="Last Name"
                                                required
                                            />
                                        </Col>
                                    </Row>
                                    <Form.Control
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="Email address"
                                        required
                                    />
                                    <Form.Control
                                        as="textarea"
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        placeholder="Your message"
                                        required
                                    />
                                    <Button
                                        type="submit"
                                        className="submit-btn"
                                        disabled={loading}
                                    >
                                        {loading ? 'Sending...' : 'Submit'}
                                    </Button>
                                </Form>
                            </Container>
                        </Col>

                        {/* Right Side: Info & Accent */}
                        <Col lg={5} className="contact-info-side">
                            <div className="orange-accent-bg"></div>
                            <div className="contact-info-container" data-aos="fade-left" data-aos-delay="200">
                                <div className="contact-info-box w-100">
                                    <div className="info-item">
                                        <MdOutlinePhonelinkSetup className="info-icon" />
                                        <span className="info-title">Contact Number</span>
                                        <span className="info-text text-white-50">+0312 533 954 26</span>
                                    </div>
                                    <div className="info-item">
                                        <HiOutlineMail className="info-icon" />
                                        <span className="info-title">Email</span>
                                        <span className="info-text text-white-50">Architecture@gmail.com</span>
                                    </div>
                                    <div className="info-item">
                                        <IoLocationOutline className="info-icon" />
                                        <span className="info-title">Address</span>
                                        <span className="info-text text-white-50">Dhaka, Bangladesh.</span>
                                    </div>
                                </div>

                                <div className="social-links-wrapper">
                                    <a href="#" className="social-icon-btn"><FaFacebookF /></a>
                                    <a href="#" className="social-icon-btn"><FaXTwitter /></a>
                                    <a href="#" className="social-icon-btn"><FaLinkedinIn /></a>
                                    <a href="#" className="social-icon-btn"><FaInstagram /></a>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>


        </div>
    );
};

export default ContactUs;
