import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Spinner, Alert, Card, InputGroup } from 'react-bootstrap';
import { serviceService } from '../../services/api';
import { TbStack2, TbRuler2 } from 'react-icons/tb';
import { PiPaintBrushBroadFill } from 'react-icons/pi';
import { HiOutlineHome } from 'react-icons/hi';
import { MdApartment } from 'react-icons/md';
import { GiSofa } from 'react-icons/gi';

const iconOptions = [
    { name: 'TbStack2', icon: <TbStack2 /> },
    { name: 'PiPaintBrushBroadFill', icon: <PiPaintBrushBroadFill /> },
    { name: 'HiOutlineHome', icon: <HiOutlineHome /> },
    { name: 'MdApartment', icon: <MdApartment /> },
    { name: 'TbRuler2', icon: <TbRuler2 /> },
    { name: 'GiSofa', icon: <GiSofa /> },
];

const ServiceManagement = () => {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [currentService, setCurrentService] = useState({ title: '', description: '', icon: 'TbStack2' });
    const [submitting, setSubmitting] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const res = await serviceService.getServices();
            setServices(res.data.data || []);
        } catch (err) {
            setError('Failed to fetch services.');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id, title) => {
        if (window.confirm(`Are you sure you want to delete service "${title}"?`)) {
            try {
                await serviceService.deleteService(id);
                setServices(services.filter(s => s._id !== id));
            } catch (err) {
                alert('Failed to delete service.');
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            if (currentService._id) {
                await serviceService.updateService(currentService._id, currentService);
            } else {
                await serviceService.createService(currentService);
            }
            fetchData();
            setShowModal(false);
            resetForm();
        } catch (err) {
            alert('Failed to save service.');
        } finally {
            setSubmitting(false);
        }
    };

    const resetForm = () => {
        setCurrentService({ title: '', description: '', icon: 'TbStack2' });
    };

    const openModal = (service = null) => {
        if (service) {
            setCurrentService(service);
        } else {
            resetForm();
        }
        setShowModal(true);
    };

    const getIconComponent = (iconName) => {
        const option = iconOptions.find(o => o.name === iconName);
        return option ? option.icon : <TbStack2 />;
    };

    const filteredServices = services.filter(s =>
        s.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (s.description && s.description.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    if (loading) return (
        <div className="d-flex justify-content-center p-5">
            <Spinner animation="border" />
        </div>
    );

    return (
        <div className="fade-in">
            <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4 gap-3">
                <h4 className="fw-bold mb-0">Manage Services</h4>
                <Button variant="dark" className="rounded-0 px-4" onClick={() => openModal()}>
                    <i className="bi bi-plus-lg me-2"></i> Add New Service
                </Button>
            </div>

            <Card className="border-0 shadow-sm rounded-0 mb-4">
                <Card.Body className="p-3">
                    <InputGroup>
                        <InputGroup.Text className="bg-white border-end-0 rounded-0 ps-3">
                            <i className="bi bi-search text-muted"></i>
                        </InputGroup.Text>
                        <Form.Control
                            placeholder="Search services..."
                            className="border-start-0 rounded-0 shadow-none"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </InputGroup>
                </Card.Body>
            </Card>

            {error && <Alert variant="danger">{error}</Alert>}

            <Card className="border-0 shadow-sm rounded-0 overflow-hidden">
                <Table hover responsive className="mb-0 align-middle">
                    <thead className="bg-light">
                        <tr>
                            <th className="border-0 py-3 px-4 text-muted small text-uppercase">Icon</th>
                            <th className="border-0 py-3 px-4 text-muted small text-uppercase">Title</th>
                            <th className="border-0 py-3 px-4 text-muted small text-uppercase">Description</th>
                            <th className="border-0 py-3 px-4 text-muted small text-uppercase text-end">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredServices.length > 0 ? (
                            filteredServices.map(s => (
                                <tr key={s._id}>
                                    <td className="px-4 py-3">
                                        <div className="fs-4 text-orange">
                                            {getIconComponent(s.icon)}
                                        </div>
                                    </td>
                                    <td className="px-4 py-3 fw-bold">{s.title}</td>
                                    <td className="px-4 py-3 text-muted small">{s.description}</td>
                                    <td className="px-4 py-3 text-end">
                                        <div className="d-flex justify-content-end gap-2">
                                            <Button variant="outline-dark" size="sm" className="rounded-0" onClick={() => openModal(s)}>
                                                <i className="bi bi-pencil"></i>
                                            </Button>
                                            <Button variant="outline-danger" size="sm" className="rounded-0" onClick={() => handleDelete(s._id, s.title)}>
                                                <i className="bi bi-trash"></i>
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4" className="text-center py-5 text-muted">No services found matching your search.</td>
                            </tr>
                        )}
                    </tbody>
                </Table>
            </Card>

            <Modal show={showModal} onHide={() => setShowModal(false)} centered className="rounded-0">
                <Modal.Header closeButton className="border-0 pb-0">
                    <Modal.Title className="fw-bold">{currentService._id ? 'Edit Service' : 'Add New Service'}</Modal.Title>
                </Modal.Header>
                <Modal.Body className="p-4">
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label className="small fw-bold text-uppercase text-muted">Title</Form.Label>
                            <Form.Control
                                type="text"
                                value={currentService.title}
                                onChange={(e) => setCurrentService({ ...currentService, title: e.target.value })}
                                className="rounded-0 p-3 shadow-none border-secondary-subtle"
                                placeholder="e.g. Interior Design"
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label className="small fw-bold text-uppercase text-muted">Icon</Form.Label>
                            <Form.Select
                                value={currentService.icon}
                                onChange={(e) => setCurrentService({ ...currentService, icon: e.target.value })}
                                className="rounded-0 p-3 shadow-none border-secondary-subtle"
                            >
                                {iconOptions.map(opt => (
                                    <option key={opt.name} value={opt.name}>{opt.name}</option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-4">
                            <Form.Label className="small fw-bold text-uppercase text-muted">Description</Form.Label>
                            <Form.Control
                                as="textarea" rows={3}
                                value={currentService.description}
                                onChange={(e) => setCurrentService({ ...currentService, description: e.target.value })}
                                className="rounded-0 p-3 shadow-none border-secondary-subtle"
                                placeholder="Service description..."
                                required
                            />
                        </Form.Group>
                        <div className="d-flex justify-content-end gap-2 pt-3 border-top">
                            <Button variant="light" onClick={() => setShowModal(false)} className="rounded-0 px-4">Cancel</Button>
                            <Button variant="dark" type="submit" className="rounded-0 px-4 fw-bold" disabled={submitting}>
                                {submitting ? <Spinner animation="border" size="sm" /> : (currentService._id ? 'Save Changes' : 'Create Service')}
                            </Button>
                        </div>
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default ServiceManagement;
