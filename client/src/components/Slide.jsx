import { useState, useEffect } from "react";
import "../styles/Slide.scss";

const Slide = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      image: "assets/slide.jpg",
    },
    {
      image: "assets/citty.jpg",  // Save the city image locally
    },
    {
      image: "assets/cityz.jpeg",  // Save the building image locally
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => 
        (prevSlide + 1) % slides.length
      );
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <div className="slide-container">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`slide ${index === currentSlide ? "active" : ""} proSlider`}
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.7)), url(${slide.image})`
          }}
        >
          <div className="text-content">
            <h1>
              Student Living Made Simple <br /> Your Home Away from Home!
            </h1>
          </div>
        </div>
      ))}
      
      <div className="slide-indicators proSlider">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`indicator ${index === currentSlide ? "active" : ""}`}
            onClick={() => goToSlide(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default Slide;