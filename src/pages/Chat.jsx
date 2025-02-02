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
        todayHistory={[
          {
            id: "1",
            content: "How to implement React hooks",
            timestamp: new Date(),
            messages: [
              {
                id: crypto.randomUUID(),
                content: "How do I use React hooks?",
                isUser: true,
              },
              {
                id: crypto.randomUUID(),
                content:
                  "React hooks are function-based ways to add state and lifecycle features to components...",
                isUser: false,
              },
            ],
          },
          {
            id: "2",
            content: "Explain async/await",
            timestamp: new Date(),
            messages: [
              {
                id: crypto.randomUUID(),
                content: "Can you explain async/await?",
                isUser: true,
              },
              {
                id: crypto.randomUUID(),
                content:
                  "Async/await is a way to handle promises more elegantly...",
                isUser: false,
              },
            ],
          },
        ]}
        weekHistory={[
          {
            id: "3",
            content: "JavaScript best practices",
            timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
            messages: [
              {
                id: crypto.randomUUID(),
                content: "What are some JavaScript best practices?",
                isUser: true,
              },
              {
                id: crypto.randomUUID(),
                content:
                  "Here are some key JavaScript best practices to follow...",
                isUser: false,
              },
            ],
          },
          {
            id: "4",
            content: "CSS Grid tutorial",
            timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
            messages: [
              {
                id: crypto.randomUUID(),
                content: "How do I use CSS Grid?",
                isUser: true,
              },
              {
                id: crypto.randomUUID(),
                content: "CSS Grid is a powerful layout system...",
                isUser: false,
              },
            ],
          },
        ]}
        chatModes={[
          {
            id: "code",
            name: "Summerization",
            icon: <Code className="w-5 h-5" />,
            // description: "Programming and technical help",
          },
          {
            id: "writing",
            name: "Situation Query",
            icon: <PenTool className="w-5 h-5" />,
            // description: "Help with writing and editing",
          },
          {
            id: "suggest",
            name: "Case Suggestion",
            icon: <PenTool className="w-5 h-5" />,
            // description: "Help with writing and editing",
          },
        ]}
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
