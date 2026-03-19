import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Spinner, Alert, Card, InputGroup, Form } from 'react-bootstrap';
import { inquiryService } from '../../services/api';
import { FaEye, FaTrash } from 'react-icons/fa';

const InquiryManagement = () => {
    const [inquiries, setInquiries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [selectedInquiry, setSelectedInquiry] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    // Moved up to avoid conditional execution
    const [showReplyModal, setShowReplyModal] = useState(false);
    const [replyData, setReplyData] = useState({ subject: '', message: '' });

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const res = await inquiryService.getInquiries();
            setInquiries(res.data.data || []);
        } catch (err) {
            console.error('Fetch error:', err);
            setError(err.response?.data?.message || 'Failed to fetch inquiries. Please check your connection.');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this inquiry?')) {
            try {
                await inquiryService.deleteInquiry(id);
                setInquiries(inquiries.filter(i => i._id !== id));
                if (selectedInquiry && selectedInquiry._id === id) {
                    setShowModal(false);
                }
            } catch (err) {
                alert('Failed to delete inquiry.');
            }
        }
    };

    const openDetails = (inquiry) => {
        setSelectedInquiry(inquiry);
        setShowModal(true);
    };

    const handleReplyClick = () => {
        setReplyData({
            subject: `Re: Inquiry from ${selectedInquiry.name}`,
            message: `\n\nOn ${new Date(selectedInquiry.createdAt).toLocaleDateString()}, ${selectedInquiry.name} wrote:\n> ${selectedInquiry.message}`
        });
        setShowReplyModal(true);
    };

    const sendReply = () => {
        const mailtoLink = `mailto:${selectedInquiry.email}?subject=${encodeURIComponent(replyData.subject)}&body=${encodeURIComponent(replyData.message)}`;
        window.location.href = mailtoLink;
        setShowReplyModal(false);
    };

    const sendReplyGmail = () => {
        const gmailLink = `https://mail.google.com/mail/?view=cm&fs=1&to=${selectedInquiry.email}&su=${encodeURIComponent(replyData.subject)}&body=${encodeURIComponent(replyData.message)}`;
        window.open(gmailLink, '_blank');
        setShowReplyModal(false);
    };

    const filteredInquiries = inquiries.filter(i =>
        i.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        i.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        i.message.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) return (
        <div className="d-flex justify-content-center p-5">
            <Spinner animation="border" />
        </div>
    );

    return (
        <div className="fade-in">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h4 className="fw-bold mb-0">Inquiry Management</h4>
                <div className="text-muted small">
                    Total Inquiries: <span className="fw-bold text-dark">{inquiries.length}</span>
                </div>
            </div>

            <Card className="dashboard-card mb-4">
                <Card.Body className="p-2 p-md-3">
                    <InputGroup className="border rounded-3 overflow-hidden">
                        <InputGroup.Text className="bg-white border-0 ps-3">
                            <i className="bi bi-search text-muted"></i>
                        </InputGroup.Text>
                        <Form.Control
                            placeholder="Search inquiries by name, email or message..."
                            className="border-0 shadow-none"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </InputGroup>
                </Card.Body>
            </Card>

            {error && <Alert variant="danger">{error}</Alert>}

            <Card className="dashboard-card overflow-hidden">
                {/* Desktop Table View */}
                <div className="d-none d-md-block">
                    <Table hover responsive className="mb-0 align-middle table-borderless">
                        <thead className="bg-light border-bottom">
                            <tr>
                                <th className="py-3 px-4 text-muted small text-uppercase fw-bold">Date</th>
                                <th className="py-3 px-4 text-muted small text-uppercase fw-bold">Name</th>
                                <th className="py-3 px-4 text-muted small text-uppercase fw-bold">Email</th>
                                <th className="py-3 px-4 text-muted small text-uppercase fw-bold">Message Preview</th>
                                <th className="py-3 px-4 text-muted small text-uppercase fw-bold text-end">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredInquiries.length > 0 ? (
                                filteredInquiries.map(i => (
                                    <tr key={i._id} className="cursor-pointer border-bottom" onClick={() => openDetails(i)}>
                                        <td className="px-4 py-3 text-muted small" style={{ width: '120px' }}>{new Date(i.createdAt).toLocaleDateString()}</td>
                                        <td className="px-4 py-3 fw-bold text-dark">{i.name}</td>
                                        <td className="px-4 py-3">
                                            <span className="text-decoration-none text-muted">
                                                {i.email}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3 text-muted small text-truncate" style={{ maxWidth: '250px' }}>{i.message}</td>
                                        <td className="px-4 py-3 text-end" style={{ width: '120px' }}>
                                            <div className="d-flex justify-content-end gap-2" onClick={(e) => e.stopPropagation()}>
                                                <Button variant="outline-primary" size="sm" className="rounded-circle d-flex align-items-center justify-content-center" style={{ width: '32px', height: '32px' }} onClick={() => openDetails(i)} title="View Details">
                                                   <i className="bi bi-eye-fill"></i>
                                                </Button>
                                                <Button variant="outline-danger" size="sm" className="rounded-circle d-flex align-items-center justify-content-center border-opacity-25" style={{ width: '32px', height: '32px' }} onClick={() => handleDelete(i._id)} title="Delete">
                                                    <FaTrash />
                                                </Button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" className="text-center py-5 text-muted">No inquiries found matching your search.</td>
                                </tr>
                            )}
                        </tbody>
                    </Table>
                </div>

                {/* Mobile List View */}
                <div className="d-md-none">
                    {filteredInquiries.length > 0 ? (
                        <div className="list-group list-group-flush">
                            {filteredInquiries.map(i => (
                                <div key={i._id} className="list-group-item p-4 border-bottom" onClick={() => openDetails(i)}>
                                    <div className="d-flex justify-content-between align-items-start mb-2">
                                        <div className="d-flex align-items-center gap-3">
                                            <div className="bg-orange-subtle text-orange rounded-circle d-flex align-items-center justify-content-center flex-shrink-0" style={{ width: '40px', height: '40px' }}>
                                                {i.name.charAt(0).toUpperCase()}
                                            </div>
                                            <div>
                                                <h6 className="fw-bold mb-0 text-dark">{i.name}</h6>
                                                <small className="text-muted">{new Date(i.createdAt).toLocaleDateString()}</small>
                                            </div>
                                        </div>
                                        <div className="d-flex gap-2">
                                            <Button variant="outline-primary" size="sm" className="rounded-circle d-flex align-items-center justify-content-center" style={{ width: '32px', height: '32px' }} onClick={(e) => { e.stopPropagation(); openDetails(i); }}>
                                                <FaEye size={16} />
                                            </Button>
                                            <Button variant="outline-danger" size="sm" className="rounded-circle d-flex align-items-center justify-content-center" style={{ width: '32px', height: '32px' }} onClick={(e) => { e.stopPropagation(); handleDelete(i._id); }}>
                                                <FaTrash />
                                            </Button>
                                        </div>
                                    </div>
                                    <div className="ps-5 ms-2">
                                        <p className="text-muted small mb-2 text-truncate">{i.message}</p>
                                        <span className="badge bg-light text-dark fw-normal border">
                                            <i className="bi bi-envelope me-1"></i> {i.email}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-5 text-muted">No inquiries found matching your search.</div>
                    )}
                </div>
            </Card>

            {/* Inquiry Details Modal */}
            <Modal show={showModal} onHide={() => setShowModal(false)} centered className="rounded-0 modal-lg">
                <Modal.Header closeButton className="border-0 pb-0">
                    <Modal.Title className="fw-bold fs-5">Inquiry Details</Modal.Title>
                </Modal.Header>
                <Modal.Body className="p-4">
                    {selectedInquiry && (
                        <div>
                            <div className="d-flex align-items-center gap-3 mb-4 p-3 bg-light rounded">

                                <div className="flex-grow-1">
                                    <h5 className="fw-bold mb-0">{selectedInquiry.name}</h5>
                                    <a href={`mailto:${selectedInquiry.email}`} className="text-decoration-none text-primary small">{selectedInquiry.email}</a>
                                </div>
                                <div className="text-end">
                                    <small className="text-muted d-block">Received on</small>
                                    <span className="fw-bold text-dark">{new Date(selectedInquiry.createdAt).toLocaleDateString()}</span>
                                </div>
                            </div>

                            <div className="mb-4">
                                <label className="small text-uppercase text-muted fw-bold mb-2">Message Content</label>
                                <div className="p-4 bg-white border rounded">
                                    {selectedInquiry.message}
                                </div>
                            </div>

                            <div className="d-flex justify-content-end gap-2 pt-3 border-top">
                                <Button variant="outline-danger" onClick={() => handleDelete(selectedInquiry._id)} className="rounded-pill px-4">Delete</Button>
                                <Button variant="primary" onClick={handleReplyClick} className="rounded-pill px-4 fw-bold text-white">
                                    <i className="bi bi-reply-fill me-2"></i> Reply
                                </Button>
                            </div>
                        </div>
                    )}
                </Modal.Body>
            </Modal>

            {/* Reply Modal */}
            <Modal show={showReplyModal} onHide={() => setShowReplyModal(false)} centered className="rounded-0" contentClassName="border-0 shadow-lg" size="lg">
                <Modal.Header closeButton className="border-0 pb-0 pt-4 px-4">
                    <Modal.Title className="fw-bold display-6 fs-3" style={{ color: '#212529' }}>Compose Reply</Modal.Title>
                </Modal.Header>
                <Modal.Body className="p-4 px-md-5 pb-5">
                    <Form>
                        <Form.Group className="mb-4">
                            <Form.Label className="small fw-bold text-uppercase" style={{ color: '#FFB23F', letterSpacing: '1px' }}>To</Form.Label>
                            <div className="d-flex align-items-center px-4 py-3 bg-light rounded-pill border">
                                <i className="bi bi-envelope text-muted me-3"></i>
                                <span className="fw-medium text-dark">{selectedInquiry?.email}</span>
                            </div>
                        </Form.Group>
                        <Form.Group className="mb-4">
                            <Form.Label className="small fw-bold text-uppercase" style={{ color: '#FFB23F', letterSpacing: '1px' }}>Subject</Form.Label>
                            <Form.Control
                                type="text"
                                value={replyData.subject}
                                onChange={(e) => setReplyData({ ...replyData, subject: e.target.value })}
                                className="shadow-none border"
                                style={{ borderRadius: '50px', padding: '15px 30px', backgroundColor: '#fff', borderColor: '#ddd' }}
                            />
                        </Form.Group>
                        <Form.Group className="mb-4">
                            <Form.Label className="small fw-bold text-uppercase" style={{ color: '#FFB23F', letterSpacing: '1px' }}>Message</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={8}
                                value={replyData.message}
                                onChange={(e) => setReplyData({ ...replyData, message: e.target.value })}
                                className="shadow-none border"
                                style={{ borderRadius: '30px', padding: '20px 30px', backgroundColor: '#fff', borderColor: '#ddd', resize: 'none' }}
                            />
                        </Form.Group>
                        <div className="d-flex justify-content-end gap-3 pt-2">
                            <Button
                                variant="light"
                                onClick={() => setShowReplyModal(false)}
                                className="rounded-pill px-4 py-2 fw-bold text-muted"
                                style={{ minWidth: '120px' }}
                            >
                                Cancel
                            </Button>
                            <Button
                                onClick={sendReplyGmail}
                                className="rounded-pill px-4 py-2 fw-bold text-white border-0 d-flex align-items-center gap-2"
                                style={{ backgroundColor: '#FFB23F', minWidth: '110px', boxShadow: '0 5px 10px rgba(255, 178, 63, 0.3)' }}
                            >
                                <i className="bi bi-google"></i> Gmail
                            </Button>
                        </div>
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    );
};


export default InquiryManagement;
