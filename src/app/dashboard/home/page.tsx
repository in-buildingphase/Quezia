"use client";

import { ChatContainer } from "@/components/ui/chat-container";
import { GoldenText } from "@/components/ui/goldentext";

export default function DashboardHome() {
  return (
    <div className="flex flex-col justify-center min-h-screen p-6 max-w-4xl mx-auto">
      <div className="mb-20 text-left">
        <h1 className="text-4xl md:text-5xl font-bold">
        <GoldenText>Hello, Shane</GoldenText>
      </h1>
      <h1 className="text-1xl md:text-2xl">How will you like to test yourself today?</h1>
      </div>
      
      <ChatContainer 
        placeholder="Ask me anything about your exams..."
      />
    </div>
  );
}
