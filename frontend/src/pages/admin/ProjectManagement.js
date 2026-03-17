import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Spinner, Alert, Badge, InputGroup, Row, Col, Card } from 'react-bootstrap';
import { projectService, categoryService } from '../../services/api';

const ProjectManagement = () => {
    const [projects, setProjects] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [currentProject, setCurrentProject] = useState({
        title: '',
        description: '',
        category: '',
        status: 'Active',
        images: []
    });
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [imagePreviews, setImagePreviews] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const [pRes, cRes] = await Promise.all([
                projectService.getProjects(),
                categoryService.getCategories()
            ]);
            setProjects(pRes.data.data || []);
            setCategories(cRes.data.data || []);
        } catch (err) {
            setError('Failed to fetch data.');
        } finally {
            setLoading(false);
        }
    };

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        setSelectedFiles(files);

        // Generate previews
        const newPreviews = files.map(file => URL.createObjectURL(file));
        setImagePreviews(newPreviews);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this project?')) {
            try {
                await projectService.deleteProject(id);
                setProjects(projects.filter(p => p._id !== id));
            } catch (err) {
                alert('Failed to delete project.');
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            const formData = new FormData();
            formData.append('title', currentProject.title);
            formData.append('description', currentProject.description);
            formData.append('category', typeof currentProject.category === 'object' ? currentProject.category._id : currentProject.category);
            formData.append('status', currentProject.status);

            selectedFiles.forEach(file => {
                formData.append('images', file);
            });

            if (currentProject._id) {
                await projectService.updateProject(currentProject._id, formData);
            } else {
                await projectService.createProject(formData);
            }

            fetchData();
            setShowModal(false);
            resetForm();
        } catch (err) {
            console.error(err);
            alert('Failed to save project. Ensure all fields are filled properly.');
        } finally {
            setSubmitting(false);
        }
    };

    const resetForm = () => {
        setCurrentProject({ title: '', description: '', category: '', status: 'Active', images: [] });
        setSelectedFiles([]);
        setImagePreviews([]);
    };

    const openModal = (project = null) => {
        if (project) {
            setCurrentProject(project);
            setImagePreviews(project.images ? project.images.map(img => process.env.REACT_APP_API_URL.replace('/api', '') + img) : []);
        } else {
            resetForm();
        }
        setShowModal(true);
    };

    const filteredProjects = projects.filter(p =>
        p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (p.category && p.category.name && p.category.name.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    if (loading) return (
        <div className="d-flex justify-content-center p-5">
            <Spinner animation="border" />
        </div>
    );

    return (
        <div className="fade-in">
            <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4 gap-3">
                <h4 className="fw-bold mb-0">Manage Projects</h4>
                <Button variant="dark" className="rounded-0 px-4" onClick={() => openModal()}>
                    <i className="bi bi-plus-lg me-2"></i> Add New Project
                </Button>
            </div>

            <Card className="border-0 shadow-sm rounded-0 mb-4">
                <Card.Body className="p-3">
                    <InputGroup>
                        <InputGroup.Text className="bg-white border-end-0 rounded-0 ps-3">
                            <i className="bi bi-search text-muted"></i>
                        </InputGroup.Text>
                        <Form.Control
                            placeholder="Search projects by title or category..."
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
                            <th className="border-0 py-3 px-4 text-muted small text-uppercase">Project</th>
                            <th className="border-0 py-3 px-4 text-muted small text-uppercase">Category</th>
                            <th className="border-0 py-3 px-4 text-muted small text-uppercase">Status</th>
                            <th className="border-0 py-3 px-4 text-muted small text-uppercase text-end">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredProjects.length > 0 ? (
                            filteredProjects.map(p => (
                                <tr key={p._id}>
                                    <td className="px-4 py-3">
                                        <div className="d-flex align-items-center gap-3">
                                            <div className="rounded overflow-hidden bg-light d-flex align-items-center justify-content-center border" style={{ width: '50px', height: '50px' }}>
                                                {p.images && p.images.length > 0 ? (
                                                    <img src={process.env.REACT_APP_API_URL.replace('/api', '') + p.images[0]} alt="" className="w-100 h-100 object-fit-cover" />
                                                ) : (
                                                    <i className="bi bi-image text-muted"></i>
                                                )}
                                            </div>
                                            <div>
                                                <h6 className="fw-bold mb-0 text-dark">{p.title}</h6>
                                                <small className="text-muted text-truncate d-block" style={{ maxWidth: '200px' }}>{p.description}</small>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-4 py-3">
                                        <Badge bg="light" text="dark" className="border fw-normal rounded-1">
                                            {typeof p.category === 'object' ? p.category.name : 'Unknown'}
                                        </Badge>
                                    </td>
                                    <td className="px-4 py-3">
                                        <span className={`badge rounded-pill fw-normal px-3 py-2 ${p.status === 'Active' ? 'badge-status-active' : 'badge-status-hidden'}`}>
                                            {p.status}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3 text-end">
                                        <div className="d-flex justify-content-end gap-2">
                                            <Button variant="outline-dark" size="sm" className="rounded-0" onClick={() => openModal(p)}>
                                                <i className="bi bi-pencil"></i>
                                            </Button>
                                            <Button variant="outline-danger" size="sm" className="rounded-0" onClick={() => handleDelete(p._id)}>
                                                <i className="bi bi-trash"></i>
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4" className="text-center py-5 text-muted">No projects found matching your search.</td>
                            </tr>
                        )}
                    </tbody>
                </Table>
            </Card>

            <Modal show={showModal} onHide={() => setShowModal(false)} centered size="lg" className="rounded-0">
                <Modal.Header closeButton className="border-0 pb-0">
                    <Modal.Title className="fw-bold">{currentProject._id ? 'Edit Project' : 'Add New Project'}</Modal.Title>
                </Modal.Header>
                <Modal.Body className="p-4">
                    <Form onSubmit={handleSubmit}>
                        <Row>
                            <Col md={8}>
                                <Form.Group className="mb-3">
                                    <Form.Label className="small fw-bold text-uppercase text-muted">Project Title</Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={currentProject.title}
                                        onChange={(e) => setCurrentProject({ ...currentProject, title: e.target.value })}
                                        className="rounded-0 p-3 shadow-none border-secondary-subtle"
                                        placeholder="e.g. Modern Minimalist Villa"
                                        required
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={4}>
                                <Form.Group className="mb-3">
                                    <Form.Label className="small fw-bold text-uppercase text-muted">Status</Form.Label>
                                    <Form.Select
                                        value={currentProject.status}
                                        onChange={(e) => setCurrentProject({ ...currentProject, status: e.target.value })}
                                        className="rounded-0 p-3 shadow-none border-secondary-subtle"
                                    >
                                        <option value="Active">Active</option>
                                        <option value="Hidden">Hidden</option>
                                    </Form.Select>
                                </Form.Group>
                            </Col>
                        </Row>

                      

                        <Form.Group className="mb-3">
                            <Form.Label className="small fw-bold text-uppercase text-muted">Description</Form.Label>
                            <Form.Control
                                as="textarea" rows={4}
                                value={currentProject.description}
                                onChange={(e) => setCurrentProject({ ...currentProject, description: e.target.value })}
                                className="rounded-0 p-3 shadow-none border-secondary-subtle"
                                placeholder="Describe the project details..."
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-4">
                            <Form.Label className="small fw-bold text-uppercase text-muted">Project Images</Form.Label>
                            <div className="border p-4 text-center border-secondary-subtle bg-light mb-3">
                                <Form.Control
                                    type="file"
                                    multiple
                                    accept="image/*"
                                    onChange={handleFileChange}
                                    className="d-none"
                                    id="project-images"
                                />
                                <label htmlFor="project-images" className="btn btn-outline-dark rounded-0 px-4 mb-2 pointer cursor-pointer">
                                    <i className="bi bi-cloud-upload me-2"></i> Select Images
                                </label>
                                <p className="small text-muted mb-0">Supported formats: JPG, PNG, WEBP (Max 5MB each)</p>
                            </div>

                            {imagePreviews.length > 0 && (
                                <div className="d-flex gap-2 overflow-auto pb-2">
                                    {imagePreviews.map((src, index) => (
                                        <div key={index} className="position-relative border" style={{ width: '100px', height: '80px', flexShrink: 0 }}>
                                            <img src={src} alt={`Preview ${index}`} className="w-100 h-100 object-fit-cover" />
                                        </div>
                                    ))}
                                </div>
                            )}
                        </Form.Group>

                        <div className="d-flex justify-content-end gap-2 pt-3 border-top">
                            <Button variant="light" onClick={() => setShowModal(false)} className="rounded-0 px-4">Cancel</Button>
                            <Button variant="dark" type="submit" className="rounded-0 px-4 fw-bold" disabled={submitting}>
                                {submitting ? <Spinner animation="border" size="sm" /> : (currentProject._id ? 'Save Changes' : 'Create Project')}
                            </Button>
                        </div>
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default ProjectManagement;
