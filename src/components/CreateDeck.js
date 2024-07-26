import React, { useState } from 'react';
import { createDeck } from '../utils/api';
import { useNavigate } from 'react-router-dom';
import '../style.css';

function CreateDeck() {
    const [deck, setDeck] = useState({ name: 'Deck Name', description: 'Deck Description' });
    const navigate = useNavigate(); // Correctly use navigate

    const handleChange = ({ target }) => {
        const { name, value } = target;
        setDeck((prevDeck) => ({
            ...prevDeck,
            [name]: value,
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const newDeck = await createDeck(deck);
            navigate(`/decks/${newDeck.id}`); // Use navigate for routing
        } catch (error) {
            console.error('Error creating deck:', error);
        }
    };

    return (
        <div className="create-deck-container">
            <nav aria-label="breadcrumb" className="breadcrumb-nav">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><a href="/">Home</a></li>
                    <li className="breadcrumb-item active" aria-current="page">Create Deck</li>
                </ol>
            </nav>
            <h1 className="page-title">Create Deck</h1>
            <form onSubmit={handleSubmit} className="create-deck-form">
                <div className="form-group">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input
                        id="name"
                        type="text"
                        className="form-input"
                        name="name"
                        value={deck.name}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="description" className="form-label">Description</label>
                    <textarea
                        id="description"
                        className="form-input"
                        name="description"
                        value={deck.description}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-buttons">
                    <button type="submit" className="btn btn-primary">Submit</button>
                    <button type="button" onClick={() => navigate('/')} className="btn btn-secondary">Cancel</button>
                </div>
            </form>
        </div>
    );
}

export default CreateDeck;
