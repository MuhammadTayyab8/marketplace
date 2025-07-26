"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { client } from "@/sanity/lib/client"; // Import Sanity client
import { FaCheckCircle, FaTimesCircle, FaTruck, FaBoxOpen } from "react-icons/fa"; // React Icons for shipment tracking
import { RiLogoutCircleLine } from "react-icons/ri";
import { MdOutlineSwitchAccount } from "react-icons/md";



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
  _createdAt: string | number | Date;
  orderId: number;
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
        router.push("/");
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
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#B88E2F]"></div>
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
    <div className="min-h-screen bg-white py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">User Profile</h1>
          <button
            onClick={handleLogout}
            className="flex gap-3 items-center bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-200"
          >
            <RiLogoutCircleLine /> Logout
          </button>
        </div>

        {/* User Information Section */}
        <div className="bg-white shadow-md rounded-2xl p-6 sm:p-8 mb-8 border border-gray-100">
          <h2 className="flex items-center gap-3 text-2xl font-semibold text-gray-800 mb-6 border-b pb-2">
            <MdOutlineSwitchAccount /> Account Information
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

            <div className="relative rounded-md focus-within:ring-1 focus-within:ring-[#9069EA] focus-within:[background:linear-gradient(to_bottom,_white,_#f9f5ff)]  transition ">
              <label className="absolute -top-3 left-2 bg-[#ffffff] px-1 text-md font-normal text-[#59595A]">Full Name</label>
              <div className="flex items-center border border-gray-300 rounded-md p-2 bg-transparent">
                <p className="text-lg font-normal text-gray-900 capitalize">{user?.name || '—'}</p>
              </div>
            </div>



            <div className="relative rounded-md focus-within:ring-1 focus-within:ring-[#9069EA] focus-within:[background:linear-gradient(to_bottom,_white,_#f9f5ff)]  transition ">
              <label className="absolute -top-3 left-2 bg-[#ffffff] px-1 text-md font-normal text-[#59595A]">Email Address</label>
              <div className="flex items-center border border-gray-300 rounded-md p-2 bg-transparent">
                <p className="text-lg font-normal text-gray-900">{user?.email || '—'}</p>
              </div>
            </div>


            <div className="relative rounded-md focus-within:ring-1 focus-within:ring-[#9069EA] focus-within:[background:linear-gradient(to_bottom,_white,_#f9f5ff)]  transition ">
              <label className="absolute -top-3 left-2 bg-[#ffffff] px-1 text-md font-normal text-[#59595A]">Member Since</label>
              <div className="flex items-center border border-gray-300 rounded-md p-2 bg-transparent">
                <p className="text-lg font-normal text-gray-900">
                  {user?._createdAt
                    ? new Date(user._createdAt).toLocaleDateString()
                    : '—'}
                </p>              </div>
            </div>

          </div>
        </div>



        {/* Order History Section */}
        <div className="bg-white shadow-md border border-gray-100 rounded-lg p-6 mb-8">
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
                        className={`px-2 py-1 text-xs font-semibold rounded-full ${order.status === "delivered"
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
                        className="bg-[#B88E2F] text-white px-3 py-1 rounded-md hover:bg-[#B88E2F]/80 transition duration-200"
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
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 border border-gray-100">
            <div className="bg-white rounded-2xl shadow-md p-6 w-full max-w-3xl relative h-[80vh] overflow-y-auto">

              {/* Close Button */}
              <button
                onClick={handleCloseDetails}
                className="absolute top-4 right-4 text-2xl font-bold text-gray-400 hover:text-gray-700 transition"
              >
                &times;
              </button>

              {/* Header */}
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Order Receipt</h2>
                <p className="text-sm text-gray-500">Order ID: #{selectedOrder.orderId}</p>
              </div>

              {/* Customer Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-gray-50 p-5 rounded-xl border border-gray-200 mb-6">
                <div className="space-y-1">
                  <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Customer Name</h3>
                  <p className="text-base font-semibold text-gray-800 capitalize">{selectedOrder.fullName}</p>
                </div>

                <div className="space-y-1">
                  <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Contact</h3>
                  <p className="text-base text-gray-800">{selectedOrder.phone}</p>
                  <p className="text-base text-gray-800">{selectedOrder.email}</p>
                </div>

                <div className="space-y-1">
                  <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Shipping Address</h3>
                  <p className="text-base text-gray-800">{selectedOrder.address}</p>
                  <p className="text-base text-gray-800">{selectedOrder.city}</p>
                </div>

                <div className="space-y-1">
                  <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Order Date</h3>
                  <p className="text-base text-gray-800">
                    {new Date(selectedOrder._createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>


              {/* Product List */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-3 border-b">Items Ordered</h3>
                <ul className="divide-y divide-gray-200">
                  {selectedOrder.products.map((product, index) => (
                    <li key={index} className="py-4 flex items-center justify-between">
                      <span className="text-base font-medium text-gray-900 w-[60%]">
                        {product.productTitle} <span className="text-gray-500">× {product.quantity}</span>
                      </span>
                      {selectedOrder.status === "delivered" && (
                        <button className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 text-sm rounded-md transition">
                          Add Review
                        </button>
                      )}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Order Status */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-3 border-b">Order Status</h3>
                <div className="space-y-4">
                  {["pending", "processing", "shipped", "delivered"].map((status, index) => {
                    const currentIndex = ["pending", "processing", "shipped", "delivered"].indexOf(selectedOrder.status);
                    const isActive = index <= currentIndex;

                    return (
                      <div key={index} className="flex items-center">
                        <div
                          className={`w-8 h-8 flex items-center justify-center rounded-full mr-4 
                    ${isActive ? 'bg-blue-600 text-white' : 'bg-gray-300 text-gray-600'}`}
                        >
                          {status === "pending" && <FaCheckCircle />}
                          {status === "processing" && <FaTruck />}
                          {status === "shipped" && <FaBoxOpen />}
                          {status === "delivered" && <FaCheckCircle />}
                        </div>
                        <span className={`text-sm ${isActive ? 'text-gray-900' : 'text-gray-400'}`}>
                          {status === "pending" && "Order has been placed"}
                          {status === "processing" && "Being processed"}
                          {status === "shipped" && "Out for delivery"}
                          {status === "delivered" && "Delivered successfully"}
                        </span>
                      </div>
                    );
                  })}

                  {selectedOrder.status === "cancelled" && (
                    <div className="flex items-center text-red-600">
                      <div className="w-8 h-8 flex items-center justify-center rounded-full bg-red-500 text-white mr-4">
                        <FaTimesCircle />
                      </div>
                      <span className="text-sm">This order was cancelled.</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Footer Summary (Optional: Total, Shipping, etc.) */}
              <div className="border-t pt-4 text-right">
                <p className="text-sm text-gray-500">Thanks for shopping with us!</p>
              </div>
            </div>
          </div>
        )}




      </div>
    </div>
  );
};

export default UserProfile;