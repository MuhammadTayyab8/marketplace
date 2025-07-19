// 'use client';

// import React, { useEffect, useState } from 'react';
// import { client } from '@/sanity/lib/client'; // Import your configured Sanity client
// import Link from 'next/link';
// import { FaAngleRight, FaChartLine, FaUsers } from 'react-icons/fa6';
// import Image from 'next/image';
// import heroIcon from '../../../public/icon-hero.png'
// import hero from '../../../public/shop-hero.png';
// import { FaListAlt } from 'react-icons/fa';
// import { FaUser, FaEnvelope, FaBox, FaShippingFast } from 'react-icons/fa';  // Importing icons
// import TrackingSection from '@/components/TrackingSection'



// const ProfilePage = () => {
//   interface Product {
//     productTitle: string;
//     price: number;
//     quantity: number;
//   }
  
//   interface Order {
//     _id: string;
//     products: Product[]; // Array of Product type
//     total: number;
//     customerName: string;
//     shippingAddress: {
//       streetAddress: string;
//       city: string;
//       province: string;
//       zipCode: string;
//     };
//   }
  
//   interface Customer {
//     _id: string;
//     firstName: string;
//     lastName:string
//     email: string;
//     orders: Order[];
//   }
  

//   const [formData, setFormData] = useState({ firstName: '', email: '' });
//   const [customerData, setCustomerData] = useState<Customer | null>(null); // Holds customer and orders data
//   const [errorMessage, setErrorMessage] = useState(''); // Holds error message
//   const [allCustomers, setAllCustomers] = useState<Customer[]>([]);
//   const [allOrders, setAllOrders] = useState<Order[]>([]);
//   const [totalSales, setTotalSales] = useState(0);
//   const [totalProducts, setTotalProducts] = useState(0);
  
//   // Calculate analytics

//   useEffect(() => {
//     const productFetching = async () => {
//       const query = `*[_type == "product"]`;
//       const totalProduct = await client.fetch(query);
//       const total = totalProduct.length
//       setTotalProducts(total);
//     };
//     productFetching();
//   }, []);


//   useEffect(() => {
//     if (allOrders.length > 0) {
//       const totalSalesValue = allOrders.reduce((sum, order) => sum + order.total, 0);
//       setTotalSales(totalSalesValue);
//     }
//   }, [allOrders]);
  
//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };
  
//   const handleSearchCustomer = async () => {
//     const { firstName, email } = formData;
  
//     if (!firstName || !email) {
//       setErrorMessage('Both fields are required.');
//       return;
//     }
  
//     try {
//       const customerQuery = `*[_type == "customer" && firstName == $firstName && email == $email][0]{
//         _id,
//         firstName,
//         email,
//         "orders": *[_type == "order" && customer._ref == ^._id]{
//           _id,
//           products,
//           total,
//           shippingAddress
//         }
//       }`;
  
//       const customer = await client.fetch(customerQuery, { firstName, email });
  
//       if (customer) {
//         setCustomerData(customer);
//         setErrorMessage('');
//       } else {
//         setCustomerData(null);
//         setErrorMessage('Customer not found.');
//       }
//     } catch (error) {
//       console.error('Error fetching customer:', error);
//       setErrorMessage('An error occurred while fetching customer data.');
//     }
//   };
  
//   const fetchAllCustomers = async () => {
//     try {
//       const query = `*[_type == "customer"]{
//         _id,
//         firstName,
//         lastName,
//         email
//       }`;
//       const customers = await client.fetch(query);
//       setAllCustomers(customers);
//     } catch (error) {
//       console.error('Error fetching customers:', error);
//     }
//   };
  
//   const fetchAllOrders = async () => {
//     try {
//       const query = `*[_type == "order"]{
//         _id,
//         total,
//         "customerName": customer->firstName + " " + customer->lastName,
//         "customerEmail": customer->email,
//         products
//       }`;
//       const orders = await client.fetch(query);
//       setAllOrders(orders);
//     } catch (error) {
//       console.error('Error fetching orders:', error);
//     }
//   };
  
//   useEffect(() => {
//     fetchAllCustomers();
//     fetchAllOrders();
//   }, []);
  



//   return (
//     <div className="">
// {/* Hero Section */}
// <div
//         className="relative w-full h-[50vh] bg-cover bg-center"
//         style={{ backgroundImage: `url(${hero.src})` }}
//       >
//         <div className="absolute inset-0 items-center flex justify-center">
//           <div className="text-center text-black justify-center">
//             <div className="flex justify-center">
//               <Image src={heroIcon} alt="hero-icon" />
//             </div>
//             <h1 className="text-4xl font-bold">Shop</h1>
//             <div className="flex">
//               <Link href="/">
//                 <p className="mt-4 text-lg flex justify-center items-center gap-3 font-bold">
//                   Home <FaAngleRight /> <span className="font-thin">Shop</span>
//                 </p>
//               </Link>
//             </div>
//           </div>
//         </div>
//       </div>

