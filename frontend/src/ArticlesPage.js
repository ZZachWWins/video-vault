import React from 'react';
import { useNavigate } from 'react-router-dom';
import StarryBackground from './StarryBackground';
import './App.css';

function ArticlesPage() {
  const navigate = useNavigate();

  const articles = [
    {
      id: 1,
      title: "The Great Deception",
      author: "Bob The Plumber",
      content:
        "So folks, we live in a time of great deception. We have been told that vaccines are good and necessary and now we’re learning that they have maimed and murdered millions of people. I myself was paralyzed by a vaccine in the 90s. Another deception is that our school system is good. Turns out we are last out of the 40 top countries and we spend the most of any industrialized nation by a longshot. We’ve been told our government is for the people—nothing could be further from the truth. " +
        "We’re surrounded by deceptions and people believe that our religious teachings and beliefs are somehow exempt from deception. But even the laws of logic tell you that’s not true, so let’s look at what is the great deception that Satan has brought upon us in the last 150 years. Please bear with me because I will prove from scripture exactly what I’m telling you. " +
        "Jesus in the New Testament says that 'in vain, they worship me.' Is it possible that millions of Americans are worshiping Jesus in vain? Well according to Jesus, it’s not only possible, but it’s extremely probable. So what could cause people to worship Jesus in vain? Well, let’s go back and look at where wisdom comes from. The Bible tells us repeatedly that the fear of the Lord is the beginning of wisdom. So if we put ourselves in the devil’s shoes, what could we say to people to stop them from the natural fear of a holy Creator? Perhaps we could convince people that God loves them which will cause them to put down their guard in terms of fearing him. " +
        "So in the Old Testament in Isaiah 29:13 the scripture says, God speaking, 'these people draw near me with their lips, but their hearts are far from me and their fear toward me is taught by commandment of men.' So now fast-forward to the New Testament when Jesus said 'these people draw near me with their lips, but their hearts are far from me and in vain they worship me, teaching as doctrines the commandments of men,' he was quoting Isaiah 29 but he didn’t specifically mention the fear. You have to have a working knowledge of all of scripture in order to understand any one scripture. " +
        "Now you see the full story how Satan has convinced the modern people not to fear God and now we are worshiping him in vain. How do we know how to develop a healthy fear of God? Well we go back to Deuteronomy where God told Moses that if you ever set a king over you, he must write for himself a copy of the law which is basically saying he’s got to write his entire Bible for himself and then he must read it every day of his life so that he may learn to fear Me (God)! It’s important for every human being to read the Bible every day as if your life depends on it because it does!!!",
    },
    {
      id: 2,
      title: "ClO₂ to the President",
      author: "Bob The Plumber",
      content:
        "In the spring of 2020 Dr. Alan Keyes was invited to a think tank in Houston Texas at the Brzezinski Cancer clinic sponsored by John Hewlett of cardio miracle. At the last minute, Dr. Alan Keyes, who hates to fly, decided not to come because he was invited to be on the Alex Jones show. So since I had already bought the plane tickets and had shipped a large box of chlorine dioxide to the cancer clinic and I had rented the Airbnb I went ahead and went to Houston. At that time the Airbnb I had rented was scheduled to house G Edward Griffin, Dan Happel, and Sheriff Mack, so we met that afternoon and then went over to the clinic in the evening for a time of orientation and introduction. " +
        "A lot of great patriots were there including Dr. Edward Group, Dr. Sherry Tenpenny, Coach Dave, and many others. It was during the introduction time when a gentleman stood up and said he worked with the UN, that he was around the president, and that he would write articles that would be seen by 2 billion people. I thought he was probably a little crazy but during a break, I approached him and asked him what he knew about chlorine dioxide. It turns out he was a huge fan and was more than willing to take some sets of bottles that I had mailed there and said he was willing to take it to President Trump. " +
        "I left those with him and we stayed in touch but then in April when President Trump got really attacked for saying a disinfectant that kills everything couldn’t we just drink it, suddenly I got bombarded with anger from my newfound friend because he got in all kinds of trouble with the family. It is also interesting to note that at the same time I had already prepared enough chlorine dioxide to stop the plandemic in all of America. I had 10,000 sets of bottles in my home in Tennessee.",
    },
  ];

  return (
    <div className="app">
      <StarryBackground />
      <header className="header">
        <h1 className="title">Articles</h1>
        <p className="subtitle">Insights from God’s Detox</p>
        <nav className="navbar">
          <button className="auth-btn" onClick={() => navigate('/')}>Home</button>
          <button className="auth-btn" onClick={() => navigate('/drkory')}>Dr. Kory</button>
          <button className="auth-btn" onClick={() => navigate('/about')}>About</button>
          <button className="auth-btn" onClick={() => navigate('/videos')}>Videos</button>
          <button className="auth-btn" onClick={() => navigate('/grenon')}>Grenon</button>
          <button className="auth-btn" onClick={() => navigate('/articles')}>Articles</button>
        </nav>
      </header>

      <section className="articles-section">
        {articles.map((article) => (
          <article key={article.id} className="article">
            <h2 className="article-title">{article.title}</h2>
            <p className="article-author">By {article.author}</p>
            <div className="article-content">
              <p className="article-text">{article.content}</p>
            </div>
          </article>
        ))}
      </section>

      <footer className="footer">
        <p className="footer-text">Built by Zachary | © 2025 Bob The Plumber</p>
      </footer>
    </div>
  );
}

export default ArticlesPage;