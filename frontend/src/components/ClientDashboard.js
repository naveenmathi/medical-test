import React, { useState } from 'react';
import { Truck, ShieldAlert, Clock, ArrowRight } from 'lucide-react';

const ClientDashboard = () => {
  const [activeTab, setActiveTab] = useState('alpha'); // 'alpha' or 'beta'

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Client Perspectives</h1>
          <p className="text-gray-500 text-sm mt-1">Specialized dashboard views for different client needs.</p>
        </div>
        
        <div className="bg-gray-100 p-1 rounded-lg inline-flex">
          <button 
            className={`px-4 py-2 text-sm font-medium rounded-md transition-all \${activeTab === 'alpha' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500 hover:text-gray-700'}`}
            onClick={() => setActiveTab('alpha')}
          >
            Client Alpha (Logistics)
          </button>
          <button 
            className={`px-4 py-2 text-sm font-medium rounded-md transition-all \${activeTab === 'beta' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500 hover:text-gray-700'}`}
            onClick={() => setActiveTab('beta')}
          >
            Client Beta (QA)
          </button>
        </div>
      </div>

      {activeTab === 'alpha' && (
        <div className="animate-fade-in-up">
          <div className="bg-gradient-to-r from-blue-900 to-indigo-900 rounded-2xl p-6 text-white mb-6 shadow-lg relative overflow-hidden">
             <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full blur-2xl transform translate-x-1/2 -translate-y-1/2"></div>
             <div className="relative z-10 flex items-center gap-3 mb-2">
               <div className="p-2 bg-blue-500/20 rounded-lg"><Truck className="w-6 h-6 text-blue-300" /></div>
               <h2 className="text-xl font-bold text-white">Chain of Custody Tracking</h2>
             </div>
             <p className="text-blue-200 text-sm max-w-xl relative z-10">Real-time visibility into specimen shipments, handoffs, and transit conditions for Client Alpha.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="card">
              <h3 className="font-semibold text-gray-900 mb-4">Active Shipments</h3>
              <div className="space-y-4">
                {[
                  { id: 'SHP-9021', dest: 'Lab Alpha Core', status: 'In Transit', progress: 60, time: '2h remaining' },
                  { id: 'SHP-9022', dest: 'Genomics Hub', status: 'Preparing', progress: 15, time: 'Est. departure 4PM' }
                ].map((shipment) => (
                  <div key={shipment.id} className="p-4 border border-gray-100 rounded-xl hover:border-blue-200 hover:shadow-sm transition-all">
                    <div className="flex justify-between mb-2">
                      <span className="font-medium text-gray-900">{shipment.id} <span className="text-gray-400 font-normal mx-2">→</span> {shipment.dest}</span>
                      <span className="text-xs font-medium px-2 py-1 bg-blue-50 text-blue-700 rounded-full">{shipment.status}</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-1.5 mb-2 mt-3">
                      <div className="bg-blue-500 h-1.5 rounded-full" style={{ width: `\${shipment.progress}%` }}></div>
                    </div>
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>{shipment.progress}% completed</span>
                      <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {shipment.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="card">
              <h3 className="font-semibold text-gray-900 mb-4">Recent Custody Logs</h3>
              <div className="relative pl-6 border-l border-gray-200 space-y-6">
                <div className="relative">
                  <div className="absolute -left-8 w-4 h-4 bg-white border-2 border-green-500 rounded-full"></div>
                  <p className="text-sm font-medium text-gray-900">Received at Lab Alpha Core</p>
                  <p className="text-xs text-gray-500 mt-1">Oct 24, 10:45 AM • Signed by: Dr. Chen</p>
                </div>
                <div className="relative">
                  <div className="absolute -left-8 w-4 h-4 bg-white border-2 border-blue-500 rounded-full"></div>
                  <p className="text-sm font-medium text-gray-900">Departed Processing Center</p>
                  <p className="text-xs text-gray-500 mt-1">Oct 24, 08:30 AM • Courier ID: CX-92</p>
                </div>
                <div className="relative">
                  <div className="absolute -left-8 w-4 h-4 bg-white border-2 border-gray-300 rounded-full"></div>
                  <p className="text-sm font-medium text-gray-900">Package Prepared</p>
                  <p className="text-xs text-gray-500 mt-1">Oct 24, 07:15 AM • Tech: S. Miller</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'beta' && (
        <div className="animate-fade-in-up">
           <div className="bg-gradient-to-r from-orange-900 to-red-900 rounded-2xl p-6 text-white mb-6 shadow-lg relative overflow-hidden">
             <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full blur-2xl transform translate-x-1/2 -translate-y-1/2"></div>
             <div className="relative z-10 flex items-center gap-3 mb-2">
               <div className="p-2 bg-red-500/20 rounded-lg"><ShieldAlert className="w-6 h-6 text-red-300" /></div>
               <h2 className="text-xl font-bold text-white">Quality Assurance & Spoilage Alert System</h2>
             </div>
             <p className="text-red-200 text-sm max-w-xl relative z-10">Monitoring critical expiry windows and environmental deviations to prevent biological specimen loss.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="card border-l-4 border-l-red-500 bg-red-50/30">
              <div className="text-sm text-gray-600 font-medium mb-1">Critical Expiry (48h)</div>
              <div className="text-3xl font-bold text-gray-900">12<span className="text-sm font-normal text-gray-500 ml-2">samples</span></div>
            </div>
            <div className="card border-l-4 border-l-orange-500 bg-orange-50/30">
              <div className="text-sm text-gray-600 font-medium mb-1">Warning Expiry (7d)</div>
              <div className="text-3xl font-bold text-gray-900">45<span className="text-sm font-normal text-gray-500 ml-2">samples</span></div>
            </div>
            <div className="card border-l-4 border-l-green-500 bg-green-50/30">
              <div className="text-sm text-gray-600 font-medium mb-1">Temp Deviations (24h)</div>
              <div className="text-3xl font-bold text-gray-900">0<span className="text-sm font-normal text-gray-500 ml-2">events</span></div>
            </div>
          </div>

          <div className="card">
            <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-red-500" /> Immediate Attention Required
            </h3>
            <table className="w-full text-sm text-left">
              <thead className="bg-gray-50 text-gray-600 text-xs uppercase">
                <tr>
                  <th className="px-4 py-3 rounded-tl-lg">Sample ID</th>
                  <th className="px-4 py-3">Type</th>
                  <th className="px-4 py-3">Expiry Date</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3 text-right rounded-tr-lg">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                <tr className="hover:bg-gray-50/50">
                  <td className="px-4 py-3 font-medium">SMP-4920</td>
                  <td className="px-4 py-3 text-gray-600">RNA Extract</td>
                  <td className="px-4 py-3 text-red-600 font-medium">Oct 25, 2023</td>
                  <td className="px-4 py-3"><span className="bg-red-100 text-red-700 px-2 py-1 rounded text-xs font-medium">Critical</span></td>
                  <td className="px-4 py-3 text-right">
                    <button className="text-sm text-primary-600 hover:text-primary-700 font-medium flex items-center justify-end gap-1 w-full">
                      Process <ArrowRight className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
                <tr className="hover:bg-gray-50/50">
                  <td className="px-4 py-3 font-medium">SMP-4921</td>
                  <td className="px-4 py-3 text-gray-600">Blood Serum</td>
                  <td className="px-4 py-3 text-orange-600 font-medium">Oct 26, 2023</td>
                  <td className="px-4 py-3"><span className="bg-orange-100 text-orange-700 px-2 py-1 rounded text-xs font-medium">Warning</span></td>
                  <td className="px-4 py-3 text-right">
                    <button className="text-sm text-primary-600 hover:text-primary-700 font-medium flex items-center justify-end gap-1 w-full">
                      Process <ArrowRight className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClientDashboard;
