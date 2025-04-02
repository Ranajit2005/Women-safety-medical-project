import { useState } from "react";
import { MessageSquareText, X } from "lucide-react";
import { axiosInstance } from '../lib/axios.js';



const ChatWindow = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");

    const toggleChat = () => setIsOpen(!isOpen);

    const sendMessage = async () => {
        if (!input.trim()) return;
        const userMessage = { sender: "user", text: input };
        setMessages([...messages, userMessage]);
        setInput("");

        try {
            const { data } = await axiosInstance.post("/chat", { message: input });
            setMessages([...messages, userMessage, { sender: "bot", text: data.reply }]);
        } catch (error) {
            console.error("Error fetching response:", error);
        }
    };

    return (
        <div className="fixed bottom-5 right-5 z-50">
            {!isOpen && (
                <button onClick={toggleChat} className="bg-blue-500 p-4 rounded-full text-white shadow-lg">
                    <MessageSquareText size={28} />
                </button>
            )}

            {isOpen && (
                <div className="w-80 bg-white shadow-lg rounded-lg p-4 border border-gray-300 fixed bottom-20 right-5">
                    <div className="flex justify-between items-center border-b pb-2">
                        <h3 className="text-lg font-bold">Health Chatbot</h3>
                        <button onClick={toggleChat} className="text-gray-600 hover:text-gray-800">
                            <X size={20} />
                        </button>
                    </div>
                    <div className="h-60 overflow-y-auto p-2">
                        {messages.map((msg, index) => (
                            <div key={index} className={`p-2 my-1 rounded ${msg.sender === "user" ? "bg-blue-100 self-end" : "bg-gray-100"}`}>
                                <p className="text-sm">{msg.text}</p>
                            </div>
                        ))}
                    </div>
                    <div className="flex gap-2 mt-2">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            className="flex-1 p-2 border rounded"
                            placeholder="Ask me anything..."
                        />
                        <button onClick={sendMessage} className="bg-blue-500 text-white px-4 py-2 rounded">
                            Send
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ChatWindow;
