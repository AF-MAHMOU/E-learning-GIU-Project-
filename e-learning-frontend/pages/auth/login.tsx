import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import axios from 'axios';
import { useRouter } from 'next/router';

// Define the form schema using Yup
const schema = yup.object().shape({
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
});

// Define the form data type
type LoginFormData = {
  email: string;
  password: string;
};

export default function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>({
    resolver: yupResolver(schema),
  });
  const router = useRouter();

  const onSubmit = async (data: LoginFormData) => {
    try {
      // Send login request to the backend, passing only email and password
      const response = await axios.post('http://localhost:3002/auth/login', data);

      const { access_token, role: userRole } = response.data;

      // Store the access token and role in sessionStorage
      sessionStorage.setItem('access_token', access_token);
      sessionStorage.setItem('role', userRole);

      // Redirect based on the user role
      switch (userRole) {
        case 'admin':
          router.push('/admin/dashboard');
          break;
        case 'student':
          router.push('/student/dashboard');
          break;
        case 'instructor':
          router.push('/instructor/dashboard');
          break;
        default:
          router.push('/unauthorized');
          sessionStorage.removeItem('access_token');
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        alert(error.response?.data?.message || 'Login failed');
      } else {
        console.error(error);
        alert('An unexpected error occurred');
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('email')} placeholder="Email" />
      <p>{errors.email?.message}</p>

      <input type="password" {...register('password')} placeholder="Password" />
      <p>{errors.password?.message}</p>

      <button type="submit">Login</button>
    </form>
  );
}
