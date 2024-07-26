// src/components/EditDeck.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { readDeck, updateDeck } from '../utils/api';
import '../deck.css'; // Import the CSS file for styling
import '../style.css';

function EditDeck() {
    const { deckId } = useParams();
    const [deck, setDeck] = useState(null);
    const [formData, setFormData] = useState({ name: '', description: '' });
    const navigate = useNavigate();

    useEffect(() => {
        const loadDeck = async () => {
            const deck = await readDeck(deckId);
            setDeck(deck);
            setFormData({ name: deck.name, description: deck.description });
        };
        loadDeck();
    }, [deckId]);

    const handleChange = ({ target }) => {
        const { name, value } = target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        await updateDeck({ id: deckId, ...formData });
        navigate(`/decks/${deckId}`);
    };

    const handleCancel = () => {
        navigate(`/decks/${deckId}`);
    };

    if (!deck) return <div>Loading...</div>;

    return (
        <div>
            <nav>
                <Link to="/">Home</Link> / {deck.name} / Edit Deck
            </nav>
            <h1>Edit Deck</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="name">Name</label>
                <input
                    id="name"
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />
                <label htmlFor="description">Description</label>
                <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                />
                <button type="submit">Submit</button>
                <button type="button" onClick={handleCancel}>Cancel</button>
            </form>
        </div>
    );
}

export default EditDeck;
