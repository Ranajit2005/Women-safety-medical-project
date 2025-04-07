import { useState, useRef, useEffect } from "react";
import { MessageSquareText, X, Send } from "lucide-react";
import { axiosInstance } from '../lib/axios.js';

const ChatWindow = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef(null);

    const toggleChat = () => setIsOpen(!isOpen);

    // Auto-scroll to bottom when messages change
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const sendMessage = async (e) => {
        e?.preventDefault();
        if (!input.trim() || isLoading) return;
        
        const userMessage = { sender: "user", text: input };
        setMessages(prev => [...prev, userMessage]);
        setInput("");
        setIsLoading(true);

        try {
            const { data } = await axiosInstance.post("/chat", { message: input });
            setMessages(prev => [...prev, { sender: "bot", text: data.reply }]);
        } catch (error) {
            console.error("Error fetching response:", error);
            setMessages(prev => [...prev, { 
                sender: "bot", 
                text: "Sorry, I'm having trouble connecting. Please try again later." 
            }]);
        } finally {
            setIsLoading(false);
        }
    };

    const quickReplies = [
        "What are common flu symptoms?",
        "How to lower blood pressure?",
        "Best exercises for back pain?",
        "How much water should I drink daily?"
    ];

    return (
        <div className="fixed bottom-4 right-4 sm:bottom-5 sm:right-5 z-50">
            {/* Floating chat button */}
            {!isOpen && (
                <button 
                    onClick={toggleChat}
                    className="bg-blue-600 hover:bg-blue-700 p-3 sm:p-4 rounded-full text-white shadow-lg transition-all duration-300 hover:scale-110"
                    aria-label="Open chat"
                >
                    <MessageSquareText className="w-6 h-6 sm:w-7 sm:h-7" />
                </button>
            )}

            {/* Chat window */}
            {isOpen && (
                <div className="w-[calc(100vw-2rem)] sm:w-96 max-w-full bg-white shadow-xl rounded-lg overflow-hidden fixed bottom-16 right-2 sm:bottom-20 sm:right-5 animate-fade-in-up"
                    style={{ maxHeight: "calc(100vh - 8rem)" }}>
                    
                    {/* Header */}
                    <div className="bg-gradient-to-r from-pink-600 to-pink-500 p-3 sm:p-4 flex justify-between items-center">
                        <div className="flex items-center gap-2">
                            <MessageSquareText className="text-white w-4 h-4 sm:w-5 sm:h-5" />
                            <h3 className="text-base sm:text-lg font-bold text-white">Health Assistant</h3>
                        </div>
                        <button 
                            onClick={toggleChat}
                            className="text-white hover:text-gray-200 transition-colors"
                            aria-label="Close chat"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Messages area */}
                    <div className="h-64 sm:h-80 overflow-y-auto p-3 sm:p-4 bg-pink-100">
                        {messages.length === 0 ? (
                            <div className="flex flex-col items-center justify-center h-full text-center text-gray-500 text-sm sm:text-base">
                                <p className="mb-3 sm:mb-4">Ask me anything about health and wellness</p>
                                <div className="grid grid-cols-1 gap-2 w-full">
                                    {quickReplies.map((reply, index) => (
                                        <button
                                            key={index}
                                            onClick={() => {
                                                setInput(reply);
                                                setTimeout(() => document.getElementById("chat-input")?.focus(), 0);
                                            }}
                                            className="text-xs sm:text-sm p-2 bg-white border rounded-lg hover:bg-gray-100 transition-colors text-left"
                                        >
                                            {reply}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        ) : (
                            <div className="space-y-2 sm:space-y-3">
                                {messages.map((msg, index) => (
                                    <div 
                                        key={index} 
                                        className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                                    >
                                        <div 
                                            className={`max-w-[80%] sm:max-w-xs lg:max-w-md px-3 py-2 rounded-lg text-sm sm:text-base ${msg.sender === "user" 
                                                ? "bg-pink-500 text-white rounded-br-none" 
                                                : "bg-pink-200 text-black rounded-bl-none"}`}
                                        >
                                            <p>{msg.text}</p>
                                        </div>
                                    </div>
                                ))}
                                {isLoading && (
                                    <div className="flex justify-start">
                                        <div className="bg-pink-300 text-pink-300 px-4 py-2 rounded-lg rounded-bl-none">
                                            <div className="flex space-x-2">
                                                <div className="w-2 h-2 rounded-full bg-pink-600 animate-bounce"></div>
                                                <div className="w-2 h-2 rounded-full bg-pink-600 animate-bounce delay-100"></div>
                                                <div className="w-2 h-2 rounded-full bg-pink-600 animate-bounce delay-200"></div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                                <div ref={messagesEndRef} />
                            </div>
                        )}
                    </div>

                    {/* Input area */}
                    <form onSubmit={sendMessage} className="border-t p-2 sm:p-3 bg-white">
                        <div className="flex gap-2">
                            <input
                                id="chat-input"
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                className="flex-1 p-2 text-sm sm:text-base border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Type your message..."
                                autoFocus
                                disabled={isLoading}
                            />
                            <button 
                                type="submit"
                                disabled={!input.trim() || isLoading}
                                className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-lg disabled:bg-gray-400 transition-colors"
                            >
                                <Send className="w-4 h-4 sm:w-5 sm:h-5" />
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
};

export default ChatWindow;