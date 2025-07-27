const orderSchema = {
  name: 'order',
  title: 'Order',
  type: 'document',
  fields: [
    {
      name: 'user',
      title: 'User',
      type: 'reference',
      to: [{ type: 'user' }],
    },
    {
      name: 'products',
      title: 'Products',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'productTitle',
              title: 'Product Title',
              type: 'string',
            },
            {
              name: 'product',
              title: 'Product',
              type: 'reference',
              to: [{ type: 'product' }],
            },
            {
              name: 'price',
              title: 'Price',
              type: 'number',
            },
            {
              name: 'quantity',
              title: 'Quantity',
              type: 'number',
            },
          ],
        },
      ],
    },
    {
      name: 'totalAmount',
      title: 'Total Amount',
      type: 'number',
    },
    {
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'],
      },
    },
    {
      name: 'createdAt',
      title: 'Created At',
      type: 'datetime',
      options: {
        dateFormat: 'YYYY-MM-DD',
        timeFormat: 'HH:mm',
      },
    },
    {
      name: 'orderId',
      title: 'Order ID',
      type: 'string',
    },
    {
      name: 'fullName',
      title: 'Full Name',
      type: 'string',
    },
    {
      name: 'city',
      title: 'City',
      type: 'string',
    },
    {
      name: 'address',
      title: 'Address',
      type: 'string',
    },
    {
      name: "paymentMode",
      title: "Payment Mode",
      type: "string",
      options: { list: ["cod", "bankTransfer"] },
    },
    {
      name: 'phone',
      title: 'Phone',
      type: 'string',
    },
    {
      name: 'email',
      title: 'Email',
      type: 'string',
    },
  ],
  preview: {
    select: {
      title: 'orderId', // Now order title will be based on orderId
      subtitle: 'status', // Subtitle will show the status
    },
  },
};


export default orderSchema;