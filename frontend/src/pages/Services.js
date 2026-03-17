import React, { useState, useEffect, useRef } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { motion } from 'framer-motion';
import TestimonialSection from '../pages/TestimonialSection';
import ContactUs from '../components/layout/ContactUs';
import FAQSection from '../pages/FAQSection';
import { TbStack2, TbRuler2 } from 'react-icons/tb';
import { PiPaintBrushBroadFill } from 'react-icons/pi';
import { HiOutlineHome } from 'react-icons/hi';
import { MdApartment } from 'react-icons/md';
import { GiSofa } from 'react-icons/gi';
import '../Style/ServicesSection.css';
import { FaArrowRight, } from 'react-icons/fa6';
import '../Style/TeamSection.css';
import '../Style/Contact.css';
import RecentProjectsSection from '../pages/RecentProjectsSection';
const services = [
    {
        title: 'Interior Design',
        icon: TbStack2,
        description: 'Lorem ipsum is simply dummy text of the printing and typesetting industry printing and typesetting industry.'
    },
    {
        title: 'Art Development',
        icon: PiPaintBrushBroadFill,
        description: 'Lorem ipsum is simply dummy text of the printing and typesetting industry printing and typesetting industry.'
    },
    {
        title: 'House Sketches',
        icon: HiOutlineHome,
        description: 'Lorem ipsum is simply dummy text of the printing and typesetting industry printing and typesetting industry.'
    },
    {
        title: 'Building Ideas',
        icon: MdApartment,
        description: 'Lorem ipsum is simply dummy text of the printing and typesetting industry printing and typesetting industry.'
    },
    {
        title: '3D Rendering',
        icon: TbRuler2,
        description: 'Lorem ipsum is simply dummy text of the printing and typesetting industry printing and typesetting industry.'
    },
    {
        title: 'Furniture Design',
        icon: GiSofa,
        description: 'Lorem ipsum is simply dummy text of the printing and typesetting industry printing and typesetting industry.'
    },
];
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

const Services = () => {
    return (
        <>
            <section className="contact-hero">
                <Container>
                    <h1 style={{ color: 'white',marginTop: '65px' }}>Services</h1>
                    <div className="breadcrumb-item">
                        <a href="/">Home</a>
                        <span><FaArrowRight size={12} /></span>
                        <span >Services</span>
                    </div>
                </Container>
            </section>
            <motion.section
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="section-padding bg-light"
            >

                <Container>
                    <div className="services-cards-grid">
                        {services.map((service, index) => {
                            const IconComponent = service.icon;
                            return (
                                <div key={index} className="service-card" data-aos="fade-up" data-aos-delay={index * 100}>
                                    <div className="service-icon-wrapper">
                                        <IconComponent className="service-icon" />
                                    </div>
                                    <h4>{service.title}</h4>
                                    <p>{service.description}</p>
                                </div>
                            );
                        })}
                    </div>
                </Container>
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
                <RecentProjectsSection />
                <TestimonialSection />
                <FAQSection />
                <ContactUs />
            </motion.section>
        </>
    );
};

export default Services;
