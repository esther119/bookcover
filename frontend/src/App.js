import React, { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [description, setDescription] = useState("");
  // const [prompt, setPrompt] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/generate-image",
        { description, prompt }
      );
      console.log("get image", response.data.imageUrl);
      setImageUrl(response.data.imageUrl);
    } catch (error) {
      console.error("Failed to generate image:", error);
    }
  };

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Description:
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </label>
        </div>
        <button type="submit">Generate your book cover</button>
      </form>
      {imageUrl && <img src={imageUrl} alt="Generated from DALL·E" />}
    </div>
  );
}

export default App;
