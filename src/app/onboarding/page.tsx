"use client";

import { useUser } from "@clerk/nextjs";
import { useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const EXAMS = ["JEE", "SAT", "CUET"] as const;
const AGE_GROUPS = ["Under 13", "13–15", "16–18", "19–22", "23+"] as const;

export default function OnboardingPage() {
    const router = useRouter();
    const { user, isLoaded, isSignedIn } = useUser();
    const updateOnboarding = useMutation(api.users.updateOnboarding);

    const [country, setCountry] = useState("");
    const [examPreference, setExamPreference] = useState<typeof EXAMS[number] | "">("");
    const [ageGroup, setAgeGroup] = useState<typeof AGE_GROUPS[number] | "">("");
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (isLoaded && !isSignedIn) {
            router.replace("/sign-in");
        }
    }, [isLoaded, isSignedIn, router]);

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user) return;
        setSubmitting(true);
        setError(null);
        try {
            if (!country || !examPreference || !ageGroup) {
                setError("Please complete all fields.");
                setSubmitting(false);
                return;
            }
            await updateOnboarding({
                clerkId: user.id,
                country,
                examPreference: examPreference as "JEE" | "SAT" | "CUET",
                ageGroup: ageGroup as "Under 13" | "13–15" | "16–18" | "19–22" | "23+",
            });
            router.replace("/dashboard");
        } catch (err) {
            setError(err instanceof Error ? err.message : "Something went wrong");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-black text-[#E0E0E0] px-6 py-10">
            <div className="max-w-xl mx-auto">
                <h1 className="text-3xl font-semibold mb-2">Welcome! Let’s set things up</h1>
                <p className="text-[#A0A0A0] mb-8">Answer a few questions to personalize your experience.</p>

                <form onSubmit={onSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm mb-2">Which country are you currently residing in?</label>
                        <input
                            value={country}
                            onChange={(e) => setCountry(e.target.value)}
                            placeholder="Enter your country"
                            className="w-full bg-[#111] border border-[#333] rounded-lg px-3 py-2 outline-none focus:border-[#FFB74D]/60"
                        />
                    </div>

                    <div>
                        <label className="block text-sm mb-2">Which exam are you preparing for?</label>
                        <div className="grid grid-cols-3 gap-2">
                            {EXAMS.map((ex) => (
                                <button
                                    key={ex}
                                    type="button"
                                    onClick={() => setExamPreference(ex)}
                                    className={`px-3 py-2 rounded-lg border ${examPreference === ex ? "bg-[#1a1a1a] border-[#FFB74D]" : "bg-[#111] border-[#333] hover:border-[#FFB74D]/60"}`}
                                >
                                    {ex}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm mb-2">Please select your age group.</label>
                        <div className="grid grid-cols-3 gap-2">
                            {AGE_GROUPS.map((ag) => (
                                <button
                                    key={ag}
                                    type="button"
                                    onClick={() => setAgeGroup(ag)}
                                    className={`px-3 py-2 rounded-lg border ${ageGroup === ag ? "bg-[#1a1a1a] border-[#FFB74D]" : "bg-[#111] border-[#333] hover:border-[#FFB74D]/60"}`}
                                >
                                    {ag}
                                </button>
                            ))}
                        </div>
                    </div>

                    {error && <div className="text-red-400 text-sm">{error}</div>}

                    <div className="flex justify-end">
                        <button
                            type="submit"
                            disabled={submitting}
                            className="px-5 py-2 rounded-xl bg-[#FF8F00] text-black hover:bg-[#FFA000] disabled:opacity-60"
                        >
                            {submitting ? "Saving..." : "Continue"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}


