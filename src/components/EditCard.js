// src/components/EditCard.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { readCard, updateCard, readDeck } from '../utils/api';
import CardForm from './CardForm';
import '../style.css';

function EditCard() {
    const { deckId, cardId } = useParams();
    const [card, setCard] = useState(null);
    const [formData, setFormData] = useState({ front: '', back: '' });
    const navigate = useNavigate();
    const [deck, setDeck] = useState({ name: '' });

    useEffect(() => {
        const abortController = new AbortController();

        const loadCard = async () => {
            try {
                const fetchedCard = await readCard(cardId, abortController.signal);
                setCard(fetchedCard);
                setFormData({ front: fetchedCard.front, back: fetchedCard.back });
                const fetchedDeck = await readDeck(deckId, abortController.signal);
                setDeck(fetchedDeck);
            } catch (error) {
                console.error(error);
            }
        };

        loadCard();

        return () => abortController.abort();
    }, [cardId, deckId]);

    const handleChange = ({ target }) => {
        const { name, value } = target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const abortController = new AbortController();
        try {
            await updateCard(
                {
                    id: cardId,
                    deckId: Number(deckId),
                    ...formData,
                },
                abortController.signal
            );
            navigate(`/decks/${deckId}`);
        } catch (error) {
            console.error(error);
        }
    };

    const handleCancel = () => {
        navigate(`/decks/${deckId}`);
    };

    if (!card) return <div>Loading...</div>;

    return (
        <div>
            <nav>
                <Link to="/">Home</Link> / <Link to={`/decks/${deckId}`}>{deck.name}</Link> / Edit Card
            </nav>
            <h1>Edit Card</h1>
            <CardForm
                formData={formData}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                handleCancel={handleCancel}
            />
        </div>
    );
}

export default EditCard;
