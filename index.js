const express = require('express');
const axios = require('axios');

const app = express();
const port = 3000;
// Cette ligne est essentielle pour lire le JSON du body
app.use(express.json());

const gatewayUrl = process.env.GATEWAY_URL || 'http://localhost:8080';

// Fonction de filtrage par species et powerLevel
function recommendAnimals(animals, preferences) {
console.log('Animaux disponibles :', animals);
console.log('Préférences reçues :', preferences);
  return animals.filter(a =>
    a.species === preferences.species &&
    a.powerLevel <= preferences.powerLevel
  );
}

// Endpoint de recommandation
app.post('/recommendations/animals', async (req, res) => {
  const preferences = req.body; // { species: "Chien", powerLevel: 5 }

  try {
    const response = await axios.get(`${gatewayUrl}/pets`);
    const animals = response.data;
    const recommended = recommendAnimals(animals, preferences);
    res.json(recommended);
  } catch (error) {
    console.error('Erreur recommandation :', error.message);
    res.status(500).json({ error: 'Impossible de récupérer les recommandations' });
  }
});





app.listen(port, () => {
  console.log(`Microservice Node.js lancé sur http://localhost:${port}`);
});
