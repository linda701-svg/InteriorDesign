import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Nav, Spinner, Alert } from 'react-bootstrap';
import { projectService, categoryService } from '../services/api';
import ContactUs from '../components/layout/ContactUs';
import TestimonialSection from '../pages/TestimonialSection';
import { FaHouse, FaArrowRight, FaArrowTrendUp } from 'react-icons/fa6';
import { FaUniversity } from 'react-icons/fa';
import { TbStack2, TbVectorTriangle } from 'react-icons/tb';
import { MdApartment } from 'react-icons/md';
import '../Style/FeatureProject.css';
import AOS from 'aos';
import 'aos/dist/aos.css';

const projects = [
    {
        id: 1,
        title: 'Skyline Tower',
        description: 'Duis nec commodo felis. Integer quis lorem sollicitudin, aliquet augue nec',
        image: '/images/staging-1.jpg.webp'
    },
    {
        id: 2,
        title: 'DND Mega Project',
        description: 'Duis nec commodo felis. Integer quis lorem sollicitudin, aliquet augue nec',
        image: '/images/recent-project3.jpg'
    },
    {
        id: 3,
        title: 'The Glasshouse',
        description: 'Duis nec commodo felis. Integer quis lorem sollicitudin, aliquet augue nec',
        image: '/images/bright-airy-modern-living-room-2021-08-26-15-29-12-utc.webp'
    },
    {
        id: 4,
        title: 'Urban Oasis Home',
        description: 'Duis nec commodo felis. Integer quis lorem sollicitudin, aliquet augue nec',
        image: '/images/modern-scandinavian-home-interior-of-living-room-1.webp'
    },
    {
        id: 5,
        title: 'The Minimalist House',
        description: 'Duis nec commodo felis. Integer quis lorem sollicitudin, aliquet augue nec',
        image: '/images/1500-bangkok-housing-luxury-market-2023.webp'
    },
    {
        id: 6,
        title: 'Harmony Living Villa',
        description: 'Duis nec commodo felis. Integer quis lorem sollicitudin, aliquet augue nec',
        image: '/images/53910-sofa-and-armchairs-in-modern-house-2025-04-05-04-46-06-utc-2048x1365.jpg.webp'
    },
];

const Projects = () => {

    return (
        <>
            <section className="contact-hero">
                <Container>
                    <h1 style={{ color: 'white',marginTop: '65px' }}>Project</h1>
                    <div className="breadcrumb-item">
                        <a href="/">Home</a>
                        <span><FaArrowRight size={12} /></span>
                        <span>Project</span>
                    </div>
                </Container>
            </section>
            <section className="section-padding">
                <Container>
                    <div className="recent-projects-grid">
                        {projects.map((project) => (
                            <div key={project.id} className="recent-project-card" data-aos="fade-up" data-aos-delay="200">
                                <img
                                    src={project.image}
                                    alt={project.title}
                                    className="recent-project-image"
                                />

                                {/* Arrow Icon */}
                                <div className="recent-project-arrow">
                                    <FaArrowTrendUp />
                                </div>

                                {/* Overlay with Text */}
                                <div className="recent-project-overlay">
                                    <h4 className="recent-project-title">{project.title}</h4>
                                    <p className="recent-project-desc">{project.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </Container>

            </section>

            {/* Feature Project Section */}
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

            <TestimonialSection />
            <ContactUs />
        </>
    );
};

export default Projects;
