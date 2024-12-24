import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import axios from 'axios';
import { useRouter } from 'next/router';
import '../../styles/globals.css';

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
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>({
    resolver: yupResolver(schema),
  });
  const router = useRouter();

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    try {
      const response = await axios.post('http://localhost:5000/auth/login', data);

      const { access_token, role: userRole } = response.data;

      sessionStorage.setItem('access_token', access_token);
      sessionStorage.setItem('role', userRole);

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
      const errorMessage = axios.isAxiosError(error) 
        ? error.response?.data?.message || 'Login failed' 
        : 'An unexpected error occurred';
      alert(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className="input-container">
        <input 
          {...register('email')} 
          className="input"
          placeholder="Email" 
          type="email" 
          autoComplete="email" 
          aria-invalid={!!errors.email}
        />
        <p className="error-text">{errors.email?.message}</p>
      </div>

      <div className="input-container">
        <input 
          type="password" 
          {...register('password')} 
          className="input"
          placeholder="Password" 
          autoComplete="current-password" 
          aria-invalid={!!errors.password}
        />
        <p className="error-text">{errors.password?.message}</p>
      </div>

      <button 
        type="submit" 
        disabled={isLoading} 
        className="button"
      >
        {isLoading ? 'Logging in...' : 'Login'}
      </button>
    </form>
  );
}

