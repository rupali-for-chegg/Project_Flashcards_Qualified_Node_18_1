import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { readDeck } from '../utils/api';
import '../style.css';

function Study() {
    const { deckId } = useParams();
    const [deck, setDeck] = useState(null);
    const [currentCardIndex, setCurrentCardIndex] = useState(0);
    const [isFlipped, setIsFlipped] = useState(false);

    useEffect(() => {
        const loadDeck = async () => {
            const data = await readDeck(deckId);
            setDeck(data);
        };
        loadDeck();
    }, [deckId]);

    const handleFlip = () => {
        setIsFlipped((prevState) => !prevState);
    };

    const handleNext = () => {
        setIsFlipped(false);
        setCurrentCardIndex((prevState) => (prevState + 1) % deck.cards.length);
    };

    if (!deck) {
        return <p>Loading...</p>;
    }

    if (deck.cards.length < 3) {
        return (
            <div>
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                        <li className="breadcrumb-item"><Link to={`/decks/${deck.id}`}>{deck.name}</Link></li>
                        <li className="breadcrumb-item active" aria-current="page">Study</li>
                    </ol>
                </nav>
                <h2>{deck.name}: Study</h2>
                <p>Not enough cards to study. You need at least 3 cards to study.</p>
                <Link to={`/decks/${deck.id}/cards/new`} className="btn btn-primary">Add Cards</Link>
            </div>
        );
    }

    const currentCard = deck.cards[currentCardIndex];

    return (
        <div>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                    <li className="breadcrumb-item"><Link to={`/decks/${deck.id}`}>{deck.name}</Link></li>
                    <li className="breadcrumb-item active" aria-current="page">Study</li>
                </ol>
            </nav>
            <h2>{deck.name}: Study</h2>
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">Card {currentCardIndex + 1} of {deck.cards.length}</h5>
                    <p className="card-text">{isFlipped ? currentCard.back : currentCard.front}</p>
                    <button onClick={handleFlip} className="btn btn-secondary">Flip</button>
                    {isFlipped && (
                        <button onClick={handleNext} className="btn btn-primary">Next</button>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Study;
