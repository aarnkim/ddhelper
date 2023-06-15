const apiKey = "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";

const { Configuration, OpenAIApi } = require("openai");
const express = require('express');
const cors = require('cors');

const app = express();
const configuration = new Configuration({
    apiKey: apiKey,
});
const openai = new OpenAIApi(configuration);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/datadogHelper', async function (req, res) {
    let { userMessages, assistantMessages } = req.body;

    let messages = [
        { role: "system", content: "You are Datadog Helper, a knowledgeable assistant who can provide detailed answers to Datadog-related questions." },
        ...userMessages,
        ...assistantMessages
    ];

    const completion = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: messages
    });

    let datadog = completion.data.choices[0].message.content;
    res.json({ "assistant": datadog });
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
