import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../Services/api";
import toast from "react-hot-toast";

export default function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    name: "",
    slug: "",
    description: "",
    price: "",
    category: "Electronics"
  });

  const [specs, setSpecs] = useState([]);
  const [image, setImage] = useState(null);
  const [oldImage, setOldImage] = useState("");

  // 🔹 Fetch product details
  useEffect(() => {
    API.get(`/products/${id}`)
      .then(res => {
        setForm({
          name: res.data.name,
          slug: res.data.slug,
          description: res.data.description,
          price: res.data.price,
          category: res.data.category
        });
        setSpecs(res.data.specifications || []);
        setOldImage(res.data.image);
        setLoading(false);
      })
      .catch(() => toast.error("Failed to load product"));
  }, [id]);

  // 🔹 Update product
  const submitHandler = async () => {
    if (!form.name || !form.slug || !form.price) {
      return toast.error("Required fields missing");
    }

    if (form.price <= 0) {
      return toast.error("Price must be greater than 0");
    }

    const fd = new FormData();
    Object.keys(form).forEach(key => fd.append(key, form[key]));

    specs.forEach((s, i) => {
      fd.append(`specifications[${i}][key]`, s.key);
      fd.append(`specifications[${i}][value]`, s.value);
    });

    if (image) fd.append("image", image);

    try {
      await API.put(`/products/${id}`, fd);
      toast.success("Product updated successfully");
      navigate("/");
    } catch (err) {
      toast.error("Update failed");
    }
  };

  if (loading) return <p className="p-6">Loading...</p>;

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Edit Product</h2>

      <input
        className="input"
        placeholder="Product Name"
        value={form.name}
        onChange={e => setForm({ ...form, name: e.target.value })}
      />

      <input
        className="input mt-2"
        placeholder="Slug"
        value={form.slug}
        onChange={e => setForm({ ...form, slug: e.target.value })}
      />

      <input
        type="number"
        className="input mt-2"
        placeholder="Price"
        value={form.price}
        onChange={e => setForm({ ...form, price: e.target.value })}
      />

      <textarea
        className="input mt-2"
        placeholder="Description"
        value={form.description}
        onChange={e => setForm({ ...form, description: e.target.value })}
      />

      {/* Existing image */}
      {oldImage && (
        <img
          src={`http://localhost:5000/${oldImage}`}
          className="w-32 mt-3 rounded"
        />
      )}

      <input
        type="file"
        className="mt-3"
        onChange={e => setImage(e.target.files[0])}
      />

      {/* Specifications */}
      <h3 className="font-bold mt-4">Specifications</h3>

      {specs.map((spec, index) => (
        <div key={index} className="flex gap-2 mt-2">
          <input
            className="input"
            placeholder="Key"
            value={spec.key}
            onChange={e => {
              const updated = [...specs];
              updated[index].key = e.target.value;
              setSpecs(updated);
            }}
          />
          <input
            className="input"
            placeholder="Value"
            value={spec.value}
            onChange={e => {
              const updated = [...specs];
              updated[index].value = e.target.value;
              setSpecs(updated);
            }}
          />
          <button
            className="text-red-500"
            onClick={() =>
              setSpecs(specs.filter((_, i) => i !== index))
            }
          >
            ✕
          </button>
        </div>
      ))}

      <button
        onClick={() => setSpecs([...specs, { key: "", value: "" }])}
        className="text-blue-500 mt-2"
      >
        + Add Spec
      </button>

      <button
        onClick={submitHandler}
        className="btn mt-5 w-full"
      >
        Update Product
      </button>
    </div>
  );
}
