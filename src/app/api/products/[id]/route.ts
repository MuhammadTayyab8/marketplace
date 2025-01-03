import { NextResponse } from "next/server";

const products = [
  {
    id: 1,
    image: '/product1.png',
    detailImage1 : '/product2.png',
    detailImage2 : '/product3.png',
    detailImage3 : '/product4.png',
    title: 'Eden Velvet Sofa',
    description: 'A luxurious velvet sofa with soft cushioning and a modern design, perfect for adding a touch of elegance to any living room.',
    price: 2000,
    stock: 'New',
    netTotal: ''
  },
  {
    id: 2,
    image: '/product2.png',
    detailImage1 : '/product1.png',
    detailImage2 : '/product3.png',
    detailImage3 : '/product4.png',
    title: 'Regal Dining Table',
    description: 'Crafted from solid oak, this dining table features a timeless design that complements both traditional and contemporary interiors.',
    price: 2500,
    stock: '-30%',
    netTotal: 2700
  },
  {
    id: 3,
    image: '/product3.png',
    detailImage1 : '/product2.png',
    detailImage2 : '/product1.png',
    detailImage3 : '/product4.png',
    title: 'Luxe Leather Recliner',
    description: 'A comfortable leather recliner with adjustable positions, perfect for relaxation after a long day. Its sleek, modern, and durable.',
    price: 3000,
    stock: 'New',
    netTotal: 3200
  },
  {
    id: 4,
    image: '/product4.png',
    detailImage1 : '/product2.png',
    detailImage2 : '/product3.png',
    detailImage3 : '/product1.png',
    title: 'Horizon Modern Table',
    description: 'A minimalist coffee table with a glass top and a sleek metal frame, ideal for modern living spaces.',
    price: 4000,
    stock: '-40%',
    netTotal: 4200
  },
  {
    id: 5,
    image: '/product1.png',
    detailImage1 : '/product2.png',
    detailImage2 : '/product3.png',
    detailImage3 : '/product4.png',
    title: 'Haven Queen Bed',
    description: 'A sturdy wooden bed frame with a simple yet stylish design, featuring a high headboard and neutral tones to suit any bedroom décor.',
    price: 4000,
    stock: 'New',
    netTotal: 4100
  }, 
  {
    id: 6,
    image: '/product2.png',
    detailImage1 : '/product1.png',
    detailImage2 : '/product3.png',
    detailImage3 : '/product4.png',
    title: 'Metro Storage Cabinet',
    description: 'A functional storage cabinet with ample space for organizing your home, combining practicality with a chic, modern style.',
    price: 3000,
    stock: 'New',
    netTotal: 3200
  },
  {
    id: 7,
    image: '/product3.png',
    detailImage1 : '/product2.png',
    detailImage2 : '/product1.png',
    detailImage3 : '/product4.png',
    title: 'Vera Armchair',
    description: 'A statement armchair with a contemporary design, featuring plush upholstery and a refined wooden base, adding sophistication to any room.',
    price: 3300,
    stock: '-40%',
    netTotal: 3500
  },
  {
    id: 8,
    image: '/product4.png',
    detailImage1 : '/product2.png',
    detailImage2 : '/product3.png',
    detailImage3 : '/product1.png',
    title: 'Juno Bookshelf',
    description: 'A stylish and spacious bookshelf made from a combination of wood and metal, perfect for showcasing your books, collectibles, and decor.',
    price: 2100,
    stock: '-30%',
    netTotal: 2300
  }, 
];

  export async function GET(req: Request, {params}: {params: {id: string}}){
    const productId = parseInt(params.id)
    const productData = products.find((p) => p.id === productId)
    return NextResponse.json(productData)
  }