
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
      <div className="bg-white rounded-[12px] 2xl:p-4 p-3 flex justify-between items-center shadow-sm ">
        <div className="flex flex-wrap items-center justify-center 2xl:gap-4 gap-3 rounded-lg">
          {types.map((type, index) => (
            <a
              href={`#${type}`}
              key={`${type}-${index}`}
              onClick={(e) => {
                e.preventDefault();
                handleTabClick(type);
              }}
              className={`
           py-[10px] px-[18px] transition-all duration-200 cursor-pointer rounded-md 2xl:text-base text-sm
              ${
                selectedType === type
                  ? "primary-bg text-white shadow-sm "
                  : "bg-[#F8FAFB] border-b border-b-[#ECEFF3] text-[#777980] hover:bg-[#0CAF60]/70 hover:text-white"
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
