import React, { useState } from "react";
import API from "../Services/api";
import toast from "react-hot-toast";

export default function AddProduct() {
    const [specs, setSpecs] = React.useState([{ key: "", value: "" }]);
    const [form, setForm] = useState({});

    const submitHandler = async () => {
        if (!form.name || !form.price || !form.image) {
            return toast.error("Please fill all required fields");
        }

        if (form.price <= 0) {
            return toast.error("Price must be greater than 0");
        }

        const fd = new FormData();
        Object.keys(form).forEach(k => fd.append(k, form[k]));
        specs.forEach((s, i) => {
            fd.append(`specifications[${i}][key]`, s.key);
            fd.append(`specifications[${i}][value]`, s.value);
        });

        await API.post("/products", fd);
        toast.success("Product Added");
    }


    return (
  <div className="min-h-screen bg-gray-100 flex justify-center py-10">
    <div className="bg-white w-full max-w-4xl rounded-xl shadow-lg p-8">

      {/* Header */}
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        Add New Product
      </h2>

      {/* Product Form */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* Name */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Product Name *
          </label>
          <input
            className="input"
            placeholder="Enter product name"
            onChange={e => setForm({ ...form, name: e.target.value })}
          />
        </div>

        {/* Slug */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Slug *
          </label>
          <input
            className="input"
            placeholder="product-slug"
            onChange={e => setForm({ ...form, slug: e.target.value })}
          />
        </div>

        {/* Price */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Price (₹) *
          </label>
          <input
            type="number"
            className="input"
            placeholder="Enter price"
            onChange={e => setForm({ ...form, price: e.target.value })}
          />
        </div>

        {/* Image */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Product Image *
          </label>
          <input
            type="file"
            className="w-full border rounded p-2"
            onChange={e =>
              setForm({ ...form, image: e.target.files[0] })
            }
          />
        </div>

        {/* Description (Full Width) */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium mb-1">
            Description
          </label>
          <textarea
            className="input h-28"
            placeholder="Product description"
            onChange={e =>
              setForm({ ...form, description: e.target.value })
            }
          />
        </div>
      </div>

      {/* Specifications Section */}
      <div className="mt-8">
        <h3 className="text-lg font-semibold mb-3">
          Specifications
        </h3>

        <div className="space-y-3">
          {specs.map((s, i) => (
            <div
              key={i}
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              <input
                className="input"
                placeholder="Key (e.g. RAM)"
                onChange={e => (s.key = e.target.value)}
              />
              <input
                className="input"
                placeholder="Value (e.g. 8GB)"
                onChange={e => (s.value = e.target.value)}
              />
            </div>
          ))}
        </div>

        <button
          onClick={() =>
            setSpecs([...specs, { key: "", value: "" }])
          }
          className="mt-3 text-blue-600 font-medium"
        >
          + Add Specification
        </button>
      </div>

      {/* Submit Button */}
      <div className="mt-10 flex justify-end">
        <button
          onClick={submitHandler}
          className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-2 rounded-lg font-semibold"
        >
          Save Product
        </button>
      </div>

    </div>
  </div>
);

}
