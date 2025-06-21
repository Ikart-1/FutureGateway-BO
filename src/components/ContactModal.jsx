'use client';

export default function ContactModal({ contact, onClose, onComplete }) {
    if (!contact) return null;

    return (
        <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
            <div className="modal-dialog modal-lg modal-dialog-centered ">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title text-primary">Détails du contact</h5>
                        <button type="button" className="btn-close" onClick={onClose}></button>
                    </div>

                    <div className="modal-body">
                        <div className="mb-3">
                            <label className="form-label fw-semibold text-primary">Nom complet</label>
                            <div className="form-control bg-light">{contact.fullName}</div>
                        </div>

                        <div className="row">
                            <div className="col-md-6 mb-3">
                                <label className="form-label fw-semibold text-primary">Email</label>
                                <div className="form-control bg-light">{contact.email}</div>
                            </div>
                            <div className="col-md-6 mb-3">
                                <label className="form-label fw-semibold text-primary">Téléphone</label>
                                <div className="form-control bg-light">{contact.phoneNumber}</div>
                            </div>
                        </div>

                        {contact.studyLevel && (
                            <div className="mb-3">
                                <label className="form-label fw-semibold text-primary">Niveau d'étude</label>
                                <div className="form-control bg-light">{contact.studyLevel}</div>
                            </div>
                        )}

                        <div className="mb-3">
                            <label className="form-label fw-semibold text-primary">Message</label>
                            <div className="form-control bg-light" style={{ minHeight: '100px' }}>
                                {contact.message}
                            </div>
                        </div>
                    </div>

                    <div className="modal-footer">
                        <button
                            type="button"
                            className="btn btn-light"
                            onClick={onComplete}
                        >
                            Marquer comme traité
                        </button>
                        <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={onClose}
                        >
                            Fermer
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
