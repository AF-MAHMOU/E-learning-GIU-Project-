import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import axios from 'axios';
import { useRouter } from 'next/router';

// Define the form schema using Yup
const schema = yup.object().shape({
  email: yup
    .string()
    .email('Invalid email')
    .required('Email is required'),
  password: yup
    .string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
});

// Define the form data type
type LoginFormData = {
  email: string;
  password: string;
};

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: yupResolver(schema),
  });

  const router = useRouter();

  const onSubmit = async (data: LoginFormData) => {
    try {
      const response = await axios.post(
        'http://localhost:5000/auth/login',
        data
      );

      const { access_token, role: userRole } = response.data;

      // Store in sessionStorage
      sessionStorage.setItem('access_token', access_token);
      sessionStorage.setItem('role', userRole);

      // Redirect based on role
      switch (userRole) {
        case 'admin':
          router.push('/dashboard/admin');
          break;
        case 'student':
          router.push('/dashboard/student');
          break;
        case 'instructor':
          router.push('/dashboard/instructor');
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
    <div className="max-w-md w-full bg-white p-6 rounded shadow mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
          Login
        </button>
      </form>
    </div>
  );
}
