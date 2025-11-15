import React from 'react'

type IconType = React.ComponentType<{ className?: string }>;

interface InfoCardProps {
  title: string;
  value: React.ReactNode;
  icon: IconType;
  color?: string;
}

export default function InfoCard({ title, value, icon: Icon, color = 'text-gray-500' }: InfoCardProps) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md border-t-4 border-l-2 border-gray-100" style={{ borderColor: color }}>
            <div className="flex items-center space-x-4">
                <div className={`p-3 rounded-full ${color} bg-opacity-10`} style={{ color: color }}>
                    <Icon className="h-6 w-6" />
                </div>
                <div>
                    <p className="text-sm font-medium text-gray-500">{title}</p>
                    <p className="text-2xl font-extrabold text-gray-900">{value}</p>
                </div>
            </div>
        </div>
  )
}
 