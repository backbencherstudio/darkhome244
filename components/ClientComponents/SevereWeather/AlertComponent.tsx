import LoadingMin from '@/components/reusable/LoadingMin'
import { useWeatherData } from '@/hooks/useWeatherData'
import { useLocation } from '@/components/Provider/LocationProvider'
import React, { useEffect } from 'react'

export default function AlertComponent() {
  const { location, refreshLocation } = useLocation()
  const { data, error, loading } = useWeatherData('alerts', '', 57, -135, 1)
  const [alertData, setAlertData] = React.useState<any>(null)

  useEffect(() => {
    if (data && data.alerts?.alert && !loading) {
      setAlertData(data.alerts.alert[0]) // show only first alert
    }
  }, [data, loading])

  if (loading) return <LoadingMin />

  if (!alertData) return <p className="text-center text-gray-400">No alert found</p>

  // dynamic color based on severity
  const severityColor =
    alertData.severity === 'Severe'
      ? 'bg-red-600'
      : alertData.severity === 'Moderate'
      ? 'bg-yellow-500'
      : 'bg-blue-500'

  return (
    <div
      className={`relative overflow-hidden ${severityColor} text-white p-4 rounded-2xl shadow-lg`}
    >
      {/* Marquee Animation */}
      <div className="whitespace-nowrap animate-marquee text-lg font-semibold tracking-wide">
        ⚠️ {alertData.headline}
      </div>

      {/* Alert details */}
      <div className="mt-3 text-sm opacity-90">
        <p>
          <strong>Type:</strong> {alertData.msgtype}
        </p>
        <p>
          <strong>Urgency:</strong> {alertData.urgency}
        </p>
      </div>

      {/* Gradient overlay for smooth edges */}
      <div className="absolute inset-y-0 left-0 w-10 bg-gradient-to-r from-red-700/60 to-transparent pointer-events-none"></div>
      <div className="absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-red-700/60 to-transparent pointer-events-none"></div>

      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(100%);
          }
          100% {
            transform: translateX(-100%);
          }
        }
        .animate-marquee {
          display: inline-block;
          animation: marquee 15s linear infinite;
        }
      `}</style>
    </div>
  )
}
