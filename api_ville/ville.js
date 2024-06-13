const express = require('express');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/cities', async (req, res) => {
    const { zipcode } = req.query;

    if (!zipcode || typeof zipcode !== 'string') {
        return res.status(400).json({
            success: false,
            error: 'Vuillez vérifier si le zipcode est manquant ou invalide.'
        });
    }

    try {
        const response = await axios.get(`https://geo.api.gouv.fr/communes?codePostal=${zipcode}`);
        const cities = response.data.map(city => city.nom);

        return res.json({
            success: true,
            cities
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: 'Un erreur se produit lors de la récupération des données.'
        });
    }
});
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
