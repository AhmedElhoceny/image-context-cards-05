
import React from 'react';
import { Calendar } from '@/components/ui/calendar';

interface ReportEntry {
  title: string;
  type: string;
  date: string;
  daysLeft: number;
  priority: 'urgent' | 'medium' | 'low';
}

const ReportCalendarCard = () => {
  const upcomingReports: ReportEntry[] = [
    {
      title: 'Spend - CT',
      type: 'July 01',
      date: 'July 01',
      daysLeft: 18,
      priority: 'urgent'
    },
    {
      title: 'Spend - DC',
      type: 'July 01',
      date: 'July 01',
      daysLeft: 18,
      priority: 'urgent'
    },
    {
      title: 'Spend - MA',
      type: 'July 01',
      date: 'July 01',
      daysLeft: 18,
      priority: 'urgent'
    },
    {
      title: 'Sample - MN',
      type: 'October 24',
      date: 'October 24',
      daysLeft: 133,
      priority: 'medium'
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'border-red-200 bg-red-50';
      case 'medium': return 'border-yellow-200 bg-yellow-50';
      case 'low': return 'border-green-200 bg-green-50';
      default: return 'border-gray-200 bg-gray-50';
    }
  };

  const getPriorityDot = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'bg-red-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-green-500';
      default: return 'bg-gray-400';
    }
  };

  const getPriorityLabel = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'Urgent';
      case 'medium': return 'Medium';
      case 'low': return 'Low';
      default: return 'Normal';
    }
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-medium text-gray-900">Report Calendar</h3>
        <div className="flex items-center space-x-4 text-xs">
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-red-500 rounded-full"></div>
            <span className="text-gray-600">Urgent</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
            <span className="text-gray-600">Medium</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-gray-600">Low</span>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <h4 className="text-sm font-medium text-gray-700 mb-4">Upcoming Reports Timeline</h4>
        
        {/* Urgent Reports */}
        <div className="mb-4">
          <div className="flex items-center space-x-2 mb-2">
            <div className="w-2 h-2 bg-red-500 rounded-full"></div>
            <span className="text-sm font-medium text-red-600">Urgent Reports</span>
          </div>
          <div className="space-y-2 ml-4">
            {upcomingReports.filter(report => report.priority === 'urgent').map((report, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded border border-red-200 bg-red-50">
                <div>
                  <p className="text-sm font-medium text-gray-900">{report.title}</p>
                  <p className="text-xs text-gray-600">{report.date}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-red-600">{report.daysLeft} days left</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Medium Priority Reports */}
        <div className="mb-4">
          <div className="flex items-center space-x-2 mb-2">
            <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
            <span className="text-sm font-medium text-yellow-600">Medium Priority</span>
          </div>
          <div className="space-y-2 ml-4">
            {upcomingReports.filter(report => report.priority === 'medium').map((report, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded border border-yellow-200 bg-yellow-50">
                <div>
                  <p className="text-sm font-medium text-gray-900">{report.title}</p>
                  <p className="text-xs text-gray-600">{report.date}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-yellow-600">{report.daysLeft} days left</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Current Month Calendar */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-sm font-medium text-gray-700">Current Month</h4>
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-red-500 rounded-full"></div>
            <span className="text-xs text-gray-600">Report Due Dates</span>
          </div>
        </div>
        <div className="border rounded-lg p-2">
          <Calendar className="w-full" />
        </div>
      </div>
    </div>
  );
};

export default ReportCalendarCard;
