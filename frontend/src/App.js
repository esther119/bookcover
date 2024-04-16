import React, { useState } from "react";
import axios from "axios";
import "./App.css";
// import typewriter from "../typewriter";

function App() {
  const [description, setDescription] = useState("");
  const [journal, setJournal] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const typingAudio = new Audio("/typewriter.mp3");

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
  const handleJournalChange = (e) => {
    setJournal(e.target.value);
    // Play typing sound
    typingAudio.play();
  };

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Cover:
            <input
              type="text"
              value={description}
              placeholder="Your image prompt"
              onChange={(e) => setDescription(e.target.value)}
            />
          </label>
        </div>
        <button type="submit">Generate your book cover</button>
      </form>
      {imageUrl && <img src={imageUrl} alt="Generated from DALL·E" />}
      <div className="journal-container">
        <label className="journal-label">
          <textarea
            className="journal-textarea"
            value={journal}
            onChange={handleJournalChange}
            placeholder="Write your journal today..."
          />
        </label>
      </div>
    </div>
  );
}

export default App;
