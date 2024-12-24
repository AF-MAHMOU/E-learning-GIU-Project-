import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import api from '../../../utils/axios';
import axios from 'axios';
import '../../../styles/globals.css'; // Import the CSS file

// Define the form schema using Yup
const schema = yup.object().shape({
  name: yup.string().required('Name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
});

type RegisterFormData = {
  name: string;
  email: string;
  password: string;
};

export default function RegisterInstructor() {
  const { register, handleSubmit, formState: { errors } } = useForm<RegisterFormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    try {
      await api.post('http://localhost:5000/auth/register', { ...data, role: 'instructor' });
      alert('Instructor registration successful!');
      // You might want to redirect to login page or dashboard here
    } catch (error) {
      if (axios.isAxiosError(error)) {
        alert(error.response?.data?.message || 'Registration failed');
        console.error('Registration error:', error.response?.data);
      } else {
        alert('An unexpected error occurred');
        console.error('Registration error:', error);
      }
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit(onSubmit)} noValidate>
      <h2 className="heading">Register as Instructor</h2>

      <div className="input-container">
        <input 
          {...register('name')} 
          placeholder="Name" 
          className="input"
          aria-invalid={!!errors.name} 
        />
        <p className="error-text">{errors.name?.message}</p>
      </div>

      <div className="input-container">
        <input 
          {...register('email')} 
          placeholder="Email" 
          className="input"
          type="email"
          aria-invalid={!!errors.email} 
        />
        <p className="error-text">{errors.email?.message}</p>
      </div>

      <div className="input-container">
        <input 
          type="password" 
          {...register('password')} 
          placeholder="Password" 
          className="input"
          aria-invalid={!!errors.password} 
        />
        <p className="error-text">{errors.password?.message}</p>
      </div>

      <button type="submit" className="button">
        Register as Instructor
      </button>
    </form>
  );
}
