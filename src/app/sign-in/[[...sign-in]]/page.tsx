import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-black relative overflow-hidden">
            {/* Background decorative elements matching landing page */}
            <div className="absolute top-0 left-1/4 w-72 h-72 bg-[#FF8F00]/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#FFD54F]/5 rounded-full blur-3xl" />
            <div className="absolute top-1/2 left-1/3 w-80 h-80 bg-[#FFB74D]/8 rounded-full blur-3xl" />

            <div className="w-full max-w-md relative z-10">
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-[#FFB74D] mb-2 tracking-tight">
                        Welcome Back
                    </h1>
                    <p className="text-[#E0E0E0] text-lg">
                        Sign in to your Quezia account
                    </p>
                </div>

                <div className="bg-black/40 backdrop-blur-xl rounded-2xl border border-white/20 shadow-2xl p-8" style={{ backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)' }}>
                    <SignIn
                        appearance={{
                            elements: {
                                formButtonPrimary:
                                    "bg-gradient-to-r from-[#FF8F00] to-[#FFA000] hover:from-[#FFA000] hover:to-[#FFB74D] text-black font-semibold py-3 px-6 rounded-full transition-all duration-300 shadow-lg",
                                card: "shadow-none",
                                headerTitle: "text-2xl font-bold text-[#E0E0E0]",
                                headerSubtitle: "text-[#E0E0E0]/80",
                                formFieldInput: "bg-white/10 border border-white/20 text-[#E0E0E0] placeholder-[#E0E0E0]/50 rounded-lg",
                                formFieldLabel: "text-[#E0E0E0]",
                                dividerLine: "bg-white/20",
                                dividerText: "text-[#E0E0E0]/60",
                                socialButtonsBlockButton: "bg-white/10 border border-white/20 text-[#E0E0E0] hover:bg-white/20",
                                footerActionLink: "text-[#FFB74D] hover:text-[#FFCC80]",
                                formResendCodeLink: "text-[#FFB74D] hover:text-[#FFCC80]",
                            },
                        }}
                        redirectUrl="/dashboard"
                        signUpUrl="/sign-up"
                    />
                </div>

                <div className="text-center mt-6">
                    <p className="text-[#E0E0E0]/80">
                        Don't have an account?{" "}
                        <a
                            href="/sign-up"
                            className="text-[#FFB74D] hover:text-[#FFCC80] font-semibold transition-colors"
                        >
                            Sign up here
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
}
