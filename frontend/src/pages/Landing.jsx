import { Link } from "react-router-dom";
import "./Landing.css";

export default function Landing() {
  return (
    <div className="landing-container">
      <header className="hero-section">
        <h1>Master Your Coding Interview</h1>
        <p className="hero-subtitle">
          Track your algorithmic problems, utilize spaced repetition, and retain
          core data structures and concepts efficiently.
        </p>
        <div className="hero-buttons">
          <Link to="/register" className="btn btn-get-started">
            Get Started
          </Link>
          <Link to="/login" className="btn btn-sign-in">
            Sign In
          </Link>
        </div>
      </header>
    </div>
  );
}
