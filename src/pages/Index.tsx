
import React from 'react';
import DashboardHeader from '../components/DashboardHeader';
import DashboardNav from '../components/DashboardNav';
import RecentFilesCard from '../components/RecentFilesCard';
import ClientAccessCard from '../components/ClientAccessCard';
import ReportCalendarCard from '../components/ReportCalendarCard';

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader />
      <DashboardNav />
      
      <main className="max-w-7xl mx-auto p-6 space-y-6">
        {/* Quick Actions Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button className="flex items-center space-x-3 p-4 rounded-lg border border-gray-200 hover:border-blue-500 hover:bg-blue-50 transition-all duration-200 group">
              <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center group-hover:bg-blue-700 transition-colors">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 6.707a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L11 5.414V13a1 1 0 11-2 0V5.414L7.707 6.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="text-left">
                <p className="text-sm font-medium text-gray-900">Upload New File</p>
                <p className="text-xs text-gray-500">Import data entries</p>
              </div>
            </button>
            
            <button className="flex items-center space-x-3 p-4 rounded-lg border border-gray-200 hover:border-orange-500 hover:bg-orange-50 transition-all duration-200 group">
              <div className="w-8 h-8 bg-orange-600 rounded flex items-center justify-center group-hover:bg-orange-700 transition-colors">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="text-left">
                <p className="text-sm font-medium text-gray-900">Search Records</p>
                <p className="text-xs text-gray-500">Find specific data</p>
              </div>
            </button>
          </div>
        </div>

        {/* Rep Activities and Client Access Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Rep Activities */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100">
            <RecentFilesCard />
          </div>

          {/* Client Access */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100">
            <ClientAccessCard />
          </div>
        </div>

        {/* Report Calendar */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <ReportCalendarCard />
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 px-6 py-4 mt-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-sm text-gray-600">
          <p>G & M Health, LLC © 2025.</p>
          <p>Development</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
