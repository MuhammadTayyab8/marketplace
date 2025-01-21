export default {
    name: 'product',
    title: 'Product',
    type: 'document',
    fields: [
      {
        name: 'title',
        title: 'Title',
        type: 'string',
        description: 'The title of the product',
      },
      {
        name: 'description',
        title: 'Description',
        type: 'text',
        description: 'Detailed description of the product',
      },
      {
        name: 'price',
        title: 'Price',
        type: 'number',
        description: 'The price of the product',
      },
      {
        name: 'discountPercentage',
        title: 'Discount Percentage',
        type: 'number',
        description: 'Discount percentage for the product',
      },
      {
        name: 'tags',
        title: 'Tags',
        type: 'array',
        of: [{ type: 'string' }],
        description: 'Tags associated with the product',
      },
      {
        name: 'isNew',
        title: 'Is New',
        type: 'boolean',
        description: 'Indicates if the product is new',
      },
      {
        name: 'image',
        title: 'Image',
        type: 'image',
        options: {
          hotspot: true, // Enables image cropping and positioning
        },
        description: 'Main image of the product',
      },
      {
        name: 'productId',
        title: 'Product ID',
        type: 'string',
        description: 'Custom unique identifier for the product',
      },
    ],
  };
  