const express = require('express');
const fs = require('fs');
const app = express();
const port = 3000;

// Load the current JSON data from a file
function loadCurrentData() {
    try {
        const data = fs.readFileSync('current_data.json', 'utf8');
        return JSON.parse(data);
    } catch (err) {
        return [];
    }
}

// Store the current JSON data
let currentData = loadCurrentData();

console.log("Loaded data");

app.use(express.json());

app.get('/hello', (req, res) => {
    res.status(200).send('Hello, World!');
});

app.post('/fl', (req, res) => {
    // Get the JSON data from the request
    const newData = req.body;

    // Check if the JSON data is in the correct format
    if (!Array.isArray(newData)) {
        return res.status(400).json({ error: 'Invalid JSON format. Expected a list of values.' });
    }

    // Check if the length of both currentData and newData is the same
    if (currentData.length !== newData.length) {
        return res.status(400).json({ error: 'Mismatch in data length. Please update data before averaging.' });
    }

    // Calculate the average of each value
    const averagedData = currentData.map((value, index) => (value + newData[index]) / 2);

    res.status(200).json(averagedData);
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
