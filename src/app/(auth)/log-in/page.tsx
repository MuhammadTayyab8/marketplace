'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const LoginForm = () => {
  interface LoginFormData {
    email: string;
    password: string;
  }

  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: '',
  });

  const [error, setError] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    if (!formData.email || !formData.password) {
      setError('Email and Password are required.');
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Login failed');
        setIsSubmitting(false);
        return;
      }

      // Redirect on successful login
      router.push('/');
      // window.location.reload()
    } catch (error) {
      setError('An unexpected error occurred. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-8 bg-white shadow-md border border-gray-100 rounded-lg my-32">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-3 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#B88E2F]"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-3 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#B88E2F]"
            required
          />
        </div>

        {error && <p className="text-red-500 text-sm text-center mb-4">{error}</p>}

        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full p-3 bg-[#B88E2F] text-white font-bold rounded-md hover:bg-[#B88E2F]/80 focus:outline-none focus:ring-2 focus:ring-[#B88E2F] ${isSubmitting ? 'cursor-not-allowed' : ''}`}
        >
          {isSubmitting ? 'Logging In...' : 'Log In'}
        </button>
        <div className="mt-4 text-center">
          Not Account Created? <Link href='/sign-up' className="text-[#B88E2F] hover:underline">Signup</Link>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
