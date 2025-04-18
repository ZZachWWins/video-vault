import React from 'react'; // Removed unused useState import
import './App.css';

function GrenonPage({ enlargedImage, selectedMoment, setEnlargedImage, handleImageClick, closeEnlargedImage, toggleBookMenu, handleMomentClick, isBookMenuOpen }) {
  const moments = [
    { year: '1977', title: 'Mark Born', description: 'Mark Grenon is born.' },
    { year: '2010', title: 'Genesis II Church', description: 'Mark founds the Genesis II Church to spread healing through ClO₂.' },
    { year: '2019', title: 'ClO₂ Advocacy', description: 'Mark advocates for ClO₂ despite Big Pharma pushback.' },
    { year: '2020', title: 'Legal Battles', description: 'Mark and his sons face legal challenges for promoting ClO₂.' },
  ];

  const galleryImages = [
    { src: 'https://res.cloudinary.com/dwmnbrjtu/image/upload/lybbzaposblc5vkbsm3z', alt: 'Mark speaking at a seminar' },
    { src: 'https://res.cloudinary.com/dwmnbrjtu/image/upload/g0rpwkyt3poc4lidafas', alt: 'Mark and his sons in Haiti' },
    { src: 'https://res.cloudinary.com/dwmnbrjtu/image/upload/o7fzvl6tybthrtc41dsm', alt: 'Mark Grenon portrait' },
  ];

  return (
    <div className="main-content">
      <section className="featured-section glassmorphism">
        <h2 className="featured-title">God’s Detox: The Grenon Legacy</h2>
        <p className="landing-text">
          Mark Grenon and his sons—Jonathan, Jordan, and Joseph—stood tall as warriors of faith, wielding chlorine dioxide (ClO₂) to heal where others wouldn’t dare. From Haiti’s slums, they crushed MRSA with this simple compound, saving lives Big Pharma left for dead. Mark, a 47-year missionary, detoxed his own family from flesh-eating bacteria. His boys spread the gospel of ClO₂ through Genesis II Church—until the system locked them up. Their testimony? ClO₂ purges toxins, restores God’s temple, and spits in the face of tyranny. Watch their story, weigh their truth, and join the fight.
        </p>
        <p className="landing-text scripture">
          “Heal the sick, raise the dead, cleanse lepers, cast out demons.” – Matthew 10:8
        </p>
      </section>

      <section className="grenon-section glassmorphism">
        <h2 className="grenon-title">Grenon Timeline</h2>
        <div className="grenon-grid">
          {moments.map((moment, index) => (
            <div
              key={index}
              className={`timeline-moment glassmorphism ${selectedMoment === index ? 'active' : ''}`}
              onClick={() => handleMomentClick(index)}
            >
              <p className="timeline-year">{moment.year}</p>
              <p className="timeline-title">{moment.title}</p>
              {selectedMoment === index && (
                <p className="timeline-tooltip">{moment.description}</p>
              )}
            </div>
          ))}
        </div>
      </section>

      <section className="grenon-section glassmorphism">
        <h2 className="grenon-title">Grenon Gallery</h2>
        <div className="grenon-grid">
          {galleryImages.map((image, index) => (
            <img
              key={index}
              src={image.src}
              alt={image.alt}
              className="grenon-gallery-image glassmorphism"
              onClick={() => handleImageClick(image.src, image.alt)}
            />
          ))}
        </div>
      </section>

      <section className="grenon-section glassmorphism">
        <h2 className="grenon-title">Get the Book</h2>
        <div className="book-menu-container">
          <button className="book-menu-btn" onClick={toggleBookMenu}>
            Order Now
          </button>
          {isBookMenuOpen && (
            <div className="book-menu glassmorphism">
              <h3 className="book-menu-title">Mark Grenon’s Works</h3>
              <button className="book-menu-item">
                <a
                  href="https://g2churchbooks.org/Imagine-A-World-Without-DIS-EASE-Is-it-possible-by-Mark-S-Grenon-Hardcopy-p127870986"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="book-link"
                >
                  Imagine A World Without DIS-EASE (Hardcopy)
                </a>
              </button>
              <p className="book-description">Mark’s seminal work on healing through ClO₂.</p>
              <button className="book-menu-item">
                <a
                  href="https://g2churchbooks.org/Imagine-A-World-Without-DIS-EASE-Is-it-possible-by-Mark-S-Grenon-E-Book-p127871010"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="book-link"
                >
                  Imagine A World Without DIS-EASE (E-Book)
                </a>
              </button>
              <p className="book-description">Digital version for instant access.</p>
            </div>
          )}
        </div>
      </section>

      {enlargedImage && (
        <div className="enlarged-image-overlay" onClick={closeEnlargedImage}>
          <img src={enlargedImage.src} alt={enlargedImage.alt} className="enlarged-image" />
        </div>
      )}
    </div>
  );
}

export default GrenonPage;