import { useEffect, useRef, useState } from "react";
import MyCard from "./MyCard";
import "../App.css";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa";

const CardCollection = ({ array }) => {
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const [contentFits, setContentFits] = useState(false); // New state to check content fitting

  // Function to check scroll position
  const scrollRef = useRef(null);

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: 300,
        behavior: "smooth",
      });
    }
  };

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: -300,
        behavior: "smooth",
      });
    }
  };

  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      
      // Check if the user is at the start of the scroll (hide left arrow)
      setShowLeftArrow(scrollLeft > 0);

      // Check if the user is at the end of the scroll (hide right arrow)
      setShowRightArrow(scrollLeft + clientWidth < scrollWidth);
    }
  };

  useEffect(() => {
    const current = scrollRef.current;

    // Check if the content fits within the container
    if (current) {
      const { scrollWidth, clientWidth } = current;
      setContentFits(scrollWidth <= clientWidth); // If content fits, hide both arrows
    }

    if (current) {
      current.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (current) {
        current.removeEventListener("scroll", handleScroll);
      }
    };
  }, [array]); // Add `array` dependency to recheck content fitting if the array changes

  return (
    <>
      <div className="max-w-7xl mx-auto p-4 relative">
        <div ref={scrollRef} className="flex scrollbar-hide overflow-x-scroll">
          {array.map((item) => (
            <div key={item.id} className="p-3">
              <MyCard
                id={item.id}
                name={item.name}
                admin={item.admin}
                price={item.price}
                university={item.university}
              />
            </div>
          ))}
        </div>

        {/* Scroll Left Button */}
        {!contentFits && showLeftArrow && (
          <div
            className="absolute z-10 rounded-full bg-slate-700 text-2xl p-2 left-2 top-1/2 transform -translate-y-1/2 cursor-pointer"
            onClick={scrollLeft}
          >
            <FaChevronLeft className="text-white" />
          </div>
        )}

        {/* Scroll Right Button */}
        {!contentFits && showRightArrow && (
          <div
            className="absolute z-10 rounded-full bg-slate-700 text-2xl p-2 right-2 top-1/2 transform -translate-y-1/2 cursor-pointer"
            onClick={scrollRight}
          >
            <FaChevronRight className="text-white" />
          </div>
        )}
      </div>
    </>
  );
};

export default CardCollection;
