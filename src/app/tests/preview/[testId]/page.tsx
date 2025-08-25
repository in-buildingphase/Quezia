import { testPayloads } from "@/lib/tests/data";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function PreviewTestPage({ params }: { params: Promise<{ testId: string }> }) {
    const { testId } = await params;
    const payload = testPayloads[testId];
    if (!payload) return notFound();

    return (
        <div className="min-h-screen bg-[#0b0b0b] text-[#E0E0E0] px-4 sm:px-6 py-8">
            <div className="max-w-3xl mx-auto">
                <div className="flex items-center justify-between mb-8">
                    <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight">{payload.title} — Preview</h1>
                    <div className="flex gap-4 text-sm">
                        <Link href={`/tests/${payload.id}`} className="text-[#FFB74D] hover:underline">Attempt test</Link>
                        <Link href={`/dashboard/home`} className="text-[#AFAFAF] hover:text-[#E0E0E0] hover:underline">Back</Link>
                    </div>
                </div>

                <div className="space-y-10">
                    {payload.questions.map((q, idx) => (
                        <div key={q.id} className="space-y-4">
                            <div className="text-xs uppercase tracking-wide text-[#9A9A9A]">Question {idx + 1}</div>
                            <div className="text-lg leading-relaxed font-medium">{q.text}</div>
                            <ul className="space-y-2">
                                {q.options.map((op) => (
                                    <li key={op.id} className="text-[#D0D0D0] leading-relaxed">
                                        <span className="text-[#9A9A9A] mr-2">{op.id}.</span>
                                        {op.text}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}


