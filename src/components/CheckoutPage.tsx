"use client";

import React, { useEffect, useState } from "react";
import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import Link from "next/link";
import { useCart } from "./CartContext";
import { v4 as uuidv4 } from 'uuid'; // Import uuid package
import { client } from "@/sanity/lib/client";
import toast from "react-hot-toast";




const CheckoutPage = ({
  amount,
  isFilled,
  formData,
  paymentMethod,
  setClientSecret
}: {
  amount: number;
  formData: {
    firstName: string;
    lastName: string;
    city: string;
    streetAddress: string;
    phone: string;
    email: string;
  }
  isFilled: boolean;
  paymentMethod: string;
  setClientSecret: React.Dispatch<React.SetStateAction<string>>;
}) => {








  const stripe = useStripe();
  const elements = useElements();
  const [errorMessage, setErrorMessage] = useState<string>();
  const [loading, setLoading] = useState(false);
  const { state: { items }, dispatch } = useCart();








const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
  event.preventDefault();
  setLoading(true);

  if (!stripe || !elements) return;

  const { error: submitError } = await elements.submit();
  if (submitError) {
    setErrorMessage(submitError.message);
    setLoading(false);
    return;
  }

  const { error, paymentIntent } = await stripe.confirmPayment({
    elements,
    confirmParams: {
      return_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success?amount=${amount}`,
    },
    redirect: "if_required",
  });

  if (error) {
    setErrorMessage(error.message);
    setLoading(false);
    return;
  }

  if (paymentIntent?.status === "succeeded") {
    await handlePlaceOrderToSanity();
    setClientSecret("");
    window.location.href = `/success?amount=${amount}`;
  }

  setLoading(false);
};




  if (!stripe || !elements) {
    return (
      <div className="flex items-center justify-center">
        <div
          className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"
          role="status"
        >
          <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
            Loading...
          </span>
        </div>
      </div>
    );
  }













  const getUserId = async () => {
    const res = await fetch("/api/get-user");
    const data = await res.json();
    return data.userId;
  };



  const handlePlaceOrderToSanity = async () => {
    if (!isFilled) {
      toast.error("Please fill all fields")
      // alert("Please fill all fields");
      console.log('form not fill')
      return;

    }

    // setIsSubmitting(true);
    // setError("");

    try {
      // Get userId from the API instead of Cookies.get()
      const userId = await getUserId();

      if (!userId) {
        toast.error("User not logged in")
        // alert("User not logged in");
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
        totalAmount: amount,
        paymentMode: paymentMethod,
        status: "pending",
        createdAt: new Date().toISOString(),
      };

      // Save the order to Sanity
      await client.create(order);
      console.log("Order created successfully:", order);

      // Redirect to the order confirmation page
      // setIsModalOpen(true); // Show success modal
    } catch (err) {
      console.error("Sanity error:", err);
      // alert("Sanity API error: ");
      toast.error(`Sanity Error: ${err}`)
      console.log(err)
    } finally {
      // setIsSubmitting(false);
    }
  };






  return (
    <div>


      <form onSubmit={handleSubmit} className="bg-white p-2 rounded-md">
        {<PaymentElement />}

        {errorMessage && <div>{errorMessage}</div>}

        <button
          disabled={!stripe || loading}
          type="submit"
          className="text-white w-full p-5 bg-black mt-2 rounded-md font-bold disabled:opacity-50 disabled:animate-pulse"
        >
          {!loading ? `Pay $${amount}` : "Processing..."}
        </button>
      </form>




    </div>
  );
};

export default CheckoutPage;