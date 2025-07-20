// # https://www.behance.net/gallery/184403667/E-commerce-Admin-Dashboard-Design
'use client'


import { client } from '@/sanity/lib/client';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { FaAngleDown, FaAngleUp } from 'react-icons/fa6';
import { RiLogoutCircleLine } from 'react-icons/ri'
import { VscAccount } from "react-icons/vsc";
import { SlSocialDropbox } from "react-icons/sl";
import { BsCurrencyDollar } from "react-icons/bs";
import { FiRepeat } from "react-icons/fi";




type CardData = {
  name: string;
  value: any;
  icon: JSX.Element;
  bgColor: string;
  textColor: string;
};


const page = () => {


  const router = useRouter();

  const [selectedFilter, setSelectedFilter] = useState("This Month");
  const [showModel, setShowModel] = useState(false)
  const [filterDate, setFilterDate] = useState<{ startDate: string; endDate: string } | null>(null);
  const [cardData, setCardData] = useState<CardData[]>([])

  const [isLoading, setIsLoading] = useState(false)


  useEffect(() => {
    const start = new Date(new Date().getFullYear(), new Date().getMonth(), 1); // Start of this month
    const end = new Date(); // Now

    setFilterDate({
      startDate: start.toISOString(),
      endDate: end.toISOString(),
    });
  }, []);


  const handleFilterChange = (option: { name: string; value: { startDate: Date; endDate: Date } }) => {
    setSelectedFilter(option.name);
    setFilterDate({
      startDate: option.value.startDate.toISOString(),
      endDate: option.value.endDate.toISOString(),
    });
  };

  const filterOptions = [
    {
      name: "This Month",
      value: {
        startDate: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
        endDate: new Date(),
      },
    },
    {
      name: "Last Month",
      value: {
        startDate: new Date(new Date().getFullYear(), new Date().getMonth() - 1, 1),
        endDate: new Date(new Date().getFullYear(), new Date().getMonth(), 0), // end of last month
      },
    },
    {
      name: "Last 3 Months",
      value: {
        startDate: new Date(new Date().setMonth(new Date().getMonth() - 3)),
        endDate: new Date(),
      },
    },
    {
      name: "Last Year",
      value: {
        startDate: new Date(new Date().setFullYear(new Date().getFullYear() - 1)),
        endDate: new Date(),
      },
    },
  ];








  const orderData = async () => {
    try {
      if (!filterDate) return;
      setIsLoading(true)

      const query = `*[_type == "order" && _createdAt >= "${filterDate.startDate}" && _createdAt <= "${filterDate.endDate}"]{
        _id,
        total,
        _createdAt,
        "customerId": customer->_id,
        "customerName": customer->firstName + " " + customer->lastName,
        "customerEmail": customer->email
      }`;

      const orders = await client.fetch(query)

      // 1. Total Orders
      const totalsOrder = orders.length

      // 2. Total Sales
      const totalSales = orders.reduce((acc: number, order: { total: number; }) => acc + order.total, 0)

      // 3. Unique Customers (this month)
      const uniqueCustomerIds = [new Set(orders.map((order: { customerId: number; }) => order.customerId))];
      const totalCustomersThisMonth = uniqueCustomerIds.length;

      // 4. Repeat Customers % (placed more than 1 order this month)
      const customerOrderCounts: Record<string, number> = {};

      orders.forEach((order: { customerId: string }) => {
        customerOrderCounts[order.customerId] = (customerOrderCounts[order.customerId] || 0) + 1;
      });

      const repeatCustomers = Object.values(customerOrderCounts).filter((count: number) => count > 1).length;

      const repeatCustomerPercentage = (repeatCustomers / totalCustomersThisMonth) * 100;



      const data = [
        {
          name: "Total Customers",
          value: totalCustomersThisMonth,
          icon: <VscAccount />,
          bgColor: "bg-blue-500/20",
          textColor: "text-blue-500",
        },
        {
          name: "Total Orders",
          value: totalsOrder,
          icon: <SlSocialDropbox />,
          bgColor: "bg-green-500/20",
          textColor: "text-green-500",
        },
        {
          name: "Total Sales",
          value: `$ ${totalSales}`,
          icon: <BsCurrencyDollar />,
          bgColor: "bg-yellow-500/20",
          textColor: "text-yellow-500",
        },
        {
          name: "Repeat %",
          value: repeatCustomerPercentage.toFixed(2),
          icon: <FiRepeat />,
          bgColor: "bg-purple-500/20",
          textColor: "text-purple-500",
        },
      ];


      setCardData(data)

      setIsLoading(false)


    } catch (error) {
      console.error("Server Error: ", error)
    }
  }



  useEffect(() => {
    orderData()
  }, [filterDate])


  console.log(cardData, "OrderData")

  // Handle logout
  const handleLogout = async () => {
    await fetch("/api/remove-user");
    router.push("/log-in");
  };



  return (
    <div className='pt-24 h-screen max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8'>

      <div className='flex justify-between items-center'>

        <div>
          <h1 className='font-bold text-2xl'>Welcome Back!</h1>
          <p className='text-sm font-normal text-gray-500'>Heres what happens with your store.</p>
        </div>

        <div className="flex justify-between items-center gap-4">

          {/* Filter Dropdown */}
          <div className="relative inline-block text-left">
            <button
              onClick={() => setShowModel(!showModel)}
              className="inline-flex justify-center items-center gap-3 px-4 py-2 text-sm font-medium bg-gray-100 text-gray-700 border border-gray-300 rounded-md shadow-sm hover:bg-gray-200"
            >
              {selectedFilter} {showModel ? <FaAngleUp /> : <FaAngleDown />}
            </button>

            {showModel && (

              <div className="absolute left-0 mt-2 w-40 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
                <div className="py-1">
                  {filterOptions.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => handleFilterChange(option)}
                      className={`block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 ${selectedFilter === option.name ? "bg-gray-100 font-semibold" : ""
                        }`}
                    >
                      {option.name}
                    </button>
                  ))}
                </div>
              </div>
            )}


          </div>

          {/* Logout Button */}
          <div>
            <button
              onClick={handleLogout}
              className="flex gap-3 items-center bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-200"
            >
              <RiLogoutCircleLine /> Logout
            </button>
          </div>
        </div>

      </div>



      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 my-6">
        {isLoading ?

          Array.from({ length: 4 }).map((_, index) => (
            <div key={index}>
              <div className="relative p-4 rounded-xl min-h-32 bg-gray-300 animate-pulse" />
            </div>
          ))

          : cardData.map((item, index) => (
            <div key={index} className={`relative p-4 rounded-xl min-h-32 ${item.bgColor}`}>

              <div
                className={`absolute top-2 right-2 ${item.bgColor} ${item.textColor} rounded-full p-2 text-xl flex items-center justify-center`}
              >
                {item.icon}
              </div>

              <div className="text-md text-gray-600">{item.name}</div>
              <div className={`text-xl font-semibold text-black`}>{item.value}</div>
            </div>
          ))}
      </div>


    </div>
  )
}

export default page