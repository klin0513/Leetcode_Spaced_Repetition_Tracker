import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import Landing from "./pages/Landing";
import Dashboard from "./pages/Dashboard";
import Register from "./pages/Register";
import Login from "./pages/Login";

function App() {
  return (
    <BrowserRouter>
      {/* navigation bar */}
      <nav
        style={{
          position: "sticky",
          top: "0",
          padding: "0.9375rem 2rem 0.9375rem 10rem",
          background: "#f8f9fa",
          display: "flex",
        }}
      >
        <div style={{ display: "flex", gap: "25px" }}>
          <Link to="/" className="nav-link">
            Home
          </Link>
          <Link to="/dashboard" className="nav-link">
            Dashboard
          </Link>
        </div>

        <div style={{ display: "flex", gap: "15px", marginLeft: "auto" }}>
          <Link to="/login" className="nav-link nav-btn nav-btn-login">
            Log In
          </Link>
          <Link to="/register" className="nav-link nav-btn nav-btn-signup">
            Sign Up
          </Link>
        </div>
      </nav>

      {/* routes to swap pages */}
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
