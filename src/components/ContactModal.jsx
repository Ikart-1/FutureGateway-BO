'use client';
import { useEffect, useState } from 'react';

export default function ContactModal({ contact, onClose, onComplete }) {
    const [isProcessing, setIsProcessing] = useState(false);

    const handleCompleteClick = async () => {
        setIsProcessing(true);
        try {
            await onComplete();
        } finally {
            setIsProcessing(false);
        }
    };

    if (!contact) return null;


    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center animate-fade-in">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl">
                <div className="p-6 border-b border-gray-200">
                    <h3 className="text-lg font-semibold text-primary">Détails du contact</h3>
                    <button
                        type="button"
                        className="absolute top-4 right-4 text-gray-400 hover:text-gray-500"
                        onClick={onClose}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <div className="p-6 space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-primary mb-1">Nom complet</label>
                        <div className="bg-gray-50 p-2 rounded-md">{contact.fullName}</div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-primary mb-1">Email</label>
                            <div className="bg-gray-50 p-2 rounded-md">{contact.email}</div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-primary mb-1">Téléphone</label>
                            <div className="bg-gray-50 p-2 rounded-md">{contact.phoneNumber}</div>
                        </div>
                    </div>

                    {contact.studyLevel && (
                        <div>
                            <label className="block text-sm font-medium text-primary mb-1">Niveau d'étude</label>
                            <div className="bg-gray-50 p-2 rounded-md">{contact.studyLevel}</div>
                        </div>
                    )}

                    <div>
                        <label className="block text-sm font-medium text-primary mb-1">Message</label>
                        <div className="bg-gray-50 p-3 rounded-md min-h-[100px]">
                            {contact.message}
                        </div>
                    </div>
                </div>

                <div className="p-4 border-t border-gray-200 flex justify-end space-x-3">
                    <button
                        type="button"
                        className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 flex items-center justify-center min-w-[180px]"
                        onClick={handleCompleteClick}
                        disabled={isProcessing}
                    >
                        {isProcessing ? (
                            <>
                                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Traitement...
                            </>
                        ) : (
                            'Marquer comme traité'
                        )}
                    </button>
                    <button
                        type="button"
                        className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
                        onClick={onClose}
                        disabled={isProcessing}
                    >
                        Fermer
                    </button>
                </div>
            </div>
        </div>
    );
}