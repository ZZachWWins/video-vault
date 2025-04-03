import React from 'react';
import { useNavigate } from 'react-router-dom';
import StarryBackground from './StarryBackground';
import './App.css';

function AboutPage() {
  const navigate = useNavigate();

  // Define your articles here
  const articles = [
    {
      id: 1,
      title: "Who We Are",
      content:
        "God’s Detox is a platform born from faith and a desire to empower people with knowledge. Led by Bob The Plumber, we share stories of transformation through chlorine dioxide (ClO₂) and spiritual renewal. We’re not here to sell—just to inspire and inform.",
    },
    {
      id: 2,
      title: "Our Vision",
      content:
        "We believe in two detoxes: one for the body, one for the soul. ClO₂ offers a path to physical cleansing, while faith in Jesus Christ brings eternal redemption. Join us to explore both.",
    },
    {
      id: 3,
      title: "The Great Deception",
      content:
        "So folks, we live in a time of great deception. We have been told that vaccines are good and necessary and now we’re learning that they have maimed and murdered millions of people. I myself was paralyzed by a vaccine in the 90s. Another deception is that our school system is good. Turns out we are last out of the 40 top countries and we spend the most of any industrialized nation by a longshot. We’ve been told our government is for the people—nothing could be further from the truth. " +
        "We’re surrounded by deceptions and people believe that our religious teachings and beliefs are somehow exempt from deception. But even the laws of logic tell you that’s not true, so let’s look at what is the great deception that Satan has brought upon us in the last 150 years. Please bear with me because I will prove from scripture exactly what I’m telling you. " +
        "Jesus in the New Testament says that 'in vain, they worship me.' Is it possible that millions of Americans are worshiping Jesus in vain? Well according to Jesus, it’s not only possible, but it’s extremely probable. So what could cause people to worship Jesus in vain? Well, let’s go back and look at where wisdom comes from. The Bible tells us repeatedly that the fear of the Lord is the beginning of wisdom. So if we put ourselves in the devil’s shoes, what could we say to people to stop them from the natural fear of a holy Creator? Perhaps we could convince people that God loves them which will cause them to put down their guard in terms of fearing him. " +
        "So in the Old Testament in Isaiah 29:13 the scripture says, God speaking, 'these people draw near me with their lips, but their hearts are far from me and their fear toward me is taught by commandment of men.' So now fast-forward to the New Testament when Jesus said 'these people draw near me with their lips, but their hearts are far from me and in vain they worship me, teaching as doctrines the commandments of men,' he was quoting Isaiah 29 but he didn’t specifically mention the fear. You have to have a working knowledge of all of scripture in order to understand any one scripture. " +
        "Now you see the full story how Satan has convinced the modern people not to fear God and now we are worshiping him in vain. How do we know how to develop a healthy fear of God? Well we go back to Deuteronomy where God told Moses that if you ever set a king over you, he must write for himself a copy of the law which is basically saying he’s got to write his entire Bible for himself and then he must read it every day of his life so that he may learn to fear Me (God)! It’s important for every human being to read the Bible every day as if your life depends on it because it does!!!",
    },
  ];

  return (
    <div className="app">
      <StarryBackground />
      <header className="header">
        <h1 className="title">About God’s Detox</h1>
        <p className="subtitle">Our Mission</p>
        <nav className="navbar">
          <button className="auth-btn" onClick={() => navigate('/')}>Home</button>
          <button className="auth-btn" onClick={() => navigate('/drkory')}>Dr. Kory</button>
          <button className="auth-btn" onClick={() => navigate('/about')}>About</button>
          <button className="auth-btn" onClick={() => navigate('/videos')}>Videos</button>
          <button className="auth-btn" onClick={() => navigate('/grenon')}>Grenon</button>
          <button className="auth-btn" onClick={() => navigate('/articles')}>Articles</button>
        </nav>
      </header>

      <section className="article-section">
        {articles.map((article) => (
          <div key={article.id} className="article">
            <h2 className="article-title">{article.title}</h2>
            <p className="article-text">{article.content}</p>
          </div>
        ))}
      </section>

      <footer className="footer">
        <p className="footer-text">Built by Zachary | © 2025 Bob The Plumber</p>
      </footer>
    </div>
  );
}

export default AboutPage;