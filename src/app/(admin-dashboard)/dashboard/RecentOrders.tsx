import Image from 'next/image'
import { RecentOrder } from '@/types/RecentOrders'

type Props = {
  orders: RecentOrder[]
}

const OrdersTable = ({ orders }: Props) => {
  console.log(orders, "order")
  return (

    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 w-full h-[444px] max-h-[444px] overflow-hidden">
      <div className="h-full overflow-y-auto custom-scrollbar p-6">
        <h2 className="text-xl font-semibold text-gray-800 border-b pb-3">Recent Orders</h2>


        <div className="overflow-x-auto bg-white shadow-sm">
          <table className="min-w-full divide-y divide-gray-200 text-sm">
            <thead className="bg-[#B88E2F]/20 pt-3">
              <tr>
                <th className="px-4 py-3  text-left font-semibold text-gray-600">Products</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-600">Customer</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-600">Order ID</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-600">Date</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-600">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {orders.length > 0 || !orders ?
                orders.map((order) => (
                  <tr key={order._id}>
                    <td className="px-4 py-4">
                      <div className="flex flex-col gap-2">
                        {order.products.map((product, index) => (
                          <div key={product._key} className="flex items-center gap-2">
                            <span>{index + 1}:  {product.productTitle}</span>
                            <span className="text-xs text-gray-500"> x {product.quantity}</span>
                          </div>
                        ))}
                      </div>
                    </td>
                    <td className="px-4 py-4">{order.customerName}</td>
                    <td className="px-4 py-4 text-gray-700 font-mono">{order._id.slice(0, 8)}...</td>
                    <td className="px-4 py-4">{new Date(order._createdAt).toLocaleDateString()}</td>
                    <td className="px-4 py-4">
                      <span className="inline-block px-2 py-1 rounded bg-green-100 text-green-800 text-xs">
                        {order.status || "Pending"}
                      </span>
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan={5}>
                      <div className="flex flex-col justify-center items-center h-[300px]">
                        <Image
                          src="/logo.png"
                          alt="placeholder"
                          width={120}
                          height={120}
                        />
                        <div className="text-lg font-medium text-gray-600 mt-4">
                          No data found.
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
            </tbody>
          </table>
        </div>

      </div>

    </div>


  )
}

export default OrdersTable
