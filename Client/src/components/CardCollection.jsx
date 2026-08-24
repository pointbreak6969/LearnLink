import { useEffect, useRef, useState } from "react";
import MyCard from "./MyCard";
import "../App.css";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa";
const CardCollection = ({ array, isJoined }) => {
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const [contentFits, setContentFits] = useState(false);
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
  }, [array]);

  return (
    <>
      <div className="max-w-7xl mx-auto p-4 relative">
        <div ref={scrollRef} className="flex gap-4 scrollbar-hide overflow-x-scroll scroll-smooth py-1">
          {array.map((item) => (
            <div key={item._id} className="w-64 flex-shrink-0">
              <MyCard
                id={item?._id}
                name={item.name}
                admin={item?.admin?.fullName}
                faculty={item?.faculty}
                university={item?.university}
                price={item?.price}
                isJoined={isJoined}
              />
            </div>
          ))}
        </div>

        {/* Scroll Left Button */}
        {!contentFits && showLeftArrow && (
          <button
            className="absolute z-10 rounded-full bg-white text-ink-700 shadow-card border border-ink-100 p-2 left-0 top-1/2 -translate-y-1/2 hover:bg-brand-50 hover:text-brand-600 transition-colors"
            onClick={scrollLeft}
            aria-label="Scroll left"
          >
            <FaChevronLeft />
          </button>
        )}

        {/* Scroll Right Button */}
        {!contentFits && showRightArrow && (
          <button
            className="absolute z-10 rounded-full bg-white text-ink-700 shadow-card border border-ink-100 p-2 right-0 top-1/2 -translate-y-1/2 hover:bg-brand-50 hover:text-brand-600 transition-colors"
            onClick={scrollRight}
            aria-label="Scroll right"
          >
            <FaChevronRight />
          </button>
        )}
      </div>
    </>
  );
};

export default CardCollection;
