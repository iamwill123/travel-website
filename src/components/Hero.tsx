import React from 'react'

const Hero: React.FC = () => {
  return (
    <section className="hero">
      <div className="container">
        <div className="hero-content">
          <h1>Share Your Travel Adventures</h1>
          <p>
            Discover hidden gems, share travel tips, and connect with fellow wanderers.
            Your next adventure starts with a recommendation from someone who's been there.
          </p>
          <div className="hero-buttons">
            <button className="btn btn-primary">
              Explore Destinations
            </button>
            <button className="btn btn-secondary">
              Share Your Story
            </button>
          </div>

          <div className="hero-features">
            <div className="hero-feature">
              <div className="feature-icon">
                📝
              </div>
              <h3>Share Tips</h3>
              <p>Share your favorite spots and travel advice</p>
            </div>

            <div className="hero-feature">
              <div className="feature-icon">
                🔍
              </div>
              <h3>Discover</h3>
              <p>Find amazing places recommended by travelers</p>
            </div>

            <div className="hero-feature">
              <div className="feature-icon">
                👥
              </div>
              <h3>Connect</h3>
              <p>Join a community of passionate travelers</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero; 