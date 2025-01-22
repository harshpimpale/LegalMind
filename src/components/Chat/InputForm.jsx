import React, { useState } from "react";

export function InputForm({ input, setInput, handleSubmit, setFiles }) {
  const [selectedFile, setSelectedFile] = useState(null);

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

  return (
    <form
      onSubmit={handleFormSubmit}
      className="flex items-center p-4 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700"
    >
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="flex-1 p-2 rounded-lg bg-gray-100 dark:bg-gray-700 dark:text-white"
        placeholder="Type a message..."
      />
      {/* File input, which does not display the file name */}
      <input
        type="file"
        onChange={handleFileChange}
        className="ml-2 hidden" // Hide the file input from view
        id="fileInput"
      />
      <label
        htmlFor="fileInput"
        className="ml-2 p-2 bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-white rounded-lg cursor-pointer"
      >
        Choose File
      </label>
      <button
        type="submit"
        className="ml-2 p-2 bg-blue-500 text-white rounded-lg"
      >
        Send
      </button>
    </form>
  );
}
