
import React from 'react';

interface ReportEntry {
  title: string;
  type: string;
  date: string;
  daysLeft: number;
  priority: 'high' | 'medium' | 'low';
}

const ReportCalendarCard = () => {
  const upcomingReports: ReportEntry[] = [
    {
      title: 'Spend - CT',
      type: 'July 01',
      date: 'July 01',
      daysLeft: 18,
      priority: 'high'
    },
    {
      title: 'Spend - DC',
      type: 'July 01',
      date: 'July 01',
      daysLeft: 18,
      priority: 'high'
    },
    {
      title: 'Spend - MA',
      type: 'July 01',
      date: 'July 01',
      daysLeft: 18,
      priority: 'high'
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
      case 'high': return 'bg-red-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-green-500';
      default: return 'bg-gray-400';
    }
  };

  const getPriorityTextColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-600';
      case 'medium': return 'text-yellow-600';
      case 'low': return 'text-green-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="bg-white rounded-lg p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Report Calendar</h3>
        <button className="text-blue-600 text-sm font-medium hover:text-blue-700 transition-colors">
          Show more
        </button>
      </div>

      <div className="space-y-3 max-h-72 overflow-y-auto">
        {upcomingReports.map((report, index) => (
          <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-white border border-gray-100 hover:border-gray-200 transition-colors">
            <div className="flex items-center space-x-3">
              <div className={`w-1 h-10 rounded-full ${getPriorityColor(report.priority)}`} />
              <div>
                <h4 className="font-medium text-gray-900 text-sm">{report.title}</h4>
                <p className="text-xs text-gray-600">{report.date}</p>
              </div>
            </div>
            <div className="text-right">
              <p className={`text-sm font-bold ${getPriorityTextColor(report.priority)}`}>
                {report.daysLeft} Days
              </p>
              <p className="text-xs text-gray-500">Due</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReportCalendarCard;
