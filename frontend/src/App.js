import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import ReactPlayer from 'react-player';
import { gsap } from 'gsap';
import { BrowserRouter as Router, Route, Routes, useNavigate, useLocation } from 'react-router-dom';
import DrKoryPage from './DrKoryPage';
import AboutPage from './AboutPage';
import GrenonPage from './GrenonPage';
import VideosPage from './VideosPage';
import ArticlesPage from './ArticlesPage';
import StarryBackground from './StarryBackground';
import './App.css';

function HomePage({ user, videos, loading, file, title, description, username, password, signupUsername, signupPassword, showHistory, showCourse, showAuth, activeTab, progress, enlargedImage, isBookMenuOpen, selectedMoment, searchTerm, showBackToTop, setUser, setVideos, setLoading, setFile, setTitle, setDescription, setUsername, setPassword, setSignupUsername, setSignupPassword, setShowHistory, setShowCourse, setShowAuth, setActiveTab, setProgress, setEnlargedImage, setIsBookMenuOpen, setSelectedMoment, setSearchTerm, setShowBackToTop, titleRef, landingRefs, handleLogin, handleSignup, handleLogout, handleUpload, handleViewIncrement, handleLike, hasLiked, handleImageClick, closeEnlargedImage, toggleBookMenu, handleMomentClick, sortedVideos, featuredVideo }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [isNavMenuOpen, setIsNavMenuOpen] = useState(false);
  const [showEternalModal, setShowEternalModal] = useState(false); // New state for the modal

  const pageNames = {
    '/': 'Home',
    '/drkory': 'Dr. Kory',
    '/about': 'About',
    '/videos': 'Videos',
    '/grenon': 'Grenon',
    '/articles': 'Articles',
  };
  const currentPage = pageNames[location.pathname] || 'Menu';

  const toggleNavMenu = () => setIsNavMenuOpen(!isNavMenuOpen);

  return (
    <div className="app">
      <StarryBackground />
      <div className="rotating-text-background">God’s Detox</div>

      <header className="header">
        <h1 ref={titleRef} className="title">God’s Detox</h1>
        <p className="subtitle">Presented by Bob The Plumber</p>
        <nav className="navbar">
          <div className="desktop-nav">
            <button className="auth-btn" onClick={() => navigate('/')}>Home</button>
            <button className="auth-btn" onClick={() => navigate('/drkory')}>Dr. Kory</button>
            <button className="auth-btn" onClick={() => navigate('/about')}>About</button>
            <button className="auth-btn" onClick={() => navigate('/videos')}>Videos</button>
            <button className="auth-btn" onClick={() => navigate('/grenon')}>Grenon</button>
            <button className="auth-btn" onClick={() => navigate('/articles')}>Articles</button>
          </div>

          <div className="mobile-nav">
            <button className="nav-menu-btn" onClick={toggleNavMenu}>
              Menu: {currentPage}
            </button>
            {isNavMenuOpen && (
              <div className="nav-menu">
                {Object.entries(pageNames).map(([path, name]) => (
                  <button
                    key={path}
                    className={`nav-menu-item ${location.pathname === path ? 'active' : ''}`}
                    onClick={() => {
                      navigate(path);
                      setIsNavMenuOpen(false);
                    }}
                  >
                    {name}
                  </button>
                ))}
              </div>
            )}
          </div>
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

      <main className="quadrants-container">
        {featuredVideo && (
          <section className="quadrant featured-section">
            <h2 className="featured-title">Featured Video</h2>
            <div className="featured-video">
              <ReactPlayer
                url={featuredVideo.fileUrl}
                light={featuredVideo.thumbnailUrl}
                width="100%"
                height="150px"
                controls
                onStart={() => handleViewIncrement(featuredVideo._id)}
              />
              <h3 className="video-title">{featuredVideo.title}</h3>
              <button className="cta-btn" onClick={() => navigate('/videos')}>Watch More</button>
            </div>
          </section>
        )}

        <section className="quadrant landing-section">
          <h2 className="landing-title" ref={(el) => (landingRefs.current[0] = el)}>Welcome</h2>
          <p className="landing-text">
            Faith meets transformation with CLO2—a powerful detox solution.
          </p>
          <div className="button-group">
            <button className="cta-btn" onClick={() => (window.location.href = 'mailto:zacharystreamingdba@gmail.com')}>Share Your Story</button>
            <button className="cta-btn" onClick={() => navigate('/about')}>Learn More</button>
          </div>
        </section>

        <section className="quadrant why-clo2-section">
          <h2 className="why-clo2-title">Why CLO2?</h2>
          <p className="why-clo2-text">
            A safe, powerful hero in water purification for decades.
          </p>
          <button className="cta-btn" onClick={() => navigate('/articles')}>Dive Deeper</button>
        </section>

        <section className="quadrant article-section">
          <h2 className="article-title">Bob’s Message</h2>
          <p className="article-text">
            “CLO2 for your body, Jesus for your soul.”
          </p>
          <button className="cta-btn" onClick={() => navigate('/about')}>Read More</button>
        </section>

        <section className="quadrant testimonials-section">
          <h2 className="testimonials-title">Testimonials</h2>
          <div className="testimonials-grid">
            <p className="testimonial-text">“More energy every day!”</p>
            <p className="testimonial-author">- Sarah M.</p>
          </div>
          <button className="cta-btn" onClick={() => navigate('/videos')}>See Stories</button>
        </section>

        <section className="quadrant history-section">
          <h2 className="history-title">CLO2 History</h2>
          <p className="history-text">
            Discovered in 1814, a powerful oxidizer.
          </p>
          <button className="cta-btn" onClick={() => setShowHistory(true)}>Explore History</button>
        </section>

        <section className="quadrant course-section">
          <h2 className="course-title">ClO₂ Course</h2>
          <p className="course-text">
            Free 8-part series on making ClO₂.
          </p>
          <button className="cta-btn" onClick={() => setShowCourse(true)}>Start Learning</button>
        </section>

        {/* New Section: Eternal Big Picture Teaser with Glowing Button */}
        <section className="quadrant eternal-picture-section">
          <h2 className="landing-title">The Eternal Big Picture</h2>
          <p className="landing-text">
            Discover the foundational truth of God’s Detox: spiritual cleansing through the Word of God, repentance, and the Gospel of Jesus Christ.
          </p>
          <button className="cta-btn glowing-btn" onClick={() => setShowEternalModal(true)}>
            Explore Eternity
          </button>
        </section>
      </main>

      {/* New Modal: Eternal Big Picture */}
      {showEternalModal && (
        <div className="eternal-modal">
          <div className="eternal-content">
            <h2 className="eternal-title">The Eternal Big Picture</h2>
            <div className="eternal-scrollable">
              <p className="eternal-text">
                The foundational TRUTH of “God’s Detox.com” is that man needs to be Spiritually cleansed (detoxed) by the Word of God. And that can ONLY happen by repenting and believing the Gospel of Jesus, which allows ANY man or woman to enter into His Kingdom for eternity through the blood sacrifice of the Christ!
              </p>
              <p className="eternal-text">
                If there is an eternity—and I am speaking rhetorically and foolishly—then this life in the light of that eternity can’t even be put on a graph to be seen, i.e., the time of this life is so rare in the light of eternity that every minute should be carefully lived! So, let’s go back to the real beginning, and that is the beginning of Creation, which is the real reality that we all need to focus on in this life.
              </p>
              <blockquote className="scripture">
                “In the beginning God created the heaven and the earth.” — Genesis 1:1 KJV
              </blockquote>
              <p className="eternal-text">
                Yes, I am going to the Word of God, Who is the Creator of all, and I will not be debating here whether the Scriptures are the real truth or not but accept it as just self-evident. And that is real Biblical faith based in the real facts of eternity, which are based upon more evidence than man can even number! That is another story we will be covering later.
              </p>
              <blockquote className="scripture">
                “Now faith is the substance of things hoped for, the evidence of things not seen.” — Hebrews 11:1 KJV
              </blockquote>
              <p className="eternal-text">
                Not only does God’s Word tell us that God created all things, but He did it by His Word, which is NOT just a spoken Word, but a person called “The Word”!
              </p>
              <blockquote className="scripture">
                “In the beginning was the Word, and the Word was with God, and the Word was God. The same was in the beginning with God. All things were made by him; and without him was not any thing made that was made.” — John 1:1-3 KJV
              </blockquote>
              <blockquote className="scripture">
                “God, who at sundry times and in divers manners spake in time past unto the fathers by the prophets, Hath in these last days spoken unto us by his Son, whom he hath appointed heir of all things, by whom also he made the worlds;” — Hebrews 1:1-2 KJV
              </blockquote>
              <p className="eternal-text">
                And the birth of The Word is how we date our calendar, based on His birth more than 2,000 years ago, an event foretold in the book of Isaiah:
              </p>
              <blockquote className="scripture">
                “For unto us a child is born, unto us a son is given: and the government shall be upon his shoulder: and his name shall be called Wonderful, Counsellor, The mighty God, The everlasting Father, The Prince of Peace. Of the increase of his government and peace there shall be no end, upon the throne of David, and upon his kingdom, to order it, and to establish it with judgment and with justice from henceforth even for ever. The zeal of the LORD of hosts will perform this.” — Isaiah 9:6-7 KJV
              </blockquote>
              <p className="eternal-text">
                In the beginning, before all that exists was created, there was a King and His Kingdom. And in the end—eternity—there will be that same King and His Kingdom. The Government of God is the ONLY Eternal Government! So, my friends, we are living in the period of time between eternity past and eternity future. This life and what we should be focusing on is described perfectly by the King of this Kingdom in His Divinely Inspired and Eternal Word:
              </p>
              <blockquote className="scripture">
                “For our light affliction, which is but for a moment, worketh for us a far more exceeding and eternal weight of glory; While we look not at the things which are seen, but at the things which are not seen: for the things which are seen are temporal; but the things which are not seen are eternal.” — II Corinthians 4:17-18 KJV
              </blockquote>
              <p className="eternal-text">
                There is a poem that I’ve heard many times but don’t know the author, and it goes like this: <em>“Only one life so soon it will pass, and only what is done for Christ will last!”</em> God, being eternal, set a plan in motion from the very beginning that the Christ, the Messiah of Israel, would come to redeem the world and deliver man from the powers of darkness unto His Kingdom.
              </p>
              <blockquote className="scripture">
                “Who hath delivered us from the power of darkness, and hath translated us into the kingdom of his dear Son, In whom we have redemption through his blood, even the forgiveness of sins: Who is the image of the invisible God, the firstborn of every creature: For by him were all things created, that are in heaven, and that are in earth, visible and invisible, whether they be thrones, or dominions, or principalities, or powers: all things were created by him, and for him: And he is before all things, and by him all things consist.” — Colossians 1:13-17 KJV
              </blockquote>
              <blockquote className="scripture">
                “Before the mountains were brought forth, or ever thou hadst formed the earth and the world, even from everlasting to everlasting, thou art God.” — Psalm 90:2 KJV
              </blockquote>
              <blockquote className="scripture">
                “Then shall the King say unto them on his right hand, Come, ye blessed of my Father, inherit the kingdom prepared for you from the foundation of the world.” — Matthew 25:34 KJV
              </blockquote>
              <blockquote className="scripture">
                “In hope of eternal life, which God, that cannot lie, promised before the world began.” — Titus 1:2 KJV
              </blockquote>
              <blockquote className="scripture">
                “Forasmuch as ye know that ye were not redeemed with corruptible things, as silver and gold, from your vain conversation received by tradition from your fathers; But with the precious blood of Christ, as of a lamb without blemish and without spot: Who verily was foreordained before the foundation of the world, but was manifest in these last times for you.” — I Peter 1:18-20 KJV
              </blockquote>

              <h3 className="eternal-subtitle">Have You Had a Spiritual Birth?</h3>
              <p className="eternal-text">
                Obviously, if you are reading this, you have had a physical birth. But have you had a Spiritual birth? Jesus asked a very religious and spiritual man, a Pharisee who knew the Old Testament well, if he was born again. The man didn’t know what He was talking about and was confused, thinking in the physical realm, the temporal, i.e., this life. Jesus explained it to him, and later in the Scriptures, we see Nicodemus as a believer! Here is what Jesus said to him in John chapter 3:
              </p>
              <blockquote className="scripture">
                “There was a man of the Pharisees, named Nicodemus, a ruler of the Jews: The same came to Jesus by night, and said unto him, Rabbi, we know that thou art a teacher come from God: for no man can do these miracles that thou doest, except God be with him. Jesus answered and said unto him, Verily, verily, I say unto thee, Except a man be born again, he cannot see the kingdom of God. Nicodemus saith unto him, How can a man be born when he is old? can he enter the second time into his mother's womb, and be born? Jesus answered, Verily, verily, I say unto thee, Except a man be born of water and of the Spirit, he cannot enter into the kingdom of God. That which is born of the flesh is flesh; and that which is born of the Spirit is spirit. Marvel not that I said unto thee, Ye must be born again. The wind bloweth where it listeth, and thou hearest the sound thereof, but canst not tell whence it cometh, and whither it goeth: so is every one that is born of the Spirit.” — John 3:1-8 KJV
              </blockquote>
              <blockquote className="scripture">
                “Being born again, not of corruptible seed, but of incorruptible, by the word of God, which liveth and abideth for ever.” — I Peter 1:18-23 KJV
              </blockquote>
              <blockquote className="scripture">
                “But when the fulness of the time was come, God sent forth his Son, made of a woman, made under the law, To redeem them that were under the law, that we might receive the adoption of sons. And because ye are sons, God hath sent forth the Spirit of his Son into your hearts, crying, Abba, Father. Wherefore thou art no more a servant, but a son; and if a son, then an heir of God through Christ.” — Galatians 4:5-7 KJV
              </blockquote>
              <p className="eternal-text">
                You see, God has promised to all those that are born spiritually to one day be part of His Kingdom. Just because you say you have been born again doesn’t necessarily mean you are born again. There are a lot of professing “Christians” that are “serving” the Lord Jesus that are NOT his sons and daughters, i.e., not been born of His Spirit. But wait a minute, you say, how can that even be possible? Well, let me show you those that were “serving Jesus” and perished for eternity, then I’ll explain the reason why that could happen and, in the light of that explanation, why I believe a great majority of so-called Christian workers, including pastors, missionaries, deacons, and preachers—never mind those that do nothing to serve the Lord in their life—are NOT known to Jesus!
              </p>
              <p className="eternal-text">
                Jesus was teaching a large group of followers on a mountain at the Sea of Galilee. In the book of Matthew chapters 5-7, Jesus covered many wonderful truths from the Scriptures, but at the end of His sermon in chapter 7, He taught some pretty profound and disturbing things that many don’t want to hear or believe today! Listen to His words, my friends, because they are Truth and Life, which will determine where the majority of all that have lived since Jesus was sacrificed for all the sins of the world as the Lamb of God will spend eternity!
              </p>
              <p className="eternal-text">
                Let’s look at two groups of people in verses 13-14. The first group is the majority, and the other group is the minority.
              </p>
              <blockquote className="scripture">
                “Enter ye in at the strait gate: for wide is the gate, and broad is the way, that leadeth to destruction, and many there be which go in thereat: Because strait is the gate, and narrow is the way, which leadeth unto life, and few there be that find it.” — Matthew 7:13-14 KJV
              </blockquote>
              <p className="eternal-text">
                Jesus just stated that the way to life is a narrow way, i.e., a way that God chose and NOT the way that man chooses. Man chooses to believe what he wants to believe about how to come to God that is good enough for him, especially if he is sincere, but he can be sincerely wrong!
              </p>
              <blockquote className="scripture">
                “There is a way that seemeth right unto a man, but the end thereof are the ways of death.” — Proverbs 16:25 KJV
              </blockquote>
              <blockquote className="scripture">
                “For what shall it profit a man, if he shall gain the whole world, and lose his own soul?” — Mark 8:36 KJV
              </blockquote>
              <p className="eternal-text">
                You see, the majority can believe something that isn’t true, but they feel comfortable because “everyone believes it.” Many today trust their good works, religion, baptism, prayers, angels, holiness, fame, their own made-up belief system, and even money, but none of that will save their soul! But the Lord said the majority of man’s belief will bring them to destruction! Jesus said it is a narrow way that God established to life! Jesus was very clear in John 14 that He is the ONLY way to God!
              </p>
              <blockquote className="scripture">
                “Jesus saith unto him, I am the way, the truth, and the life: no man cometh unto the Father, but by me.” — John 14:6 KJV
              </blockquote>
              <blockquote className="scripture">
                “For by grace are ye saved through faith; and that not of yourselves: it is the gift of God: Not of works, lest any man should boast.” — Ephesians 2:8-9 KJV
              </blockquote>
              <p className="eternal-text">
                The teaching of the Broad and Narrow ways applies to all those that were there listening to Jesus as well as to all mankind. Now, let us look at the followers of Jesus that would come and will stand before Him one day to be judged. This may surprise many of you because you might be in this category.
              </p>
              <blockquote className="scripture">
                “Not every one that saith unto me, Lord, Lord, shall enter into the kingdom of heaven; but he that doeth the will of my Father which is in heaven. Many will say to me in that day, Lord, Lord, have we not prophesied in thy name? and in thy name have cast out devils? and in thy name done many wonderful works? And then will I profess unto them, I never knew you: depart from me, ye that work iniquity.” — Matthew 7:21-23 KJV
              </blockquote>
              <p className="eternal-text">
                Look at what is being said here by Jesus about a future time when He will judge all mankind, and there will be many that come to Him thinking they were serving Him, and He does not even know them! Of course, He knows who they are, but does not know them as His sons and daughters! It was not that they did not know who Jesus was because they were doing things in His name and calling Him their Lord, but He did not know them! These were those that were taking an active part in “serving” the Lord, but He did not know them. And it was not a few but many! So how could this have happened? There is one word that is mentioned many times in the Scriptures that I believe is the reason that this horrible incident will occur one day, and that word is: REPENTANCE!
              </p>

              <h3 className="eternal-subtitle">The Importance of Repentance</h3>
              <p className="eternal-text">
                In today’s pulpits around the world, the preaching of repentance and what it means is NOT being taught because it is unpopular. It turns people away, and pastors want crowds to come to hear them, not turn people away. It is NOT conducive to Church growth! Yet, it is mentioned in the Old and New Testaments frequently. Revivals have broken out from the 1st century early believers and throughout history when people repented.
              </p>
              <p className="eternal-text">
                So, what does the word “repent” or “repentance” mean? Is it a simple definition? In Hebrew, it means: “to turn back” (hence, away), to head in a different direction! In Greek: “to think differently.” The result is to act differently also! According to the Noah Webster 1828 Dictionary: To change the mind, to sorrow or be pained for sin. The result is a person thinks differently about what sin is and changes!
              </p>
              <p className="eternal-text">
                This is why you’ll see the Scriptures say, “bring forth or show fruit that you have repented by a changed life!”
              </p>
              <blockquote className="scripture">
                “Therefore if any man be in Christ, he is a new creature: old things are passed away; behold, all things are become new.” — II Corinthians 5:17 KJV
              </blockquote>
              <p className="eternal-text">
                Here are a few Scriptures on repentance:
              </p>
              <ul className="scripture-list">
                <li>Ezekiel 14:6 — “Therefore say unto the house of Israel, Thus saith the Lord GOD; Repent, and turn yourselves from your idols; and turn away your faces from all your abominations.”</li>
                <li>Ezekiel 18:30 — “Therefore I will judge you, O house of Israel, every one according to his ways, saith the Lord GOD. Repent, and turn yourselves from all your transgressions; so iniquity shall not be your ruin.”</li>
                <li>Matthew 3:2 — “And saying, Repent ye: for the kingdom of heaven is at hand.”</li>
                <li>Matthew 4:17 — “From that time Jesus began to preach, and to say, Repent: for the kingdom of heaven is at hand.”</li>
                <li>Mark 1:15 — “And saying, The time is fulfilled, and the kingdom of God is at hand: repent ye, and believe the gospel.”</li>
                <li>Luke 13:3 — “I tell you, Nay: but, except ye repent, ye shall all likewise perish.”</li>
                <li>Acts 3:19 — “Repent ye therefore, and be converted, that your sins may be blotted out, when the times of refreshing shall come from the presence of the Lord;”</li>
                <li>Acts 17:30 — “And the times of this ignorance God winked at; but now commandeth all men every where to repent:”</li>
                <li>Revelation 3:19 — “As many as I love, I rebuke and chasten: be zealous therefore, and repent.”</li>
              </ul>
              <p className="eternal-text">
                And on the fruit of repentance:
              </p>
              <ul className="scripture-list">
                <li>Matthew 3:8 — “Bring forth therefore fruits meet for repentance:”</li>
                <li>Matthew 9:13 — “But go ye and learn what that meaneth, I will have mercy, and not sacrifice: for I am not come to call the righteous, but sinners to repentance.”</li>
                <li>Luke 15:7 — “I say unto you, that likewise joy shall be in heaven over one sinner that repenteth, more than over ninety and nine just persons, which need no repentance.”</li>
                <li>Acts 20:21 — “Testifying both to the Jews, and also to the Greeks, repentance toward God, and faith toward our Lord Jesus Christ.”</li>
                <li>II Corinthians 7:10 — “For godly sorrow worketh repentance to salvation not to be repented of: but the sorrow of the world worketh death.”</li>
                <li>II Peter 3:9 — “The Lord is not slack concerning his promise, as some men count slackness; but is longsuffering to us-ward, not willing that any should perish, but that all should come to repentance.”</li>
              </ul>
              <p className="eternal-text">
                You see from the above verse in II Peter 3:9 that the Lord wants all to repent, or they will perish! Jesus came to call sinners to repentance. Repentance and belief in the Gospel is the way a man or woman is saved, period.
              </p>
              <blockquote className="scripture">
                “Moreover, brethren, I declare unto you the gospel which I preached unto you, which also ye have received, and wherein ye stand; By which also ye are saved, if ye keep in memory what I preached unto you, unless ye have believed in vain. For I delivered unto you first of all that which I also received, how that Christ died for our sins according to the scriptures; And that he was buried, and that he rose again the third day according to the scriptures:” — I Corinthians 15:1-4 KJV
              </blockquote>
              <p className="eternal-text">
                The Gospel is the “power of God”!
              </p>
              <blockquote className="scripture">
                “For I am not ashamed of the gospel of Christ: for it is the power of God unto salvation to every one that believeth; to the Jew first, and also to the Greek. For therein is the righteousness of God revealed from faith to faith: as it is written, The just shall live by faith.” — Romans 1:16 KJV
              </blockquote>
              <blockquote className="scripture">
                “For the preaching of the cross is to them that perish foolishness; but unto us which are saved it is the power of God. For it is written, I will destroy the wisdom of the wise, and will bring to nothing the understanding of the prudent. Where is the wise? where is the scribe? where is the disputer of this world? hath not God made foolish the wisdom of this world? For after that in the wisdom of God the world by wisdom knew not God, it pleased God by the foolishness of preaching to save them that believe.” — I Corinthians 1:18-21 KJV
              </blockquote>

              <h3 className="eternal-subtitle">How to Come to God for Salvation?</h3>
              <p className="eternal-text">
                No one comes to God unless they seek Him, and if they do, He promises they will find Him! If you are NOT seeking His salvation His way, then you won’t find it. It will only be found in His Word, not any religion, philosophy, tradition, or spiritual belief, etc. You can ONLY be born again by the Word of God.
              </p>
              <blockquote className="scripture">
                “Being born again, not of corruptible seed, but of incorruptible, by the word of God, which liveth and abideth for ever.” — I Peter 1:23 KJV
              </blockquote>
              <blockquote className="scripture">
                “…for the LORD searcheth all hearts, and understandeth all the imaginations of the thoughts: if thou seek him, he will be found of thee; but if thou forsake him, he will cast thee off for ever.” — I Chronicles 28:9 KJV
              </blockquote>
              <blockquote className="scripture">
                “And ye shall seek me, and find me, when ye shall search for me with all your heart.” — Jeremiah 29:13 KJV
              </blockquote>
              <blockquote className="scripture">
                “Seek ye the LORD while he may be found, call ye upon him while he is near.” — Isaiah 55:6 KJV
              </blockquote>
              <blockquote className="scripture">
                “And hath made of one blood all nations of men for to dwell on all the face of the earth, and hath determined the times before appointed, and the bounds of their habitation; That they should seek the Lord, if haply they might feel after him, and find him, though he be not far from every one of us:” — Acts 17:26-27 KJV
              </blockquote>
              <p className="eternal-text">
                Repentance is essential for the Lord to give the gift of Salvation to any man or woman. Without repentance toward God, a man or woman will perish for eternity! Repentance is a change of mind of what you believe about Salvation, Sin, and putting complete trust and belief in the precious blood sacrifice of the Lamb of God for your sin, the Gospel. His death, burial, and resurrection from the dead for all your sins—past, present, and future. He became sin for all man.
              </p>
              <blockquote className="scripture">
                “For he hath made him to be sin for us, who knew no sin; that we might be made the righteousness of God in him.” — II Corinthians 5:21 KJV
              </blockquote>
              <blockquote className="scripture">
                “And saying, The time is fulfilled, and the kingdom of God is at hand: repent ye, and believe the gospel.” — Mark 1:15 KJV
              </blockquote>
              <blockquote className="scripture">
                “I tell you, Nay: but, except ye repent, ye shall all likewise perish.” — Luke 13:3 KJV
              </blockquote>
              <blockquote className="scripture">
                “Repent ye therefore, and be converted, that your sins may be blotted out, when the times of refreshing shall come from the presence of the Lord;” — Acts 3:19 KJV
              </blockquote>
              <blockquote className="scripture">
                “I came not to call the righteous, but sinners to repentance.” — Luke 5:32 KJV
              </blockquote>
              <blockquote className="scripture">
                “I say unto you, that likewise joy shall be in heaven over one sinner that repenteth, more than over ninety and nine just persons, which need no repentance.” — Luke 15:7 KJV
              </blockquote>
              <blockquote className="scripture">
                “The Lord is not slack concerning his promise, as some men count slackness; but is longsuffering to us-ward, not willing that any should perish, but that all should come to repentance.” — II Peter 3:9 KJV
              </blockquote>
              <p className="eternal-text">
                After seeking God and being willing to repent, now the heart is ready to call upon Him for salvation and receive it FREELY!
              </p>
              <blockquote className="scripture">
                “But as many as received him, to them gave he power to become the sons of God, even to them that believe on his name: Which were born, not of blood, nor of the will of the flesh, nor of the will of man, but of God.” — John 1:12-13 KJV
              </blockquote>
              <blockquote className="scripture">
                “That if thou shalt confess with thy mouth the Lord Jesus, and shalt believe in thine heart that God hath raised him from the dead, thou shalt be saved. For with the heart man believeth unto righteousness; and with the mouth confession is made unto salvation. For the scripture saith, Whosoever believeth on him shall not be ashamed. For there is no difference between the Jew and the Greek: for the same Lord over all is rich unto all that call upon him. For whosoever shall call upon the name of the Lord shall be saved.” — Romans 10:9-13 KJV
              </blockquote>
              <blockquote className="scripture">
                “Call unto me, and I will answer thee, and shew thee great and mighty things, which thou knowest not.” — Jeremiah 33:3 KJV
              </blockquote>
              <p className="eternal-text">
                True repentance is shown by a changed life!
              </p>
              <blockquote className="scripture">
                “Therefore if any man be in Christ, he is a new creature: old things are passed away; behold, all things are become new.” — II Corinthians 5:17 KJV
              </blockquote>
              <p className="eternal-text">
                If you need spiritual help, please contact Bishop Mark Grenon at: <a href="mailto:WDGSAI@proton.me" className="contact-link">WDGSAI@proton.me</a> (What Does God Say About It). <br />
                — Bishop Mark Grenon, Proverbs 3:5-6
              </p>
            </div>
            <button className="close-btn" onClick={() => setShowEternalModal(false)}>Close</button>
          </div>
        </div>
      )}

      {/* Existing Modals */}
      {showAuth && (
        <div className="auth-modal">
          <div className="auth-content">
            <h2 className="auth-title">Authentication</h2>
            <div className="auth-tabs">
              <button className={`tab-btn ${activeTab === 'login' ? 'active' : ''}`} onClick={() => setActiveTab('login')}>Login</button>
              <button className={`tab-btn ${activeTab === 'signup' ? 'active' : ''}`} onClick={() => setActiveTab('signup')}>Signup</button>
            </div>
            {activeTab === 'login' ? (
              <form onSubmit={handleLogin} className="auth-form">
                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" required />
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
                <button type="submit" className="submit-btn">Login</button>
              </form>
            ) : (
              <form onSubmit={handleSignup} className="auth-form">
                <input type="text" value={signupUsername} onChange={(e) => setSignupUsername(e.target.value)} placeholder="Choose Username" required />
                <input type="password" value={signupPassword} onChange={(e) => setSignupPassword(e.target.value)} placeholder="Choose Password" required />
                <button type="submit" className="submit-btn">Signup</button>
              </form>
            )}
            <button className="close-btn" onClick={() => setShowAuth(false)}>Close</button>
          </div>
        </div>
      )}

      {showHistory && (
        <div className="history-modal">
          <div className="history-content">
            <h2 className="history-title">Chlorine Dioxide: A Brief History</h2>
            <p className="history-text">
              Discovered in 1814 by Sir Humphry Davy, chlorine dioxide (ClO₂) started as a yellowish-green gas with powerful oxidizing properties.
            </p>
            <button className="close-btn" onClick={() => setShowHistory(false)}>Close</button>
          </div>
        </div>
      )}

      {showCourse && (
        <div className="course-modal">
          <div className="course-content">
            <h2 className="course-title">The Universal Antidote Course: ClO₂ Basics</h2>
            <p className="course-text">
              A free, eight-part video series teaching you how to make and use chlorine dioxide (ClO₂). Explore it at <a href="https://theuniversalantidote.com" target="_blank" rel="noopener noreferrer">theuniversalantidote.com</a>.
            </p>
            <button className="close-btn" onClick={() => setShowCourse(false)}>Close</button>
          </div>
        </div>
      )}

      {user && user.role === 'admin' && (
        <section className="upload-section">
          <form onSubmit={handleUpload} className="upload-form">
            <input type="file" onChange={(e) => setFile(e.target.files[0])} accept="video/*" required />
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" required />
            <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" required />
            <button type="submit" className="upload-btn">Upload Video</button>
            {progress > 0 && progress < 100 && (
              <div className="progress-container">
                <div className="progress-bar" style={{ width: `${progress}%` }}>
                  <span className="progress-text">{progress}%</span>
                </div>
              </div>
            )}
          </form>
        </section>
      )}

      <footer className="footer">
        <p className="footer-text">Built by Zachary | © 2025 Bob The Plumber. All rights reserved.</p>
        <div className="social-links">
          <a href="https://truthsocial.com/@BobThePlumber" target="_blank" rel="noopener noreferrer" className="social-icon" title="Truth Social"><i className="fab fa-tumblr"></i></a>
          <a href="https://x.com/BobsThePlumber" target="_blank" rel="noopener noreferrer" className="social-icon" title="X"><i className="fab fa-twitter"></i></a>
        </div>
      </footer>

      {showBackToTop && (
        <button className="back-to-top-btn" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>↑ Top</button>
      )}
    </div>
  );
}

