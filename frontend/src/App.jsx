import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import Landing from "./pages/Landing";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <BrowserRouter>
      {/* navigation bar */}
      <nav
        style={{
          padding: "10px",
          background: "#eee",
          display: "flex",
          gap: "15px",
        }}
      >
        <Link to="/" className="nav-link">
          Home
        </Link>
        <Link to="/dashboard" className="nav-link">
          Dashboard
        </Link>
      </nav>

      {/* routes to swap pages */}
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
