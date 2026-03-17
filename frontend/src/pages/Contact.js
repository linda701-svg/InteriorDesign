import React from 'react';
import { Container, } from 'react-bootstrap';
import { FaArrowRight, } from 'react-icons/fa6';
import 'aos/dist/aos.css';
import '../Style/Contact.css';
import ContactUs from '../components/layout/ContactUs';
const Contact = () => {

    return (
        <div className="contact-page">

            {/* Hero Section */}
            <section className="contact-hero">
                <Container>
                    <h1 style={{ color: 'white',marginTop: '65px' }}>Contact</h1>
                    <div className="breadcrumb-item">
                        <a href="/">Home</a>
                        <span><FaArrowRight size={12} /></span>
                        <span>Contact</span>
                    </div>
                </Container>
            </section>
            <ContactUs />
            {/* Map Section */}
            <section className="map-container">
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d116833.95338876122!2d90.3372881519777!3d23.782650031128186!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b8b087026b81%3A0x8fa563bbcad5a59c!2sDhaka!5e0!3m2!1sen!2sbd!4v1715690000000!5m2!1sen!2sbd"
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Google Map"
                ></iframe>
            </section>
        </div>
    );
};

export default Contact;
