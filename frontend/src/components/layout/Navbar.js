import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { MdArrowOutward } from 'react-icons/md';
import { HiMenuAlt3 } from 'react-icons/hi';
import '../../Style/Navbar.css';
import '../../Style/Footer.css';
const AppNavbar = () => {
    const location = useLocation();
    const isAdminPath = location.pathname.startsWith('/admin');

    if (isAdminPath && location.pathname !== '/admin/login') {
        return null;
    }

    return (
        <div className="navbar-capsule-wrapper">
            <Navbar expand="lg" className="custom-navbar" variant="dark">
                <Container fluid className="d-flex align-items-center justify-content-between flex-wrap">
                    <Navbar.Brand as={Link} to="/" className="navbar-brand-custom">
                        <div className="logo-icon">
                            <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                                <path d="M12 2L4 18h16L12 2z" />
                                <circle cx="12" cy="13" r="3" fill="white" />
                                <path d="M12 2L4 18h16L12 2z" fill="none" stroke="currentColor" strokeWidth="2" />
                            </svg>
                        </div>
                         <h2 className="footer-brand-title fw-bold mb-0 fs-4 fs-lg-2 text-nowrap">
                                <span className="brand-arch">Arch</span>
                                <span className="brand-evo">Evo</span>
                            </h2>
                    </Navbar.Brand>

                    <Navbar.Toggle aria-controls="basic-navbar-nav" className="border-0 shadow-none flex-shrink-0">
                        <HiMenuAlt3 className="text-white" style={{ fontSize: '1.8rem' }} />
                    </Navbar.Toggle>

                    <Navbar.Collapse id="basic-navbar-nav" className="justify-content-center">
                        <Nav className="mx-auto align-items-center gap-4">
                            <Nav.Link as={Link} to="/" className={`nav-link-custom ${location.pathname === '/' ? 'active' : ''}`}>
                                Home
                            </Nav.Link>
                            <Nav.Link as={Link} to="/services" className={`nav-link-custom ${location.pathname === '/services' ? 'active' : ''}`}>
                                Services
                            </Nav.Link>
                            <Nav.Link as={Link} to="/about" className={`nav-link-custom ${location.pathname === '/about' ? 'active' : ''}`}>
                                About Us
                            </Nav.Link>

                            <Nav.Link as={Link} to="/projects" className={`nav-link-custom ${location.pathname === '/projects' ? 'active' : ''}`}>
                                Project
                            </Nav.Link>

                            <Nav.Link as={Link} to="/contact" className={`nav-link-custom ${location.pathname === '/contact' ? 'active' : ''}`}>
                                Contact
                            </Nav.Link>
                        </Nav>

                        <Link to="/contact" className="btn-get-started">
                            Get Started
                            <div className="circle-arrow-icon">
                                <MdArrowOutward />
                            </div>
                        </Link>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    );
};

export default AppNavbar;
