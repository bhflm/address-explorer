import type { ReactNode } from "react";

export default async function AppLayout({ children }: { children: ReactNode }) {
    return (
        <div className="dark relative flex min-h-screen">
            <main className="flex justify-center flex-1 bg-white text-primary dark:bg-black">
                {children}
            </main>
        </div>
    );
}
