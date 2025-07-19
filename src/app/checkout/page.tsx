'use client'

import React, { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'; // Import uuid package
import Image from 'next/image'
import heroIcon from '../../../public/icon-hero.png'
import hero from '../../../public/shop-hero.png'
import { FaAngleRight } from "react-icons/fa6";
import Qualities from '@/components/Qualities';
import Link from 'next/link';
import { useCart } from '@/components/CartContext';
import { client } from '@/sanity/lib/client'
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutPage from "@/components/CheckoutPage";




const page = () => {

  const { state: { items }, dispatch } = useCart();

  console.log(items)

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handlePlaceOrder = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0);








  // Order creation function


  const createOrderInSanity = async (orderData: { clientId?: string; firstName: any; lastName: any; email: any; phone: any; products: any; total: any; shippingAddress: any; paymentMethod: any; }) => {
    try {
      // Step 1: Check if the customer already exists by name and email
      const existingCustomerQuery = `*[_type == "customer" && email == $email && firstName == $firstName && lastName == $lastName][0]`;
      const existingCustomer = await client.fetch(existingCustomerQuery, {
        email: orderData.email,
        firstName: orderData.firstName,
        lastName: orderData.lastName,
      });

      let customer;

      // Step 2: If customer exists, use existing customer profile
      if (existingCustomer) {
        customer = existingCustomer;
      } else {
        // Step 3: If customer does not exist, create a new customer profile
        customer = await client.create({
          _type: 'customer',
          firstName: orderData.firstName,
          lastName: orderData.lastName,
          email: orderData.email,
          phone: orderData.phone,
        });
      }

      // Step 4: Generate a unique client ID for the order
      const clientId = uuidv4(); // Generate a unique client ID

      // Step 5: Create the order
      const order = await client.create({
        _type: 'order',
        clientId: clientId, // Use the dynamically generated clientId
        customer: {
          _type: 'reference',
          _ref: customer._id, // Reference to the customer document
        },
        products: orderData.products.map((item: { productTitle: any; price: any; quantity: any; }) => ({
          _key: uuidv4(), // Generate a unique key for each product
          productTitle: item.productTitle,
          price: item.price,
          quantity: item.quantity,
        })),
        total: orderData.total,
        shippingAddress: orderData.shippingAddress,
        paymentMethod: orderData.paymentMethod, // Add payment method
      });

      console.log('Order Created:', order);
    } catch (err) {
      console.error('Error creating order:', err);
    }
  };





  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    streetAddress: '',
    city: '',
    province: '',
    zipCode: '',
    phone: '',
    email: '',
    paymentMethod: 'cod', // Default value, could be bankTransfer or cod
  });


  const requiredFields: FormDataKeys[] = [
    'firstName',
    'lastName',
    'streetAddress',
    'city',
    'province',
    'zipCode',
    'phone',
    'email',
  ];

  // Check if any required field is empty
  const isFormValid = requiredFields.every((field) => formData[field] && formData[field].trim() !== '');








  // Capture payment method change
  const handlePaymentMethodChange = (e: { target: { value: any } }) => {
    setFormData((prev) => ({
      ...prev,
      paymentMethod: e.target.value,
    }));
  };

  // Handle form input change
  const handleInputChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  console.log(items)

  type FormDataKeys = keyof typeof formData;
  // Handle place order
  const handlePlaceOrderAndCustomer = async () => {
    // Ensure all required fields are filled in
    const requiredFields: FormDataKeys[] = [
      'firstName',
      'lastName',
      'streetAddress',
      'city',
      'province',
      'zipCode',
      'phone',
      'email',
    ];

    // Check if any required field is empty
    const isFormValid = requiredFields.every((field) => formData[field] && formData[field].trim() !== '');
    if (!isFormValid) {
      alert('Please fill in all required fields.');
      // Optional: You can show a message to the user here, like "All fields are required."
      return;
    }

    // Ensure that items are available and not empty
    if (items.length === 0) {
      alert('No items selected');
      return;
    }


    const orderData = {
      clientId: uuidv4(), // Dynamically generated unique client ID
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      phone: formData.phone,
      products: items.map(item => ({
        productTitle: item.title,
        price: item.price,
        quantity: item.quantity,
      })),
      total: items.reduce((acc, item) => acc + item.price * item.quantity, 0),
      shippingAddress: {
        streetAddress: formData.streetAddress,
        city: formData.city,
        province: formData.province,
        zipCode: formData.zipCode,
        phone: formData.phone,
        email: formData.email,
      },
      paymentMethod: formData.paymentMethod, // Add payment method to orderData
    };

    try {
      await createOrderInSanity(orderData); // Create the order if all validations pass
      setIsModalOpen(true); // Open the modal after successful order creation
    } catch (error) {
      console.error('Error while creating the order:', error);
    }
  };






  const [paymentMethod, setPaymentMethod] = useState("bankTransfer");
  console.log(paymentMethod)

  function convertToSubcurrency(totalAmount: number, factor = 100) {
    return Math.round(totalAmount * factor);
  }

  if (process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY === undefined) {
    throw new Error("NEXT_PUBLIC_STRIPE_PUBLIC_KEY is not defined");
  }
  const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);












  const getUserId = async () => {
    const res = await fetch("/api/get-user");
    const data = await res.json();
    return data.userId;
  };

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");


  const handlePlaceOrderToSanity = async () => {
    if (!isFormValid) {
      alert("Please fill all fields");
      console.log('form not fill')
      return;

    }

    setIsSubmitting(true);
    setError("");

    try {
      // Get userId from the API instead of Cookies.get()
      const userId = await getUserId();

      if (!userId) {
        alert("User not logged in");
        console.log('user not found')
        return;
      }

      console.log("Before sending order to Sanity");
      // Create the order object
      const orderId = uuidv4().slice(0, 12);
      const order = {
        _type: "order",
        orderId: orderId,
        user: {
          _type: "reference",
          _ref: userId,
        },
        products: items.map((item: { title: any; price: any; quantity: any; }) => ({
          _key: uuidv4(), // Generate a unique key for each product
          productTitle: item.title,
          price: item.price,
          quantity: item.quantity,
        })),
        fullName: formData.firstName + " " + formData.lastName,
        city: formData.city,
        address: formData.streetAddress,
        phone: formData.phone,
        email: formData.email,
        totalAmount: total,
        paymentMode: paymentMethod,
        status: "pending",
        createdAt: new Date().toISOString(),
      };

      // Save the order to Sanity
      await client.create(order);
      console.log("Order created successfully:", order);

      // Redirect to the order confirmation page
      setIsModalOpen(true); // Show success modal
    } catch (err) {
      console.error("Sanity error:", err);
      alert("Sanity API error: ");
      console.log(err)
    } finally {
      setIsSubmitting(false);
    }
  };









  return (
    <div>
      <div className="relative w-full h-[50vh] bg-cover bg-center" style={{ backgroundImage: `url(${hero.src})` }}>

        {/* Text Content */}
        <div className="absolute inset-0  items-center flex justify-center">
          <div className="text-center text-black justify-center">
            <div className='flex justify-center'> <Image src={heroIcon} alt='hero-icon' /></div>
            <h1 className="text-4xl font-bold">Checkout</h1>
            <div className='flex '>
              <Link href='/'>
                <p className="mt-4 text-lg flex justify-center items-center gap-3 font-bold">Home <FaAngleRight /> <span className='font-thin'>Checkout</span> </p>
              </Link>
            </div>
          </div>
        </div>
      </div>


      {/* checkout start  */}

      <div className="mx-auto max-w-screen-2xl flex justify-between flex-wrap px-4 sm:px-12 md:px-20 py-8 space-x-8">
        {/* Left Side - Billing Details */}
        <div className="w-full md:w-[45%] space-y-6">
          <h1 className="text-2xl font-semibold text-gray-800 mb-6">Billing Details</h1>

          {/* First Name and Last Name */}
          <div className="space-y-4">
            <div className="flex space-x-6">
              <div className="flex-1">
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                  First Name
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-md"
                  required
                />
              </div>
              <div className="flex-1">
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                  Last Name
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-md"
                  required
                />
              </div>
            </div>

            {/* Street Address */}
            <div>
              <label htmlFor="streetAddress" className="block text-sm font-medium text-gray-700">
                Street Address
              </label>
              <input
                type="text"
                id="streetAddress"
                name="streetAddress"
                value={formData.streetAddress}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-md"
                required
              />
            </div>

            {/* City */}
            <div>
              <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                City
              </label>
              <input
                type="text"
                id="city"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-md"
                required
              />
            </div>

            {/* Province */}
            <div>
              <label htmlFor="province" className="block text-sm font-medium text-gray-700">
                Province
              </label>
              <input
                type="text"
                id="province"
                name="province"
                value={formData.province}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-md"
                required
              />
            </div>

            {/* Zip Code */}
            <div>
              <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700">
                Zip Code
              </label>
              <input
                type="text"
                id="zipCode"
                name="zipCode"
                value={formData.zipCode}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-md"
                required
              />
            </div>

            {/* Phone */}
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                Phone
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-md"
                required
              />
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-md"
                required
              />
            </div>
          </div>
        </div>




        {/* Right Side - Order Summary */}
        <div className="w-full md:w-[45%]  p-6 rounded-md pl-0 ml-0 sm:p-6">
          <div className='flex justify-between items-center pb-4'>
            <h1 className="text-2xl font-semibold text-gray-800 mb-6">Product</h1>
            <h1 className="text-2xl font-semibold text-gray-800 mb-6">Subtotal</h1>
          </div>


          {/* Product List */}
          <div className="space-y-4">
            {items.map((item, index) => (
              <div key={index} className="flex justify-between items-center py-2 border-b">
                <p className="text-sm font-medium text-gray-700">
                  {item.title} x {item.quantity}
                </p>
                <p className="text-sm font-semibold text-gray-700">Rs. {item.price * item.quantity}</p>
              </div>
            ))}
          </div>
          <div className="space-y-4 mt-4">
            <div className="flex justify-between">
              <p className="text-sm text-gray-600">Subtotal</p>
              <p className="font-semibold text-gray-700">Rs. {total}</p>
            </div>
            <div className="flex justify-between py-2 border-b">
              <p className="text-xl text-gray-600 font-bold">Total</p>
              <p className="font-bold text-[#B88E2F] text-xl">Rs. {total}</p>
            </div>
          </div>

          {/* Payment Options */}
          <div className="mt-6">
            <h2 className="text-lg font-medium text-gray-800 mb-4">Payment Options</h2>
            <div className="space-y-4">
              <div className="flex items-center">
                <input
                  type="radio"
                  id="bankTransfer"
                  name="payment"
                  className="mr-2"
                  checked={paymentMethod === "bankTransfer"}
                  onChange={() => setPaymentMethod("bankTransfer")}
                />
                <label htmlFor="bankTransfer" className="text-sm text-gray-700">Debit - Credit Card</label>
              </div>
              <div className="flex items-center">
                <input
                  type="radio"
                  id="cod"
                  name="payment"
                  className="mr-2"
                  checked={paymentMethod === 'cod'}
                  onChange={() => setPaymentMethod("cod")}
                />
                <label htmlFor="cod" className="text-sm text-gray-700">Cash on Delivery</label>
              </div>
            </div>
          </div>


          {/* Show Stripe Payment Element Only for Bank Transfer */}
          {paymentMethod === "bankTransfer" && (
            <Elements stripe={stripePromise} options={{ mode: "payment", amount: convertToSubcurrency(total), currency: "usd" }}>
              <CheckoutPage amount={total} isFilled={isFormValid} formData={formData} paymentMethod={paymentMethod} />
            </Elements>
          )}

          {/* Place Order Button */}
          {paymentMethod === 'cod' && (
            <div className="mt-6">
              <button className="text-white w-full p-5 bg-black mt-2 rounded-md font-bold disabled:opacity-50 disabled:animate-pulse" onClick={handlePlaceOrderToSanity} disabled={isSubmitting}>
                {isSubmitting ? "Placing Order..." : "Place Order"}
              </button>
            </div>
          )}






          {/* Button - Place Order */}
          {/* <div className="mt-6">
    <button
        className="w-full py-3 text-black border border-black font-semibold rounded-md transition"
        onClick={handlePlaceOrderAndCustomer}
      >
        Place Order
      </button>
    </div> */}
          {/* Modal */}
          {isModalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
              <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full">
                <h2 className="text-lg font-bold mb-4">Order Placed!</h2>
                <p className="text-gray-600 mb-6">
                  Your order has been successfully placed. Thank you!
                </p>
                <div className="flex justify-end space-x-4">
                  <button
                    className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md"
                    onClick={closeModal}
                  >
                    Cancel
                  </button>
                  <Link href="/">
                    <button className="px-4 py-2 text-white bg-black rounded-md">
                      Go to Home
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>


      {/* checkout end  */}


      <Qualities />

    </div>
  )
}

export default page