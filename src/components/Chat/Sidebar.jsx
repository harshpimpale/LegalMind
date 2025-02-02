import { X, Plus, History, Settings, Pencil, ChevronDown } from "lucide-react";
import { useState } from "react";

export function Sidebar({
  isSidebarOpen,
  setIsSidebarOpen,
  activeChat,
  setActiveChat,
  todayHistory,
  weekHistory,
  chatModes,
  setMessages,
}) {
  const handleChatSelect = (chat) => {
    setActiveChat(chat.id);
    setMessages(chat.messages || []);
    if (window.innerWidth < 768) {
      setIsSidebarOpen(false);
    }
  };

  const formatDate = (date) => {
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  };

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isTodayDropdownOpen, setIsTodayDropdownOpen] = useState(true);

  return (
    <div
      className={`fixed md:static inset-y-0 left-0 transform ${
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      } md:translate-x-0 transition-transform duration-200 ease-in-out z-30 bg-customLightStoneBg dark:bg-gray-800 w-72 border-r border-gray-200 dark:border-gray-700 shadow-lg md:shadow-none`}
    >
      {/* Close Sidebar Button */}
      <button
        onClick={() => setIsSidebarOpen(false)}
        className="absolute top-4 right-4 p-1 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-700 text-red-600 dark:text-red-400 md:hidden"
      >
        <X className="w-5 h-5" />
      </button>

      {/* New Chat Button */}
      <div className="flex flex-col h-full">
        <div className="p-4 flex justify-between border-b border-gray-200 dark:border-gray-700">
          <span className="text-black dark:text-white text-2xl font-semibold text-start">
            LegalMind
          </span>

          <button
            onClick={() => {
              setActiveChat(null);
              setMessages([
                {
                  id: crypto.randomUUID(),
                  content: "Hello! How can I help you today?",
                  isUser: false,
                },
              ]);
            }}
            className="  text-white rounded-lg transition-colors"
          >
            <div className="dark:text-white text-black">
              <Pencil size={20} />
            </div>
          </button>
        </div>

        {/* Chat Modes */}
        <div className="p-4 border-b  border-gray-200 dark:border-gray-700">
          {/* <h2 className="text-xs font-semibold text-black dark:text-gray-400 uppercase tracking-wider mb-4">
            Chat Modes
          </h2> */}
          <div className="space-y-2">
            {chatModes.map((mode) => (
              <button
                key={mode.id}
                className="flex bg-customGreen items-center py-5 justify-center space-x-3 w-full p-3 rounded-lg hover:bg-customDarkGreen hover:text-customGreen dark:hover:bg-gray-700 transition-colors text-left"
              >
                <div className="text-white dark:text-gray-400">{mode.icon}</div>
                <div>
                  <div className="font-semibold text-white dark:text-white">
                    {mode.name}
                  </div>
                  <div className="text-sm text-white dark:text-gray-400">
                    {mode.description}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* History Section */}

        {/* Today's Chat History */}
        <div className="p-4 ">
          <button
            onClick={() => setIsTodayDropdownOpen(isTodayDropdownOpen)}
            className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-4 flex items-center w-full text-left"
          >
            <History className="w-4 h-4 mr-2" /> Today
          </button>
          {isTodayDropdownOpen && (
            <div className="space-y-1 max-h-[130px] overflow-y-scroll scrollbar-thin scrollbar-thumb-gray-400 dark:scrollbar-thumb-gray-600 scrollbar-track-transparent">
              {todayHistory.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleChatSelect(item)}
                  className={`flex items-center justify-between w-full p-3 rounded-lg transition-colors text-left group
                    ${
                      activeChat === item.id
                        ? "bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800"
                        : "hover:bg-gray-100 dark:hover:bg-gray-700"
                    }`}
                >
                  <div className="flex-1 min-w-0">
                    <p
                      className={`text-sm truncate ${
                        activeChat === item.id
                          ? "text-blue-600 dark:text-blue-400 font-medium"
                          : "text-gray-900 dark:text-white"
                      }`}
                    >
                      {item.content}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {formatDate(item.timestamp)}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Weekly Chat History */}
        <div className="p-4">
          <div className="flex justify-between items-center ">
            <div className="flex items-center text-gray-500 font-semibold">
              <History className="w-4 h-4 mr-2" /> Previous 7 Days
            </div>
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-4    flex items-center justify-center pt-4"
            >
              <ChevronDown size={20} />{" "}
            </button>
          </div>
          {isDropdownOpen && (
            <div className="space-y-1   h-[130px] overflow-y-auto duration-100 transition-all">
              {weekHistory.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleChatSelect(item)}
                  className={`flex items-center justify-between w-full p-3 rounded-lg transition-colors text-left group
                ${
                  activeChat === item.id
                    ? "bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800"
                    : "hover:bg-gray-100 dark:hover:bg-gray-700"
                }`}
                >
                  <div className="flex-1 min-w-0">
                    <p
                      className={`text-sm truncate ${
                        activeChat === item.id
                          ? "text-blue-600 dark:text-blue-400 font-medium"
                          : "text-gray-900 dark:text-white"
                      }`}
                    >
                      {item.content}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {item.timestamp.toLocaleDateString(undefined, {
                        weekday: "long",
                      })}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