// <div className='max-w-5xl mx-4 md:mx-auto'>
//       {/* Input Fields */}
//       <div className="bg-white rounded-lg p-6 mb-8">
//         <h2 className="text-xl font-semibold text-gray-700 mb-4">Search Profile</h2>
//         <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//           <input
//             type="text"
//             name="firstName"
//             placeholder="First Name"
//             value={formData.firstName}
//             onChange={handleInputChange}
//             className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-1 focus:ring-[#B88E2F] focus:border-transparent"
//           />
//           <input
//             type="email"
//             name="email"
//             placeholder="Email"
//             value={formData.email}
//             onChange={handleInputChange}
//             className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-1 focus:ring-[#B88E2F] focus:border-transparent"
//           />
//         </div>
//         <button
//           onClick={handleSearchCustomer}
//           className="mt-4 w-full sm:w-auto bg-[#B88E2F] text-white font-semibold px-6 py-2 rounded-lg hover:bg-[#f5ad0a] transition"
//         >
//           Search
//         </button>
//         {errorMessage && <p className="text-red-600 mt-4">{errorMessage}</p>}
//       </div>

//       {/* Admin Panel */}
//       {formData.firstName === 'Tayyab' && formData.email === 'mt2348219@yahoo.com' && (
//   <>
//     {/* Analytics Section */}
//     <div className="mb-8 p-6 bg-gray-100 shadow rounded-lg">
//     <h3 className="text-xl md:text-2xl font-semibold text-gray-800 mb-4 flex items-center">
//       <FaChartLine className="mr-2" />
//       Analytics
//     </h3>
//       <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
//         <div className="bg-white p-4 rounded-lg shadow text-center">
//           <h4 className="text-lg font-bold text-gray-700">Total Sales</h4>
//           <p className="text-2xl font-semibold text-green-600">${totalSales}</p>
//         </div>
//         <div className="bg-white p-4 rounded-lg shadow text-center">
//           <h4 className="text-lg font-bold text-gray-700">Total Products</h4>
//           <p className="text-2xl font-semibold text-blue-600">{totalProducts}</p>
//         </div>
//         <div className="bg-white p-4 rounded-lg shadow text-center">
//           <h4 className="text-lg font-bold text-gray-700">Total Customers</h4>
//           <p className="text-2xl font-semibold text-purple-600">
//             {allCustomers.length}
//           </p>
//         </div>
//         <div className="bg-white p-4 rounded-lg shadow text-center">
//           <h4 className="text-lg font-bold text-gray-700">Total Orders</h4>
//           <p className="text-2xl font-semibold text-orange-600">
//             {allOrders.length}
//           </p>
//         </div>
//       </div>
//     </div>

//     {/* All Customers Section */}
//     <div className="mb-8">
//     <h3 className="text-xl md:text-2xl font-semibold text-gray-800 mb-6 flex items-center">
//   <FaUsers className="mr-2" />
//   All Customers
// </h3>
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//         {allCustomers.map((customer) => (
//           <div
//             key={customer._id}
//             className="bg-white shadow-lg rounded-lg p-6 border border-gray-200"
//           >
//             <h4 className="text-lg font-semibold text-gray-800">
//   {`${customer.firstName} ${customer.lastName}`}
// </h4>

//             <p className="text-gray-600">{customer.email}</p>
//           </div>
//         ))}
//       </div>
//     </div>

//     {/* All Orders Section */}
//     <div>
//     <h3 className="text-xl md:text-2xl font-semibold text-gray-800 mb-6 flex items-center">
//       <FaListAlt className="mr-2" />
//       All Orders
//     </h3>
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
//         {allOrders.map((order) => (
//           <div
//             key={order._id}
//             className="bg-white shadow-lg rounded-lg p-6 border border-gray-200"
//           >
//             <h4 className="text-md font-semibold text-gray-800">
//               Order ID: {order._id}
//             </h4>
//             <p className="text-gray-600">
//               <span className="font-semibold">Total:</span> ${order.total}
//             </p>
//             <p className="text-gray-600">
//             <span className="font-semibold">Customer:</span> {order.customerName}
//             </p>
//           </div>
//         ))}
//       </div>
//     </div>
//   </>
// )}



// {/* Customer Data */}


