import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';  // Importer le composant principal App
import { BrowserRouter as Router } from 'react-router-dom';  // Utiliser Router pour la gestion des routes
import './index.css';  // Ajouter ton fichier CSS global (si nécessaire)

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById('root')  // Rendre l'application dans l'élément avec l'id "root"
);
