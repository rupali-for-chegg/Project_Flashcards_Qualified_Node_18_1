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

        const fetchDeck = async () => {
            try {
                const deck = await readDeck(deckId, abortController.signal);
                setDeck(deck);
            } catch (error) {
                if (error.name === "AbortError") {
                    console.log("Fetch aborted");
                } else {
                    console.error("Failed to fetch deck:", error);
                }
            }
        };

        fetchDeck();

        return () => {
            abortController.abort();
        };
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
        await createCard(deckId, formData);
        setFormData({front: '', back: ''});
        //  navigate(`/decks/${deckId}`);
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
