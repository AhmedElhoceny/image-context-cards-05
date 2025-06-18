
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';

interface RepActivity {
  name: string;
  visitDays: number;
  state: string;
  licensed: boolean;
  totalVisits: number;
  uniqueClients: number;
}

interface StateData {
  state: string;
  totalDays: number;
  licensedCount: number;
  notLicensedCount: number;
  reps: RepActivity[];
}

const StateActivitiesCard = () => {
  const [selectedState, setSelectedState] = useState<StateData | null>(null);

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

  // Group reps by state and calculate totals
  const stateData: StateData[] = Object.values(
    repActivities.reduce((acc, rep) => {
      if (!acc[rep.state]) {
        acc[rep.state] = {
          state: rep.state,
          totalDays: 0,
          licensedCount: 0,
          notLicensedCount: 0,
          reps: []
        };
      }
      
      acc[rep.state].totalDays += rep.visitDays;
      if (rep.licensed) {
        acc[rep.state].licensedCount++;
      } else {
        acc[rep.state].notLicensedCount++;
      }
      acc[rep.state].reps.push(rep);
      
      return acc;
    }, {} as Record<string, StateData>)
  );

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-lg font-medium text-gray-900">Activities</h4>
        <button className="text-blue-600 text-sm hover:text-blue-700 transition-colors">
          View All
        </button>
      </div>
      
      <div className="space-y-3">
        {stateData.map((state) => (
          <Dialog key={state.state}>
            <DialogTrigger asChild>
              <div 
                className="p-4 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors cursor-pointer hover:bg-gray-50"
                onClick={() => setSelectedState(state)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h5 className="text-lg font-semibold text-gray-900">{state.state}</h5>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-2">
                        <span className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded-full">
                          Licensed: {state.licensedCount}
                        </span>
                        <span className="text-xs bg-yellow-100 text-yellow-600 px-2 py-1 rounded-full">
                          Not Licensed: {state.notLicensedCount}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-blue-600">{state.totalDays}</p>
                    <p className="text-xs text-gray-600">Total Days</p>
                  </div>
                </div>
              </div>
            </DialogTrigger>
            
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle className="text-xl font-semibold">
                  Representatives in {state.state}
                </DialogTitle>
              </DialogHeader>
              
              <div className="mt-4">
                <div className="grid gap-3 max-h-96 overflow-y-auto">
                  {state.reps.map((rep, index) => (
                    <div 
                      key={index}
                      className="p-4 border border-gray-200 rounded-lg"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <h6 className="text-sm font-medium text-gray-900">{rep.name}</h6>
                            <span className={`text-xs px-2 py-0.5 rounded-full ${
                              rep.licensed 
                                ? 'bg-green-100 text-green-600' 
                                : 'bg-yellow-100 text-yellow-600'
                            }`}>
                              {rep.licensed ? 'Licensed' : 'Not Licensed'}
                            </span>
                          </div>
                          <p className="text-xs text-gray-600">
                            {rep.totalVisits} total visits • {rep.uniqueClients} unique clients
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-semibold text-gray-900">{rep.visitDays}</p>
                          <p className="text-xs text-gray-600">Visit Days</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="flex justify-between items-center text-sm">
                    <span className="font-medium text-gray-700">
                      Total: {state.reps.length} representatives
                    </span>
                    <span className="font-medium text-gray-700">
                      Total Days: {state.totalDays}
                    </span>
                  </div>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        ))}
      </div>
    </div>
  );
};

export default StateActivitiesCard;
