import React, { useState, useEffect } from "react";
import { Typewriter } from "react-simple-typewriter";
import slider1 from "../assets/slider1.png";
import slider2 from "../assets/slider2.png";
import slider3 from "../assets/slider3.png";
import slider4 from "../assets/slider4.png";

const slides = [
  {
    image: slider1,
    message: "Pay Your Utility Bills Online — Fast, Easy & Secure",
  },
  {
    image: slider2,
    message: "Track and Manage Electricity, Gas, and Water Bills in One Place",
  },
  {
    image: slider3,
    message: "Get Real-Time Payment Reminders and Save Late Fees",
  },
  {
    image: slider4,
    message: "Smart Solutions for a Smarter Utility Experience",
  },
];

const Banner = () => {
  const [current, setCurrent] = useState(0);
  const [typingKey, setTypingKey] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
      setTypingKey((prev) => prev + 1);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="py-20">
      <div className="relative w-full overflow-hidden h-64 sm:h-96 md:h-[600px]">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === current ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          >
            {/* Background Image */}
            <img
              src={slide.image}
              className="w-full h-full object-cover"
              alt={`Slide ${index + 1}`}
            />

            {/* Typewriter */}
            <div className="absolute inset-0 bg-black/40 flex items-end justify-center pb-16 px-4">
              {index === current && (
                <h2 className="text-white text-xl sm:text-3xl md:text-5xl font-bold text-center drop-shadow-lg">
                  <Typewriter
                    key={typingKey}
                    words={[slide.message]}
                    loop={1}
                    cursor
                    cursorStyle="_"
                    typeSpeed={50}
                    deleteSpeed={40}
                    delaySpeed={3000}
                  />
                </h2>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Banner;
