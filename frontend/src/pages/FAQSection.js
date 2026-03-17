import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import { FaHouse, FaChevronDown, FaChevronUp } from 'react-icons/fa6';
import '../Style/FAQSection.css';

const faqs = [
    {
        id: 1,
        question: 'Do you handle both and commercial projects?',
        answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur sem turpis, fermentum ac felis non, pretium cursus lectus.',
    },
    {
        id: 2,
        question: 'What is included in your architectural services?',
        answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur sem turpis, fermentum ac felis non, pretium cursus lectus.',
    },
    {
        id: 3,
        question: 'Will you assist during construction?',
        answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur sem turpis, fermentum ac felis non, pretium cursus lectus.',
    },
    {
        id: 4,
        question: 'How do I get started with you?',
        answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur sem turpis, fermentum ac felis non, pretium cursus lectus.',
    },
    {
        id: 5,
        question: 'How long does an architectural project take?',
        answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur sem turpis, fermentum ac felis non, pretium cursus lectus.',
    },
    {
        id: 6,
        question: 'Do you provide 3D visualizations of the design?',
        answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur sem turpis, fermentum ac felis non, pretium cursus lectus.',
    },
    {
        id: 7,
        question: 'Can you design within my budget?',
        answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur sem turpis, fermentum ac felis non, pretium cursus lectus.',
    },
    {
        id: 8,
        question: 'Do you handle both and commercial projects?',
        answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur sem turpis, fermentum ac felis non, pretium cursus lectus.',
    },
];

const FAQSection = () => {
    const [activeId, setActiveId] = useState(null);

    const toggleFAQ = (id) => {
        setActiveId(activeId === id ? null : id);
    };

    return (
        <section className="faq-section">
            <Container>
                {/* Header */}
                <div className="faq-header">
                    <div className="faq-label-wrapper">
                        <FaHouse className="faq-label-icon" />
                        <span className="faq-label-text">FAQs</span>
                    </div>
                    <h2 className="faq-title">Common Questions About Our Services</h2>
                </div>

                {/* FAQ Grid */}
                <div className="faq-container">
                    <div className="faq-column">
                        {faqs.slice(0, Math.ceil(faqs.length / 2)).map((faq) => (
                            <div
                                key={faq.id}
                                className={`faq-item ${activeId === faq.id ? 'active' : ''}`}
                            >
                                <div
                                    className="faq-question"
                                    onClick={() => toggleFAQ(faq.id)}
                                >
                                    <h4 className="faq-question-text">{faq.question}</h4>
                                    {activeId === faq.id ? (
                                        <FaChevronUp className="faq-icon" />
                                    ) : (
                                        <FaChevronDown className="faq-icon" />
                                    )}
                                </div>
                                <div className="faq-answer">
                                    <p className="faq-answer-text">{faq.answer}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="faq-column">
                        {faqs.slice(Math.ceil(faqs.length / 2)).map((faq) => (
                            <div
                                key={faq.id}
                                className={`faq-item ${activeId === faq.id ? 'active' : ''}`}
                            >
                                <div
                                    className="faq-question"
                                    onClick={() => toggleFAQ(faq.id)}
                                >
                                    <h4 className="faq-question-text">{faq.question}</h4>
                                    {activeId === faq.id ? (
                                        <FaChevronUp className="faq-icon" />
                                    ) : (
                                        <FaChevronDown className="faq-icon" />
                                    )}
                                </div>
                                <div className="faq-answer">
                                    <p className="faq-answer-text">{faq.answer}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </Container>
        </section>
    );
};

export default FAQSection;
