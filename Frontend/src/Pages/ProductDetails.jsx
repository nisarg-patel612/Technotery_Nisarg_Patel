import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import API from "../Services/api";
import toast from "react-hot-toast";

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    API.get(`/products/${id}`)
      .then(res => setProduct(res.data))
      .catch(() => toast.error("Failed to load product"));
  }, [id]);

  if (!product) return <p className="p-6">Loading...</p>;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <div className="bg-white shadow rounded p-6">
        <img
          src={`http://localhost:5000/${product.image}`}
          className="w-64 mx-auto rounded"
        />

        <h2 className="text-2xl font-bold mt-4">{product.name}</h2>
        <p className="text-gray-600 mt-1">{product.description}</p>

        <p className="mt-2 text-lg font-semibold">
          Price: ₹{product.price}
        </p>

        <p className="mt-1 text-sm text-gray-500">
          Category: {product.category}
        </p>

        <h3 className="font-bold mt-4">Specifications</h3>
        <ul className="list-disc pl-5">
          {product.specifications?.map((s, i) => (
            <li key={i}>
              <strong>{s.key}:</strong> {s.value}
            </li>
          ))}
        </ul>

        <div className="mt-5 flex gap-3">
          <Link
            to={`/edit/${product._id}`}
            className="btn"
          >
            Edit Product
          </Link>

          <Link
            to="/"
            className="bg-gray-500 text-white px-4 py-2 rounded"
          >
            Back
          </Link>
        </div>
      </div>
    </div>
  );
}
