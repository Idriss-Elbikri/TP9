import React, { useState } from 'react';
import axios from 'axios';
import API_BASE_URL from '../config';

function CompteForm() {
    const [compte, setCompte] = useState({
        solde: '',
        dateCreation: '',
        type: 'COURANT', // ✅ valeur par défaut valide
    });

    const handleChange = (e) => {
        setCompte({ ...compte, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Sécuriser les types envoyés
        const payload = {
            solde: compte.solde === '' ? null : Number(compte.solde),
            dateCreation: compte.dateCreation || null, // "YYYY-MM-DD"
            type: compte.type, // "COURANT" | "EPARGNE"
        };

        if (!payload.type) {
            alert('Choisissez un type de compte');
            return;
        }

        try {
            await axios.post(`${API_BASE_URL}/comptes`, payload);
            alert('Compte ajouté');
            setCompte({ solde: '', dateCreation: '', type: 'COURANT' });
        } catch (error) {
            console.error(error);
            alert("Erreur lors de l'ajout du compte");
        }
    };

    return (
        <div className="container mt-4">
            <h2>Ajouter un Compte</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label>Solde</label>
                    <input
                        type="number"
                        name="solde"
                        className="form-control"
                        value={compte.solde}
                        onChange={handleChange}
                        required
                        step="0.01"
                    />
                </div>
                <div className="mb-3">
                    <label>Date de Création</label>
                    <input
                        type="date"
                        name="dateCreation"
                        className="form-control"
                        value={compte.dateCreation}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label>Type</label>
                    <select
                        name="type"
                        className="form-select"
                        value={compte.type}
                        onChange={handleChange}
                        required
                    >
                        <option value="COURANT">Courant</option>
                        <option value="EPARGNE">Épargne</option>
                    </select>
                </div>
                <button type="submit" className="btn btn-primary">Ajouter</button>
            </form>
        </div>
    );
}

export default CompteForm;