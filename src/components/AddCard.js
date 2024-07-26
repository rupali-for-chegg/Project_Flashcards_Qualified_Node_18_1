// src/components/CreateCard.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { createCard, readDeck } from '../utils/api';
import CardForm from './CardForm';
import '../style.css';

function AddCard() {
    const { deckId } = useParams();
    const [formData, setFormData] = useState({ front: '', back: '' });
    const navigate = useNavigate();
    const [deck, setDeck] = useState({ name: '' });

    useEffect(() => {
        const abortController = new AbortController();

        const loadDeck = async () => {
            try {
                const fetchedDeck = await readDeck(deckId, abortController.signal);
                setDeck(fetchedDeck);
            } catch (error) {
                console.error(error);
            }
        };

        loadDeck();

        return () => abortController.abort();
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
        const abortController = new AbortController();
        try {
            await createCard(
                {
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

    return (
        <div>
            <nav>
                <Link to="/">Home</Link> / <Link to={`/decks/${deckId}`}>{deck.name}</Link> / Add Card
            </nav>
            <h1>Add Card</h1>
            <CardForm
                formData={formData}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                handleCancel={handleCancel}
            />
        </div>
    );
}

export default AddCard;
