import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import "../src/style/index.css"
import RootContext from './context/RootContext';
import { BrowserRouter } from 'react-router-dom';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <RootContext>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </RootContext>

);
