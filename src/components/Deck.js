import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { readDeck, deleteDeck, deleteCard } from '../utils/api';
import '../deck.css'; // Import the CSS file for styling

function Deck() {
    const [deck, setDeck] = useState({});
    const [cards, setCards] = useState([]);
    const { deckId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const loadDeck = async () => {
            const loadedDeck = await readDeck(deckId);
            setDeck(loadedDeck);
            setCards(loadedDeck.cards);
        };
        loadDeck();
    }, [deckId]);

    const handleDeleteDeck = async () => {
        if (window.confirm('Are you sure you want to delete this deck?')) {
            await deleteDeck(deckId);
            navigate('/');
        }
    };

    const handleDeleteCard = async (cardId) => {
        if (window.confirm('Are you sure you want to delete this card?')) {
            await deleteCard(cardId);
            setCards(cards.filter((card) => card.id !== cardId));
        }
    };

    return (
        <div className="deck-container">
            <div className="deck-header">
                <h1 className="deck-title">{deck.name}</h1>
                <p className="deck-description">{deck.description}</p>
                <div className="deck-actions">
                    <Link to={`/decks/${deckId}/edit`} className="btn btn-primary">Edit Deck</Link>
                    <Link to={`/decks/${deckId}/study`} className="btn btn-secondary">Study</Link>
                    <Link to={`/decks/${deckId}/cards/new`} className="btn btn-primary">Add Cards</Link>
                    <button onClick={handleDeleteDeck} className="btn btn-danger">Delete Deck</button>
                </div>
            </div>

            <h2 className="cards-title">Cards</h2>
            <ul className="cards-list">
                {cards.map((card) => (
                    <li key={card.id} className="card-item">
                        <div className="card-content">
                            <p className="card-front">{card.front}</p>
                            <p className="card-back">{card.back}</p>
                        </div>
                        <div className="card-actions">
                            <Link to={`/decks/${deckId}/cards/${card.id}/edit`} className="btn btn-primary">Edit Card</Link>
                            <button onClick={() => handleDeleteCard(card.id)} className="btn btn-danger">Delete Card</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Deck;
