import React from 'react';
import FranceMap from './FranceMap';

function App() {
  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <h1 style={{ textAlign: 'center', margin: '10px 0' }}>Carte interactive des établissements d'enseignement supérieur en France</h1>
      <FranceMap />
    </div>
  );
}

export default App;