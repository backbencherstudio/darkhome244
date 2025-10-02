import BannerSection from "@/components/ClientComponents/Home/BannerSection";
import LatestCurrentNews from "@/components/ClientComponents/Home/LatestCurrentNews";
import LatesWeatherSection from "@/components/ClientComponents/Home/LatestWeatherSection";
import WeatherForecast from "@/components/ClientComponents/Home/WeatherForecasatTab";


export default function Home() {
  return (
    <div className="">
      <BannerSection />
      <div>
        {/* advertisment component will use here */}
      </div>
      <div>
        <WeatherForecast />
      </div>
      <div>
        {/* <WeatherApp/> */}
      </div>
      <div className="maxContainer md:py-10 py-8">
        <div className="">
          <LatesWeatherSection />
        </div>
        <div className="md:pt-10 pt-8">
          <LatestCurrentNews />
        </div>
      </div>
    </div>
  );
}
