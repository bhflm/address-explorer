import type { ReactNode } from "react";

export default async function AppLayout({ children }: { children: ReactNode }) {
    return (
        <div className="h-[100vh] w-full relative">
            <main className="text-primary">
                {children}
            </main>
        </div>
    );
}
