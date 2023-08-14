const express = require('express');
const axios = require('axios');

const app = express();
const port = 8000;

// Define a simple "Hello, World!" API endpoint
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// Make a GET request to an external API using Axios
app.get('/song', async (req, res) => {
    console.log(req.query);
    console.log(req.query.song);
    // if (!songTitle) {
    //     res.status(400).json({ error: 'No song title provided' });
    //     return;
    // }

    // // Introduce a delay using async/await
    // await new Promise(resolve => setTimeout(resolve, 1000)); // Delay for 1 second

    const url = `https://musicbrainz.org/ws/2/work/?query=work:${encodeURIComponent(req.query.song)}&fmt=json`;
    
    try {
        const response = await axios.get(url);
        
        if (response.status === 200) {
        console.log("GET request successful!");
        console.log("Response content:");
        console.log(response.data.works[0].score);
        res.json(response.data.works[0].score); // Send the entire response back to the client
        } else {
        console.log(`GET request failed with status code: ${response.status}`);
        res.status(response.status).json({ error: `GET request failed with status code: ${response.status}` });
        }
    } catch (error) {
        console.error("Error occurred:", error.message);
        res.status(500).json({ error: 'An error occurred' });
    }
    });

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

