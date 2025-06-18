
import React, { useState, useRef, useEffect } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

const ClientAccessCard = () => {
  const [selectedClient, setSelectedClient] = useState<string | null>(null);
  const [showTotalView, setShowTotalView] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Handle clicking outside to reset to default view
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setSelectedClient(null);
        setShowTotalView(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [selectedClient, showTotalView]);

  const accessData = {
    GenPay: {
      noOfRecords: 5,
      production: 5,
      ruleValidation: 0,
      manualMatch: 0,
      color: '#EF4444'
    },
    Research: {
      noOfRecords: 10,
      production: 10,
      ruleValidation: 0,
      manualMatch: 0,
      color: '#10B981'
    },
    Sample: {
      noOfRecords: 6,
      production: 5,
      ruleValidation: 1,
      manualMatch: 0,
      color: '#3B82F6'
    },
    Ownership: {
      noOfRecords: 13,
      production: 11,
      ruleValidation: 2,
      manualMatch: 0,
      color: '#8B5CF6'
    },
    'Call DTL': {
      noOfRecords: 14,
      production: 14,
      ruleValidation: 0,
      manualMatch: 0,
      color: '#F59E0B'
    }
  };

  // Default pie chart data - all 5 buckets
  const getDefaultPieData = () => {
    return Object.entries(accessData).map(([name, data]) => ({
      name,
      value: data.noOfRecords,
      fill: data.color
    }));
  };

  // Total view pie chart data - Production vs Rule Validation
  const getTotalViewPieData = () => {
    const totalProduction = Object.values(accessData).reduce((sum, data) => sum + data.production, 0);
    const totalRuleValidation = Object.values(accessData).reduce((sum, data) => sum + data.ruleValidation, 0);
    
    return [
      { name: 'Production', value: totalProduction, fill: '#10B981' },
      { name: 'Rule Valid.', value: totalRuleValidation, fill: '#F59E0B' }
    ].filter(item => item.value > 0);
  };

  const getPieChartData = () => {
    return showTotalView ? getTotalViewPieData() : getDefaultPieData();
  };

  const handlePieClick = () => {
    setShowTotalView(!showTotalView);
    setSelectedClient(null);
  };

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0];
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-xl backdrop-blur-sm">
          <p className="font-medium text-gray-900">{data.name}</p>
          <p className="text-sm font-semibold" style={{ color: data.payload.fill }}>
            Value: {data.value}
          </p>
        </div>
      );
    }
    return null;
  };

  const totalRecords = Object.values(accessData).reduce((sum, data) => sum + data.noOfRecords, 0);
  const totalProduction = Object.values(accessData).reduce((sum, data) => sum + data.production, 0);
  const totalPending = Object.values(accessData).reduce((sum, data) => sum + data.ruleValidation + data.manualMatch, 0);

  return (
    <div ref={containerRef} className="bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-2xl border border-gray-200 p-6 transform transition-all duration-300 hover:shadow-3xl">
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between mb-6 gap-4">
        <h2 className="text-xl font-bold text-gray-900 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Client Access Overview
        </h2>
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center space-x-2 text-sm bg-green-50 px-3 py-1 rounded-full border border-green-200">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-green-700 font-medium">Total: {totalRecords}</span>
          </div>
          <div className="flex items-center space-x-2 text-sm bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
            <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
            <span className="text-blue-700 font-medium">Production: {totalProduction}</span>
          </div>
          <div className="flex items-center space-x-2 text-sm bg-yellow-50 px-3 py-1 rounded-full border border-yellow-200">
            <div className="w-3 h-3 bg-yellow-500 rounded-full animate-pulse"></div>
            <span className="text-yellow-700 font-medium">Pending: {totalPending}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {/* Left Side - Data Buckets */}
        <div className="space-y-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800">
              {showTotalView ? 'Total Status Distribution' : 'Client Buckets'}
            </h3>
            {showTotalView && (
              <button 
                onClick={() => setShowTotalView(false)}
                className="text-sm text-blue-600 hover:text-blue-700 underline font-medium transition-colors"
              >
                Back to Buckets
              </button>
            )}
          </div>
          
          <div className="space-y-3">
            {Object.entries(accessData).map(([clientName, data]) => (
              <div 
                key={clientName} 
                className={`group relative overflow-hidden rounded-xl p-4 cursor-pointer transition-all duration-300 transform hover:scale-105 hover:shadow-lg ${
                  selectedClient === clientName 
                    ? 'ring-2 ring-blue-500 shadow-lg scale-105' 
                    : 'hover:shadow-md'
                }`}
                style={{ 
                  backgroundColor: `${data.color}15`,
                  borderLeft: `4px solid ${data.color}`
                }}
                onClick={() => setSelectedClient(selectedClient === clientName ? null : clientName)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div 
                      className="w-4 h-4 rounded-full shadow-md"
                      style={{ backgroundColor: data.color }}
                    ></div>
                    <h4 className="font-semibold text-gray-900">{clientName}</h4>
                  </div>
                  <div className="text-right">
                    <span className="text-2xl font-bold" style={{ color: data.color }}>
                      {data.noOfRecords}
                    </span>
                    <p className="text-xs text-gray-600">records</p>
                  </div>
                </div>
                
                {/* Progress bar */}
                <div className="mt-3">
                  <div className="flex justify-between text-xs text-gray-600 mb-1">
                    <span>Completion</span>
                    <span>{Math.round((data.production / data.noOfRecords) * 100)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                    <div 
                      className="h-2 rounded-full transition-all duration-500 ease-out shadow-sm"
                      style={{ 
                        width: `${(data.production / data.noOfRecords) * 100}%`,
                        backgroundColor: data.color
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side - Pie Chart */}
        <div className="flex flex-col">
          <div className="flex-1 bg-gradient-to-br from-gray-50 to-white rounded-xl p-6 shadow-inner border border-gray-100">
            <div className="text-center mb-4">
              <p className="text-sm font-medium text-gray-600">
                {showTotalView ? 'Production vs Rule Validation' : 'Total Status Distribution'}
              </p>
              <button
                onClick={handlePieClick}
                className="mt-2 text-xs text-blue-600 hover:text-blue-700 underline transition-colors"
              >
                {showTotalView ? 'Show Buckets' : 'Show Total Breakdown'}
              </button>
            </div>
            
            <div className="h-80 cursor-pointer group" onClick={handlePieClick}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <defs>
                    <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
                      <dropshadow dx="0" dy="4" stdDeviation="8" floodColor="#00000020"/>
                    </filter>
                  </defs>
                  <Pie
                    data={getPieChartData()}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={120}
                    paddingAngle={2}
                    dataKey="value"
                    className="drop-shadow-lg group-hover:drop-shadow-2xl transition-all duration-300"
                  >
                    {getPieChartData().map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={entry.fill}
                        className="hover:opacity-80 transition-opacity duration-200"
                      />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                  <Legend 
                    verticalAlign="bottom" 
                    height={36}
                    iconType="circle"
                    wrapperStyle={{ fontSize: '14px', fontWeight: '500' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientAccessCard;
