import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function withAuth(Component: React.ComponentType) {
  return function ProtectedRoute(props: any) {
    const router = useRouter();

    useEffect(() => {
      const token = sessionStorage.getItem('access_token'); // Changed to sessionStorage
      if (!token) {
        router.push('/auth/login'); // Redirect to login
      }
    }, []);

    return <Component {...props} />;
  };
}
