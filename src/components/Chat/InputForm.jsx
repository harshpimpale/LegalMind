import React, { useState } from "react";
import { Mic, Paperclip, ArrowUp } from "lucide-react";

export function InputForm({ input, setInput, handleSubmit, setFiles }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isListening, setIsListening] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file); // Store selected file
    setFiles([file]); // Send file to parent

    // Append file name to the existing input text
    setInput(
      (prevInput) =>
        prevInput + (prevInput ? ` (File: ${file.name})` : `File: ${file.name}`)
    );
  };

  const handleFormSubmit = (e) => {
    handleSubmit(e); // Call parent submit function
    setSelectedFile(null); // Clear the selected file after submit
    setInput(""); // Reset input field after submission
  };

  const startListening = () => {
    const recognition = new (window.SpeechRecognition ||
      window.webkitSpeechRecognition)();
    recognition.lang = "en-US";
    recognition.start();
    setIsListening(true);

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setInput(transcript);
    };

    recognition.onend = () => {
      setIsListening(false);
    };
  };

  return (
    <div className="py-4 px-16 bg-white">
      <form
        onSubmit={handleFormSubmit}
        className="flex items-center  bg-white dark:bg-gray-800 border py-1  rounded-full px-2 border-gray-200 dark:border-gray-700"
      >
        {/* File input, which does not display the file name */}
        <input
          type="file"
          onChange={handleFileChange}
          className="ml-2 hidden" // Hide the file input from view
          id="fileInput"
        />
        <label
          htmlFor="fileInput"
          className="  mx-2 text-customGreen dark:bg-gray-700 dark:text-white rounded-lg cursor-pointer"
        >
          <Paperclip size={22} />
        </label>

        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 p-2 rounded-lg  dark:bg-gray-700 dark:text-white focus:outline-none"
          placeholder="Message LegalMind"
        />
        <button
          type="button"
          onClick={startListening}
          className="  dark:text-white rounded-lg mx-2"
          disabled={isListening}
        >
          {isListening ? (
            "Listening..."
          ) : (
            <span className="text-customGreen dark:text-white">
              <Mic size={25} />
            </span>
          )}
        </button>
        <button
          type="submit"
          className=" bg-customGreen p-2 rounded-full text-white "
        >
          <ArrowUp size={22} />
        </button>
      </form>
    </div>
  );
}
