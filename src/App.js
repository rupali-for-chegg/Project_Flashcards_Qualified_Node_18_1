import React from 'react';
import { useRoutes } from 'react-router-dom';
import Home from './components/Home';
import Study from './components/Study';
import CreateDeck from './components/CreateDeck';
import Deck from './components/Deck';
import EditDeck from './components/EditDeck';
import AddCard from './components/AddCard';
import EditCard from './components/EditCard';
import NotFound from './components/NotFound';
import Layout from './Layout';

function App() {
    const routes = [
        {
            path: '/',
            element: <Layout />,
            children: [
                { path: '/', element: <Home /> },
                { path: '/decks/:deckId/study', element: <Study /> },
                { path: '/decks/new', element: <CreateDeck /> },
                { path: '/decks/:deckId', element: <Deck /> },
                { path: '/decks/:deckId/edit', element: <EditDeck /> },
                { path: '/decks/:deckId/cards/new', element: <AddCard /> },
                { path: '/decks/:deckId/cards/:cardId/edit', element: <EditCard /> },
                { path: '*', element: <NotFound /> }
            ]
        }
    ];

    const element = useRoutes(routes);

    return element;
}

export default App;
