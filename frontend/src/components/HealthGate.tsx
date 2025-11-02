'use client'

import React from "react";
import { useEffect, useState } from "react";

export default function HealthGate({ children }: { children: React.ReactNode }) {
    const [ready, setReady] = useState(false);

    useEffect(() => {
        const check = async () => {
            try {
                await fetch("/api/health", { credentials: "include" });
                setReady(true);
            } catch {
                setReady(false);
                setTimeout(check, 1500);
            }
        };
        check();
    }, []);

    if (!ready) {
        return (
            <div style={{ padding: 16, textAlign: 'center' }}>
                Service starting…
            </div>
        );
    }

    return <>{children}</>;
}
