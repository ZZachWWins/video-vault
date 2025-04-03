import React from 'react';
import { useNavigate } from 'react-router-dom';
import StarryBackground from './StarryBackground';
import './App.css';

function DrKoryPage() {
  const navigate = useNavigate();

  // Articles about Dr. Kory
  const koryArticles = [
    {
      id: 1,
      title: "The FLCCC Journey",
      content:
        "Dr. Pierre Kory co-founded the Front Line COVID-19 Critical Care Alliance (FLCCC) to challenge mainstream narratives and save lives. From advocating ivermectin to exploring ClO₂, his work reflects a relentless pursuit of truth in medicine.",
    },
    {
      id: 2,
      title: "Faith and Healing",
      content:
        "Beyond science, Dr. Kory’s approach integrates a deep respect for faith-based healing. He believes true health encompasses body and soul—a message that resonates with God’s Detox.",
    },
    {
      id: 3,
      title: "Standing Against Censorship",
      content:
        "Dr. Kory has faced Big Tech and Big Pharma head-on, testifying before Congress and speaking out on platforms like Rumble. His courage inspires millions to question the status quo.",
    },
  ];

  // Expanded testimonials
  const testimonials = [
    {
      text: "“Dr. Kory’s courage inspired me to research ClO₂. It’s been a game-changer for my family.”",
      author: "- James R., Florida",
    },
    {
      text: "“His talks on ivermectin opened my eyes. Now I’m exploring ClO₂ thanks to this site.”",
      author: "- Sarah M., Texas",
    },
    {
      text: "“A doctor who fights for us, not the system. That’s why I trust Dr. Kory.”",
      author: "- Michael T., Ohio",
    },
  ];

  return (
    <div className="app">
      <StarryBackground />
      <header className="header">
        <h1 className="title">Dr. Kory’s Corner</h1>
        <p className="subtitle">Health, Faith, and Freedom</p>
        <nav className="navbar">
          <button className="auth-btn" onClick={() => navigate('/')}>Home</button>
          <button className="auth-btn" onClick={() => navigate('/drkory')}>Dr. Kory</button>
          <button className="auth-btn" onClick={() => navigate('/about')}>About</button>
          <button className="auth-btn" onClick={() => navigate('/videos')}>Videos</button>
          <button className="auth-btn" onClick={() => navigate('/grenon')}>Grenon</button>
          <button className="auth-btn" onClick={() => navigate('/articles')}>Articles</button>
        </nav>
      </header>

      <section className="landing-section">
        <h2 className="landing-title">Meet Dr. Pierre Kory</h2>
        <p className="landing-text">
          Dr. Pierre Kory is a renowned critical care physician and advocate for truth in medicine. Known for his work with the FLCCC Alliance and his fearless stance on alternative treatments, he’s a voice for those seeking health freedom. Here, explore his insights on chlorine dioxide (ClO₂), faith-based healing, and standing firm in adversity.
        </p>
      </section>

      <section className="why-clo2-section">
        <h2 className="why-clo2-title">Dr. Kory on ClO₂</h2>
        <p className="why-clo2-text">
          Dr. Kory has spoken about the potential of overlooked therapies like ClO₂. While not a replacement for medical advice, he champions open discussion and patient empowerment. Watch his talks, read his thoughts, and join the conversation about detoxifying body and soul.
        </p>
        <div className="video-container">
          <iframe
            className="rumble-video"
            src="https://rumble.com/embed/v6otfzg/?pub=4"
            title="Dr. Pierre Kory Video"
            frameBorder="0"
            allowFullScreen
          ></iframe>
        </div>
        <div className="button-group">
          <button className="cta-btn" onClick={() => window.open('https://flccc.net', '_blank')}>
            Visit FLCCC
          </button>
          <button
            className="cta-btn"
            onClick={() =>
              window.open(
                'https://pierrekorymedicalmusings.com/p/the-existing-evidence-base-for-chlorine?utm_campaign=post',
                '_blank'
              )
            }
          >
            Read ClO₂ Article
          </button>
        </div>
      </section>

      <section className="articles-section">
        <h2 className="articles-title">Insights from Dr. Kory</h2>
        {koryArticles.map((article) => (
          <div key={article.id} className="article">
            <h3 className="article-title">{article.title}</h3>
            <p className="article-text">{article.content}</p>
          </div>
        ))}
      </section>

      <section className="testimonials-section">
        <h2 className="testimonials-title">Inspired by Dr. Kory</h2>
        <div className="testimonials-grid">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="testimonial-card">
              <p className="testimonial-text">{testimonial.text}</p>
              <p className="testimonial-author">{testimonial.author}</p>
            </div>
          ))}
        </div>
      </section>

      <footer className="footer">
        <p className="footer-text">Built by Zachary | © 2025 Bob The Plumber</p>
      </footer>
    </div>
  );
}

export default DrKoryPage;