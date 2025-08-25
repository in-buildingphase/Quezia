"use client";

import { ChatContainer } from "@/components/ui/chat-container";
import { GoldenText } from "@/components/ui/goldentext";
import Link from "next/link";
import { tests } from "@/lib/tests/data";

export default function DashboardHome() {
  return (
    <div className="flex flex-col min-h-screen p-6 max-w-6xl mx-auto">
      <div className="mb-10 text-left">
        <h1 className="text-4xl md:text-5xl font-bold">
          <GoldenText>Hello, Shane</GoldenText>
        </h1>
        <h2 className="text-1xl md:text-2xl">How will you like to test yourself today?</h2>
      </div>

      <div className="mb-12">
        <ChatContainer placeholder="Ask me anything about your exams..." />
      </div>

      <div className="mb-4">
        <h3 className="text-2xl font-semibold">Past Tests</h3>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {tests.map((t) => (
          <div key={t.id} className="rounded-xl border border-[#333] bg-[#111] p-6">
            <div className="text-lg font-semibold mb-1">{t.title}</div>
            <div className="text-sm text-[#A0A0A0] mb-4">{t.questionCount} Questions</div>
            <div className="flex gap-2">
              <Link
                href={`/tests/preview/${t.id}`}
                className="px-3 py-2 rounded-lg border border-[#333] bg-[#141414] text-[#E0E0E0] hover:border-[#FFB74D]/60"
              >
                Preview Test
              </Link>
              <Link
                href={`/tests/${t.id}`}
                className="px-3 py-2 rounded-lg border border-[#333] bg-[#141414] text-[#E0E0E0] hover:border-[#FFB74D]/60"
              >
                Attempt Test
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
