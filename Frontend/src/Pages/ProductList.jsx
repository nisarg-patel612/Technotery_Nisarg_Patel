import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../Services/api";
import toast from "react-hot-toast";

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);

  const limit = 5;

  const fetchProducts = () => {
    API.get("/products")
      .then(res => setProducts(res.data))
      .catch(() => toast.error("Failed to fetch products"));
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const deleteProduct = async (id) => {
    if (!window.confirm("Are you sure?")) return;

    try {
      await API.delete(`/products/${id}`);
      toast.success("Product deleted");
      fetchProducts();
    } catch {
      toast.error("Delete failed");
    }
  };

  const start = (page - 1) * limit;
  const paginated = products.slice(start, start + limit);
  const totalPages = Math.ceil(products.length / limit);

  return (
  <div className="p-6 bg-gray-100 min-h-screen">
    <div className="bg-white rounded-xl shadow p-6">

      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">
          Product List
        </h2>
        <Link
          to="/add"
          className="bg-black text-white px-5 py-2 rounded-lg"
        >
          + Add Product
        </Link>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-200 text-left text-sm">
              <th className="p-3 border">Image</th>
              <th className="p-3 border">Name</th>
              <th className="p-3 border">Slug</th>
              <th className="p-3 border">Price</th>
              <th className="p-3 border">Category</th>
              <th className="p-3 border">Specifications</th>
              <th className="p-3 border">Created</th>
              <th className="p-3 border text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {paginated.map((p) => (
              <tr
                key={p._id}
                className="text-sm hover:bg-gray-50"
              >
                {/* Image */}
                <td className="p-3 border">
                  <img
                    src={`http://localhost:5000/${p.image}`}
                    alt={p.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                </td>

                {/* Name */}
                <td className="p-3 border font-medium">
                  {p.name}
                </td>

                {/* Slug */}
                <td className="p-3 border text-gray-600">
                  {p.slug}
                </td>

                {/* Price */}
                <td className="p-3 border">
                  ₹ {p.price}
                </td>

                {/* Category */}
                <td className="p-3 border">
                  <span className="px-2 py-1 bg-gray-200 rounded text-xs">
                    {p.category}
                  </span>
                </td>

                {/* Specifications */}
                <td className="p-3 border">
                  <ul className="space-y-1">
                    {p.specifications?.map((s, i) => (
                      <li key={i} className="text-xs">
                        <strong>{s.key}:</strong> {s.value}
                      </li>
                    ))}
                  </ul>
                </td>

                {/* Created At */}
                <td className="p-3 border text-xs text-gray-500">
                  {new Date(p.createdAt).toLocaleDateString()}
                </td>

                {/* Actions */}
                <td className="p-3 border">
                  <div className="flex gap-2 justify-center">
                    <Link
                      to={`/view/${p._id}`}
                      className="text-blue-600 hover:underline"
                    >
                      View
                    </Link>
                    <Link
                      to={`/edit/${p._id}`}
                      className="text-green-600 hover:underline"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => deleteProduct(p._id)}
                      className="text-red-600 hover:underline"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="mt-6 flex justify-end gap-2">
        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i}
            onClick={() => setPage(i + 1)}
            className={`px-3 py-1 rounded ${
              page === i + 1
                ? "bg-black text-white"
                : "bg-gray-300"
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>

    </div>
  </div>
);

}
