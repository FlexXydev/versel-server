const express = require('express');
// Cors and body parser
const bodyParser = require('body-parser')
const cors  = require('cors')
const app = express();
app.use(bodyParser.json())
const config = require('../src/config.json');
app.use(cors())
const port = 3080


// API GPT-3
const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
    organization: config.ORG_KEY,
    apiKey: config.API_KEY,
});
const openai = new OpenAIApi(configuration);

// My own api

app.post('/', async (req, res) => {
    const { message } = req.body;
    const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: `${message}`,
        max_tokens: 500,
        temperature: 0.5
    });

    res.json({
        message: response.data.choices[0].text,
    })

});


app.listen(port, () => console.log(`🌐 | API at http://localhost:${port}`))