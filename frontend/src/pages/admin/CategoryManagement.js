import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Spinner, Alert, Card, InputGroup } from 'react-bootstrap';
import { categoryService } from '../../services/api';

const CategoryManagement = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [currentCategory, setCurrentCategory] = useState({ name: '', description: '' });
    const [submitting, setSubmitting] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const res = await categoryService.getCategories();
            setCategories(res.data.data || []);
        } catch (err) {
            setError('Failed to fetch categories.');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id, name) => {
        if (window.confirm(`Are you sure you want to delete category "${name}"? \n\nWARNING: This might affect projects associated with this category.`)) {
            try {
                await categoryService.deleteCategory(id);
                setCategories(categories.filter(c => c._id !== id));
            } catch (err) {
                alert('Failed to delete category.');
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            if (currentCategory._id) {
                await categoryService.updateCategory(currentCategory._id, currentCategory);
            } else {
                await categoryService.createCategory(currentCategory);
            }
            fetchData();
            setShowModal(false);
            resetForm();
        } catch (err) {
            alert('Failed to save category.');
        } finally {
            setSubmitting(false);
        }
    };

    const resetForm = () => {
        setCurrentCategory({ name: '', description: '' });
    };

    const openModal = (category = null) => {
        if (category) {
            setCurrentCategory(category);
        } else {
            resetForm();
        }
        setShowModal(true);
    };

    const filteredCategories = categories.filter(c =>
        c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (c.description && c.description.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    if (loading) return (
        <div className="d-flex justify-content-center p-5">
            <Spinner animation="border" />
        </div>
    );

    return (
        <div className="fade-in">
            <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4 gap-3">
                <h4 className="fw-bold mb-0">Manage Categories</h4>
                <Button variant="dark" className="rounded-0 px-4" onClick={() => openModal()}>
                    <i className="bi bi-plus-lg me-2"></i> Add New Category
                </Button>
            </div>

            <Card className="border-0 shadow-sm rounded-0 mb-4">
                <Card.Body className="p-3">
                    <InputGroup>
                        <InputGroup.Text className="bg-white border-end-0 rounded-0 ps-3">
                            <i className="bi bi-search text-muted"></i>
                        </InputGroup.Text>
                        <Form.Control
                            placeholder="Search categories..."
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
                            <th className="border-0 py-3 px-4 text-muted small text-uppercase">Name</th>
                            <th className="border-0 py-3 px-4 text-muted small text-uppercase">Description</th>
                            <th className="border-0 py-3 px-4 text-muted small text-uppercase text-end">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredCategories.length > 0 ? (
                            filteredCategories.map(c => (
                                <tr key={c._id}>
                                    <td className="px-4 py-3 fw-bold">{c.name}</td>
                                    <td className="px-4 py-3 text-muted small">{c.description || '-'}</td>
                                    <td className="px-4 py-3 text-end">
                                        <div className="d-flex justify-content-end gap-2">
                                            <Button variant="outline-dark" size="sm" className="rounded-0" onClick={() => openModal(c)}>
                                                <i className="bi bi-pencil"></i>
                                            </Button>
                                            <Button variant="outline-danger" size="sm" className="rounded-0" onClick={() => handleDelete(c._id, c.name)}>
                                                <i className="bi bi-trash"></i>
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="3" className="text-center py-5 text-muted">No categories found matching your search.</td>
                            </tr>
                        )}
                    </tbody>
                </Table>
            </Card>

            <Modal show={showModal} onHide={() => setShowModal(false)} centered className="rounded-0">
                <Modal.Header closeButton className="border-0 pb-0">
                    <Modal.Title className="fw-bold">{currentCategory._id ? 'Edit Category' : 'Add New Category'}</Modal.Title>
                </Modal.Header>
                <Modal.Body className="p-4">
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label className="small fw-bold text-uppercase text-muted">Name</Form.Label>
                            <Form.Control
                                type="text"
                                value={currentCategory.name}
                                onChange={(e) => setCurrentCategory({ ...currentCategory, name: e.target.value })}
                                className="rounded-0 p-3 shadow-none border-secondary-subtle"
                                placeholder="e.g. Residential, Commercial"
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-4">
                            <Form.Label className="small fw-bold text-uppercase text-muted">Description</Form.Label>
                            <Form.Control
                                as="textarea" rows={3}
                                value={currentCategory.description}
                                onChange={(e) => setCurrentCategory({ ...currentCategory, description: e.target.value })}
                                className="rounded-0 p-3 shadow-none border-secondary-subtle"
                                placeholder="Optional description..."
                            />
                        </Form.Group>
                        <div className="d-flex justify-content-end gap-2 pt-3 border-top">
                            <Button variant="light" onClick={() => setShowModal(false)} className="rounded-0 px-4">Cancel</Button>
                            <Button variant="dark" type="submit" className="rounded-0 px-4 fw-bold" disabled={submitting}>
                                {submitting ? <Spinner animation="border" size="sm" /> : (currentCategory._id ? 'Save Changes' : 'Create Category')}
                            </Button>
                        </div>
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default CategoryManagement;
