import BannerSection from "@/components/ClientComponents/Home/BannerSection";
import LatesWeatherSection from "@/components/ClientComponents/Home/LatestWeatherSection";
import WeatherApp from "@/components/ClientComponents/Home/Weatherapp";

export default function Home() {
  return (
    <div className="">
      <BannerSection />
      <div>
        {/* advertisment component will use here */}
      </div>
      <div>
        {/* <WeatherApp/> */}
      </div>
      <div className="maxContainer py-10">
        <LatesWeatherSection/>
      </div>
    </div>
  );
}
