import React, { useState, useEffect } from "react";
import { socket } from "./socket";

interface Message {
  sender: string;
  message: string;
}

const Chat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentMessage, setCurrentMessage] = useState("");
  const [username, setUsername] = useState("");

  useEffect(() => {
    // Listen for incoming messages
    socket.on("message", (message: Message) => {
      setMessages((prev) => [...prev, message]);
    });

    // Clean up the listener
    return () => {
      socket.off("message");
    };
  }, []);

  const sendMessage = () => {
    if (currentMessage.trim() && username.trim()) {
      socket.emit("message", { sender: username, message: currentMessage });
      setCurrentMessage(""); // Clear the input field
    }
  };

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-center">Real-Time Chat</h2>
      <input
        type="text"
        placeholder="Enter your username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="w-full p-2 mb-4 rounded border border-gray-300 focus:outline-none focus:ring focus:ring-blue-300"
      />
      <div className="border border-gray-300 rounded h-72 overflow-y-scroll p-4 mb-4 bg-gray-50">
        {messages.map((msg, index) => (
          <div key={index} className="mb-2">
            <strong className="text-blue-500">{msg.sender}:</strong>{" "}
            {msg.message}
          </div>
        ))}
      </div>
      <div className="flex items-center">
        <input
          type="text"
          placeholder="Type a message"
          value={currentMessage}
          onChange={(e) => setCurrentMessage(e.target.value)}
          className="flex-1 p-2 rounded border border-gray-300 focus:outline-none focus:ring focus:ring-blue-300 mr-2"
        />
        <button
          onClick={sendMessage}
          className="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
