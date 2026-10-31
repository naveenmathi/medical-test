import React, { useState } from 'react';
import { Box, Thermometer, Layers, AlertCircle } from 'lucide-react';

const StorageManagement = () => {
  const [selectedFreezer, setSelectedFreezer] = useState('Freezer A');

  const freezers = [
    { name: 'Freezer A', temp: '-80°C', capacity: 85, status: 'Normal' },
    { name: 'Freezer B', temp: '-20°C', capacity: 42, status: 'Normal' },
    { name: 'LN2 Tank 1', temp: '-196°C', capacity: 92, status: 'Warning' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Storage Management</h1>
          <p className="text-gray-500 text-sm mt-1">Manage physical locations of biobank samples.</p>
        </div>
        <button className="btn-primary">
          Log New Sample
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {freezers.map((freezer) => (
          <div 
            key={freezer.name}
            onClick={() => setSelectedFreezer(freezer.name)}
            className={`card cursor-pointer transition-all duration-200 border-2 \${
              selectedFreezer === freezer.name 
                ? 'border-primary-500 shadow-md transform -translate-y-1' 
                : 'border-transparent hover:border-primary-200'
            }`}
          >
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-2">
                <Box className={`w-5 h-5 \${freezer.status === 'Warning' ? 'text-orange-500' : 'text-blue-500'}`} />
                <h3 className="font-semibold text-gray-900">{freezer.name}</h3>
              </div>
              <span className={`px-2.5 py-1 text-xs font-medium rounded-full \${
                freezer.status === 'Warning' ? 'bg-orange-100 text-orange-700' : 'bg-green-100 text-green-700'
              }`}>
                {freezer.status}
              </span>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Thermometer className="w-4 h-4" />
                <span>Operating Temp: <strong className="text-gray-900">{freezer.temp}</strong></span>
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">Capacity</span>
                  <span className="font-medium">{freezer.capacity}%</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                  <div 
                    className={`h-2 rounded-full \${freezer.capacity > 90 ? 'bg-orange-500' : 'bg-blue-500'}`} 
                    style={{ width: `\${freezer.capacity}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="card mt-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Layers className="w-5 h-5 text-primary-600" />
            <h2 className="text-lg font-semibold text-gray-900">{selectedFreezer} Inventory</h2>
          </div>
          <div className="flex gap-2">
             <input type="text" placeholder="Search sample ID..." className="text-sm border border-gray-200 rounded-lg px-3 py-1.5 focus:outline-none focus:border-primary-500" />
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="px-6 py-3 font-semibold rounded-tl-lg">Sample ID</th>
                <th className="px-6 py-3 font-semibold">Type</th>
                <th className="px-6 py-3 font-semibold">Patient</th>
                <th className="px-6 py-3 font-semibold">Location</th>
                <th className="px-6 py-3 font-semibold">Stored Date</th>
                <th className="px-6 py-3 font-semibold rounded-tr-lg">Action</th>
              </tr>
            </thead>
            <tbody>
              {[1, 2, 3, 4, 5].map((item) => (
                <tr key={item} className="bg-white border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4 font-medium text-gray-900">SMP-{2040 + item}</td>
                  <td className="px-6 py-4"><span className="px-2 py-1 bg-purple-50 text-purple-700 rounded text-xs">Blood Serum</span></td>
                  <td className="px-6 py-4">#10{item}2</td>
                  <td className="px-6 py-4">Rack {item}, Box 2</td>
                  <td className="px-6 py-4">Oct 24, 2023</td>
                  <td className="px-6 py-4 text-primary-600 hover:text-primary-800 cursor-pointer font-medium">Move</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default StorageManagement;
