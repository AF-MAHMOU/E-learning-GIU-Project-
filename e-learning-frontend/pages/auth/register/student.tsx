import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import axios from 'axios';

// Define the form schema using Yup
const schema = yup.object().shape({
  name: yup.string().required('Name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup
    .string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
});

type RegisterFormData = {
  name: string;
  email: string;
  password: string;
};

export default function RegisterStudent() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    try {
      await axios.post('http://localhost:5000/auth/register', {
        ...data,
        role: 'student',
      });
      alert('Student registration successful!');
      // Optional: redirect or show a success UI
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
    <div className="max-w-md w-full bg-white p-6 rounded shadow mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4 text-center">
        Register as Student
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Name */}
        <div>
          <input
            {...register('name')}
            placeholder="Name"
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <input
            {...register('email')}
            placeholder="Email"
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        {/* Password */}
        <div>
          <input
            type="password"
            {...register('password')}
            placeholder="Password"
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
        >
          Register as Student
        </button>
      </form>
    </div>
  );
}
