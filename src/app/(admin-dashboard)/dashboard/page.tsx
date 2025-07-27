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
import Cards from './Cards';
import Graph from './Graph';
import TopProducts from './TopProducts';
import { TopSellingProduct } from '@/types/TopSellingProduct'
import { RecentOrder } from '@/types/RecentOrders';
import OrdersTable from './RecentOrders';
import TopCustomers from './TopCustomer';
import TopCustomersData from './TopCustomer';




type CardData = {
  name: string;
  value: any;
  icon: JSX.Element;
  bgColor: string;
  textColor: string;
};


type GraphData = {
  date: string;
  orders: number;
  sales: number
}


interface Product {
  price: any;
  productTitle: string;
  _id: string;
  name: string;
  image: string;
  quantity: number;
}

interface Order {
  customerName: string;
  customerId: any;
  _id: string;
  products: Product[];
}





const page = () => {


  const router = useRouter();

  const [selectedFilter, setSelectedFilter] = useState("This Month");
  const [showModel, setShowModel] = useState<boolean>(false)
  const [filterDate, setFilterDate] = useState<{ startDate: string; endDate: string } | null>(null);
  const [cardData, setCardData] = useState<CardData[]>([])
  const [chartData, setChartData] = useState<GraphData[]>([]);

  const [topSelling, setTopSelling] = useState<TopSellingProduct[]>([])
  const [recentOrders, setRecentOrders] = useState<RecentOrder[]>([])
  const [topCustomer, setTopCustomer] = useState<TopCustomer[]>([])


  const [isLoading, setIsLoading] = useState<boolean>(false)


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
    setShowModel(false)
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





  // Top Products Calculator
  type Product = {
    _id: string;
    title: string;
    imageUrl: string;
  };




  function calculateTopSellingProducts(orders: Order[], allProducts: Product[]): TopSellingProduct[] {
    const salesMap = new Map<string, TopSellingProduct>();

    orders.forEach(order => {
      order.products?.forEach(op => {
        const product = allProducts.find(p => p.title === op.productTitle);
        if (!product) return;

        if (salesMap.has(product._id)) {
          const existing = salesMap.get(product._id)!;
          existing.totalSales += op.quantity;
        } else {
          salesMap.set(product._id, {
            id: product._id,
            title: product.title,
            imageUrl: product.imageUrl,
            totalSales: op.quantity,
          });
        }
      });
    });

    return Array.from(salesMap.values()).sort((a, b) => b.totalSales - a.totalSales);
  }




const calculateTopCustomer = (orders: Order[]): TopCustomer[] => {
  const customerOrderCount: Record<string, { name: string; count: number }> = {};

  orders.forEach((order) => {
    const id = order.customerId;
    if (!id) return;

    if (!customerOrderCount[id]) {
      customerOrderCount[id] = {
        name: order.customerName,
        count: 1,
      };
    } else {
      customerOrderCount[id].count += 1;
    }
  });

  // Sort descending
  const sorted: TopCustomer[] = Object.entries(customerOrderCount)
    .sort((a, b) => b[1].count - a[1].count)
    .map(([id, info]) => ({
      customerId: id,
      name: info.name,
      orderCount: info.count,
    }));

  return sorted;
};





  const orderData = async () => {
    try {
      if (!filterDate) return;
      setIsLoading(true)

      const query = `*[_type == "order" && _createdAt >= "${filterDate.startDate}" && _createdAt <= "${filterDate.endDate}"]{
        _id,
        total,
        _createdAt,
        status,
        "products": products[]{
        _key,
        productTitle,
        quantity,
        "imageUrl": product->image.asset->url,
        "productId": product->_id
      },
        "customerId": user->_id,
        "customerName": user->name,
        "customerEmail": user->email
      }`;


      const productsQuery = `*[_type == "product"]{
        _id,
        title,
        "imageUrl": image.asset->url
      }`;

      const orders = await client.fetch(query)


      const products = await client.fetch(productsQuery)

      // ======================  Graph Data ======================

      const dailyGraphData: Record<string, GraphData> = {};

      orders.forEach((order: { _createdAt: string, total: number }) => {
        const date = new Date(order._createdAt).toISOString().split("T")[0];

        if (!dailyGraphData[date]) {
          dailyGraphData[date] = {
            date,
            orders: 0,
            sales: 0
          };
        }

        dailyGraphData[date].orders += 1;
        dailyGraphData[date].sales += order.total;
      });


      const formattedChartData: GraphData[] = Object.values(dailyGraphData).sort((a, b) =>
        new Date(a.date).getTime() - new Date(b.date).getTime()
      );


      setChartData(formattedChartData);


      // ================ Top Selling ===================

      const topProducts = calculateTopSellingProducts(orders, products);

      setTopSelling(topProducts)

      // ================ Recent Orders ===================
      setRecentOrders(orders)

      // ================= Top Customer ==============
      const topCustomerData = calculateTopCustomer(orders)
      setTopCustomer(topCustomerData)


      // ====================== Cards ======================
      // 1. Total Orders
      const totalsOrder = orders.length

      console.log(orders, "orders")

      // 2. Total Sales
      const totalSales = orders.reduce((acc: number, order: { total: number; }) => acc + order.total, 0)

      // 3. Unique Customers (this month)
      const uniqueCustomerIds = new Set(orders.map((order: { customerId: string; }) => order.customerId));
      const totalCustomersThisMonth = uniqueCustomerIds.size;

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


  // Handle logout
  const handleLogout = async () => {
    await fetch("/api/remove-user");
    router.push("/log-in");
  };



  return (
    <div className='pt-24 max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8'>

      <div className='flex flex-col sm:flex-row sm:justify-between sm:items-center'>

        <div>
          <h1 className='font-bold text-2xl'>Welcome Back!</h1>
          <p className='text-sm font-normal text-gray-500'>Heres what happens with your store.</p>
        </div>

        <div className="flex justify-between pt-4 sm:p-0 sm:items-center gap-4">

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



      <Cards
        isLoading={isLoading}
        cardData={cardData}
      />





      <div className='grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-6 gap-6 my-11'>

        <div className='sm:col-span-2 lg:col-span-4'>
          <Graph data={chartData} />
        </div>

        <div className='sm:col-span-2'>
          <TopProducts
            topSelling={topSelling}
          />
        </div>

      </div>





      <div className='grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-6 gap-6 my-11'>

        <div className='sm:col-span-2 lg:col-span-4'>
          <OrdersTable orders={recentOrders} />
        </div>

        <div className='sm:col-span-2'>
          <TopCustomersData topCustomer={topCustomer} />
        </div>

      </div>




    </div>
  )
}

export default page