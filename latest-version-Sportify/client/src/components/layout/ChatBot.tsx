"use client";

import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Bot, User } from "lucide-react";
import { Button } from "../ui/Button";
import { motion, AnimatePresence } from "framer-motion";

type Message = {
    id: number;
    text: string;
    sender: "bot" | "user";
    options?: string[];
};

export function ChatBot() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        {
            id: 1,
            text: "Hi there! 👋 I'm the Sportify Assistant. How can I help you today?",
            sender: "bot",
            options: ["Track Order", "Return Policy", "Product Help", "Contact Support"]
        }
    ]);
    const [inputText, setInputText] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isOpen]);

    const handleOptionClick = (option: string) => {
        addMessage(option, "user");
        processResponse(option);
    };

    const handleSend = () => {
        if (!inputText.trim()) return;
        addMessage(inputText, "user");
        processResponse(inputText);
        setInputText("");
    };

    const addMessage = (text: string, sender: "bot" | "user", options?: string[]) => {
        setMessages(prev => [...prev, { id: Date.now(), text, sender, options }]);
    };

    const processResponse = (input: string) => {
        setIsTyping(true);
        const lowerInput = input.toLowerCase();

        setTimeout(() => {
            let responseText = "I'm not sure I understand. Could you please select one of the options below?";
            let responseOptions = ["Track Order", "Return Policy", "Product Help", "Contact Support"];

            if (lowerInput.includes("track") || lowerInput.includes("order")) {
                responseText = "To track your order, please go to your Profile page and check the 'My Orders' section. You can also provide your Order ID here.";
                responseOptions = ["Where is my Profile?", "Check Order #1024", "Back to Menu"];
            } else if (lowerInput.includes("return") || lowerInput.includes("refund")) {
                responseText = "We offer a 30-day return policy for all unworn items in original packaging. Would you like to start a return?";
                responseOptions = ["Start Return", "Read Full Policy", "Back to Menu"];
            } else if (lowerInput.includes("product") || lowerInput.includes("size")) {
                responseText = "Our products fit true to size. For specific measurements, check the Size Guide on any product page. Need recommendation?";
                responseOptions = ["AI Gear Recommender", "Size Guide", "Back to Menu"];
            } else if (lowerInput.includes("contact") || lowerInput.includes("support")) {
                responseText = "You can reach our human support team at support@sportify.com or call 1-800-SPORTIFY (Mon-Fri 9am-5pm EST).";
                responseOptions = ["Email Support", "Back to Menu"];
            } else if (lowerInput.includes("menu") || lowerInput.includes("back")) {
                responseText = "What else can I help you with?";
            }

            addMessage(responseText, "bot", responseOptions);
            setIsTyping(false);
        }, 1000);
    };

    return (
        <>
            {/* Toggle Button */}
            <motion.button
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-primary text-white rounded-full shadow-lg flex items-center justify-center hover:bg-primary/90 transition-colors"
                onClick={() => setIsOpen(!isOpen)}
            >
                {isOpen ? <X /> : <MessageCircle className="w-8 h-8" />}
            </motion.button>

            {/* Chat Window */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        className="fixed bottom-24 right-6 z-50 w-80 md:w-96 bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-800 overflow-hidden flex flex-col max-h-[600px]"
                    >
                        {/* Header */}
                        <div className="bg-primary p-4 flex items-center gap-3 text-white">
                            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                                <Bot className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="font-bold">Sportify Assistant</h3>
                                <div className="flex items-center gap-1.5">
                                    <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                                    <span className="text-xs opacity-90">Online</span>
                                </div>
                            </div>
                        </div>

                        {/* Messages Area */}
                        <div className="flex-1 p-4 overflow-y-auto bg-gray-50 dark:bg-gray-950/50 space-y-4 h-96">
                            {messages.map((msg) => (
                                <div
                                    key={msg.id}
                                    className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                                >
                                    <div
                                        className={`max-w-[80%] p-3 rounded-2xl ${msg.sender === "user"
                                                ? "bg-primary text-white rounded-br-none"
                                                : "bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-bl-none shadow-sm"
                                            }`}
                                    >
                                        <p className="text-sm">{msg.text}</p>
                                    </div>
                                </div>
                            ))}

                            {/* Options Chips */}
                            {messages[messages.length - 1].sender === "bot" && messages[messages.length - 1].options && (
                                <div className="flex flex-wrap gap-2">
                                    {messages[messages.length - 1].options?.map((option) => (
                                        <button
                                            key={option}
                                            onClick={() => handleOptionClick(option)}
                                            className="text-xs bg-white dark:bg-gray-800 border border-primary/30 text-primary hover:bg-primary hover:text-white px-3 py-1.5 rounded-full transition-colors"
                                        >
                                            {option}
                                        </button>
                                    ))}
                                </div>
                            )}

                            {isTyping && (
                                <div className="flex justify-start">
                                    <div className="bg-white dark:bg-gray-800 p-3 rounded-2xl rounded-bl-none border border-gray-200 dark:border-gray-700 shadow-sm flex gap-1">
                                        <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                                        <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-75" />
                                        <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-150" />
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input Area */}
                        <div className="p-4 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    value={inputText}
                                    onChange={(e) => setInputText(e.target.value)}
                                    onKeyDown={(e) => e.key === "Enter" && handleSend()}
                                    placeholder="Type a message..."
                                    className="flex-1 px-4 py-2 rounded-full bg-gray-100 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                                />
                                <Button size="sm" onClick={handleSend} className="rounded-full w-10 h-10 p-0 flex items-center justify-center">
                                    <Send className="w-4 h-4" />
                                </Button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
