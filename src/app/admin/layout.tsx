'use client';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-black overflow-y-auto">  
        {children}
    </div>
  );
}
