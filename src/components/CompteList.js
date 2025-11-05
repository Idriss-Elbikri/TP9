import React, { useState, useEffect } from 'react';
import axios from 'axios';
import API_BASE_URL from '../config';

function CompteList() {
    const [comptes, setComptes] = useState([]);

    useEffect(() => {
        const load = async () => {
            try {
                const res = await axios.get(`${API_BASE_URL}/comptes`);
                // Si c'est Spring Data REST : { _embedded: { comptes: [...] } }
                const data = Array.isArray(res.data)
                    ? res.data
                    : (res.data && res.data._embedded && res.data._embedded.comptes) || [];
                setComptes(data);
            } catch (error) {
                console.error(error);
            }
        };
        load();
    }, []);

    // Petite mise en forme de la date (si string "YYYY-MM-DD")
    const fmt = (d) => (typeof d === 'string' ? d : d?.toString?.() ?? '');

    return (
        <div className="container mt-4">
            <h2>Liste des Comptes</h2>
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Solde</th>
                        <th>Date de Création</th>
                        <th>Type</th>
                    </tr>
                </thead>
                <tbody>
                    {comptes.map((compte) => (
                        <tr key={compte.id}>
                            <td>{compte.id}</td>
                            <td>{compte.solde}</td>
                            <td>{fmt(compte.dateCreation)}</td>
                            <td>{compte.type}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default CompteList;