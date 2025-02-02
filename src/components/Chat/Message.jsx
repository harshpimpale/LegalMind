import { useEffect, useRef } from "react";
import { User, Bot } from "lucide-react";
import logo from "../../assets/images/lmLogo.png";

export function Messages({ messages }) {
  // Create a reference to the messages container
  const messagesEndRef = useRef(null);

  // Scroll to the bottom whenever the messages change
  useEffect(() => {
    // Scroll the container to the bottom
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]); // This effect will run whenever messages change

  return (
    <div className="flex-1 overflow-y-auto p-6 space-y-6  bg-white dark:bg-slate-950">
      {messages.map((msg) => (
        <div
          key={msg.id}
          className={`flex items-center space-x-4 ${
            msg.isUser ? "flex-row-reverse space-x-reverse" : ""
          }`}
        >
          <div
            className={`flex-shrink-0 rounded-full  p-1 ${
              msg.isUser
                ? "bg-blue-500"
                : "bg-customLightGreen dark:bg-gray-500"
            }`}
          >
            {msg.isUser ? (
              <User className="w-5 h-5 text-white" />
            ) : (
              <img src={logo} className="h-8 w-8" />
            )}
          </div>
          <div
            className={`flex max-w-[80%] lg:max-w-[60%] ${
              msg.isUser ? "justify-end" : ""
            }`}
          >
            <div
              className={`rounded-2xl px-4 py-3 ${
                msg.isUser
                  ? "bg-stone-100 dark:bg-gray-700 dark:text-white text-customDarkGreen"
                  : "bg-stone-100 dark:bg-gray-700 text-gray-800 dark:text-white shadow-sm"
              }`}
            >
              <p className="text-sm sm:text-base whitespace-pre-wrap">
                {msg.content}
              </p>

              {/* Check if there are files, and display the file name */}
              {msg.files && msg.files.length > 0 && (
                <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                  <p>File: {msg.files[0].name}</p> {/* Display file name */}
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
      {/* Empty div to ensure scrolling to the bottom */}
      <div ref={messagesEndRef} />
    </div>
  );
}