// {customerData && (
//   <div className="bg-white shadow-lg rounded-lg p-8 max-w-5xl mx-auto mb-12">
//     {/* Customer Details Section */}
//     <h2 className="text-xl md:text-3xl font-semibold text-gray-800 mb-6 flex items-center">
//       <FaUser className="mr-3 text-blue-500" />
//       Profile Details
//     </h2>
//     <div className="border-b pb-4 mb-12">
//       <p className="text-lg">
//         <span className="font-semibold text-gray-700">Name:</span> {customerData.firstName} {customerData.lastName}
//       </p>
//       <p className="text-lg">
//         <span className="font-semibold text-gray-700">Email:</span> {customerData.email}
//       </p>
//     </div>

// {/* Orders Section */}
// <h3 className="text-2xl font-semibold text-gray-800 mt-4 mb-2 flex items-center">
//   <FaBox className="mr-3 text-green-500" />
//   Orders
// </h3>
// {customerData.orders.length > 0 ? (
//   <ul className="space-y-6">
//     {customerData.orders.map((order) => (
//       <li
//         key={order._id}
//         className="bg-gray-50 rounded-lg p-6 shadow-md hover:shadow-xl transition-all duration-300"
//       >
//         <div className="mb-4 flex items-center justify-between flex-wrap border-b pb-2">
//           <p className="text-lg w-full sm:w-auto break-words">
//             <span className="font-semibold text-gray-700">Order ID:</span> {order._id}
//           </p>
//           <p className="text-lg w-full sm:w-auto pt-2">
//             <span className="font-semibold text-gray-700">Total:</span> ${order.total}
//           </p>
//         </div>

//         <div className="mb-4 border-b pb-2">
//           <p className="text-lg">
//             <span className="font-semibold text-gray-700">Shipping Address:</span>
//             {' '}{order.shippingAddress.streetAddress}, {order.shippingAddress.city}
//           </p>
//         </div>

//         <div className="space-y-2">
//           <h4 className="font-semibold text-gray-700 flex items-center">
//             <FaBox className="mr-2 text-gray-500" />
//             Products:
//           </h4>
//           <ul>
//             {order.products.map((product, index) => (
//               <li key={index} className="flex justify-between items-center text-gray-600">
//                 <span>{product.productTitle}</span>
//                 <span>{product.quantity} x ${product.price}</span>
//               </li>
//             ))}
//           </ul>
//         </div>

//         {/* Tracking Section */}
//         <TrackingSection orderId={order._id} />
//       </li>
//     ))}
//   </ul>
// ) : (
//   <p className="text-gray-600">No orders found for this customer.</p>
// )}
//   </div>
// )}


// </div>
//     </div>
//   );
// };

// export default ProfilePage;





































"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { client } from "@/sanity/lib/client"; // Import Sanity client
import { FaCheckCircle, FaTimesCircle, FaTruck, FaBoxOpen } from "react-icons/fa"; // React Icons for shipment tracking





interface User {
  name: string;
  email: string;
  _createdAt: any;
  _updatedAt: any;
}

interface Product {
  productTitle: string;
  product: {
    _ref: string;
  };
  price: number;
  quantity: number;
}

interface Order {
  _id: string;
  createdAt: string;
  totalAmount: number;
  status: string;
  products: Product[];
  fullName: string;
  address: string;
  city: string;
  phone: string;
  email: string;
}

