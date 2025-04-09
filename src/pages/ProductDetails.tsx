import { useParams } from 'react-router-dom';

const ProductDetails = () => {
  const { id } = useParams();
  
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Product Details for {id}</h1>
      <p>Price: $29.99</p>
      <p>Description: This is a great product!</p>
      <button className="bg-blue-500 text-white p-2 mt-4">Add to Cart</button>
    </div>
  );
};

export default ProductDetails;
