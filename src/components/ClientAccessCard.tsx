
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const ClientAccessCard = () => {
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

  // Prepare chart data
  const chartData = Object.entries(accessData).map(([name, data]) => ({
    name,
    production: data.production,
    ruleValidation: data.ruleValidation,
    manualMatch: data.manualMatch,
    total: data.noOfRecords
  }));

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-medium text-gray-900 mb-2">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.name}: {entry.value}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  const totalRecords = Object.values(accessData).reduce((sum, data) => sum + data.noOfRecords, 0);
  const totalProduction = Object.values(accessData).reduce((sum, data) => sum + data.production, 0);
  const totalPending = Object.values(accessData).reduce((sum, data) => sum + data.ruleValidation + data.manualMatch, 0);

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
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
        <h3 className="text-sm font-medium text-gray-700 mb-4">Records Status by Client</h3>
        <div className="h-64 mb-4">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis 
                dataKey="name" 
                tick={{ fontSize: 12 }}
                angle={-45}
                textAnchor="end"
                height={60}
              />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Bar dataKey="production" fill="#10B981" name="Production" radius={[2, 2, 0, 0]} />
              <Bar dataKey="ruleValidation" fill="#F59E0B" name="Rule Validation" radius={[2, 2, 0, 0]} />
              <Bar dataKey="manualMatch" fill="#6B7280" name="Manual Match" radius={[2, 2, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {Object.entries(accessData).map(([clientName, data]) => (
          <div key={clientName} className="border border-gray-200 rounded-lg p-4">
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
