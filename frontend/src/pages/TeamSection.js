import React, { useState, useEffect, useRef } from 'react';
import { Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaHouse, FaArrowRight, FaFacebookF, FaXTwitter, FaLinkedinIn } from 'react-icons/fa6';
import '../Style/TeamSection.css';

const teamMembers = [
    {
        id: 1,
        name: 'John Doe',
        role: 'Project Manager',
        avatar: 'https://kits.roxthemes.com/archevo/wp-content/uploads/2025/08/att-2-e1692005845353.webp',
        social: {
            facebook: '#',
            twitter: '#',
            linkedin: '#',
        }
    },
    {
        id: 2,
        name: 'Justin Deviz',
        role: 'Project Manager',
        avatar: 'https://kits.roxthemes.com/archevo/wp-content/uploads/2025/09/team2.jpg',
        social: {
            facebook: '#',
            twitter: '#',
            linkedin: '#',
        }
    },
    {
        id: 3,
        name: 'Mike Pomir',
        role: 'Project Manager',
        avatar: 'https://kits.roxthemes.com/archevo/wp-content/uploads/2025/09/team1.jpg',
        social: {
            facebook: '#',
            twitter: '#',
            linkedin: '#',
        }
    },
];

// Counter Animation Component
const CounterAnimation = ({ end, duration = 2000, suffix = '+' }) => {
    const [count, setCount] = useState(0);
    const [hasAnimated, setHasAnimated] = useState(false);
    const counterRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && !hasAnimated) {
                    setHasAnimated(true);

                    const startTime = Date.now();
                    const endValue = typeof end === 'string' ? parseInt(end.replace(/,/g, '')) : end;

                    const timer = setInterval(() => {
                        const now = Date.now();
                        const progress = Math.min((now - startTime) / duration, 1);

                        // Easing function for smooth animation
                        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
                        const currentCount = Math.floor(easeOutQuart * endValue);

                        setCount(currentCount);

                        if (progress === 1) {
                            clearInterval(timer);
                            setCount(endValue);
                        }
                    }, 16); // ~60fps

                    return () => clearInterval(timer);
                }
            },
            { threshold: 0.3 }
        );

        if (counterRef.current) {
            observer.observe(counterRef.current);
        }

        return () => {
            if (counterRef.current) {
                observer.unobserve(counterRef.current);
            }
        };
    }, [end, duration, hasAnimated]);

    const formatNumber = (num) => {
        return num.toLocaleString();
    };

    return (
        <span ref={counterRef}>
            {formatNumber(count)}{suffix}
        </span>
    );
};

const TeamSection = () => {
    return (
        <section className="team-section">
            <Container>
                {/* Header Section */}
                <div className="team-header">
                    <div className="team-label-wrapper">
                        <FaHouse className="team-label-icon" />
                        <span>Our Team</span>
                    </div>
                    <div className="team-header-content">
                        <div className="team-title-wrapper">
                            <h2 className="team-title">The Team Behind the Designs</h2>
                        </div>
                        <div className="team-description-wrapper">
                            <p className="team-desc">
                                Our team of passionate architects and designers work together to bring innovative ideas to life, blending creativity with functionality.
                            </p>
                            <Button as={Link} to="/team" className="team-view-all-btn">
                                View All <FaArrowRight className="btn-icon" />
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Team Cards Grid */}
                <div className="team-cards-grid">
                    {teamMembers.map((member, index) => (
                        <motion.div
                            key={member.id}
                            className="team-card"
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.2 }}
                            transition={{
                                duration: 0.6,
                                delay: index * 0.2,
                                ease: "easeOut"
                            }}
                        >
                            <div className="team-card-image-wrapper">
                                <img
                                    src={member.avatar}
                                    alt={member.name}
                                    className="team-card-image"
                                />

                                {/* Social Icons */}
                                <div className="team-social-icons">
                                    <a href={member.social.facebook} className="team-social-icon">
                                        <FaFacebookF />
                                    </a>
                                    <a href={member.social.twitter} className="team-social-icon">
                                        <FaXTwitter />
                                    </a>
                                    <a href={member.social.linkedin} className="team-social-icon">
                                        <FaLinkedinIn />
                                    </a>
                                </div>
                            </div>

                            {/* Team Member Info */}
                            <div className="team-card-info">
                                <h4 className="team-member-name">{member.name}</h4>
                                <p className="team-member-role">{member.role}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </Container>

            {/* Statistics Section */}
            <div className="team-stats-section">
                <Container>
                    <div className="team-stats-grid">
                        <div className="team-stat-item">
                            <h3 className="team-stat-number">
                                <CounterAnimation end={320} duration={2000} suffix="+" />
                            </h3>
                            <p className="team-stat-label">Team member</p>
                        </div>
                        <div className="team-stat-item">
                            <h3 className="team-stat-number">
                                <CounterAnimation end={255} duration={2000} suffix="+" />
                            </h3>
                            <p className="team-stat-label">Lead Project</p>
                        </div>
                        <div className="team-stat-item">
                            <h3 className="team-stat-number">
                                <CounterAnimation end={1500} duration={2500} suffix="+" />
                            </h3>
                            <p className="team-stat-label">Successful Deliveries</p>
                        </div>
                        <div className="team-stat-item">
                            <h3 className="team-stat-number">
                                <CounterAnimation end={1250} duration={2500} suffix="+" />
                            </h3>
                            <p className="team-stat-label">Successful Deliveries</p>
                        </div>
                    </div>
                </Container>
            </div>
        </section>
    );
};

export default TeamSection;
