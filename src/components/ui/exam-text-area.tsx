"use client";

import { Paperclip, Send, Star } from "lucide-react";
import { useState } from "react";

interface ExamTextAreaProps {
    onSend?: (message: string, subject: string) => void;
    className?: string;
}

export function ExamTextArea({ onSend, className = "" }: ExamTextAreaProps) {
    const [message, setMessage] = useState("");
    const [selectedSubject, setSelectedSubject] = useState("Mathematics");

    const subjects = [
        "Mathematics",
        "Physics",
        "Chemistry",
        "Surprise Test"
    ];

    const handleSend = () => {
        if (message.trim() && onSend) {
            onSend(message.trim(), selectedSubject);
            setMessage("");
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <div className={`w-full max-w-4xl mx-auto relative ${className}`}>
            {/* Glow effect behind the text area */}
            <div className="absolute inset-0 w-full h-full bg-gradient-radial from-[#FF8F00]/10 via-[#FFD54F]/5 to-transparent rounded-3xl blur-2xl -z-10" />




            {/* Main Title */}
            <div className="text-center mb-4 relative z-10">
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
                    Get Exam Ready with
                </h1>
                <h2 className="text-4xl md:text-5xl font-bold text-[#FFB74D]">
                    Quezia
                </h2>
            </div>

            {/* Text Area Container */}
            <div className="relative rounded-2xl p-[1px] bg-gradient-to-r from-[#FF8F00]/0 to-[#FFD54F]/0 focus-within:from-[#FF8F00] focus-within:to-[#FFD54F] transition-all duration-300 z-10">
                <div className="flex flex-col h-full rounded-2xl bg-[#1A1A1A] border border-[#333] focus-within:border-transparent relative">

                    {/* Text Area */}
                    <div className="flex-1 p-6 pt-4">
                        <textarea
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            onKeyPress={handleKeyPress}
                            placeholder="Type your message here..."
                            rows={8}
                            className="w-full bg-transparent text-[#E0E0E0] placeholder-[#888] outline-none py-3 resize-none overflow-y-auto min-h-[15rem] max-h-[30rem] text-lg"
                        />
                    </div>

                    {/* Bottom Section */}
                    <div className="flex-shrink-0 p-6 pt-4 mt-auto">
                        <div className="flex items-end justify-between gap-3">

                            {/* Left Side - Attachment and Subject Buttons */}
                            <div className="flex items-center gap-3">
                                {/* Attachment Icon */}
                                <button className="p-2 text-[#888] hover:text-[#E0E0E0] transition-colors">
                                    <Paperclip className="w-5 h-5" />
                                </button>

                                {/* Subject Buttons */}
                                <div className="flex items-center gap-2">
                                    {subjects.map((subject) => (
                                        <button
                                            key={subject}
                                            onClick={() => setSelectedSubject(subject)}
                                            className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${selectedSubject === subject
                                                ? "bg-[#FFB74D] text-black"
                                                : "bg-[#333] text-white hover:bg-[#444]"
                                                }`}
                                        >
                                            <div className="flex items-center gap-1">
                                                {subject}
                                                {subject === "Surprise Test" && (
                                                    <Star className="w-3 h-3" />
                                                )}
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Right Side - Send Button */}
                            <button
                                onClick={handleSend}
                                disabled={!message.trim()}
                                className="p-3 bg-[#FF8F00] hover:bg-[#FFA000] disabled:bg-[#555] disabled:cursor-not-allowed rounded-xl transition-all duration-200 shadow-lg hover:scale-105"
                            >
                                <div className="relative">
                                    <Send className="w-5 h-5 text-black" />
                                    <div className="absolute inset-0 bg-[#FFD54F] rounded-full w-2 h-2 -top-1 -right-1"></div>
                                </div>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
