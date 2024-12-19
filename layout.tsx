import React, { useState, useEffect } from 'react';

export default async function Dashboardlayout( {
    children,
    params,
}: {
    children: React.ReactNode
    params: Promise<{ team: string }>
}) {
    const { team } = await params
    const [notification, setNotification] = useState<string[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const response = await fetch(`/api/notifications?team=${team}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch notifications');
                }
                const data = await response.json();
                setNotification(data);
            } catch (err) {
                setError(err.message);
            }
        };

        fetchNotifications();
    }, [team]);

    return (
        <section>
            <header>
                <h1>Welcome to {team}'s Dashboard</h1>
            </header>

            <aside>
                <h2>Notifications</h2>
                {error ? (
                    <p style={{ color: 'red' }}>{error}</p>
                ) : notification.length > 0 ? (
                    <ul>
                        {notification.map((notification, index) => (
                            <li key={index}>{notification}</li>
                        ))}
                    </ul>
                ) : (
                    <p>No notifications available</p>
                )}
            </aside>

            <main>{children}</main>
        </section>
    );
}