const express = require("express");
const dotenv = require("dotenv");

const app = express();

app.use(express.json());
dotenv.config();

const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

async function chatGPT(prompt) {
  const getResponse = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: prompt,
    max_tokens: 50,
  });
  return getResponse;
}

app.post("/api/chatgpt", async (req, res) => {
  try {
    const prompt = req.body.text;
    const response = await chatGPT(prompt);
    res.json({ data: response.data });
  } catch (error) {
    if (error.response) {
      console.error(error.response.status, error.response.data);
      res.status(error.response.status).json({ error: error.response.data });
    } else {
      console.error(error);
      res.status(500).json({ error: error });
    }
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
