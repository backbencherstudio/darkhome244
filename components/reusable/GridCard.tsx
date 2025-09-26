"use client"

// components/reusable/NewsGridComponent.tsx
import Link from 'next/link';

interface NewsItem {
  id?: string;
  link?: string;
  image?: string;
  title?: string;
  description?: string;
  author?: string;
  pubDate?: string;
}

// interface AdConfig {
//   position: number; // After which news item to show the ad
//   adComponent: React.ReactNode;
// }

interface NewsGridProps {
  newsItems: NewsItem[];
//   adConfig?: AdConfig;
}

const GridCard = ({ newsItems }: NewsGridProps) => {
  const formatDate = (dateString: string) => {
    const s = dateString ?? "";
    const m = s.match(/^(?:[A-Za-z]{3},\s*)?(\d{1,2}\s+[A-Za-z]{3}\s+\d{4})\s+(\d{2}):(\d{2})/);
    if (!m) return s;
    const [, datePart, HH, MM] = m;
    const h = (parseInt(HH, 10) % 12) || 12;
    const ampm = parseInt(HH, 10) >= 12 ? "pm" : "am";
    return `${datePart} at ${h}:${MM} ${ampm}`;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {newsItems?.map((news, index) => (
        <div key={news?.id}>
          {/* News Item */}
          <Link
            href={news?.link}
            className="group rounded-[4px] overflow-hidden bg-white hover:bg-[#0080C4] transition-colors duration-300 cursor-pointer p-5 flex flex-col h-full md:gap-8 gap-6"
          >
            {/* Image */}
            <div className="relative max-h-[280px] overflow-hidden">
              <img
                src={news?.image}
                alt={news?.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Content */}
            <div className="flex flex-col flex-grow">
              <div>
                <h2 className="md:text-2xl text-xl font-bold transition-colors duration-300 group-hover:text-white group-hover:underline leading-[130%] underline-offset-[25%]">
                  {news?.title}
                </h2>
                <p className="md:text-base text-sm mb-6 mt-5 leading-[160%] tracking-[-0.0160px] transition-colors group-hover:text-[#E9E9EA] duration-300">
                  {news?.description}
                </p>
              </div>

              {/* Author and Date */}
              <div className="mt-auto">
                <div className="flex w-full items-center justify-between px-4 py-3 rounded-[8px] bg-[#F5F5F5] group-hover:bg-white transition-colors duration-300">
                  <div className="flex items-center gap-2.5">
                    <div className="w-[44px] h-[44px] rounded-[4px] bg-gray-200">
                      {/* Placeholder for author image */}
                    </div>
                    <div className="flex flex-col gap-1">
                      <p className="md:text-base text-sm font-semibold leading-[100%] tracking-[-.016px] text-[#4A4C56] transition-colors duration-300">
                        {news?.author}
                      </p>
                      <p className="md:text-sm text-xs text-[#777980] leading-[100%] tracking-[-.014px] transition-colors duration-300">
                        {formatDate(news?.pubDate)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Link>

          {/* Google Ad after specific position */}
          {/* {adConfig && index + 1 === adConfig.position && adConfig.adComponent} */}
        </div>
      ))}
    </div>
  );
};

export default GridCard;