import React from 'react';
import { Bookmark } from 'lucide-react';

const LatesWeatherSection = () => {
  const newsData = [
    {
      id: 1,
      title: "Weather Alert: Unprecedented Heatwave Sweeps Across the US",
      description: "Experts warn of record-breaking temperatures as a severe heatwave grips the nation, urging as a severe heatwave grips the nat.....",
      author: "James",
      date: "August, 18, 2025",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop&crop=center"
    },
    {
      id: 2,
      title: "Extreme Weather Patterns: Are They the New Normal?",
      description: "Scientists investigate the increasing frequency of extreme weather events and what they mean weather events and what the.....",
      author: "James",
      date: "August, 18, 2025",
      image: "https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=400&h=300&fit=crop&crop=center"
    },
    {
      id: 3,
      title: "Rainfall Records Shattered in Europe: Flooding on the Rise",
      description: "Historic rainfall levels cause widespread flooding in multiple European countries, with many area's European countries, with many area's.....",
      author: "James",
      date: "August, 18, 2025",
      image: "https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?w=400&h=300&fit=crop&crop=center"
    }
  ];

  return (
    <div className="bg-[#FFFFFF]">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Latest Weather News</h1>
        <button className="text-gray-600 hover:text-gray-800 text-sm">
          View All
        </button>
      </div>

      {/* News Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {newsData.map((news, index) => (
          <div
            key={news.id}
            className={` group rounded-[4px] overflow-hidden shadow-md bg-white transition-colors duration-300 cursor-pointer`}
          >
            {/* Image */}
            <div className="relative h-48 overflow-hidden">
              <img
                src={news.image}
                alt={news.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Content */}
            <div className="p-6">
              <h2 className={`text-lg font-bold mb-3 leading-tight transition-colors duration-300 `}>
                {news.title}
              </h2>
              
              <p className={`text-sm mb-6 leading-relaxed transition-colors duration-300 `}>
                {news.description}
              </p>

              {/* Author and Bookmark */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold transition-colors duration-300 `}>
                    J
                  </div>
                  <div>
                    <p className={`text-sm font-medium transition-colors duration-300 `}>
                      {news.author}
                    </p>
                    <p className={`text-xs transition-colors duration-300`}>
                      {news.date}
                    </p>
                  </div>
                </div>
                
                <button className={`p-2 rounded-full transition-colors duration-300 `}>
                  <Bookmark size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LatesWeatherSection;