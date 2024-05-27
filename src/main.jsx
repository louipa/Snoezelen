import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import Sidebar from './components/sidebar.tsx';

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <Sidebar />
        <App />
    </React.StrictMode>
);
