const ShipmentSchema= {
    name: 'shipment',
    type: 'document',
    title: 'Shipment',
    fields: [
      {
        name: 'order',
        type: 'reference',
        to: [{ type: 'order' }],
        title: 'Related Order',
      },
      {
        name: 'carrier',
        type: 'string',
        title: 'Carrier',
        description: 'Shipping carrier (e.g., FedEx, UPS, DHL)',
      },
      {
        name: 'trackingNumber',
        type: 'string',
        title: 'Tracking Number',
      },
      {
        name: 'status',
        type: 'string',
        options: {
          list: [
            { title: 'Pending', value: 'pending' },
            { title: 'In Transit', value: 'inTransit' },
            { title: 'Delivered', value: 'delivered' },
            { title: 'Failed', value: 'failed' },
          ],
        },
        title: 'Shipment Status',
      },
      {
        name: 'estimatedDelivery',
        type: 'datetime',
        title: 'Estimated Delivery Date',
      },
    ],
  };
  
  export default ShipmentSchema