import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaHouse, FaArrowRight } from 'react-icons/fa6';
import { TbStack2, TbRuler2 } from 'react-icons/tb';
import { PiPaintBrushBroadFill } from 'react-icons/pi';
import { HiOutlineHome } from 'react-icons/hi';
import { MdApartment } from 'react-icons/md';
import { GiSofa } from 'react-icons/gi';
import '../Style/ServicesSection.css';
import AOS from 'aos';
import 'aos/dist/aos.css';

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

const ServicesSection = () => {
    return (
        <section className="services-section">
            <Container>
                {/* Header Section */}
                <div className="services-header">
                    <div className="services-label-wrapper">
                        <FaHouse className="services-label-icon" />
                        <span>Company Services</span>
                    </div>
                    <div className="services-header-content">
                        <div className="services-title-wrapper">
                            <h2 className="services-title">We Specialize In These Fields.</h2>
                        </div>
                        <div className="services-description-wrapper">
                            <p className="services-desc">
                                We provide end-to-end architectural solutions, from concept design to final execution. Our focus is on creating timeless spaces that combine functionality, innovation, and aesthetic beauty.
                            </p>
                            <Button as={Link} to="/services" className="services-view-all-btn">
                                View All <FaArrowRight className="btn-icon" />
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Services Grid - 3 columns */}
                <div className="services-cards-grid">
                    {services.slice(0, 4).map((service, index) => {
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
                    {/* Feature Image */}
                    <div className="service-feature-image" data-aos="fade-left" data-aos-delay="200">
                        {/* The image is handled via CSS background or an img tag. Using img tag for better control/accessibility if needed, or keeping it as a div with background in CSS as per plan. Let's use an img tag for better responsiveness in grid. */}
                        <img src={require('../assets/images/chair.webp')} alt="Interior Design Feature" />
                    </div>
                </div>
            </Container>
        </section>
    );
};

export default ServicesSection;