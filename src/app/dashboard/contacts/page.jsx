'use client';
import { useEffect, useState } from 'react';
import ContactModal from '@/components/ContactModal';
import Sidebar from '@/components/Sidebar';
import Navbar from '@/components/Navbar';

export default function ContactsPage() {
    const [contacts, setContacts] = useState([]);
    const [selectedContact, setSelectedContact] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        fetchContacts();
    }, []);

    const fetchContacts = async () => {
        try {
            const res = await fetch('/api/contacts');
            const data = await res.json();
            setContacts(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error('Error fetching contacts:', error);
            setContacts([]);
        }
    };

    const handleContactClick = (contact) => {
        setSelectedContact(contact);
        setIsModalOpen(true);
    };

    const handleComplete = async () => {
        try {
            await fetch(`/api/contacts/${selectedContact._id}`, {
                method: 'PUT',
            });
            setIsModalOpen(false);
            fetchContacts(); // Refresh the list
        } catch (error) {
            console.error('Error completing contact:', error);
        }
    };

    return (
        <div className="d-flex flex-column flex-lg-row min-vh-100 bg-light">
            <Sidebar />
            <div className="flex-fill main-content">
                <Navbar />
                <main className="p-3 p-lg-4" style={{ marginTop: '56px' }}>
                    <div className="container-fluid">
                        <h1 className="h2 fw-bold mb-4 text-primary">Demandes de contact</h1>
                        <div className="card shadow-sm">
                            <div className="card-body p-0 text-primary">
                                <div className="table-responsive">
                                    <table className="table table-hover mb-0">
                                        <thead className="table-light">
                                        <tr>
                                            <th scope="col" className="px-4 py-3 text-uppercase fw-semibold text-primary small">
                                                Nom
                                            </th>
                                            <th scope="col" className="px-4 py-3 text-uppercase fw-semibold text-primary small">
                                                Email
                                            </th>
                                            <th scope="col" className="px-4 py-3 text-uppercase fw-semibold text-primary small">
                                                Téléphone
                                            </th>
                                            <th scope="col" className="px-4 py-3 text-uppercase fw-semibold text-primary small">
                                                Type
                                            </th>
                                            <th scope="col" className="px-4 py-3 text-uppercase fw-semibold text-primary small">
                                                Date
                                            </th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {contacts.map((contact) => (
                                            <tr
                                                key={contact._id}
                                                className="cursor-pointer"
                                                style={{ cursor: 'pointer' }}
                                                onClick={() => handleContactClick(contact)}
                                            >
                                                <td className="px-4 py-3">
                                                    <div className="d-flex align-items-center">
                                                        <div
                                                            className="bg-primary text-white d-flex align-items-center justify-content-center me-3"
                                                            style={{
                                                                width: '40px',
                                                                height: '40px',
                                                                fontSize: '14px',
                                                                borderRadius: '50%',
                                                                flexShrink: 0,
                                                            }}
                                                        >
                                                            {contact.fullName.charAt(0).toUpperCase()}
                                                        </div>
                                                        <span className="fw-medium">{contact.fullName}</span>
                                                    </div>
                                                </td>

                                                <td className="px-4 py-3">
                                                    <a
                                                        href={`mailto:${contact.email}`}
                                                        className="text-decoration-none text-primary"
                                                        onClick={(e) => e.stopPropagation()}
                                                    >
                                                        {contact.email}
                                                    </a>
                                                </td>
                                                <td className="px-4 py-3">
                                                    <a
                                                        href={`tel:${contact.phoneNumber}`}
                                                        className="text-decoration-none text-dark"
                                                        onClick={(e) => e.stopPropagation()}
                                                    >
                                                        {contact.phoneNumber}
                                                    </a>
                                                </td>
                                                <td className="px-4 py-3">
                                                        <span
                                                            className={`badge rounded-pill px-3 py-2 ${
                                                                contact.type === 'contact'
                                                                    ? 'text-white bg-secondary bg-opacity-10'
                                                                    : 'text-white bg-primary bg-opacity-10'
                                                            }`}
                                                        >
                                                            {contact.type === 'contact' ? 'Contact' : 'Consultation'}
                                                        </span>
                                                </td>
                                                <td className="px-4 py-3 text-muted">
                                                    {new Date(contact.createdAt).toLocaleDateString('fr-FR', {
                                                        day: '2-digit',
                                                        month: '2-digit',
                                                        year: 'numeric'
                                                    })}
                                                </td>
                                            </tr>
                                        ))}
                                        {contacts.length === 0 && (
                                            <tr>
                                                <td colSpan="5" className="text-center py-5 text-secondary">
                                                    <i className="bi bi-inbox display-4 d-block mb-3"></i>
                                                    <p className="mb-0">Aucune demande de contact pour le moment</p>
                                                </td>
                                            </tr>
                                        )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>

            {isModalOpen && (
                <ContactModal
                    contact={selectedContact}
                    onClose={() => setIsModalOpen(false)}
                    onComplete={handleComplete}
                />
            )}
        </div>
    );
}