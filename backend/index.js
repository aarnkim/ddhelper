const apiKey = "";
// const serverless = require('serverless-http');
const { Configuration, OpenAIApi } = require("openai");
const express = require('express');
const cors = require('cors');

const app = express();
const configuration = new Configuration({
    apiKey: apiKey,
});
const openai = new OpenAIApi(configuration);


// // Enable CORS
// const allowedOrigins = [
//     'https://datadog-helper.pages.dev',
//     // Add more origins as needed
//   ];
  
//   const corsOptions = {
//     origin: function (origin, callback) {
//       if (allowedOrigins.includes(origin)) {
//         callback(null, true);
//       } else {
//         callback(new Error('Not allowed by CORS'));
//       }
//     },
//     credentials: true,
//   };
  
  app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/datadogHelper', async function (req, res) {
    let { userMessages, assistantMessages } = req.body;

    let messages = [
        { role: "system", content: "You are Datadog Helper, a very knowledgeable assistant who can provide detailed answers to Datadog-related questions." },
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

// module.exports.handler = serverless(app);

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
