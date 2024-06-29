import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, GeoJSON } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const tutelleColors = {
  MENJ: "#ff7f00",
  MESR: "#377eb8",
  MSJOP: "#4daf4a",
  "Non spécifié": "#999999"
};

const createCustomIcon = (color) => {
  return L.divIcon({
    html: `<div style="
      background-color: ${color};
      width: 20px;
      height: 20px;
      border-radius: 50%;
      border: 2px solid white;
    "></div>`,
    className: "custom-marker",
    iconSize: [24, 24],
    iconAnchor: [12, 12],
    popupAnchor: [0, -12]
  });
};

const FranceMap = () => {
  const [establishments, setEstablishments] = useState([]);
  const [regionsGeoJSON, setRegionsGeoJSON] = useState(null);

useEffect(() => {
  fetch(`${process.env.PUBLIC_URL}/geocoded_data.json`)
    .then(response => response.json())
    .then(data => setEstablishments(data));
  
  fetch(`${process.env.PUBLIC_URL}/france-region.json`)
    .then(response => response.json())
    .then(data => setRegionsGeoJSON(data));
}, []);

  const regionStyle = {
    fillColor: "#FED976",
    weight: 2,
    opacity: 1,
    color: 'white',
    dashArray: '3',
    fillOpacity: 0.1
  };

  return (
    <div style={{ display: 'flex', height: '90vh' }}>
      <MapContainer center={[46.603354, 1.888334]} zoom={6} style={{ height: '100%', width: '80%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {regionsGeoJSON && <GeoJSON data={regionsGeoJSON} style={regionStyle} />}
        {establishments.map((estab, index) => (
          estab.lat && estab.lon ? (
            <Marker 
              key={index} 
              position={[estab.lat, estab.lon]}
              icon={createCustomIcon(tutelleColors[estab.original_Tutelle] || tutelleColors["Non spécifié"])}
            >
              <Popup>
                <div>
                  <h3>{estab.original_NOM}</h3>
                  <p>Ministère de tutelle : {estab.original_Tutelle || 'Non spécifié'}</p>
                  <p>Nombre d'établissements ouverts : {estab['original_Nombre ETB actif'] || 'Non spécifié'}</p>
                </div>
              </Popup>
            </Marker>
          ) : null
        ))}
      </MapContainer>
      <div style={{ width: '20%', padding: '20px', overflowY: 'auto' }}>
        <h2>Légende</h2>
        {Object.entries(tutelleColors).map(([tutelle, color]) => (
          <div key={tutelle} style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
            <div style={{ width: '20px', height: '20px', borderRadius: '50%', backgroundColor: color, marginRight: '10px', border: '2px solid white' }}></div>
            <span>{tutelle}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FranceMap;