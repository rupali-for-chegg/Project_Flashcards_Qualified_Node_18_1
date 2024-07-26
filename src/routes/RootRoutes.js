// src/routes/RootRoutes.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '../components/Home';
import Study from '../components/Study';
import CreateDeck from '../components/CreateDeck';
import Deck from '../components/Deck';
import EditDeck from '../components/EditDeck';
import AddCard from '../components/AddCard';
import EditCard from '../components/EditCard';
import NotFound from '../components/NotFound';
import Layout from "../Layout";

function RootRoutes() {
    return (

            <Routes>
                <Route path="/" element={<Home />} />
                 <Route path="/decks/new" element={<CreateDeck />} />
                <Route path="/decks/:deckId/study" element={<Study />} />
                <Route path="/decks/:deckId/edit" element={<EditDeck />} />
                <Route path="/decks/:deckId/cards/new" element={<AddCard />} />
                <Route path="/decks/:deckId/cards/:cardId/edit" element={<EditCard />} />
                <Route path="/decks/:deckId" element={<Deck />} />
                <Route path="*" element={<NotFound />} />
            </Routes>

    );
}

export default RootRoutes;