
import React, { useState } from 'react';

interface RepActivity {
  name: string;
  visitDays: number;
  state: string;
  licensed: boolean;
  totalVisits: number;
  uniqueClients: number;
}

const RecentFilesCard = () => {
  const repActivities: RepActivity[] = [
    {
      name: 'Mohamed Hagrass',
      visitDays: 15,
      state: 'CT',
      licensed: true,
      totalVisits: 45,
      uniqueClients: 12
    },
    {
      name: 'Ahmed H',
      visitDays: 12,
      state: 'CT',
      licensed: false,
      totalVisits: 38,
      uniqueClients: 8
    },
    {
      name: 'Sarah Johnson',
      visitDays: 18,
      state: 'NY',
      licensed: true,
      totalVisits: 52,
      uniqueClients: 15
    },
    {
      name: 'David Miller',
      visitDays: 10,
      state: 'NJ',
      licensed: true,
      totalVisits: 28,
      uniqueClients: 7
    },
    {
      name: 'Lisa Chen',
      visitDays: 14,
      state: 'NY',
      licensed: false,
      totalVisits: 41,
      uniqueClients: 11
    }
  ];

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-lg font-medium text-gray-900">Rep Activities</h4>
        <button className="text-blue-600 text-sm hover:text-blue-700 transition-colors">
          View All
        </button>
      </div>
      
      <div className="space-y-3">
        {repActivities.map((rep, index) => (
          <div 
            key={index} 
            className="p-3 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors"
          >
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  <h5 className="text-sm font-medium text-gray-900">{rep.name}</h5>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${
                    rep.licensed 
                      ? 'bg-green-100 text-green-600' 
                      : 'bg-yellow-100 text-yellow-600'
                  }`}>
                    {rep.licensed ? 'Licensed' : 'Not Licensed'}
                  </span>
                </div>
                <p className="text-xs text-gray-600">{rep.visitDays} days visits</p>
                <div className="flex items-center space-x-2 mt-1">
                  <span className="text-xs bg-blue-100 text-blue-600 px-1.5 py-0.5 rounded">
                    {rep.state}
                  </span>
                </div>
              </div>
              <div className="text-right">
                <p className="text-lg font-semibold text-gray-900">{rep.totalVisits}</p>
                <p className="text-xs text-gray-600">Visits</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentFilesCard;
