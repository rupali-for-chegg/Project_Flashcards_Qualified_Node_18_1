import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { listDecks, deleteDeck } from '../utils/api';
import '../style.css'; // Import the CSS file for styling

function Home() {
    const [decks, setDecks] = useState([]);
    const navigate = useNavigate(); // Use useNavigate

    useEffect(() => {
        const loadDecks = async () => {
            const decksFromAPI = await listDecks();
            setDecks(decksFromAPI);
        };
        loadDecks();
    }, []);

    const handleDelete = async (deckId) => {
        if (window.confirm('Are you sure you want to delete this deck?')) {
            await deleteDeck(deckId);
            setDecks(decks.filter(deck => deck.id !== deckId));
        }
    };

    return (
        <div className="home-container">
            <h1 className="home-title">Home</h1>
            <Link to="/decks/new" className="create-deck-link">Create Deck</Link>
            <div className="deck-grid">
                {decks.map((deck) => (
                    <div key={deck.id} className="deck-card">
                        <h3>{deck.name}</h3>
                        <p>{deck.description}</p>
                        <p>{deck.cards.length} cards</p>
                        <div className="deck-actions">
                            <Link to={`/decks/${deck.id}/study`} className="link">Study</Link>
                            <Link to={`/decks/${deck.id}`} className="link">View</Link>
                            <button onClick={() => handleDelete(deck.id)} className="btn btn-delete">Delete</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Home;