// The rest of App.js (including the App component) remains unchanged
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
  const titleRef = useRef(null);
  const landingRefs = useRef([]);

  useEffect(() => {
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
      const letters = "God’s Detox".split('').map((char) => `<span class="letter">${char}</span>`).join('');
      title.innerHTML = letters;
      gsap.from('.letter', { duration: 1, opacity: 0, y: 50, stagger: 0.05, ease: 'power2.out', onComplete: () => gsap.set('.letter', { y: 0, opacity: 1, clearProps: 'all' }) });
    }

    if (landingRefs.current.length) {
      gsap.from(landingRefs.current, { duration: 1, opacity: 0, y: 30, stagger: 0.2, ease: 'power2.out', delay: 0.5 });
    }

    const handleScroll = () => setShowBackToTop(window.scrollY > 200);
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
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
      setVideos((prevVideos) => prevVideos.map((video) => (video._id === id ? { ...video, views: res.data.views } : video)));
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
      const res = await axios.put('/.netlify/functions/videos', { id, userId: user._id, action: 'like' });
      setVideos((prevVideos) =>
        prevVideos.map((video) =>
          video._id === id
            ? { ...video, likes: res.data.likes !== undefined ? res.data.likes : (video.likes || 0) + 1, likedBy: res.data.likedBy || [...(video.likedBy || []), user._id] }
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

  const hasLiked = (video) => user && video.likedBy && Array.isArray(video.likedBy) && video.likedBy.includes(user._id);

  const handleImageClick = (src, alt) => setEnlargedImage({ src, alt });
  const closeEnlargedImage = () => setEnlargedImage(null);
  const toggleBookMenu = () => setIsBookMenuOpen(!isBookMenuOpen);
  const handleMomentClick = (index) => setSelectedMoment(index === selectedMoment ? null : index);

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
              sortedVideos={sortedVideos}
              featuredVideo={featuredVideo}
            />
          }
        />
        <Route path="/drkory" element={<DrKoryPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route
          path="/grenon"
          element={
            <GrenonPage
              enlargedImage={enlargedImage}
              selectedMoment={selectedMoment}
              setEnlargedImage={setEnlargedImage}
              handleImageClick={handleImageClick}
              closeEnlargedImage={closeEnlargedImage}
              toggleBookMenu={toggleBookMenu}
              handleMomentClick={handleMomentClick}
              isBookMenuOpen={isBookMenuOpen}
            />
          }
        />
        <Route
          path="/videos"
          element={
            <VideosPage
              user={user}
              videos={videos}
              loading={loading}
              filteredVideos={filteredVideos}
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              handleViewIncrement={handleViewIncrement}
              handleLike={handleLike}
              hasLiked={hasLiked}
            />
          }
        />
        <Route path="/articles" element={<ArticlesPage />} />
      </Routes>
    </Router>
  );
}

export default App;