import { Link } from "react-router-dom";
import "./Landing.css";

export default function Landing() {
  return (
    <div className="landing-container">
      {/* hero section with 'sign up' and 'log in' buttons */}
      <header className="hero-section">
        <h1>Master Your Coding Interview</h1>
        <p className="hero-subtitle">
          Track your algorithmic problems, utilize spaced repetition, and retain
          core data structures and concepts efficiently.
        </p>
        <div className="hero-buttons">
          <Link to="/register" className="btn btn-sign-up">
            Sign Up
          </Link>
          <Link to="/login" className="btn btn-log-in">
            Log In
          </Link>
        </div>
      </header>

      {/* section describing features of website */}
      <section className="features-section">
        <h2>Built for Technical Success</h2>
        <div className="features-grid">
          <div className="feature-card">
            <h3>Spaced Repetition</h3>
            <p>
              Review problems exactly when you need to, ensuring algorithms
              stick in your long-term memory.
            </p>
          </div>
          <div className="feature-card">
            <h3>Analytics Dashboard</h3>
            <p>
              Monitor your total solved problems, upcoming review counts, and
              daily completion metrics at a glance.
            </p>
          </div>
          <div className="feature-card">
            <h3>Centralized Database</h3>
            <p>
              Organize by topic, track problem URLs, difficulty tiers, and store
              custom revision notes.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
