import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Login from "./Pages/Login";
import ProductList from "./Pages/ProductList";
import AddProduct from "./Pages/AddProduct";
import EditProduct from "./Pages/EditProduct";
import ProductDetails from "./Pages/ProductDetails";
import Navbar from "./Components/Navbar";
import ProtectedRoute from "./Components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-right" />

      <Routes>
        {/* 🔓 Public Route */}
        <Route path="/login" element={<Login />} />

        {/* 🔐 Protected Routes */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Navbar />
              <ProductList />
            </ProtectedRoute>
          }
        />

        <Route
          path="/add"
          element={
            <ProtectedRoute>
              <Navbar />
              <AddProduct />
            </ProtectedRoute>
          }
        />

        <Route
          path="/edit/:id"
          element={
            <ProtectedRoute>
              <Navbar />
              <EditProduct />
            </ProtectedRoute>
          }
        />

        <Route
          path="/view/:id"
          element={
            <ProtectedRoute>
              <Navbar />
              <ProductDetails />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
