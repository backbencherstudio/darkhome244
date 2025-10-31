import Loading from '@/app/loading'
import { useLocation } from '@/components/Provider/LocationProvider'
import LoadingMin from '@/components/reusable/LoadingMin'
import { useWeatherData } from '@/hooks/useWeatherData'
import React, { useEffect } from 'react'

export default function AlertComponent() {
    const { location, refreshLocation } = useLocation()
    const { data, error, loading } = useWeatherData('alerts', '', location?.latitude, location?.longitude, 1)
    const [alertData, setAlertData] = React.useState<any[]>([])

    useEffect(() => {
        if (data && data?.alerts?.alert && !loading) {
            setAlertData(data?.alerts?.alert)
        }
    }, [data, loading])

    if (loading) return <LoadingMin />
    console.log(loading, "loadig", data, "dataaaaaaa")
    if (!alertData || alertData.length === 0) {
        return (
            <div className="bg-gray-100 rounded-lg p-3 text-center">
                <p className="text-gray-600 text-sm">No weather alerts at this time</p>
            </div>
        )
    }

    // Duplicate alerts for seamless loop
    const duplicatedAlerts = [...alertData]

    return (
        <div className="relative overflow-hidden bg-gradient-to-r from-red-500 via-orange-500 to-amber-500 rounded-lg py-3 shadow-lg">
            {/* Animated slider container */}
            <div className="gap-8  text-white">
                <div className='flex w-full animate-slide items-center justify-start gap-3'>
                    <div className='flex-shrink-0 w-full flex justify-between items-center gap-3 '>

                            {duplicatedAlerts.map((alert: any, index: number) => (
                        <div
                            key={index}
                            className=" w-full flex items-center justify-center gap-3 bg-white/95 backdrop-blur-sm px-6 py-2 rounded-full shadow-md"
                        >
                            <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                            <span className="text-gray-800 font-medium whitespace-nowrap">
                                {alert?.headline}
                            </span>
                        </div>
                    ))}

                    </div>
                    <div className='flex-shrink-0 w-full flex justify-between items-center gap-3 '>

                             {duplicatedAlerts.map((alert: any, index: number) => (
                        <div
                            key={index}
                            className=" w-full flex items-center justify-center gap-3 bg-white/95 backdrop-blur-sm px-6 py-2 rounded-full shadow-md"
                        >
                            <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                            <span className="text-gray-800 font-medium whitespace-nowrap">
                                {alert?.headline}
                            </span>
                        </div>
                    ))}

                    </div>
                    <div className='flex-shrink-0 w-full flex justify-between items-center gap-3 '>

                            {duplicatedAlerts.map((alert: any, index: number) => (
                        <div
                            key={index}
                            className=" w-full flex items-center justify-center gap-3 bg-white/95 backdrop-blur-sm px-6 py-2 rounded-full shadow-md"
                        >
                            <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                            <span className="text-gray-800 font-medium whitespace-nowrap">
                                {alert?.headline}
                            </span>
                        </div>
                    ))}

                    </div>
                    {/* <div className='flex-shrink-0 w-full flex justify-between items-center gap-3 '>
                    {duplicatedAlerts.map((alert: any, index: number) => (
                        <div
                            key={index}
                            className=" bg-white/95 backdrop-blur-sm px-6 py-2 rounded-full shadow-md"
                        >
                            <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                            <span className="text-gray-800 font-medium whitespace-nowrap">
                                {alert?.headline}
                            </span>
                        </div>
                    ))}

                    </div> */}
                </div>

            </div>

            {/* Gradient overlays for fade effect */}
            <div className="absolute top-0 left-0 h-full w-20 bg-gradient-to-r from-amber-500 to-transparent pointer-events-none"></div>
            <div className="absolute top-0 right-0 h-full w-20 bg-gradient-to-l from-amber-500 to-transparent pointer-events-none"></div>

            <style jsx>{`
                @keyframes slide {
                    0% {
                        transform: translateX(0);
                    }
                    100% {
                        transform: translateX(-100%);
                    }
                }
                
                .animate-slide {
                    animation: slide 20s linear infinite;
                }
                
                .animate-slide:hover {
                    animation-play-state: paused;
                }
            `}</style>
        </div>
    )
}


// "use client"

// import Loading from '@/app/loading'
// import { useLocation } from '@/components/Provider/LocationProvider'
// import LoadingMin from '@/components/reusable/LoadingMin'
// import { useWeatherData } from '@/hooks/useWeatherData'
// import React, { useEffect } from 'react'
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// import Slider from "react-slick";


// export default function AlertComponent() {
//     const { location, refreshLocation } = useLocation()
//     const { data, error, loading } = useWeatherData('alerts', '', 57, -130, 1)
//     const [alertData, setAlertData] = React.useState<any[]>([])

//     useEffect(() => {
//         if (data && data?.alerts?.alert && !loading) {
//             setAlertData(data?.alerts?.alert)
//         }
//     }, [data, loading])

//     if (loading) return <LoadingMin />
//     console.log(loading, "loadig", data, "dataaaaaaa")
//     if (!alertData || alertData.length === 0) {
//         return (
//             <div className="bg-gray-100 rounded-lg p-3 text-center">
//                 <p className="text-gray-600 text-sm">No weather alerts at this time</p>
//             </div>
//         )
//     }

//     // Duplicate alerts for seamless loop
//     const duplicatedAlerts = [...alertData, ...alertData]

//     const settings = {
//         dots: false,
//         infinite: true,
//         slidesToShow: 2,
//         slidesToScroll: 1,
//         autoplay: true,
//         speed: 5000,
//         autoplaySpeed: 5000,
//         cssEase: "linear"
//     };

//     return (
//         <div className="relative overflow-hidden bg-gradient-to-r from-red-500 via-orange-500 to-amber-500 rounded-lg py-3 shadow-lg">
//             {/* Gradient overlay edges */}
//             <div className="absolute top-0 left-0 h-full w-20 bg-gradient-to-r from-amber-500 to-transparent pointer-events-none z-10"></div>
//             <div className="absolute top-0 right-0 h-full w-20 bg-gradient-to-l from-amber-500 to-transparent pointer-events-none z-10"></div>

//             {/* Slider */}
//             <Slider {...settings}>
//                 {duplicatedAlerts.map((alert: any, index: number) => (
//                     <div key={index} className="px-3">
//                         <div className="flex items-center gap-3 bg-white/95 backdrop-blur-sm px-6 py-2 rounded-full shadow-md">
//                             <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
//                             <span className="text-gray-800 font-medium whitespace-nowrap">
//                                 {alert.headline}
//                             </span>
//                         </div>
//                     </div>
//                 ))}
//             </Slider>
//         </div>
//     )
// }


