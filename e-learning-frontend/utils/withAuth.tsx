import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

interface WithAuthOptions {
  allowedRoles?: string[]; // Specify allowed roles for the protected route
}

export default function withAuth(Component: React.ComponentType, options: WithAuthOptions = {}) {
  const { allowedRoles } = options;

  return function ProtectedRoute(props: any) {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
      if (typeof window !== 'undefined') {
        const storedUser = sessionStorage.getItem('role');
        const token = sessionStorage.getItem('access_token');
        const currentPath = router.pathname;

        // Bypass authentication for public routes (e.g., /courses, /auth/login, /auth/register)
        if (
          currentPath.startsWith('/courses') || 
          currentPath.startsWith('/auth/login') ||
          currentPath.startsWith('/auth/register')
        ) {
          setLoading(false);
          return;
        }

        if (!token || !storedUser) {
          // Redirect to login if no token or user is found
          router.push('/auth/login');
        } else {
          const parsedUser = JSON.parse(storedUser);
          setUser(parsedUser);

          // Check if the user's role is allowed for this route
          if (allowedRoles && !allowedRoles.includes(parsedUser.role)) {
            router.push('/auth/login');
          }
        }

        setLoading(false);
      }
    }, [allowedRoles, router]);

    if (loading) {
      return <div>Loading...</div>;
    }

    return <Component {...props} user={user} />;
  };
}
