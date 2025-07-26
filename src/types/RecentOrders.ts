export type RecentOrder = {
  _id: string;
  total: number;
  _createdAt: string;
  status: string;
  products: {
    _key: string;
    productTitle: string;
    quantity: number;
    imageUrl: string;
  }[];
  customerId: string;
  customerName: string;
  customerEmail: string;
};

