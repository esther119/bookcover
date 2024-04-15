const express = require("express");
const OpenAI = require("openai");
const cors = require("cors");

require("dotenv").config();

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors()); // Enable CORS

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.get("/", (req, res) => {
  res.send("Server is up and running!");
});

app.post("/generate-image", async (req, res) => {
  const { description } = req.body;
  try {
    console.log("start generate images");
    const response = await openai.images.generate({
      prompt: `Generate an image of: ${description}`,
      n: 1,
      size: "1024x1024",
    });
    console.log("responses", response);

    // Assuming the response format includes the URL in a similar structure as before
    const imageUrl = response.data[0].url;
    res.json({ imageUrl });
  } catch (error) {
    console.error("Error generating image:", error);
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
