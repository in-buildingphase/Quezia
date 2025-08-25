import Link from 'next/link';
import { tests } from '@/lib/tests/data';

export default function TestsPage() {
    return (
        <div className="min-h-screen bg-black text-[#E0E0E0] px-6 py-12">
            <div className="max-w-5xl mx-auto">
                <h1 className="text-3xl font-bold mb-8">Available Tests</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {tests.map((t) => (
                        <Link key={t.id} href={`/tests/${t.id}`} className="group">
                            <div className="rounded-xl border border-[#333] bg-[#111] p-6 hover:border-[#FFB74D]/60 transition-colors">
                                <div className="text-xl font-semibold mb-2">{t.title}</div>
                                <div className="text-sm text-[#A0A0A0]">{t.questionCount} Questions</div>
                                <div className="mt-4 inline-flex items-center gap-2 text-[#FFB74D] opacity-0 group-hover:opacity-100 transition-opacity">Start Test →</div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}

