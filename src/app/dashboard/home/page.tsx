"use client";

import { ChatContainer } from "@/components/ui/chat-container";

export default function DashboardHome() {
  return (
    <div className="flex items-center justify-center min-h-screen p-6">
      <ChatContainer 
        placeholder="Ask me anything about your exams..."
      />
    </div>
  );
}
