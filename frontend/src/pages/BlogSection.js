import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaHome, FaRegCalendarAlt, FaRegComments, FaArrowRight, FaArrowUp } from 'react-icons/fa';
import { BsArrowUpRight } from "react-icons/bs";
import '../Style/BlogSection.css';

const blogPosts = [
    {
        id: 1,
        title: 'Building Tomorrow’s Design Today',
        date: 'August 29, 2025',
        day: '29',
        month: 'Aug',
        comments: 0,
        description: 'Discover inspiring architectural ideas, expert insights, and the latest updates from the…',
        image: 'https://kits.roxthemes.com/archevo/wp-content/uploads/2025/08/blog1.jpg',
    },
    {
        id: 2,
        title: 'Insights & Inspirations in Architecture',
        date: 'August 29, 2025',
        day: '29',
        month: 'Aug',
        comments: 0,
        description: 'Dive into the world of architecture where creativity meets functionality. Our blog…',
        image: 'https://kits.roxthemes.com/archevo/wp-content/uploads/2025/08/blog2-1024x683.jpg',
    },
    {
        id: 3,
        title: 'Exploring Modern Architectural Wonders',
        date: 'August 29, 2025',
        day: '29',
        month: 'Aug',
        comments: 0,
        description: 'There are many variations of passages of Lorem Ipsum available, but the…',
        image: 'https://kits.roxthemes.com/archevo/wp-content/uploads/2025/08/blog3-1024x684.webp',
    },
];

const BlogSection = () => {
    return (
        <section className="blog-section section-padding">
            <Container>
                <Row className="blog-header mb-5 align-items-center">
                    <Col lg={4}>
                        <div className="blog-subtitle-wrapper">
                            <FaHome className="blog-home-icon" />
                            <span className="blog-subtitle">Blog</span>
                        </div>
                        <h2 className="blog-title">Architecture Ideas & Trends</h2>
                    </Col>
                    <Col lg={5} className="blog-desc-col">
                        <p className="blog-header-desc">Stay updated with our latest articles covering modern design concepts, project highlights, and expert tips.</p>
                    </Col>
                    <Col lg={3} className="text-lg-end">
                        <Button as={Link} to="/blog" className="blog-view-all-btn text-nowrap ms-lg-auto">
                            View All <div className="icon-circle"><BsArrowUpRight /></div>
                        </Button>
                    </Col>
                </Row>

                <Row className="gy-4">
                    {blogPosts.map((post) => (
                        <Col key={post.id} lg={4} md={6}>
                            <motion.div
                                whileHover={{ y: -10 }}
                                className="blog-card"
                            >
                                <div className="blog-image-wrapper">
                                    <img src={post.image} alt={post.title} className="blog-image" />
                                    <div className="blog-date-badge">
                                        <span className="day">{post.day}</span>
                                        <span className="month">{post.month}</span>
                                    </div>
                                </div>
                                <div className="blog-content">
                                    <div className="blog-meta">
                                        <div className="meta-item">
                                            <FaRegCalendarAlt className="meta-icon" />
                                            <span>{post.date}</span>
                                        </div>
                                        <div className="meta-item">
                                            <FaRegComments className="meta-icon" />
                                            <span>{post.comments}</span>
                                        </div>
                                    </div>
                                    <h3 className="blog-post-title">{post.title}</h3>
                                    <p className="blog-post-desc">{post.description}</p>
                                    <Button as={Link} to={`/blog/${post.id}`} className="blog-learn-more-btn">
                                        Learn more <BsArrowUpRight />
                                    </Button>
                                </div>
                            </motion.div>
                        </Col>
                    ))}
                </Row>
            </Container>
        </section>
    );
};

export default BlogSection;
