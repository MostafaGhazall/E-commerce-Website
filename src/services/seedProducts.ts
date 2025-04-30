import { Product } from "../types/Product";
import { addProducts } from "./indexedDB";

const demoProducts: Product[] = [
  {
    id: "1",
    name: "Classic Tee",
    price: 620,
    description:
      "Embrace the beauty of simplicity and let your confidence shine through.",
    images: ["/assets/tee1.jpg", "/assets/tee2.jpg", "/assets/tee3.jpg"],
    stock: 10,
    rating: 4.4,
    reviews: [
      {
        comment: "الخامة جيدة والمقاس مضبوط ونفس شكل الصورة",
        name: "Sara",
        rating: 5,
        date: "2024-11-01",
      },
      {
        comment: "مغلف بطريقة جيدة جدا",
        name: "Ali",
        rating: 4,
        date: "2024-10-20",
      },
    ],
    category: "clothing",
    sizes: ["M", "L", "XL", "XXL", "XXXL"],
    colors: [
      {
        name: "Dark Green",
        value: "#006400",
        images: ["/assets/tee1.jpg"],
      },
      {
        name: "White",
        value: "#ffffff",
        images: ["/assets/tee3.jpg"],
      },
      {
        name: "Black",
        value: "#000000",
        images: ["/assets/tee2.jpg"],
      },
    ],
  },
  {
    id: "2",
    name: "Eco Bottle",
    price: 150,
    description: "Reusable water bottle made from eco-friendly materials.",
    images: ["/assets/bottle.jpg"],
    stock: 20,
    rating: 4.7,
    reviews: [
      {
        comment: "Useful and stylish",
        name: "Mohamed",
        rating: 5,
        date: "2024-12-01",
      },
      {
        comment: "Keeps water cold",
        name: "Julia",
        rating: 4,
        date: "2024-11-15",
      },
    ],
    category: "accessories",
  },
];

export const seedProducts = async () => {
  const alreadySeeded = localStorage.getItem("productsSeeded");
  if (!alreadySeeded) {
    await addProducts(demoProducts);
    localStorage.setItem("productsSeeded", "true");
  }
};
