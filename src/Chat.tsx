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
    <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
      <h2>Real-Time Chat</h2>
      <input
        type="text"
        placeholder="Enter your username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        style={{
          width: "100%",
          padding: "8px",
          marginBottom: "10px",
          borderRadius: "5px",
          border: "1px solid #ccc",
        }}
      />
      <div
        style={{
          border: "1px solid #ccc",
          borderRadius: "5px",
          height: "300px",
          overflowY: "scroll",
          padding: "10px",
          marginBottom: "10px",
          backgroundColor: "#f9f9f9",
        }}
      >
        {messages.map((msg, index) => (
          <div key={index}>
            <strong>{msg.sender}:</strong> {msg.message}
          </div>
        ))}
      </div>
      <input
        type="text"
        placeholder="Type a message"
        value={currentMessage}
        onChange={(e) => setCurrentMessage(e.target.value)}
        style={{
          width: "80%",
          padding: "8px",
          marginRight: "10px",
          borderRadius: "5px",
          border: "1px solid #ccc",
        }}
      />
      <button
        onClick={sendMessage}
        style={{
          padding: "8px 12px",
          borderRadius: "5px",
          backgroundColor: "#007bff",
          color: "#fff",
          border: "none",
        }}
      >
        Send
      </button>
    </div>
  );
};

export default Chat;
