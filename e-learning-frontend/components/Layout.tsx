import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';

interface LayoutProps {
  children: React.ReactNode;
  title?: string;
}

interface User {
  role: string;
  // add other fields if necessary
}

const Layout: React.FC<LayoutProps> = ({ children, title }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    // Check sessionStorage for user and token on mount
    const storedUser = sessionStorage.getItem('user');
    const storedToken = sessionStorage.getItem('access_token');

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  const isLoggedIn = !!token; // or check user if you prefer

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Head>
        <title>{title || 'E-Learning Platform'}</title>
        <meta name="description" content="An awesome e-learning platform." />
      </Head>

      {/* Header / Navbar */}
      <header className="bg-blue-600 text-white px-4 py-3 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          {/* Logo or Site Name linking to Home */}
          <Link
            href="/"
            className="font-bold text-xl hover:opacity-90 transition"
          >
            E-Learn
          </Link>

          {/* Navigation Links */}
          <nav>
            <ul className="flex space-x-4 items-center">
              <li>
                <Link href="/" className="hover:underline">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/courses" className="hover:underline">
                  Courses
                </Link>
              </li>

              {/* Show "Login" only if NOT logged in */}
              {!isLoggedIn && (
                <li>
                  <Link href="/auth/login" className="hover:underline">
                    Login
                  </Link>
                </li>
              )}

              {/* Example: Show user role if logged in */}
              {isLoggedIn && (
                <li className="px-2 py-1 bg-white text-blue-600 rounded hover:bg-gray-100 transition cursor-default">
                  {user?.role ? `Role: ${user.role}` : 'Logged In'}
                </li>
                // Or add a logout button if you like
              )}
            </ul>
          </nav>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="container mx-auto flex-1 px-4 py-8 fade-in">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-blue-600 text-white px-4 py-3">
        <div className="container mx-auto text-center">
          <p className="text-sm">
            © {new Date().getFullYear()} E-Learning. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
