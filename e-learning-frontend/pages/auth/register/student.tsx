import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import axios from 'axios';

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

export default function RegisterStudent() {
  const { register, handleSubmit, formState: { errors } } = useForm<RegisterFormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    try {
      await axios.post('http://localhost:3002/auth/register', { ...data, role: 'student' });
      alert('Student registration successful!');
    } catch (error) {
      if (axios.isAxiosError(error)) {
        alert(error.response?.data?.message || 'Registration failed');
      } else {
        console.error(error);
        alert('An unexpected error occurred');
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2>Register as Student</h2>
      <input {...register('name')} placeholder="Name" />
      <p>{errors.name?.message}</p>

      <input {...register('email')} placeholder="Email" />
      <p>{errors.email?.message}</p>

      <input type="password" {...register('password')} placeholder="Password" />
      <p>{errors.password?.message}</p>

      <button type="submit">Register as Student</button>
    </form>
  );
}
