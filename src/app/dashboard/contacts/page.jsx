'use client';
import { useEffect, useState } from 'react';
import ContactModal from '@/components/ContactModal';
import Sidebar from '@/components/Sidebar';
import Navbar from '@/components/Navbar';
import { useToast } from '@/hooks/use-toast';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

export default function ContactsPage() {
    const [contacts, setContacts] = useState([]);
    const [filteredContacts, setFilteredContacts] = useState([]);
    const [selectedContact, setSelectedContact] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const { toast } = useToast();

    // État pour la pagination
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    useEffect(() => {
        fetchContacts();
    }, []);

    useEffect(() => {
        // Filtrer les contacts lorsque searchTerm ou contacts changent
        const filtered = contacts.filter(contact =>
            contact.fullName.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredContacts(filtered);
        setCurrentPage(1); // Réinitialiser à la première page lors d'une nouvelle recherche
    }, [searchTerm, contacts]);

    // Calcul des contacts paginés
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredContacts.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredContacts.length / itemsPerPage);

    const fetchContacts = async () => {
        try {
            setIsLoading(true);
            const res = await fetch('/api/contacts');
            const data = await res.json();
            setContacts(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error('Error fetching contacts:', error);
            setContacts([]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleContactClick = (contact) => {
        setSelectedContact(contact);
        setIsModalOpen(true);
    };

    const handleComplete = async () => {
        try {
            const response = await fetch(`/api/contacts/${selectedContact._id}`, {
                method: 'PUT',
            });

            if (!response.ok) {
                throw new Error('Erreur lors du traitement du contact');
            }

            setIsModalOpen(false);
            await fetchContacts();

            toast({
                title: 'Succès',
                description: 'Le contact a été marqué comme traité avec succès.',
                variant: 'default',
            });
        } catch (error) {
            console.error('Error completing contact:', error);
            toast({
                title: 'Échec',
                description: error.message || 'Une erreur est survenue lors du traitement du contact',
                variant: 'destructive',
            });
        }
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    // Fonctions de pagination
    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    const nextPage = () => setCurrentPage(prev => Math.min(prev + 1, totalPages));
    const prevPage = () => setCurrentPage(prev => Math.max(prev - 1, 1));

    // Skeleton loader component
    const SkeletonRow = () => (
        <tr className="animate-pulse">
            <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-200"></div>
                    <div className="ml-3">
                        <div className="h-4 bg-gray-200 rounded w-32"></div>
                    </div>
                </div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
                <div className="h-4 bg-gray-200 rounded w-40"></div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
                <div className="h-4 bg-gray-200 rounded w-24"></div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
                <div className="h-6 bg-gray-200 rounded-full w-20"></div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
                <div className="h-4 bg-gray-200 rounded w-20"></div>
            </td>
        </tr>
    );

    return (
        <div className="flex flex-col lg:flex-row min-h-screen bg-gray-50">
            <Sidebar />
            <div className="flex-1">
                <Navbar />
                <main className="p-4 lg:p-6 mt-14">
                    <div className="container mx-auto">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
                            <h1 className="text-2xl font-bold text-primary">Demandes de contact</h1>

                            {/* Barre de recherche */}
                            <div className="relative w-full md:w-64">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                                <Input
                                    type="text"
                                    className="w-full pl-10 pr-4 py-2 border-gray-200 focus:border-primary focus:ring-primary transition-colors"
                                    placeholder="Rechercher par nom..."
                                    value={searchTerm}
                                    onChange={handleSearchChange}
                                />
                            </div>
                        </div>

                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                    <tr>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Nom
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Email
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Téléphone
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Type
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Date
                                        </th>
                                    </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                    {isLoading ? (
                                        // Show 5 skeleton rows while loading
                                        Array(5).fill(0).map((_, index) => (
                                            <SkeletonRow key={index} />
                                        ))
                                    ) : (
                                        // Show actual data when loaded
                                        <>
                                            {currentItems.map((contact) => (
                                                <tr
                                                    key={contact._id}
                                                    className="hover:bg-gray-50 cursor-pointer"
                                                    onClick={() => handleContactClick(contact)}
                                                >
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="flex items-center">
                                                            <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center rounded-full bg-primary/10 text-primary font-medium">
                                                                {contact.fullName.charAt(0).toUpperCase()}
                                                            </div>
                                                            <div className="ml-3">
                                                                <span className="font-medium text-gray-900">{contact.fullName}</span>
                                                            </div>
                                                        </div>
                                                    </td>

                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <a
                                                            href={`mailto:${contact.email}`}
                                                            className="text-primary hover:underline"
                                                            onClick={(e) => e.stopPropagation()}
                                                        >
                                                            {contact.email}
                                                        </a>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <a
                                                            href={`tel:${contact.phoneNumber}`}
                                                            className="text-gray-900 hover:underline"
                                                            onClick={(e) => e.stopPropagation()}
                                                        >
                                                            {contact.phoneNumber}
                                                        </a>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                            <span
                                                                className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                                                                    contact.type === 'contact'
                                                                        ? 'bg-gray-100 text-gray-800'
                                                                        : 'bg-primary/10 text-primary'
                                                                }`}
                                                            >
                                                                {contact.type === 'contact' ? 'Contact' : 'Consultation'}
                                                            </span>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                                                        {new Date(contact.createdAt).toLocaleDateString('fr-FR', {
                                                            day: '2-digit',
                                                            month: '2-digit',
                                                            year: 'numeric'
                                                        })}
                                                    </td>
                                                </tr>
                                            ))}
                                            {filteredContacts.length === 0 && (
                                                <tr>
                                                    <td colSpan={5} className="px-6 py-12 text-center">
                                                        <div className="flex flex-col items-center justify-center text-gray-400">
                                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                                                            </svg>
                                                            <p className="text-sm">
                                                                {searchTerm ?
                                                                    'Aucun résultat trouvé pour votre recherche' :
                                                                    'Aucune demande de contact pour le moment'}
                                                            </p>
                                                        </div>
                                                    </td>
                                                </tr>
                                            )}
                                        </>
                                    )}
                                    </tbody>
                                </table>
                            </div>

                            {/* Pagination */}
                            {filteredContacts.length > 0 && !isLoading && (
                                <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200">
                                    <div className="text-sm text-gray-500">
                                        Affichage de <span className="font-medium">{indexOfFirstItem + 1}</span> à{' '}
                                        <span className="font-medium">
                                            {Math.min(indexOfLastItem, filteredContacts.length)}
                                        </span>{' '}
                                        sur <span className="font-medium">{filteredContacts.length}</span> résultats
                                    </div>
                                    <div className="flex space-x-2">
                                        <button
                                            onClick={prevPage}
                                            disabled={currentPage === 1}
                                            className={`px-3 py-1 rounded-md border ${currentPage === 1 ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
                                        >
                                            Précédent
                                        </button>
                                        <div className="flex space-x-1">
                                            {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
                                                <button
                                                    key={number}
                                                    onClick={() => paginate(number)}
                                                    className={`px-3 py-1 rounded-md ${currentPage === number ? 'bg-primary text-white' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
                                                >
                                                    {number}
                                                </button>
                                            ))}
                                        </div>
                                        <button
                                            onClick={nextPage}
                                            disabled={currentPage === totalPages}
                                            className={`px-3 py-1 rounded-md border ${currentPage === totalPages ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
                                        >
                                            Suivant
                                        </button>
                                    </div>
                                </div>
                            )}
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