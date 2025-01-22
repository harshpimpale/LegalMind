import { useState, useEffect } from "react";
import { Sidebar } from "../components/Chat/Sidebar";
import { Messages } from "../components/Chat/Message";
import { InputForm } from "../components/Chat/InputForm";
import { DarkModeToggle } from "../components/Chat/DarkModeToggle";
import { Code, PenTool } from "lucide-react";

export default function Chat() {
  const [messages, setMessages] = useState([
    {
      id: crypto.randomUUID(),
      content: "Hello! How can I assist you today?",
      isUser: false,
    },
  ]);
  const [input, setInput] = useState("");
  const [isDarkMode, setIsDarkMode] = useState();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeChat, setActiveChat] = useState(null);
  const [files, setFiles] = useState([]);

  const toggleSidebar = () => {
    setIsSidebarOpen((prevState) => !prevState);
  };

  const toggleDarkMode = () => {
    setIsDarkMode((prevState) => !prevState);
  };

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim() && files.length === 0) return;

    const userMessage = {
      id: crypto.randomUUID(),
      content: input,
      isUser: true,
      files: files, // Attach files with the message
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setFiles([]); // Reset files after submission

    setTimeout(() => {
      const botMessage = {
        id: crypto.randomUUID(),
        content: "I'm a demo UI. This is a simulated response.",
        isUser: false,
      };
      setMessages((prev) => [...prev, botMessage]);
    }, 1000);
  };

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-200">
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
        activeChat={activeChat}
        setActiveChat={setActiveChat}
        todayHistory={
          [
            /* Your history */
          ]
        }
        weekHistory={
          [
            /* Your week history */
          ]
        }
        chatModes={
          [
            /* Your chat modes */
          ]
        }
        setMessages={setMessages}
      />
      <div className="flex-1 flex flex-col w-full">
        <header className="bg-white dark:bg-gray-800 shadow-sm py-4 px-6 flex items-center justify-between border-b border-gray-200 dark:border-gray-700">
          <button onClick={toggleSidebar} className="md:hidden">
            {isSidebarOpen ? "Close Sidebar" : "Open Sidebar"}
          </button>
          <h1 className="text-xl font-semibold text-gray-800 dark:text-white">
            LegalMind
          </h1>
          <DarkModeToggle
            isDarkMode={isDarkMode}
            setIsDarkMode={setIsDarkMode}
          />
        </header>
        <Messages messages={messages} />
        <InputForm
          input={input}
          setInput={setInput}
          handleSubmit={handleSubmit}
          setFiles={setFiles} // Pass setFiles to InputForm
        />
      </div>
    </div>
  );
}
