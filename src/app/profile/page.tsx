'use client';

import React, { useEffect, useState } from 'react';
import { client } from '@/sanity/lib/client'; // Import your configured Sanity client
import Link from 'next/link';
import { FaAngleRight, FaChartLine, FaUsers } from 'react-icons/fa6';
import Image from 'next/image';
import heroIcon from '../../../public/icon-hero.png'
import hero from '../../../public/shop-hero.png';
import { FaListAlt } from 'react-icons/fa';
import { FaUser, FaEnvelope, FaBox, FaShippingFast } from 'react-icons/fa';  // Importing icons
import TrackingSection from '@/components/TrackingSection'



const ProfilePage = () => {
  interface Product {
    productTitle: string;
    price: number;
    quantity: number;
  }
  
  interface Order {
    _id: string;
    products: Product[]; // Array of Product type
    total: number;
    customerName: string;
    shippingAddress: {
      streetAddress: string;
      city: string;
      province: string;
      zipCode: string;
    };
  }
  
  interface Customer {
    _id: string;
    firstName: string;
    lastName:string
    email: string;
    orders: Order[];
  }
  

  const [formData, setFormData] = useState({ firstName: '', email: '' });
  const [customerData, setCustomerData] = useState<Customer | null>(null); // Holds customer and orders data
  const [errorMessage, setErrorMessage] = useState(''); // Holds error message
  const [allCustomers, setAllCustomers] = useState<Customer[]>([]);
  const [allOrders, setAllOrders] = useState<Order[]>([]);
  const [totalSales, setTotalSales] = useState(0);
  const [totalProducts, setTotalProducts] = useState(0);
  
  // Calculate analytics

  useEffect(() => {
    const productFetching = async () => {
      const query = `*[_type == "product"]`;
      const totalProduct = await client.fetch(query);
      const total = totalProduct.length
      setTotalProducts(total);
    };
    productFetching();
  }, []);


  useEffect(() => {
    if (allOrders.length > 0) {
      const totalSalesValue = allOrders.reduce((sum, order) => sum + order.total, 0);
      setTotalSales(totalSalesValue);
    }
  }, [allOrders]);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  
  const handleSearchCustomer = async () => {
    const { firstName, email } = formData;
  
    if (!firstName || !email) {
      setErrorMessage('Both fields are required.');
      return;
    }
  
    try {
      const customerQuery = `*[_type == "customer" && firstName == $firstName && email == $email][0]{
        _id,
        firstName,
        email,
        "orders": *[_type == "order" && customer._ref == ^._id]{
          _id,
          products,
          total,
          shippingAddress
        }
      }`;
  
      const customer = await client.fetch(customerQuery, { firstName, email });
  
      if (customer) {
        setCustomerData(customer);
        setErrorMessage('');
      } else {
        setCustomerData(null);
        setErrorMessage('Customer not found.');
      }
    } catch (error) {
      console.error('Error fetching customer:', error);
      setErrorMessage('An error occurred while fetching customer data.');
    }
  };
  
  const fetchAllCustomers = async () => {
    try {
      const query = `*[_type == "customer"]{
        _id,
        firstName,
        lastName,
        email
      }`;
      const customers = await client.fetch(query);
      setAllCustomers(customers);
    } catch (error) {
      console.error('Error fetching customers:', error);
    }
  };
  
  const fetchAllOrders = async () => {
    try {
      const query = `*[_type == "order"]{
        _id,
        total,
        "customerName": customer->firstName + " " + customer->lastName,
        "customerEmail": customer->email,
        products
      }`;
      const orders = await client.fetch(query);
      setAllOrders(orders);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };
  
  useEffect(() => {
    fetchAllCustomers();
    fetchAllOrders();
  }, []);
  



  return (
    <div className="">
{/* Hero Section */}
<div
        className="relative w-full h-[50vh] bg-cover bg-center"
        style={{ backgroundImage: `url(${hero.src})` }}
      >
        <div className="absolute inset-0 items-center flex justify-center">
          <div className="text-center text-black justify-center">
            <div className="flex justify-center">
              <Image src={heroIcon} alt="hero-icon" />
            </div>
            <h1 className="text-4xl font-bold">Shop</h1>
            <div className="flex">
              <Link href="/">
                <p className="mt-4 text-lg flex justify-center items-center gap-3 font-bold">
                  Home <FaAngleRight /> <span className="font-thin">Shop</span>
                </p>
              </Link>
            </div>
          </div>
        </div>
      </div>

<div className='max-w-5xl mx-4 md:mx-auto'>
      {/* Input Fields */}
      <div className="bg-white rounded-lg p-6 mb-8">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Search Profile</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={formData.firstName}
            onChange={handleInputChange}
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-1 focus:ring-[#B88E2F] focus:border-transparent"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleInputChange}
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-1 focus:ring-[#B88E2F] focus:border-transparent"
          />
        </div>
        <button
          onClick={handleSearchCustomer}
          className="mt-4 w-full sm:w-auto bg-[#B88E2F] text-white font-semibold px-6 py-2 rounded-lg hover:bg-[#f5ad0a] transition"
        >
          Search
        </button>
        {errorMessage && <p className="text-red-600 mt-4">{errorMessage}</p>}
      </div>

      {/* Admin Panel */}
      {formData.firstName === 'Tayyab' && formData.email === 'mt2348219@yahoo.com' && (
  <>
    {/* Analytics Section */}
    <div className="mb-8 p-6 bg-gray-100 shadow rounded-lg">
    <h3 className="text-xl md:text-2xl font-semibold text-gray-800 mb-4 flex items-center">
      <FaChartLine className="mr-2" />
      Analytics
    </h3>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
        <div className="bg-white p-4 rounded-lg shadow text-center">
          <h4 className="text-lg font-bold text-gray-700">Total Sales</h4>
          <p className="text-2xl font-semibold text-green-600">${totalSales}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow text-center">
          <h4 className="text-lg font-bold text-gray-700">Total Products</h4>
          <p className="text-2xl font-semibold text-blue-600">{totalProducts}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow text-center">
          <h4 className="text-lg font-bold text-gray-700">Total Customers</h4>
          <p className="text-2xl font-semibold text-purple-600">
            {allCustomers.length}
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow text-center">
          <h4 className="text-lg font-bold text-gray-700">Total Orders</h4>
          <p className="text-2xl font-semibold text-orange-600">
            {allOrders.length}
          </p>
        </div>
      </div>
    </div>

    {/* All Customers Section */}
    <div className="mb-8">
    <h3 className="text-xl md:text-2xl font-semibold text-gray-800 mb-6 flex items-center">
  <FaUsers className="mr-2" />
  All Customers
</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {allCustomers.map((customer) => (
          <div
            key={customer._id}
            className="bg-white shadow-lg rounded-lg p-6 border border-gray-200"
          >
            <h4 className="text-lg font-semibold text-gray-800">
  {`${customer.firstName} ${customer.lastName}`}
</h4>

            <p className="text-gray-600">{customer.email}</p>
          </div>
        ))}
      </div>
    </div>

    {/* All Orders Section */}
    <div>
    <h3 className="text-xl md:text-2xl font-semibold text-gray-800 mb-6 flex items-center">
      <FaListAlt className="mr-2" />
      All Orders
    </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {allOrders.map((order) => (
          <div
            key={order._id}
            className="bg-white shadow-lg rounded-lg p-6 border border-gray-200"
          >
            <h4 className="text-md font-semibold text-gray-800">
              Order ID: {order._id}
            </h4>
            <p className="text-gray-600">
              <span className="font-semibold">Total:</span> ${order.total}
            </p>
            <p className="text-gray-600">
            <span className="font-semibold">Customer:</span> {order.customerName}
            </p>
          </div>
        ))}
      </div>
    </div>
  </>
)}



{/* Customer Data */}


{customerData && (
  <div className="bg-white shadow-lg rounded-lg p-8 max-w-5xl mx-auto mb-12">
    {/* Customer Details Section */}
    <h2 className="text-xl md:text-3xl font-semibold text-gray-800 mb-6 flex items-center">
      <FaUser className="mr-3 text-blue-500" />
      Profile Details
    </h2>
    <div className="border-b pb-4 mb-12">
      <p className="text-lg">
        <span className="font-semibold text-gray-700">Name:</span> {customerData.firstName} {customerData.lastName}
      </p>
      <p className="text-lg">
        <span className="font-semibold text-gray-700">Email:</span> {customerData.email}
      </p>
    </div>

{/* Orders Section */}
<h3 className="text-2xl font-semibold text-gray-800 mt-4 mb-2 flex items-center">
  <FaBox className="mr-3 text-green-500" />
  Orders
</h3>
{customerData.orders.length > 0 ? (
  <ul className="space-y-6">
    {customerData.orders.map((order) => (
      <li
        key={order._id}
        className="bg-gray-50 rounded-lg p-6 shadow-md hover:shadow-xl transition-all duration-300"
      >
        <div className="mb-4 flex items-center justify-between flex-wrap border-b pb-2">
          <p className="text-lg w-full sm:w-auto break-words">
            <span className="font-semibold text-gray-700">Order ID:</span> {order._id}
          </p>
          <p className="text-lg w-full sm:w-auto pt-2">
            <span className="font-semibold text-gray-700">Total:</span> ${order.total}
          </p>
        </div>

        <div className="mb-4 border-b pb-2">
          <p className="text-lg">
            <span className="font-semibold text-gray-700">Shipping Address:</span>
            {' '}{order.shippingAddress.streetAddress}, {order.shippingAddress.city}
          </p>
        </div>

        <div className="space-y-2">
          <h4 className="font-semibold text-gray-700 flex items-center">
            <FaBox className="mr-2 text-gray-500" />
            Products:
          </h4>
          <ul>
            {order.products.map((product, index) => (
              <li key={index} className="flex justify-between items-center text-gray-600">
                <span>{product.productTitle}</span>
                <span>{product.quantity} x ${product.price}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Tracking Section */}
        <TrackingSection orderId={order._id} />
      </li>
    ))}
  </ul>
) : (
  <p className="text-gray-600">No orders found for this customer.</p>
)}
  </div>
)}


</div>
    </div>
  );
};

export default ProfilePage;
