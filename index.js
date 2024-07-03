const express = require('express');
const axios = require('axios');
const app = express();
const port = process.env.PORT || 3000;

app.get('/api/hello', async (req, res) => {
    const visitorName = req.query.visitor_name || 'Visitor';
    const clientIp = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

    try {
        const locationResponse = await axios.get(`https://ipapi.co/${clientIp}/json/`);
        const city = locationResponse.data.city || 'Unknown';
        const temperature = 11; // Placeholder value

        res.json({
            client_ip: clientIp,
            location: city,
            greeting: `Hello, ${visitorName}!, the temperature is ${temperature} degrees Celsius in ${city}`
        });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch location data' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

module.exports = app;

