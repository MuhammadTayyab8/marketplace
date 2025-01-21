// schemas/order.js
const OrderSchema= {
    name: 'order',
    title: 'Order',
    type: 'document',
    fields: [
      {
        name: 'clientId',
        title: 'Client ID',
        type: 'string',
      },
      {
        name: 'customer',
        title: 'Customer',
        type: 'reference',
        to: [{ type: 'customer' }],
      },
      {
        name: 'products',
        title: 'Ordered Products',
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
        name: 'total',
        title: 'Total Amount',
        type: 'number',
      },
      {
        name: 'shippingAddress',
        title: 'Shipping Address',
        type: 'object',
        fields: [
          {
            name: 'streetAddress',
            type: 'string',
          },
          {
            name: 'city',
            type: 'string',
          },
          {
            name: 'province',
            type: 'string',
          },
          {
            name: 'zipCode',
            type: 'string',
          },
          {
            name: 'phone',
            type: 'string',
          },
          {
            name: 'email',
            type: 'string',
          },
        ],
      },
      {
        name: 'paymentMethod',  // Add this field
        title: 'Payment Method',
        type: 'string',
      },
      {
        name: 'shipment',
        type: 'reference',
        to: [{ type: 'shipment' }],
        title: 'Shipment Details',
      }
      
    ],
  };
  
  export default OrderSchema