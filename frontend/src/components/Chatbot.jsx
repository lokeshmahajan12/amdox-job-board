import { useState, useRef, useEffect } from "react";
import axios from "axios";

export default function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const chatWindowRef = useRef(null);

  // Always scroll to bottom
  const scrollToBottom = () => {
    const chatWindow = chatWindowRef.current;
    if (chatWindow) {
      chatWindow.scrollTop = chatWindow.scrollHeight;
    }
  };

  // Typing animation for bot messages
  const typeBotMessage = (text) => {
    let index = 0;
    const interval = setInterval(() => {
      setMessages((prev) => {
        const lastMsg = prev[prev.length - 1];
        if (lastMsg && !lastMsg.user) {
          const updated = [...prev];
          updated[updated.length - 1] = {
            ...lastMsg,
            text: lastMsg.text + text[index],
          };
          return updated;
        }
        return prev;
      });
      index++;
      scrollToBottom(); // scroll during typing
      if (index === text.length) {
        clearInterval(interval);
        setLoading(false);
        scrollToBottom(); // ensure final scroll at the end
      }
    }, 30);
  };

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { user: true, text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const res = await axios.post("/api/chat", { message: input });
      const botReply = res.data.reply || "I have no answer.";

      // Add empty bot message and start typing
      setMessages((prev) => [...prev, { user: false, text: "" }]);
      setTimeout(() => typeBotMessage(botReply), 50);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { user: false, text: "Oops! Something went wrong." },
      ]);
      setLoading(false);
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-purple-50 p-4">
      <div className="w-full max-w-lg h-[80vh] flex flex-col bg-white border border-purple-200 rounded-2xl shadow-lg overflow-hidden">
        {/* Header */}
        <div className="bg-purple-600 text-white text-xl font-semibold px-6 py-4 rounded-t-2xl">
          AI Assistant
        </div>

        {/* Chat Window */}
        <div
          ref={chatWindowRef}
          className="flex-1 min-h-0 p-4 overflow-y-auto space-y-3 bg-purple-50"
        >
          {messages.length === 0 && !loading && (
            <p className="text-center text-gray-400">Start the conversation...</p>
          )}

          {messages.map((m, i) => (
            <div
              key={i}
              className={`flex ${m.user ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`px-4 py-2 rounded-lg max-w-[75%] break-words ${
                  m.user
                    ? "bg-purple-600 text-white rounded-br-none"
                    : "bg-white text-gray-800 rounded-bl-none shadow"
                }`}
              >
                {m.text}
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex justify-start">
              <div className="px-4 py-2 rounded-lg max-w-[60%] break-words bg-white text-gray-600 rounded-bl-none shadow animate-pulse">
                Typing...
              </div>
            </div>
          )}
        </div>

        {/* Input */}
        <form
          onSubmit={handleSend}
          className="flex border-t border-purple-200 p-3 bg-white"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask me anything..."
            className="flex-1 px-4 py-2 border border-purple-200 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
          <button
            type="submit"
            disabled={loading}
            className="ml-3 bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white px-6 py-2 rounded-full font-semibold transition-colors"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
}
