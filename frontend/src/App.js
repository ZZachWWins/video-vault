import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import ReactPlayer from 'react-player';
import { gsap } from 'gsap';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import DrKoryPage from './DrKoryPage';
import AboutPage from './AboutPage';
import './App.css';

function HomePage({ user, videos, loading, file, title, description, username, password, signupUsername, signupPassword, showHistory, showCourse, showAuth, activeTab, progress, enlargedImage, isBookMenuOpen, selectedMoment, searchTerm, showBackToTop, setUser, setVideos, setLoading, setFile, setTitle, setDescription, setUsername, setPassword, setSignupUsername, setSignupPassword, setShowHistory, setShowCourse, setShowAuth, setActiveTab, setProgress, setEnlargedImage, setIsBookMenuOpen, setSelectedMoment, setSearchTerm, setShowBackToTop, canvasRef, titleRef, landingRefs, handleLogin, handleSignup, handleLogout, handleUpload, handleViewIncrement, handleLike, hasLiked, handleImageClick, closeEnlargedImage, toggleBookMenu, handleMomentClick, filteredVideos, sortedVideos, featuredVideo }) {
  return (
    <div className="app">
      <canvas ref={canvasRef} className="starry-background" />
      <div className="rotating-text-background">God’s Detox</div>

      <header className="header">
        <h1 ref={titleRef} className="title">God’s Detox</h1>
        <p className="subtitle">Presented by Bob The Plumber</p>
        <nav className="navbar">
          <button className="nav-btn" onClick={() => window.location.href = '/'}>Home</button>
          <button className="nav-btn" onClick={() => window.location.href = '/drkory'}>Dr. Kory</button>
          <button className="nav-btn" onClick={() => window.location.href = '/about'}>About</button>
        </nav>
        <div className="auth-section">
          {user ? (
            <>
              <span>Welcome, {user.username}</span>
              <button onClick={handleLogout} className="auth-btn">Logout</button>
            </>
          ) : (
            <button onClick={() => setShowAuth(true)} className="auth-btn">Sign up or Log in</button>
          )}
        </div>
      </header>

      {featuredVideo && (
        <section className="featured-section">
          <h2 className="featured-title">Featured Video</h2>
          <div className="featured-video">
            <ReactPlayer
              url={featuredVideo.fileUrl}
              light={featuredVideo.thumbnailUrl}
              width="100%"
              height="300px"
              controls
              onStart={() => handleViewIncrement(featuredVideo._id)}
            />
            <h3 className="video-title">{featuredVideo.title}</h3>
            <p className="video-description">{featuredVideo.description}</p>
            <p className="video-uploader">Uploaded by: {featuredVideo.uploadedBy}</p>
            <p className="video-views">Views: {featuredVideo.views || 0}</p>
          </div>
        </section>
      )}

      {showAuth && (
        <div className="auth-modal">
          <div className="auth-content">
            <h2 className="auth-title">Authentication</h2>
            <div className="auth-tabs">
              <button
                className={`tab-btn ${activeTab === 'login' ? 'active' : ''}`}
                onClick={() => setActiveTab('login')}
              >
                Login
              </button>
              <button
                className={`tab-btn ${activeTab === 'signup' ? 'active' : ''}`}
                onClick={() => setActiveTab('signup')}
              >
                Signup
              </button>
            </div>
            {activeTab === 'login' ? (
              <form onSubmit={handleLogin} className="auth-form">
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Username"
                  required
                />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  required
                />
                <button type="submit" className="submit-btn">Login</button>
              </form>
            ) : (
              <form onSubmit={handleSignup} className="auth-form">
                <input
                  type="text"
                  value={signupUsername}
                  onChange={(e) => setSignupUsername(e.target.value)}
                  placeholder="Choose Username"
                  required
                />
                <input
                  type="password"
                  value={signupPassword}
                  onChange={(e) => setSignupPassword(e.target.value)}
                  placeholder="Choose Password"
                  required
                />
                <button type="submit" className="submit-btn">Signup</button>
              </form>
            )}
            <button className="close-btn" onClick={() => setShowAuth(false)}>
              Close
            </button>
          </div>
        </div>
      )}

      <section className="landing-section">
        <h2 className="landing-title" ref={(el) => (landingRefs.current[0] = el)}>
          Welcome to God’s Detox
        </h2>
        <p className="landing-text" ref={(el) => (landingRefs.current[1] = el)}>
          Welcome to God’s Detox, where faith meets transformation. We’re sharing powerful stories of grace, hope, and inspiration through video, spotlighting the potential of CLO2—a simple, accessible tool used worldwide to purify water and, some believe, enhance well-being. Join us to explore real experiences and decide for yourself.
        </p>
        <h2 className="landing-title" ref={(el) => (landingRefs.current[2] = el)}>
          The CLO2 Movement
        </h2>
        <p className="landing-text" ref={(el) => (landingRefs.current[3] = el)}>
          Chlorine dioxide (CLO2) isn’t just another health fad—it’s a movement. Used for years in water purification, CLO2 is affordable and easy to make, offering an option for those seeking alternatives. Through our videos, hear from people of faith who’ve embraced it and share your own story of detox and renewal.
        </p>
        <h2 className="landing-title" ref={(el) => (landingRefs.current[4] = el)}>
          Your Choice, Your Voice
        </h2>
        <p className="landing-text" ref={(el) => (landingRefs.current[5] = el)}>
          At God’s Detox, we believe in your right to choose. CLO2 has sparked debate—praised by some, questioned by others. Our platform cuts through the noise with authentic video testimonies. Watch, learn, and contribute your voice to a community grounded in faith and personal freedom.
        </p>
        <button
          className="cta-btn"
          onClick={() => (window.location.href = 'mailto:zacharystreamingdba@gmail.com')}
          ref={(el) => (landingRefs.current[6] = el)}
        >
          Share Your Story
        </button>
        <button
          className="cta-btn"
          onClick={() => setShowHistory(true)}
          ref={(el) => (landingRefs.current[7] = el)}
        >
          History of CLO2
        </button>
        <button
          className="cta-btn"
          onClick={() => setShowCourse(true)}
          ref={(el) => (landingRefs.current[8] = el)}
        >
          ClO₂ Course
        </button>
        <p className="landing-disclaimer" ref={(el) => (landingRefs.current[9] = el)}>
          Disclaimer: Views on this site are for opinion-sharing only. We believe in helping bring people closer to God while healing themselves. We don’t sell products, offer medical advice, or diagnose illness. Information about CLO2 is presented for your consideration only—evaluate it carefully and make your own informed decisions.
        </p>
      </section>

      <section className="why-clo2-section">
        <h2 className="why-clo2-title">Why CLO2?</h2>
        <p className="why-clo2-text">
          Chlorine dioxide (CLO2) has been a quiet hero in water purification for decades—safe enough to treat municipal water supplies, yet powerful enough to tackle pathogens. Some call it a “universal antidote,” claiming it detoxes the body from heavy metals, parasites, and more. Science backs its oxidative power; anecdotes fuel its following. At God’s Detox, we’re not here to sell it—we’re here to explore it. Watch our videos, dig into the course, and see why this simple compound’s got people talking.
        </p>
      </section>

      <section className="article-section">
        <h2 className="article-title">A Message from Bob The Plumber</h2>
        <div className="article-content">
          <p className="article-text">
            Thank you for coming to our website. We pray that you will share it with your friends because we intend to bless you in two distinct ways. God has a detox for both your body and your soul. Physically speaking, chlorine dioxide will kill all the bacteria, toxins, viruses, and fungi in your body and you will enjoy great health, but you will still die and apart from the other detox that God offers you will spend your eternity away from God. So the second detox is far superior to the first because it is eternal.
          </p>
          <p className="article-text">
            So we know that when God created man he created him without sin and for the purpose of having fellowship with God, but Man quickly turned away and chose to go his own way. It seems God had made a covenant with man that as long as man remained sinless he could exist with God forever. Once man sinned, now we have a massive problem on our hands because we have to get rid of our sin in order to be back in God's presence because sin cannot exist in the presence of God. This is a problem that only God could solve.
          </p>
          <p className="article-text">
            So in his mercy, God sent his Son, a member of the godhead, to become a man and live the perfect life that we cannot live. So Jesus came and lived a sinless life and therefore fulfilled the covenant of works on our behalf. He is now willing to exchange his perfection for our sin if we are willing to surrender our lives to him.
          </p>
          <p className="article-text">
            Therefore the second detox that we talk about is the blood of the Lord Jesus Christ shed on Calvary to bring redemption from sin for everyone who will put their faith in him. Cry out to God for mercy and get you a Bible (I recommend the John MacArthur Study Bible) and read it like your life depends on it because it does!
          </p>
          <p className="article-author">— Bob The Plumber</p>
        </div>
      </section>

      <section className="grenon-section">
        <h2 className="grenon-title">God’s Detox: The Grenon Legacy</h2>
        <p className="grenon-text">
          Mark Grenon and his sons—Jonathan, Jordan, and Joseph—stood tall as warriors of faith, wielding chlorine dioxide (ClO₂) to heal where others wouldn’t dare. From Haiti’s slums, they crushed MRSA with this simple compound, saving lives Big Pharma left for dead. Mark, a 47-year missionary, detoxed his own family from flesh-eating bacteria; his boys spread the gospel of ClO₂ through Genesis II Church—until the system locked them up. Their testimony? ClO₂ purges toxins, restores God’s Temple, and spits in the face of tyranny. Watch their story, weigh their truth, and join the fight.
        </p>
        <div className="grenon-gallery">
          <img
            src="https://res.cloudinary.com/dwmnbrjtu/image/upload/v1711308900/g0rpwkyt3poc4lidafas.jpg"
            alt="Mark Grenon - Mission Work"
            className="grenon-gallery-image"
            onClick={() => handleImageClick("https://res.cloudinary.com/dwmnbrjtu/image/upload/v1711308900/g0rpwkyt3poc4lidafas.jpg", "Mark Grenon - Mission Work")}
          />
          <img
            src="https://res.cloudinary.com/dwmnbrjtu/image/upload/v1711308900/o7fzvl6tybthrtc41dsm.jpg"
            alt="Mark Grenon - Preaching"
            className="grenon-gallery-image"
            onClick={() => handleImageClick("https://res.cloudinary.com/dwmnbrjtu/image/upload/v1711308900/o7fzvl6tybthrtc41dsm.jpg", "Mark Grenon - Preaching")}
          />
          <img
            src="https://res.cloudinary.com/dwmnbrjtu/image/upload/v1711308900/zsw5nkpibtrofoqrp66c.jpg"
            alt="Mark Grenon - ClO₂ Advocacy"
            className="grenon-gallery-image"
            onClick={() => handleImageClick("https://res.cloudinary.com/dwmnbrjtu/image/upload/v1711308900/zsw5nkpibtrofoqrp66c.jpg", "Mark Grenon - ClO₂ Advocacy")}
          />
          <img
            src="https://res.cloudinary.com/dwmnbrjtu/image/upload/v1711308900/xcbtqyov9qkd4b6iklat.jpg"
            alt="Mark Grenon - Haiti Healing"
            className="grenon-gallery-image"
            onClick={() => handleImageClick("https://res.cloudinary.com/dwmnbrjtu/image/upload/v1711308900/xcbtqyov9qkd4b6iklat.jpg", "Mark Grenon - Haiti Healing")}
          />
          <img
            src="https://res.cloudinary.com/dwmnbrjtu/image/upload/v1711308900/oafu8llaqw4tkdajcjwj.jpg"
            alt="Mark Grenon - Genesis II Church"
            className="grenon-gallery-image"
            onClick={() => handleImageClick("https://res.cloudinary.com/dwmnbrjtu/image/upload/v1711308900/oafu8llaqw4tkdajcjwj.jpg", "Mark Grenon - Genesis II Church")}
          />
          <img
            src="https://res.cloudinary.com/dwmnbrjtu/image/upload/v1711308900/kkqn5mjpr4lhaljyqrs2.jpg"
            alt="Mark Grenon - Family Detox"
            className="grenon-gallery-image"
            onClick={() => handleImageClick("https://res.cloudinary.com/dwmnbrjtu/image/upload/v1711308900/kkqn5mjpr4lhaljyqrs2.jpg", "Mark Grenon - Family Detox")}
          />
          <img
            src="https://res.cloudinary.com/dwmnbrjtu/image/upload/v1711308900/eio6hta0whqqukwecxq8.jpg"
            alt="Mark Grenon - Faith Warrior"
            className="grenon-gallery-image"
            onClick={() => handleImageClick("https://res.cloudinary.com/dwmnbrjtu/image/upload/v1711308900/eio6hta0whqqukwecxq8.jpg", "Mark Grenon - Faith Warrior")}
          />
          <img
            src="https://res.cloudinary.com/dwmnbrjtu/image/upload/v1711308900/lybbzaposblc5vkbsm3z.jpg"
            alt="Mark Grenon - ClO₂ Demonstration"
            className="grenon-gallery-image"
            onClick={() => handleImageClick("https://res.cloudinary.com/dwmnbrjtu/image/upload/v1711308900/lybbzaposblc5vkbsm3z.jpg", "Mark Grenon - ClO₂ Demonstration")}
          />
          <img
            src="https://res.cloudinary.com/dwmnbrjtu/image/upload/v1711308900/zqhsklenkzrffgb4e7kc.jpg"
            alt="Mark Grenon - Defying Tyranny"
            className="grenon-gallery-image"
            onClick={() => handleImageClick("https://res.cloudinary.com/dwmnbrjtu/image/upload/v1711308900/zqhsklenkzrffgb4e7kc.jpg", "Mark Grenon - Defying Tyranny")}
          />
          <img
            src="https://res.cloudinary.com/dwmnbrjtu/image/upload/v1711308900/yxteplqekhz833bvdfkp.jpg"
            alt="Mark Grenon - Missionary Life"
            className="grenon-gallery-image"
            onClick={() => handleImageClick("https://res.cloudinary.com/dwmnbrjtu/image/upload/v1711308900/yxteplqekhz833bvdfkp.jpg", "Mark Grenon - Missionary Life")}
          />
          <img
            src="https://res.cloudinary.com/dwmnbrjtu/image/upload/v1711308900/wejh7oticxazrdvywhvt.jpg"
            alt="Mark Grenon - Legacy Moment"
            className="grenon-gallery-image"
            onClick={() => handleImageClick("https://res.cloudinary.com/dwmnbrjtu/image/upload/v1711308900/wejh7oticxazrdvywhvt.jpg", "Mark Grenon - Legacy Moment")}
          />
        </div>
        <div className="grenon-timeline">
          {grenonTimeline.map((moment, index) => (
            <div
              key={index}
              className={`timeline-moment ${selectedMoment === index ? 'active' : ''}`}
              onClick={() => handleMomentClick(index)}
            >
              <span className="timeline-year">{moment.year}</span>
              <span className="timeline-title">{moment.title}</span>
              {selectedMoment === index && (
                <div className="timeline-tooltip">{moment.desc}</div>
              )}
            </div>
          ))}
        </div>
        <div className="grenon-book">
          <h3 className="grenon-title">A World Without Dis-Ease by Mark Grenon</h3>
          <p className="grenon-text">
            In <em>A World Without Dis-Ease</em>, Mark Grenon lays out a fearless blueprint for a healthier humanity, rooted in faith and the power of chlorine dioxide (ClO₂). This isn’t just a book—it’s a battle cry against a broken system, blending decades of missionary grit with real-world healing stories. Mark unveils how ClO₂ can detox body and soul, offering a path to reclaim God-given vitality. From Haiti to your hands, it’s his testament to a world free of sickness, where truth triumphs over tyranny. Dive in—his words are as bold as his life.
          </p>
          <div className="book-menu-container">
            <button className="cta-btn book-menu-btn" onClick={toggleBookMenu}>
              Get The Book Now
            </button>
            {isBookMenuOpen && (
              <div className="book-menu">
                <h3 className="book-menu-title">Printed Books</h3>
                <div className="book-item">
                  <a
                    href="https://www.printshopcentral.com/bookstore/book/-imagine-a-world-without-dis-ease-is-it-possible-volume-one"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="book-link"
                  >
                    Volume One
                  </a>
                  <p className="book-description">Explores the foundational concepts of CLO2 and a world free from disease.</p>
                </div>
                <div className="book-item">
                  <a
                    href="https://www.printshopcentral.com/bookstore/book/-imagine-a-world-without-dis-ease-the-genesis-of-the-g2church-volume-two"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="book-link"
                  >
                    Volume Two
                  </a>
                  <p className="book-description">Details the Genesis II Church’s journey and CLO2’s role in healing.</p>
                </div>
                <div className="book-item">
                  <a
                    href="https://www.printshopcentral.com/bookstore/book/a-world-without-dis-ease-the-persecution-is-increasing-but-so-are-the-blessings-"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="book-link"
                  >
                    Volume Three
                  </a>
                  <p className="book-description">Chronicles increasing challenges and blessings in the mission.</p>
                </div>
                <div className="book-item">
                  <a
                    href="https://www.printshopcentral.com/bookstore/book/-imagina-un-mundo-sin-mal-estar-es-posible-"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="book-link"
                  >
                    Spanish Volume One
                  </a>
                  <p className="book-description">Spanish edition of Volume One, introducing CLO2’s potential.</p>
                </div>
                <h3 className="book-menu-title">eBooks</h3>
                <div className="book-item">
                  <a
                    href="https://5187260268767.gumroad.com/l/tsaqy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="book-link"
                  >
                    Volume One (eBook)
                  </a>
                  <p className="book-description">Digital version of the foundational CLO2 exploration.</p>
                </div>
                <div className="book-item">
                  <a
                    href="https://5187260268767.gumroad.com/l/gkwoh"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="book-link"
                  >
                    Volume Two (eBook)
                  </a>
                  <p className="book-description">eBook detailing the Genesis II Church’s story.</p>
                </div>
                <div className="book-item">
                  <a
                    href="https://5187260268767.gumroad.com/l/dlzpc"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="book-link"
                  >
                    Volume Three (eBook)
                  </a>
                  <p className="book-description">Digital edition on persecution and blessings.</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {enlargedImage && (
        <div className="enlarged-image-overlay" onClick={closeEnlargedImage}>
          <img src={enlargedImage.src} alt={enlargedImage.alt} className="enlarged-image" />
          <button className="close-btn" onClick={closeEnlargedImage}>Close</button>
        </div>
      )}

      <section className="testimonials-section">
        <h2 className="testimonials-title">What People Are Saying</h2>
        <div className="testimonials-grid">
          <div className="testimonial-card">
            <p className="testimonial-text">
              “I started using CLO2 after watching a video here. It’s changed how I feel every day—more energy, clearer mind. Thank God for this community!”
            </p>
            <p className="testimonial-author">- Sarah M., Texas</p>
          </div>
          <div className="testimonial-card">
            <p className="testimonial-text">
              “Skeptical at first, but the stories on God’s Detox convinced me to try it. My family’s noticed a difference. Faith and freedom in action.”
            </p>
            <p className="testimonial-author">- John D., Ohio</p>
          </div>
          <div className="testimonial-card">
            <p className="testimonial-text">
              “This site opened my eyes to CLO2. I’ve shared my own video now—it’s amazing to be part of something bigger.”
            </p>
            <p className="testimonial-author">- Maria L., California</p>
          </div>
        </div>
      </section>

      <section className="faq-section">
        <h2 className="faq-title">Frequently Asked Questions</h2>
        <div className="faq-list">
          <div className="faq-item">
            <h3 className="faq-question">What is CLO2?</h3>
            <p className="faq-answer">
              CLO2, or chlorine dioxide, is a chemical compound used globally to purify water. Some believe it has health benefits when used in small, controlled doses.
            </p>
          </div>
          <div className="faq-item">
            <h3 className="faq-question">Is it safe?</h3>
            <p className="faq-answer">
              In water treatment, yes—it’s FDA-approved. For personal use, opinions vary. We share stories, not prescriptions. Research and decide for yourself.
            </p>
          </div>
          <div className="faq-item">
            <h3 className="faq-question">How do I get started?</h3>
            <p className="faq-answer">
              Check out our free CLO2 Course or watch user videos. Start small, stay informed, and join the conversation.
            </p>
          </div>
        </div>
      </section>

      {showHistory && (
        <div className="history-modal">
          <div className="history-content">
            <h2 className="history-title">Chlorine Dioxide: A Brief History</h2>
            <p className="history-text">
              Discovered in 1814 by Sir Humphry Davy, chlorine dioxide (ClO₂) started as a yellowish-green gas with powerful oxidizing properties. Studied through the 19th century, it emerged in the 1900s as a bleaching agent for paper, revolutionizing the industry. By the 1940s, it became a breakthrough in water treatment, disinfecting Niagara Falls’ drinking water. Its eco-friendly profile—producing fewer toxic byproducts—boosted its use in the 1970s-80s for water and industrial applications. Today, ClO₂ is vital for sanitation, food processing, and emergency disinfection, though it’s faced controversy. It’s recently being used as a way to detox your system. From a lab curiosity to a global tool, its story blends innovation with responsibility.
            </p>
            <button className="close-btn" onClick={() => setShowHistory(false)}>
              Close
            </button>
          </div>
        </div>
      )}

      {showCourse && (
        <div className="course-modal">
          <div className="course-content">
            <h2 className="course-title">The Universal Antidote Course: ClO₂ Basics</h2>
            <p className="course-text">
              The Universal Antidote Course is a free, eight-part video series teaching you how to make and use chlorine dioxide (ClO₂), a substance dubbed “The Universal Antidote.” Created by “The Curious Outlier,” it’s rooted in faith and a mission to help people heal. Here’s what you’ll learn:
            </p>
            <ul className="course-list">
              <li><strong>History:</strong> ClO₂’s journey from water purification to health applications, including NASA’s 1987 “universal antidote” claim.</li>
              <li><strong>Making MMS1 (CD):</strong> Mix sodium chlorite with an acid (e.g., 4% hydrochloric or 50% citric) for 30 seconds to release 10% ClO₂ gas. Use orally starting with 1-3 drops.</li>
              <li><strong>Making CDS:</strong> Pure ClO₂ gas dissolved in water, free of residuals, ideal for those sensitive to MMS1.</li>
              <li><strong>Usage:</strong> Start with the MMS Starting Procedure (low doses), then escalate to protocols like 1000 for illness—always with caution.</li>
              <li><strong>Safety:</strong> Use food-grade ingredients, avoid overuse, and consult the free guidebook for detailed steps.</li>
            </ul>
            <p className="course-text">
              Testimonials claim ClO₂ helps with everything from heart issues to cancer, but evidence is anecdotal. Explore the course at <a href="https://theuniversalantidote.com" target="_blank" rel="noopener noreferrer">theuniversalantidote.com</a> and decide for yourself.
            </p>
            <button className="close-btn" onClick={() => setShowCourse(false)}>
              Close
            </button>
          </div>
        </div>
      )}

      <main className="main">
        {user && user.role === 'admin' && (
          <form onSubmit={handleUpload} className="upload-form">
            <input type="file" onChange={(e) => setFile(e.target.files[0])} accept="video/*" required />
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" required />
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Description"
              required
            />
            <button type="submit" className="upload-btn">Upload Video</button>
            {progress > 0 && progress < 100 && (
              <div className="progress-container">
                <div className="progress-bar" style={{ width: `${progress}%` }}>
                  <span className="progress-text">{progress}%</span>
                </div>
              </div>
            )}
          </form>
        )}

        <div className="search-container">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search videos..."
            className="search-input"
          />
        </div>

        <section className="video-grid">
          {loading ? (
            <div className="loader"></div>
          ) : filteredVideos.length === 0 ? (
            videos.length === 0 ? (
              <p className="no-videos">No videos yet—upload some!</p>
            ) : (
              <p className="no-videos">No videos match your search.</p>
            )
          ) : (
            filteredVideos.map((video) => (
              <div key={video._id} className="video-card">
                <ReactPlayer
                  url={video.fileUrl}
                  light={video.thumbnailUrl}
                  width="100%"
                  height="200px"
                  controls
                  lazy={true}
                  onStart={() => handleViewIncrement(video._id)}
                />
                <h2 className="video-title">{video.title}</h2>
                <p className="video-description">{video.description}</p>
                <p className="video-uploader">Uploaded by: {video.uploadedBy}</p>
                <p className="video-views">Views: {video.views || 0}</p>
                <div className="like-section">
                  <button
                    onClick={() => handleLike(video._id)}
                    className={`like-btn ${hasLiked(video) ? 'liked' : ''}`}
                    disabled={hasLiked(video)}
                  >
                    👍 {hasLiked(video) ? 'Liked' : 'Like'}
                  </button>
                  <span className="like-count">Likes: {video.likes || 0}</span>
                </div>
              </div>
            ))
          )}
        </section>
      </main>

      <footer className="footer">
        <p className="footer-text">
          Built by Zachary | © 2025 Bob The Plumber. All rights reserved.
        </p>
        <div className="social-links">
          <a
            href="https://truthsocial.com/@BobThePlumber"
            target="_blank"
            rel="noopener noreferrer"
            className="social-icon"
            title="Truth Social"
          >
            <i className="fab fa-tumblr"></i>
          </a>
          <a
            href="https://x.com/BobsThePlumber"
            target="_blank"
            rel="noopener noreferrer"
            className="social-icon"
            title="X"
          >
            <i className="fab fa-twitter"></i>
          </a>
        </div>
      </footer>

      {showBackToTop && (
        <button
          className="back-to-top-btn"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          ↑ Top
        </button>
      )}
    </div>
  );
}

function App() {
  const [user, setUser] = useState(null);
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [signupUsername, setSignupUsername] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [showHistory, setShowHistory] = useState(false);
  const [showCourse, setShowCourse] = useState(false);
  const [showAuth, setShowAuth] = useState(false);
  const [activeTab, setActiveTab] = useState('login');
  const [progress, setProgress] = useState(0);
  const [enlargedImage, setEnlargedImage] = useState(null);
  const [isBookMenuOpen, setIsBookMenuOpen] = useState(false);
  const [selectedMoment, setSelectedMoment] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showBackToTop, setShowBackToTop] = useState(false);
  const canvasRef = useRef(null);
  const titleRef = useRef(null);
  const landingRefs = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    let animationFrameId;

    const resizeCanvas = () => {
      if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const stars = Array.from({ length: 50 }, () => ({
      x: Math.random() * (canvas?.width || window.innerWidth),
      y: Math.random() * (canvas?.height || window.innerHeight),
      radius: Math.random() * 1.5 + 0.5,
      alpha: Math.random() * 0.5 + 0.5,
    }));

    const getScaledPoints = (basePoints, width, height) => {
      return basePoints.map(([x, y]) => [
        (x / 1000) * width,
        (y / 800) * height,
      ]);
    };

    const constellations = [
      {
        points: getScaledPoints(
          [[300, 200], [350, 200], [400, 200], [350, 250], [350, 300]],
          canvas?.width || window.innerWidth,
          canvas?.height || window.innerHeight
        ),
        color: '#d4af37',
      },
      {
        points: getScaledPoints(
          [[600, 400], [650, 350], [700, 350], [750, 400], [800, 450], [850, 500], [900, 550]],
          canvas?.width || window.innerWidth,
          canvas?.height || window.innerHeight
        ),
        color: '#ffffff',
      },
    ];

    const animate = () => {
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        stars.forEach((star) => {
          ctx.beginPath();
          ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 255, 255, ${star.alpha})`;
          ctx.fill();
          star.alpha += Math.random() * 0.05 - 0.025;
          star.alpha = Math.max(0.5, Math.min(1, star.alpha));
        });

        constellations.forEach((constellation) => {
          ctx.beginPath();
          ctx.strokeStyle = constellation.color;
          ctx.lineWidth = 1;
          constellation.points.forEach(([x, y], i) => (i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y)));
          ctx.stroke();
        });

        animationFrameId = requestAnimationFrame(animate);
      }
    };
    animate();

    const fetchVideos = async () => {
      try {
        const res = await axios.get('/.netlify/functions/videos');
        setVideos(res.data || []);
      } catch (err) {
        console.error('Fetch videos error:', err.response?.data || err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchVideos();

    const title = titleRef.current;
    if (title) {
      const letters = "God’s Detox"
        .split('')
        .map((char) => `<span class="letter">${char}</span>`)
        .join('');
      title.innerHTML = letters;

      gsap.from('.letter', {
        duration: 1,
        opacity: 0,
        y: 50,
        stagger: 0.05,
        ease: 'power2.out',
        onComplete: () => {
          gsap.set('.letter', { y: 0, opacity: 1, clearProps: 'all' });
        },
      });
    }

    if (landingRefs.current.length) {
      gsap.from(landingRefs.current, {
        duration: 1,
        opacity: 0,
        y: 30,
        stagger: 0.2,
        ease: 'power2.out',
        delay: 0.5,
      });
    }

    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 200);
    };
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('scroll', handleScroll);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/.netlify/functions/login', { username, password });
      setUser(res.data.user);
      setUsername('');
      setPassword('');
      setShowAuth(false);
    } catch (err) {
      alert('Login failed—check your credentials!');
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/.netlify/functions/signup', { username: signupUsername, password: signupPassword });
      alert('Signup successful! Please log in.');
      setSignupUsername('');
      setSignupPassword('');
      setActiveTab('login');
    } catch (err) {
      alert('Signup failed—username might be taken!');
    }
  };

  const handleLogout = async () => {
    try {
      await axios.get('/.netlify/functions/logout');
      setUser(null);
    } catch (err) {
      alert('Logout failed—try again!');
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!user) return alert('Please log in to upload videos!');
    if (!file) return alert('Please select a video file!');

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'video-vault-preset');

    try {
      const res = await axios.post('https://api.cloudinary.com/v1_1/dwmnbrjtu/video/upload', formData, {
        onUploadProgress: (progressEvent) => {
          const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          setProgress(percent);
        },
      });

      const videoData = {
        title,
        description,
        fileUrl: res.data.secure_url,
        thumbnailUrl: res.data.secure_url.replace('/upload/', '/upload/f_auto,q_auto,w_320,h_240/'),
        uploadedBy: user.username,
      };

      await axios.post('/.netlify/functions/videos', videoData);
      setFile(null);
      setTitle('');
      setDescription('');
      setProgress(0);
      const videosRes = await axios.get('/.netlify/functions/videos');
      setVideos(videosRes.data || []);
      alert('Video uploaded successfully!');
    } catch (err) {
      console.error('Upload error:', err.response?.data || err.message);
      alert('Upload failed—check your file or permissions!');
      setProgress(0);
    }
  };

  const handleViewIncrement = async (id) => {
    try {
      const res = await axios.put('/.netlify/functions/videos', { id });
      setVideos((prevVideos) =>
        prevVideos.map((video) => (video._id === id ? { ...video, views: res.data.views } : video))
      );
    } catch (err) {
      console.error('View increment error:', err.response?.data || err.message);
    }
  };

  const handleLike = async (id) => {
    if (!user) {
      alert('Please log in to like videos!');
      return;
    }

    try {
      const res = await axios.put('/.netlify/functions/videos', {
        id,
        userId: user._id,
        action: 'like',
      });

      setVideos((prevVideos) =>
        prevVideos.map((video) =>
          video._id === id
            ? {
                ...video,
                likes: res.data.likes !== undefined ? res.data.likes : (video.likes || 0) + 1,
                likedBy: res.data.likedBy || [...(video.likedBy || []), user._id],
              }
            : video
        )
      );
    } catch (err) {
      console.error('Like error:', err.response?.data || err.message);
      if (err.response?.status === 403) {
        alert('You’ve already liked this video!');
      } else {
        alert('Failed to like video—try again later!');
        const videosRes = await axios.get('/.netlify/functions/videos');
        setVideos(videosRes.data || []);
      }
    }
  };

  const hasLiked = (video) => {
    return user && video.likedBy && Array.isArray(video.likedBy) && video.likedBy.includes(user._id);
  };

  const handleImageClick = (src, alt) => {
    setEnlargedImage({ src, alt });
  };

  const closeEnlargedImage = () => {
    setEnlargedImage(null);
  };

  const toggleBookMenu = () => {
    setIsBookMenuOpen(!isBookMenuOpen);
  };

  const handleMomentClick = (index) => {
    setSelectedMoment(index === selectedMoment ? null : index);
  };

  const grenonTimeline = [
    { year: "1980s", title: "Haiti Mission Begins", desc: "Mark steps into the slums, healing with faith and grit." },
    { year: "2010", title: "Genesis II Church Founded", desc: "The Grenons launch a ClO₂ revolution." },
    { year: "2015", title: "Haiti MRSA Victory", desc: "ClO₂ crushes flesh-eaters—lives saved." },
    { year: "2020", title: "Facing Tyranny", desc: "System strikes back; Grenons stand firm." },
  ];

  const filteredVideos = videos.filter(video =>
    (video.title || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (video.description || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedVideos = [...videos].sort((a, b) => (b.views || 0) - (a.views || 0));
  const featuredVideo = sortedVideos.length > 0 ? sortedVideos[0] : null;

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <HomePage
              user={user}
              videos={videos}
              loading={loading}
              file={file}
              title={title}
              description={description}
              username={username}
              password={password}
              signupUsername={signupUsername}
              signupPassword={signupPassword}
              showHistory={showHistory}
              showCourse={showCourse}
              showAuth={showAuth}
              activeTab={activeTab}
              progress={progress}
              enlargedImage={enlargedImage}
              isBookMenuOpen={isBookMenuOpen}
              selectedMoment={selectedMoment}
              searchTerm={searchTerm}
              showBackToTop={showBackToTop}
              setUser={setUser}
              setVideos={setVideos}
              setLoading={setLoading}
              setFile={setFile}
              setTitle={setTitle}
              setDescription={setDescription}
              setUsername={setUsername}
              setPassword={setPassword}
              setSignupUsername={setSignupUsername}
              setSignupPassword={setSignupPassword}
              setShowHistory={setShowHistory}
              setShowCourse={setShowCourse}
              setShowAuth={setShowAuth}
              setActiveTab={setActiveTab}
              setProgress={setProgress}
              setEnlargedImage={setEnlargedImage}
              setIsBookMenuOpen={setIsBookMenuOpen}
              setSelectedMoment={setSelectedMoment}
              setSearchTerm={setSearchTerm}
              setShowBackToTop={setShowBackToTop}
              canvasRef={canvasRef}
              titleRef={titleRef}
              landingRefs={landingRefs}
              handleLogin={handleLogin}
              handleSignup={handleSignup}
              handleLogout={handleLogout}
              handleUpload={handleUpload}
              handleViewIncrement={handleViewIncrement}
              handleLike={handleLike}
              hasLiked={hasLiked}
              handleImageClick={handleImageClick}
              closeEnlargedImage={closeEnlargedImage}
              toggleBookMenu={toggleBookMenu}
              handleMomentClick={handleMomentClick}
              filteredVideos={filteredVideos}
              sortedVideos={sortedVideos}
              featuredVideo={featuredVideo}
            />
          }
        />
        <Route path="/drkory" element={<DrKoryPage />} />
        <Route path="/about" element={<AboutPage />} />
      </Routes>
    </Router>
  );
}

export default App;