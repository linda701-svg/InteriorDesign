import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { FaHouse, FaStar } from 'react-icons/fa6';
import { ImQuotesRight } from 'react-icons/im';
import '../Style/TestimonialSection.css';

const testimonials = [
    {
        id: 1,
        quote: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
        author: 'Justin Deviz',
        role: 'Designer',
        avatar: 'https://kits.roxthemes.com/archevo/wp-content/uploads/2025/09/team1.jpg'
    },
    {
        id: 2,
        quote: 'The team\'s creativity and attention to detail transformed our vision into a stunning reality.',
        author: 'Sarah Johnson',
        role: 'Homeowner',
        avatar: 'https://kits.roxthemes.com/archevo/wp-content/uploads/2025/09/team2.jpg'
    },
    {
        id: 3,
        quote: 'Exceptional service and results. Highly recommend for any architectural project.',
        author: 'Michael Chen',
        role: 'Business Owner',
        avatar: 'https://kits.roxthemes.com/archevo/wp-content/uploads/2025/08/att-2-e1692005845353.webp'
    }
];

const TestimonialSection = () => {
    const [activeIndex, setActiveIndex] = useState(0);

    return (
        <section className="testimonial-section">
            <Container>
                <Row className="align-items-center">
                    {/* Left Column: Text Content */}
                    <Col lg={6}>
                        <div className="testimonial-label-wrapper">
                            <FaHouse className="testimonial-label-icon" />
                            <span>Testimonial</span>
                        </div>
                        <h2 className="testimonial-title">What Our Customers Says</h2>
                        <p className="testimonial-desc">
                            Our clients love how we transform their spaces with creativity, precision, and elegance.
                        </p>
                        <img
                            src="/images/testimunial2.jpg"
                            alt="Construction site"
                            className="testimonial-right-image"
                        />
                    </Col>

                    {/* Right Column: Images with Testimonial Card */}
                    <Col lg={6}>
                        <img
                            src="/images/blog1.jpg"
                            alt="Team members"
                            className="testimonial-left-image"
                            style={{ height: '568px', objectFit: 'cover' }}
                        />
                        <div className="testimonial-images-container">

                            {/* Floating Testimonial Card with Slider */}
                            <motion.div
                                className="testimonial-card"
                                key={activeIndex}
                                initial={{ opacity: 0, y: 50 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{
                                    type: "spring",
                                    bounce: 0.4,
                                    duration: 0.8
                                }}
                            >
                                <div className="testimonial-stars">
                                    <FaStar />
                                    <FaStar />
                                    <FaStar />
                                    <FaStar />
                                    <FaStar />
                                </div>
                                <p className="testimonial-quote">
                                    {testimonials[activeIndex].quote}
                                </p>
                                <div className="testimonial-author">
                                    <div className="testimonial-author-info">
                                        <img
                                            src={testimonials[activeIndex].avatar}
                                            alt={testimonials[activeIndex].author}
                                            className="testimonial-author-avatar"
                                        />
                                        <div className="testimonial-author-details">
                                            <h6>{testimonials[activeIndex].author}</h6>
                                            <p>{testimonials[activeIndex].role}</p>
                                        </div>
                                    </div>
                                    <ImQuotesRight className="testimonial-quote-icon" />
                                </div>

                                {/* Navigation Dots */}
                                <div className="testimonial-dots">
                                    {testimonials.map((_, index) => (
                                        <button
                                            key={index}
                                            className={`testimonial-dot ${index === activeIndex ? 'active' : ''}`}
                                            onClick={() => setActiveIndex(index)}
                                            aria-label={`View testimonial ${index + 1}`}
                                        />
                                    ))}
                                </div>
                            </motion.div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
    );
};

export default TestimonialSection;
