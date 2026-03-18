import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Nav, Card, Spinner, Table, Button } from 'react-bootstrap';
import { Link, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import ProjectManagement from './ProjectManagement';
import CategoryManagement from './CategoryManagement';
import ServiceManagement from './ServiceManagement';
import InquiryManagement from './InquiryManagement';
import { statsService } from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import './Dashboard.css';

const Dashboard = () => {
    const { logout, user } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const [showSidebar, setShowSidebar] = useState(false);

    const handleLogout = () => {
        logout();
        navigate('/admin/login');
    };

    const isActive = (path) => {
        return location.pathname === path ? 'active' : '';
    };

    const handleDownloadReport = async () => {
        try {
            const res = await statsService.getDashboardStats();
            const data = res.data.data;

            const csvRows = [];

            // Summary Section
            csvRows.push(['ARCHEVO ADMIN REPORT']);
            csvRows.push(['Generated on', new Date().toLocaleString()]);
            csvRows.push([]);

            csvRows.push(['SUMMARY STATISTICS']);
            csvRows.push(['Metric', 'Count']);
            csvRows.push(['Total Projects', data.counts.projects]);
            csvRows.push(['Total Categories', data.counts.categories]);
            csvRows.push(['Total Inquiries', data.counts.inquiries]);
            csvRows.push([]);

            // Recent Projects Section
            csvRows.push(['RECENT PROJECTS']);
            csvRows.push(['Project Title', 'Category', 'Status', 'Date Added']);
            data.recentProjects.forEach(p => {
                // Escape commas in strings to avoid breaking CSV
                const cleanTitle = `"${p.title.replace(/"/g, '""')}"`;
                const cleanCat = `"${(p.category?.name || 'Uncategorized').replace(/"/g, '""')}"`;
                csvRows.push([cleanTitle, cleanCat, p.status, new Date(p.createdAt).toLocaleDateString()]);
            });
            csvRows.push([]);

            // Recent Inquiries Section
            csvRows.push(['RECENT INQUIRIES']);
            csvRows.push(['Name', 'Email', 'Message', 'Date Received']);
            data.recentInquiries.forEach(i => {
                const cleanName = `"${i.name.replace(/"/g, '""')}"`;
                const cleanEmail = `"${i.email.replace(/"/g, '""')}"`;
                const cleanMsg = `"${i.message.replace(/"/g, '""').replace(/\n/g, ' ')}"`;
                csvRows.push([cleanName, cleanEmail, cleanMsg, new Date(i.createdAt).toLocaleDateString()]);
            });

            const csvContent = "data:text/csv;charset=utf-8," + csvRows.map(e => e.join(",")).join("\n");
            const encodedUri = encodeURI(csvContent);
            const link = document.createElement("a");
            link.setAttribute("href", encodedUri);
            link.setAttribute("download", `archevo_report_${new Date().toISOString().split('T')[0]}.csv`);
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

        } catch (err) {
            console.error("Failed to generate report:", err);
            alert("Failed to generate report. Please try again.");
        }
    };

    return (
        <div className="admin-dashboard d-flex flex-column vh-100 overflow-hidden">
            <header className="bg-white border-bottom py-3 px-4 d-flex justify-content-between align-items-center shadow-sm z-index-1">
                <div className="d-flex align-items-center gap-3">
                    <Button variant="link" className="p-0 text-dark d-md-none" onClick={() => setShowSidebar(!showSidebar)}>
                        <i className="bi bi-list fs-4"></i>
                    </Button>
                    <h5 className="fw-bold mb-0 text-uppercase tracking-tighter">ARCHEVO <span className="text-orange">Admin</span></h5>
                </div>
                <div className="d-flex align-items-center gap-3">
                    <div className="d-none d-md-block">
                        <Button
                            variant="primary"
                            className="text-white fw-bold d-flex align-items-center gap-2 rounded-pill px-4 shadow-sm"
                            onClick={handleDownloadReport}
                        >
                            <i className="bi bi-cloud-download"></i> Download Report
                        </Button>
                    </div>
                    <div className="border-start mx-2 h-50 d-none d-md-block"></div>
                    <div className="d-flex align-items-center gap-2">
                        <div className="bg-orange-subtle text-orange rounded-circle d-flex align-items-center justify-content-center fw-bold" style={{ width: '35px', height: '35px' }}>
                            {user?.email?.charAt(0).toUpperCase()}
                        </div>
                        <span className="small text-muted d-none d-md-inline fw-bold">{user?.email}</span>
                    </div>

                </div>
            </header>

            <div className="d-flex flex-grow-1 overflow-hidden position-relative">
                {/* Mobile Overlay */}
                <div
                    className={`sidebar-overlay position-absolute top-0 start-0 w-100 h-100 bg-dark bg-opacity-50 z-index-2 d-md-none ${showSidebar ? 'd-block' : 'd-none'}`}
                    onClick={() => setShowSidebar(false)}
                ></div>

                <aside
                    className={`bg-dark text-white sidebar d-flex flex-column transition-all ${showSidebar ? 'show' : ''}`}
                    style={{ width: '260px', minWidth: '260px' }}
                >

                    <Nav className="flex-column py-2 flex-grow-1 px-2 gap-1" style={{ marginTop: '40px' }}>
                        <Link to="/admin/dashboard" className={`nav-link rounded py-3 px-4 d-flex align-items-center gap-3 ${isActive('/admin/dashboard')}`} onClick={() => setShowSidebar(false)}>
                            <i className="bi bi-grid-1x2-fill"></i> Dashboard
                        </Link>
                        <Link to="/admin/dashboard/projects" className={`nav-link rounded py-3 px-4 d-flex align-items-center gap-3 ${isActive('/admin/dashboard/projects')}`} onClick={() => setShowSidebar(false)}>
                            <i className="bi bi-collection-fill"></i> Projects
                        </Link>
                        <Link to="/admin/dashboard/services" className={`nav-link rounded py-3 px-4 d-flex align-items-center gap-3 ${isActive('/admin/dashboard/services')}`} onClick={() => setShowSidebar(false)}>
                            <i className="bi bi-briefcase-fill"></i> Services
                        </Link>
                        <Link to="/admin/dashboard/categories" className={`nav-link rounded py-3 px-4 d-flex align-items-center gap-3 ${isActive('/admin/dashboard/categories')}`} onClick={() => setShowSidebar(false)}>
                            <i className="bi bi-tags-fill"></i> Categories
                        </Link>
                        <Link to="/admin/dashboard/inquiries" className={`nav-link rounded py-3 px-4 d-flex align-items-center gap-3 ${isActive('/admin/dashboard/inquiries')}`} onClick={() => setShowSidebar(false)}>
                            <i className="bi bi-chat-square-text-fill"></i> Inquiries
                        </Link>

                    </Nav>
                    <div className="p-4 bg-black bg-opacity-25 mx-2 mb-2 rounded">
                        <div className="d-flex align-items-center gap-4">
                            <i className="bi bi-lightbulb-fill text-warning fs-4"></i>
                            <div>
                                <small className="d-block fw-bold text-white">Pro Tip</small>
                                <small className="text-white-50" style={{ fontSize: '0.7rem' }}>Check inquiries daily.</small>

                            </div>
                            <button onClick={handleLogout} className="btn btn-outline-danger btn-sm rounded-circle p-0 d-flex align-items-center justify-content-center" style={{ width: '32px', height: '32px' }} title="Logout">
                                <i className="bi bi-power"></i>
                            </button>

                        </div>
                    </div>
                </aside>

                <main className="flex-grow-1 bg-light p-md-4 p-3 overflow-auto scroll-custom w-100">
                    <Container fluid className="px-0">
                        <Routes>
                            <Route path="/" element={<Overview />} />
                            <Route path="/projects" element={<ProjectManagement />} />
                            <Route path="/services" element={<ServiceManagement />} />
                            <Route path="/categories" element={<CategoryManagement />} />
                            <Route path="/inquiries" element={<InquiryManagement />} />
                        </Routes>
                    </Container>
                </main>
            </div>
        </div>
    );
};

const Overview = () => {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const res = await statsService.getDashboardStats();
                setStats(res.data.data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchStats();
    }, []);

    // SVG Line Path Generator (Simple approximation for visual appeal)
    const generateLinePath = () => {
        // Random points to simulate a graph
        return "M0,80 C20,70 40,90 60,50 C80,30 100,60 120,40 C140,20 160,50 180,30 C200,10 220,40 240,20 L240,100 L0,100 Z";
    };

    if (loading) return (
        <div className="d-flex justify-content-center align-items-center h-100 py-5">
            <Spinner animation="border" variant="warning" />
        </div>
    );

    if (!stats) return <p className="text-center text-muted py-5">Failed to load statistics</p>;

    return (
        <div className="fade-in">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h4 className="fw-bold mb-0">Overview</h4>
                <div className="text-muted small">
                    Last updated: <span className="fw-bold text-dark">Just now</span>
                </div>
            </div>

            <Row className="gy-4 mb-4">
                <Col xl={3} md={6}>
                    <Card className="dashboard-card h-100">
                        <Card.Body>
                            <div className="d-flex justify-content-between align-items-start mb-3">
                                <div>
                                    <h6 className="text-muted small text-uppercase fw-bold mb-1">Total Projects</h6>
                                    <h2 className="card-title-lg mb-0">{stats.counts.projects}</h2>
                                </div>
                                <div className="bg-orange-subtle text-orange rounded p-2">
                                    <i className="bi bi-collection fs-4"></i>
                                </div>
                            </div>
                            <div className="d-flex align-items-center gap-2">
                                <span className="trend-up"><i className="bi bi-arrow-up-short"></i> 12%</span>
                                <span className="text-muted small">this month</span>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
                <Col xl={3} md={6}>
                    <Card className="dashboard-card h-100">
                        <Card.Body>
                            <div className="d-flex justify-content-between align-items-start mb-3">
                                <div>
                                    <h6 className="text-muted small text-uppercase fw-bold mb-1">Total Categories</h6>
                                    <h2 className="card-title-lg mb-0">{stats.counts.categories}</h2>
                                </div>
                                <div className="bg-success bg-opacity-10 text-success rounded p-2">
                                    <i className="bi bi-tags fs-4"></i>
                                </div>
                            </div>
                            <div className="d-flex align-items-center gap-2">
                                <span className="trend-up"><i className="bi bi-arrow-up-short"></i> 5%</span>
                                <span className="text-muted small">new categories</span>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
                <Col xl={3} md={6}>
                    <Card className="dashboard-card h-100">
                        <Card.Body>
                            <div className="d-flex justify-content-between align-items-start mb-3">
                                <div>
                                    <h6 className="text-muted small text-uppercase fw-bold mb-1">Total Inquiries</h6>
                                    <h2 className="card-title-lg mb-0">{stats.counts.inquiries}</h2>
                                </div>
                                <div className="bg-primary bg-opacity-10 text-primary rounded p-2">
                                    <i className="bi bi-chat-left-text fs-4"></i>
                                </div>
                            </div>
                            <div className="d-flex align-items-center gap-2">
                                <span className="trend-up"><i className="bi bi-arrow-up-short"></i> 8%</span>
                                <span className="text-muted small">response rate</span>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
                <Col xl={3} md={6}>
                    <Card className="dashboard-card h-100">
                        <Card.Body>
                            <div className="d-flex justify-content-between align-items-start mb-3">
                                <div>
                                    <h6 className="text-muted small text-uppercase fw-bold mb-1">Avg. Response</h6>
                                    <h2 className="card-title-lg mb-0">2.4h</h2>
                                </div>
                                <div className="bg-info bg-opacity-10 text-info rounded p-2">
                                    <i className="bi bi-clock-history fs-4"></i>
                                </div>
                            </div>
                            <div className="d-flex align-items-center gap-2">
                                <span className="trend-down"><i className="bi bi-arrow-down-short"></i> 2%</span>
                                <span className="text-muted small">faster than last week</span>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            <Row className="gy-4 mb-4">
                <Col lg={8}>
                    <Card className="dashboard-card h-100">
                        <Card.Header className="bg-white border-0 pt-4 px-4 d-flex justify-content-between align-items-center">
                            <h5 className="fw-bold mb-0">Inquiry Analytics</h5>
                            <Button variant="outline-light" size="sm" className="text-muted border-secondary-subtle">This Month <i className="bi bi-chevron-down ms-1"></i></Button>
                        </Card.Header>
                        <Card.Body className="px-4">
                            {/* Simulated Line Chart Area */}
                            <div className="chart-line-bg mb-3 d-flex align-items-end" style={{ height: '250px' }}>
                                <svg viewBox="0 0 240 100" className="w-100 h-100" preserveAspectRatio="none">
                                    <path d="M0,80 C40,90 40,40 80,60 C120,80 120,20 160,50 C200,80 200,30 240,40 L240,100 L0,100 Z" fill="url(#gradient)" stroke="none" opacity="0.1" />
                                    <path d="M0,80 C40,90 40,40 80,60 C120,80 120,20 160,50 C200,80 200,30 240,40" fill="none" stroke="#fd7e14" strokeWidth="2" />
                                    <defs>
                                        <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                                            <stop offset="0%" stopColor="#fd7e14" stopOpacity="0.5" />
                                            <stop offset="100%" stopColor="#fd7e14" stopOpacity="0" />
                                        </linearGradient>
                                    </defs>
                                </svg>
                            </div>
                            <div className="d-flex justify-content-between text-muted small">
                                <span>Week 1</span>
                                <span>Week 2</span>
                                <span>Week 3</span>
                                <span>Week 4</span>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
                <Col lg={4}>
                    <Card className="dashboard-card h-100">
                        <Card.Header className="bg-white border-0 pt-4 px-4">
                            <h5 className="fw-bold mb-0">Top Categories</h5>
                        </Card.Header>
                        <Card.Body className="d-flex flex-column justify-content-end px-4">
                            {/* Simulated Bar Chart */}
                            <div className="chart-bar-container">
                                <div className="chart-bar-item">
                                    <div className="chart-bar" style={{ height: '70%' }}></div>
                                    <small className="mt-2 text-muted fw-bold" style={{ fontSize: '0.7rem' }}>Living</small>
                                </div>
                                <div className="chart-bar-item">
                                    <div className="chart-bar" style={{ height: '90%', opacity: '0.8' }}></div>
                                    <small className="mt-2 text-muted fw-bold" style={{ fontSize: '0.7rem' }}>Office</small>
                                </div>
                                <div className="chart-bar-item">
                                    <div className="chart-bar" style={{ height: '50%', opacity: '0.6' }}></div>
                                    <small className="mt-2 text-muted fw-bold" style={{ fontSize: '0.7rem' }}>Bdrm</small>
                                </div>
                                <div className="chart-bar-item">
                                    <div className="chart-bar" style={{ height: '65%', opacity: '0.7' }}></div>
                                    <small className="mt-2 text-muted fw-bold" style={{ fontSize: '0.7rem' }}>Ktchn</small>
                                </div>
                            </div>
                            <div className="mt-3 text-center">
                                <small className="text-muted">Most popular categories this month based on project uploads.</small>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            <Row className="gy-4">
                <Col lg={7}>
                    <Card className="dashboard-card h-100">
                        <Card.Header className="bg-white border-0 pt-4 px-4 d-flex justify-content-between align-items-center">
                            <h5 className="fw-bold mb-0">Recent Projects</h5>
                            <Link to="projects" className="text-orange text-decoration-none small fw-bold">View All</Link>
                        </Card.Header>
                        <Card.Body className="p-0">
                            <Table hover responsive className="mb-0 align-middle table-borderless">
                                <thead className="bg-light">
                                    <tr>
                                        <th className="ps-4">Project Name</th>
                                        <th>Category</th>
                                        <th>Status</th>
                                        <th className="pe-4 text-end">Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {stats.recentProjects.slice(0, 5).map(project => (
                                        <tr key={project._id}>
                                            <td className="ps-4">
                                                <div className="d-flex align-items-center gap-3">
                                                    {project.images && project.images[0] ? (
                                                        <img src={process.env.REACT_APP_API_URL.replace('/api', '') + project.images[0]} alt="" className="rounded" style={{ width: '40px', height: '40px', objectFit: 'cover' }} />
                                                    ) : (
                                                        <div className="bg-light rounded d-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px' }}><i className="bi bi-image text-muted"></i></div>
                                                    )}
                                                    <span className="fw-bold text-dark">{project.title}</span>
                                                </div>
                                            </td>
                                            <td className="text-muted">{project.category?.name || 'Uncategorized'}</td>
                                            <td>
                                                <span className={`badge ${project.status === 'Active' ? 'bg-success-subtle text-success' : 'bg-secondary-subtle text-secondary'} rounded-pill fw-normal px-3`}>
                                                    {project.status}
                                                </span>
                                            </td>
                                            <td className="pe-4 text-end text-muted small">{new Date(project.createdAt).toLocaleDateString()}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </Card.Body>
                    </Card>
                </Col>
                <Col lg={5}>
                    <Card className="dashboard-card h-100">
                        <Card.Header className="bg-white border-0 pt-4 px-4">
                            <h5 className="fw-bold mb-0">Recent Inquiries</h5>
                        </Card.Header>
                        <Card.Body className="p-0">
                            <div className="list-group list-group-flush">
                                {stats.recentInquiries.slice(0, 5).map(inquiry => (
                                    <div key={inquiry._id} className="list-group-item border-0 px-4 py-3 d-flex align-items-center gap-3">

                                        <div className="flex-grow-1 min-w-0">
                                            <div className="d-flex justify-content-between mb-1">
                                                <h6 className="mb-0 fw-bold small text-truncate">{inquiry.name}</h6>
                                                <small className="text-muted" style={{ fontSize: '0.75rem' }}>{new Date(inquiry.createdAt).toLocaleDateString()}</small>
                                            </div>
                                            <p className="text-muted small mb-0 text-truncate">{inquiry.message}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </Card.Body>
                        <div className="p-3 text-center border-top">
                            <Link to="inquiries" className="btn btn-outline-dark btn-sm rounded-pill px-4">View All Inquiries</Link>
                        </div>
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default Dashboard;
