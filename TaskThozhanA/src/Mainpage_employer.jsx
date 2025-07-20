import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation
import './Mainpage_employer.css'; // Keep your CSS
import ca_img1 from "./assets/ca_imag3.jpg";
import ca_img2 from "./assets/ca_imag2.jpg";
import ca_img3 from "./assets/ca_imag4.jpg";

const Mainpage_employer = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = 3;

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % totalSlides);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);

  useEffect(() => {
    const interval = setInterval(nextSlide, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="font-sans text-white min-h-screen bg-[#032545]">
      {/* Carousel Section */}
      <section className="relative bg-white text-white overflow-hidden pt-0 pb-1">
        <div
          id="carousel"
          style={{
            transform: `translateX(-${currentSlide * 100}vw)`,
          }}
          className="flex transition-transform duration-700 ease-in-out"
        >
          {/* Slide 1 with Background Image */}
          <div
            className="carousel-slide flex items-center justify-center w-screen h-screen bg-cover bg-center"
            style={{
              backgroundImage: `url(${ca_img1})`, // Replace with the correct image path
            }}
          >
            <div className="text-center">
              <h2 className="carousel-heading">Welcome to TaskThozhan</h2>
              <p className="carousel-text">Smartest Hiring Platform</p>

            </div>
          </div>

          {/* Slide 2 with Background Image */}
          <div
            className="carousel-slide flex items-center justify-center w-screen h-screen bg-cover bg-center"
            style={{
              backgroundImage: `url(${ca_img2})`, // Replace with the correct image path
            }}
          >
            <div className="text-center">
              <h2 className="carousel-heading">Connecting Employers & Employees</h2>
              <p className="carousel-text">Find the right match, fast and easy</p>
            </div>
          </div>

          {/* Slide 3 with Background Image */}
          <div
            className="carousel-slide flex items-center justify-center w-screen h-screen bg-cover bg-center"
            style={{
              backgroundImage: `url(${ca_img3})`, // Replace with the correct image path
            }}
          >
            <div className="text-center">
              <h2 className="carousel-heading">Hire Smarter, Work Better</h2>
              <p className="carousel-text">Flexible hiring for short & long term roles</p>
            </div>
          </div>
        </div>
        <button
          onClick={prevSlide}
          className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-gray-800 p-2 rounded-full text-white text-2xl"
        >
          ‹
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-800 p-2 rounded-full text-white text-2xl"
        >
          ›
        </button>
      </section>

      {/* Features Section */}
      <section className="p-12 bg-white text-black">
        <h2 className="text-5xl font-bold text-center mb-10 text-blue-900">
          What You Can Do with TaskThozhan
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <Link to="/job-postings-creation">
            <div className="bg-blue-100 p-12 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <h3 className="text-center text-2xl font-bold text-blue-900 mb-4">📝 Add Job Postings</h3>
              <p className="text-center text-gray-700 text-sm">
                Create short-term or long-term job listings for your company.
              </p>
            </div>
          </Link>

          <Link to="/applications-viewer-employer">
            <div className="bg-green-100 p-12 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <h3 className="text-center text-2xl font-bold text-green-900 mb-4">📄 View Applications</h3>
              <p className="text-center text-gray-700 text-sm">
                Get matched with workers near your location based on skills and availability.
              </p>
            </div>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer>
        <p className="text-center">&copy; 2025 TaskThozhan. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default Mainpage_employer;
