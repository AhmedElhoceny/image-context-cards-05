import React, { useState, useRef, useEffect } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

const ClientAccessCard = () => {
  const [selectedClient, setSelectedClient] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Handle clicking outside to reset to total view
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        if (selectedClient) {
          setSelectedClient(null);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [selectedClient]);

  const accessData = {
    GenPay: {
      noOfRecords: 11,
      production: 11,
      ruleValidation: 0,
      manualMatch: 0
    },
    Research: {
      noOfRecords: 5,
      production: 5,
      ruleValidation: 0,
      manualMatch: 0
    },
    Sample: {
      noOfRecords: 8,
      production: 7,
      ruleValidation: 1,
      manualMatch: 0
    },
    Ownership: {
      noOfRecords: 12,
      production: 10,
      ruleValidation: 2,
      manualMatch: 0
    },
    'Call DTL': {
      noOfRecords: 6,
      production: 6,
      ruleValidation: 0,
      manualMatch: 0
    }
  };

  // Prepare pie chart data based on selection
  const getPieChartData = () => {
    if (selectedClient && accessData[selectedClient as keyof typeof accessData]) {
      const clientData = accessData[selectedClient as keyof typeof accessData];
      return [
        { name: 'Production', value: clientData.production, fill: '#10B981' },
        { name: 'Rule Valid.', value: clientData.ruleValidation, fill: '#F59E0B' },
        { name: 'Manual', value: clientData.manualMatch, fill: '#6B7280' }
      ].filter(item => item.value > 0);
    } else {
      // Total overview data
      const totalProduction = Object.values(accessData).reduce((sum, data) => sum + data.production, 0);
      const totalRuleValidation = Object.values(accessData).reduce((sum, data) => sum + data.ruleValidation, 0);
      const totalManual = Object.values(accessData).reduce((sum, data) => sum + data.manualMatch, 0);
      
      return [
        { name: 'Production', value: totalProduction, fill: '#10B981' },
        { name: 'Rule Valid.', value: totalRuleValidation, fill: '#F59E0B' },
        { name: 'Manual', value: totalManual, fill: '#6B7280' }
      ].filter(item => item.value > 0);
    }
  };

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0];
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-medium text-gray-900">{data.name}</p>
          <p className="text-sm" style={{ color: data.payload.fill }}>
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
    <div ref={containerRef} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-medium text-gray-900">Client Access Overview</h2>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 text-sm">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="text-gray-600">Total: {totalRecords}</span>
          </div>
          <div className="flex items-center space-x-2 text-sm">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="text-gray-600">Production: {totalProduction}</span>
          </div>
          <div className="flex items-center space-x-2 text-sm">
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <span className="text-gray-600">Pending: {totalPending}</span>
          </div>
          <div className="flex items-center space-x-3">
            <select className="text-sm border border-gray-300 rounded-md px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white">
              <option>ABC</option>
            </select>
            <select className="text-sm border border-gray-300 rounded-md px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white">
              <option>2025</option>
            </select>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-medium text-gray-700">
            {selectedClient ? `${selectedClient} Status Distribution` : 'Total Status Distribution'}
          </h3>
          {selectedClient && (
            <button 
              onClick={() => setSelectedClient(null)}
              className="text-xs text-blue-600 hover:text-blue-700 underline"
            >
              Back to Total View
            </button>
          )}
        </div>
        <div className="h-64 mb-4">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={getPieChartData()}
                cx="50%"
                cy="50%"
                innerRadius={40}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {getPieChartData().map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {Object.entries(accessData).map(([clientName, data]) => (
          <div 
            key={clientName} 
            className={`border rounded-lg p-4 cursor-pointer transition-all ${
              selectedClient === clientName 
                ? 'border-blue-500 bg-blue-50' 
                : 'border-gray-200 hover:border-gray-300'
            }`}
            onClick={() => setSelectedClient(clientName)}
          >
            <div className="border-l-4 border-blue-500 pl-3 mb-3">
              <h4 className="text-sm font-medium text-gray-900">{clientName}</h4>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-600">Records</span>
                <span className="text-lg font-semibold text-blue-600">{data.noOfRecords}</span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-600">Production</span>
                <span className="text-lg font-semibold text-green-600">{data.production}</span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-600">Rule Valid.</span>
                <span className="text-sm font-medium text-yellow-600">{data.ruleValidation}</span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-600">Manual</span>
                <span className="text-sm font-medium text-gray-600">{data.manualMatch}</span>
              </div>
            </div>

            <div className="mt-3 pt-3 border-t border-gray-100">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-gray-500">Completion</span>
                <span className="text-xs font-medium text-gray-700">
                  {Math.round((data.production / data.noOfRecords) * 100)}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${(data.production / data.noOfRecords) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClientAccessCard;
