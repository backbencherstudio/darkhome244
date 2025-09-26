
import React from "react";


type SelectedTabComponentProps = {
  types: string[];
  selectedType: string;
  setSelectedType: (type: string) => void;
  isSearchAndFilter?: boolean;
};

const SelectedTabComponent: React.FC<SelectedTabComponentProps> = ({
  types,
  selectedType,
  setSelectedType,
}) => {
  const handleTabClick = (type: string) => {
    setSelectedType(type); // Update selected type

    // Scroll to the target section with an offset
    const element = document.getElementById(type); // Get the target element
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 40, // Adjust this value (100px is the offset)
        behavior: "smooth", // Smooth scroll
      });
    }
  };

  return (
      <div className="bg-white  p-2 flex justify-between items-center  ">
        <div className="flex flex-wrap items-center justify-center gap-3 ">
          {types.map((type, index) => (
            <a
              href={`#${type}`}
              key={`${type}-${index}`}
              onClick={(e) => {
                e.preventDefault();
                handleTabClick(type);
              }}
              className={`
           py-1.5 px-3 transition-all duration-200 cursor-pointer rounded-[2px]  leading-[130%]
              ${
                selectedType === type
                  ? "lg:text-lg md:text-base bg-[#0080C4] text-white font-semibold  text-sm bg-[linear-gradient(0deg, #0080C4 0%, #0080C4 100%), rgba(230, 242, 249, 0.25)]"
                  : " text-[#4A4C56] lg:text-base md:text-sm text-xs"
              }
            `}
            >
              {type}
            </a>
          ))}
        </div>
        <div>
        </div>
      </div>
  );
};

export default SelectedTabComponent;