const UserProfile = () => {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null); // Track selected order for details

  // Fetch user data and orders from Sanity
  useEffect(() => {
    const fetchUserData = async () => {
      const getUserId = async () => {
        const res = await fetch("/api/get-user");
        const data = await res.json();
        return data.userId;
      };

      const userId = await getUserId();

      if (!userId) {
        router.push("/log-in");
        return;
      }

      try {
        // Fetch user data from Sanity
        const userData = await client.fetch(
          `*[_type == "user" && _id == $userId][0]`,
          { userId }
        );

        if (!userData) {
          setError("User not found");
          return;
        }

        setUser(userData);

        // Fetch orders for the user
        const userOrders = await client.fetch(
          `*[_type == "order" && user._ref == $userId] | order(createdAt desc)`,
          { userId }
        );

        setOrders(userOrders);
      } catch (err) {
        setError("Failed to fetch user data");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [router]);

  // Handle logout
  const handleLogout = async () => {
    await fetch("/api/remove-user");
    router.push("/log-in");
  };

  // Handle view details button click
  const handleViewDetails = (order: Order) => {
    setSelectedOrder(order);
  };

  // Handle close details modal
  const handleCloseDetails = () => {
    setSelectedOrder(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-red-500 text-lg">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">User Profile</h1>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-200"
          >
            Logout
          </button>
        </div>

         {/* User Information Section */}
         <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Account Information
          </h2>
          <div className="space-y-4">
            <div>
              <label className="text-sm text-gray-600">Full Name</label>
              <p className="text-lg font-medium text-gray-900">{user?.name}</p>
            </div>
            <div>
              <label className="text-sm text-gray-600">Email Address</label>
              <p className="text-lg font-medium text-gray-900">{user?.email}</p>
            </div>
            <div>
              <label className="text-sm text-gray-600">Member Since</label>
              <p className="text-lg font-medium text-gray-900">
                {new Date(user?._createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>


        {/* Order History Section */}
        <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Order History
          </h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Order ID
                  </th>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total
                  </th>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {orders.map((order: Order) => (
                  <tr key={order._id} className="hover:bg-gray-50 transition duration-200">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      #{order._id.slice(-6)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      ${order.totalAmount}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <span
                        className={`px-2 py-1 text-xs font-semibold rounded-full ${
                          order.status === "delivered"
                            ? "bg-green-100 text-green-800"
                            : order.status === "cancelled"
                            ? "bg-red-100 text-red-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <button
                        onClick={() => handleViewDetails(order)}
                        className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600 transition duration-200"
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Order Details Modal */}
        {selectedOrder && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white rounded-lg p-6 w-full max-w-2xl relative shadow-lg h-[70vh] overflow-y-auto">
      
      {/* Close Button - Top Right */}
      <button
        onClick={handleCloseDetails}
        className="absolute top-3 right-3 text-gray-600 hover:text-gray-900"
      >
        <FaTimesCircle size={24} />
      </button>

      <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">
        Order Details
      </h2>

      <div className="space-y-4">
        {/* Customer Information */}
        <div>
          <label className="text-sm text-gray-600">Customer Name</label>
          <p className="text-lg font-medium text-gray-900">
            {selectedOrder.fullName}
          </p>
        </div>
        <div>
          <label className="text-sm text-gray-600">Shipping Address</label>
          <p className="text-lg font-medium text-gray-900">
            {selectedOrder.address}, {selectedOrder.city}
          </p>
        </div>
        <div>
          <label className="text-sm text-gray-600">Contact Information</label>
          <p className="text-lg font-medium text-gray-900">
            {selectedOrder.phone} | {selectedOrder.email}
          </p>
        </div>

        {/* Products List */}
        <div>
          <label className="text-sm text-gray-600">Products</label>
          <ul className="space-y-2">
            {selectedOrder.products.map((product, index) => (
              <li key={index} className="flex justify-between items-center border-b pb-2">
                <span className="text-lg font-medium text-gray-900 w-[50%]">
                  {product.productTitle} x {product.quantity}
                </span>
                {selectedOrder.status === "delivered" && (
                  <button className="bg-green-500 w-[35%] text-white px-3 py-1 rounded-md hover:bg-green-600 transition duration-200">
                    Add Review
                  </button>
                )}
              </li>
            ))}
          </ul>
        </div>

        {/* Order Status */}
        <div>
          <label className="text-sm text-gray-600">Order Status</label>
          <div className="mt-4 space-y-4">
            {["pending", "processing", "shipped", "delivered"].map((status, index) => (
              index <= ["pending", "processing", "shipped", "delivered"].indexOf(selectedOrder.status) && (
                <div key={index} className="flex items-center">
                  <div
                    className={`w-8 h-8 flex items-center justify-center rounded-full ${
                      selectedOrder.status === status ||
                      (["processing", "shipped", "delivered"].includes(selectedOrder.status) &&
                        index < ["pending", "processing", "shipped", "delivered"].indexOf(selectedOrder.status))
                        ? "bg-blue-500 text-white"
                        : "bg-gray-300 text-gray-600"
                    }`}
                  >
                    {index === 0 ? <FaCheckCircle /> : index === 1 ? <FaTruck /> : <FaBoxOpen />}
                  </div>
                  <span className="ml-4">
                    {status === "pending" && "Order has been placed."}
                    {status === "processing" && "Your order is being processed."}
                    {status === "shipped" && "Your order is out for delivery."}
                    {status === "delivered" && "Your order has been delivered."}
                  </span>
                </div>
              )
            ))}

            {/* Cancelled Status */}
            {selectedOrder.status === "cancelled" && (
              <div className="flex items-center">
                <div className="w-8 h-8 flex items-center justify-center rounded-full bg-red-500 text-white">
                  <FaTimesCircle />
                </div>
                <span className="ml-4">Your order has been cancelled.</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  </div>
)}



      </div>
    </div>
  );
};

export default UserProfile;