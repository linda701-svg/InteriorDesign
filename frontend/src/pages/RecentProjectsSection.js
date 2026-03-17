import React from 'react';
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaHouse, FaArrowRight, FaArrowTrendUp } from 'react-icons/fa6';
import '../Style/RecentProjectsSection.css';
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
];

const RecentProjectsSection = () => {
    return (
      
      <section className="recent-projects-section">
            <Container>
                {/* Header */}
                <div className="recent-projects-header">
                    <div className="recent-projects-header-left">
                        <div className="recent-projects-label-wrapper">
                            <FaHouse className="recent-projects-label-icon" />
                            <span className="recent-projects-label-text">Recent Project</span>
                        </div>
                        <h2 className="recent-projects-title">Recent Works in Modern Architecture</h2>
                        <p className="recent-projects-description">
                            A curated collection of our latest architectural works, showcasing innovative design, functionality, and timeless aesthetics.
                        </p>
                    </div>
                    <Link to="/projects" className="recent-projects-view-all-btn">
                        View All
                        <span className="btn-icon">
                            <FaArrowRight />
                        </span>
                    </Link>
                </div>

                {/* Projects Grid */}
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
    );
};

export default RecentProjectsSection;
