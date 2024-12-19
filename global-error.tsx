'use client';
import React from 'react';

export default function GlobalError({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    return (
        <html>
            <body>
                <h2>Something went wrong! Please try again</h2>
                <button onClick={() => reset()}>Try again</button>
            </body>
        </html>
    );
}