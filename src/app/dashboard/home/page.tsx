"use client";

import { ChatContainer } from "@/components/ui";

export default function DashboardHome() {
  const handleSend = (message: string, filters: string[]) => {
    console.log('Message:', message);
    console.log('Selected filters:', filters);
    // Handle the message and filters here
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-6">
      <ChatContainer 
        placeholder="Type your message here..."
        onSend={handleSend}
      />
    </div>
  );
}
