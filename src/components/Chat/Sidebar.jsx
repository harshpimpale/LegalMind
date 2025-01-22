import { X, Plus, History, Settings } from "lucide-react";

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

  return (
    <div
      className={`fixed md:static inset-y-0 left-0 transform ${
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      } md:translate-x-0 transition-transform duration-200 ease-in-out z-30 bg-white dark:bg-gray-800 w-72 border-r border-gray-200 dark:border-gray-700 shadow-lg md:shadow-none`}
    >
      {/* Close Sidebar Button */}
      <button
        onClick={() => setIsSidebarOpen(false)}
        className="absolute top-4 right-4 p-1 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-700 text-red-600 dark:text-red-400 md:hidden"
      >
        <X className="w-5 h-5" />
      </button>

      <div className="flex flex-col h-full">
        {/* New Chat Button */}
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
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
            className="flex items-center space-x-2 w-full px-4 py-2 bg-blue-500 dark:bg-blue-600 text-white rounded-lg hover:bg-blue-600 dark:hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-5 h-5" />
            <span>New Chat</span>
          </button>
        </div>

        {/* Chat Modes */}
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-4">
            Chat Modes
          </h2>
          <div className="space-y-2">
            {chatModes.map((mode) => (
              <button
                key={mode.id}
                className="flex items-center space-x-3 w-full p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-left"
              >
                <div className="text-gray-600 dark:text-gray-400">
                  {mode.icon}
                </div>
                <div>
                  <div className="font-medium text-gray-900 dark:text-white">
                    {mode.name}
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {mode.description}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Today's Chat History */}
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-4 flex items-center">
            <History className="w-4 h-4 mr-2" /> Today
          </h2>
          <div className="space-y-2">
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
                </div>
                <span className="text-xs text-gray-500 dark:text-gray-400 ml-2">
                  {formatDate(item.timestamp)}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Weekly Chat History */}
        <div className="p-4">
          <h2 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-4 flex items-center">
            <History className="w-4 h-4 mr-2" /> Previous 7 Days
          </h2>
          <div className="space-y-2">
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
        </div>

        {/* Settings */}
        <div className="mt-auto p-4 border-t border-gray-200 dark:border-gray-700">
          <button className="flex items-center space-x-2 px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors w-full">
            <Settings className="w-5 h-5" />
            <span>Settings</span>
          </button>
        </div>
      </div>
    </div>
  );
}
