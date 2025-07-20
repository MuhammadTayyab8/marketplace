'use client';

import { client } from '@/sanity/lib/client';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcryptjs';




// Define TypeScript interface
interface SignUpFormData {
  email: string;
  username: string;
  name: string;
  password: string;
}





const SignUpForm = () => {
  const [formData, setFormData] = useState<SignUpFormData>({
    email: '',
    username: '',
    name: '',
    password: '',
  });

  const [error, setError] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string>('');
  
  const router = useRouter(); // Correctly use useRouter

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);
  
    try {
      // Check if the user already exists by querying Sanity
      const existingUsers = await client.fetch(
        `*[_type == "user" && (email == $email || username == $username)]`,
        { email: formData.email, username: formData.username }
      );
  
      if (existingUsers.length > 0) {
        setError('Email or Username is already taken. Please try another.');
        setIsSubmitting(false);
        return;
      }
  

      const userId = uuidv4(); // Generate a unique ID
      // Proceed with account creation if no duplicate found
      const hashedPassword = await bcrypt.hash(formData.password, 10);
      await client.create({
        _type: 'user',
        _id: userId, // Save the unique ID
        email: formData.email,
        username: formData.username,
        name: formData.name,
        password: formData.password, // Always hash passwords on backend
      });
  
      setSuccessMessage('Account created successfully! Redirecting...');
      setTimeout(() => {
        router.push('/log-in');
      }, 2000);
  
    } catch (err) {
      setError('Failed to create account. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };
  

  return (
    <div className="max-w-md mx-auto p-8 bg-white shadow-md border border-gray-100 rounded-lg my-32">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Create an Account</h2>
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
          <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="w-full p-3 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#B88E2F]"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
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
        {successMessage && <p className="text-green-500 text-sm text-center mb-4">{successMessage}</p>}

        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full p-3 bg-[#B88E2F] text-white font-bold rounded-md hover:bg-[#B88E2F]/80 focus:outline-none focus:ring-2 focus:ring-[#B88E2F] ${isSubmitting ? 'cursor-not-allowed' : ''}`}
        >
          {isSubmitting ? 'Signing Up...' : 'Sign Up'}
        </button>

        <div className="mt-4 text-center">
          Already have an account? <Link href='/log-in' className="text-[#B88E2F] hover:underline">Login</Link>
        </div>
      </form>
    </div>
  );
};

export default SignUpForm;
