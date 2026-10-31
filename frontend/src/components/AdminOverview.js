import React, { useState, useEffect } from 'react';
import { Users, FileText, AlertTriangle, Activity } from 'lucide-react';
import api from '../api';

const AdminOverview = () => {
  const [metrics, setMetrics] = useState({
    totalPatients: 0,
    totalSamples: 0,
    expiringSamples: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        // Fallback for UI testing if endpoint isn't ready
        const res = await api.get('/dashboard/metrics').catch(() => ({
          data: { totalPatients: 142, totalSamples: 856, expiringSamples: 12 }
        }));
        setMetrics(res.data);
      } catch (error) {
        console.error("Failed to fetch metrics", error);
      } finally {
        setLoading(false);
      }
    };
    fetchMetrics();
  }, []);

  const statCards = [
    {
      title: 'Total Patients',
      value: metrics.totalPatients,
      icon: Users,
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-600',
    },
    {
      title: 'Active Samples',
      value: metrics.totalSamples,
      icon: FileText,
      color: 'from-primary-500 to-primary-600',
      bgColor: 'bg-primary-50',
      textColor: 'text-primary-600',
    },
    {
      title: 'Expiring Soon (7d)',
      value: metrics.expiringSamples,
      icon: AlertTriangle,
      color: 'from-amber-500 to-orange-500',
      bgColor: 'bg-orange-50',
      textColor: 'text-orange-600',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Dashboard Overview</h1>
          <p className="text-gray-500 text-sm mt-1">Welcome back! Here's what's happening with your trials today.</p>
        </div>
        <button className="btn-primary flex items-center gap-2">
          <Activity className="w-4 h-4" />
          Generate Report
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {statCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div 
              key={index} 
              className="card relative overflow-hidden group hover:shadow-md transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className={`absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-gradient-to-br \${stat.color} rounded-full opacity-10 group-hover:scale-150 transition-transform duration-500 ease-out`} />
              
              <div className="flex items-center gap-4 relative z-10">
                <div className={`p-4 rounded-2xl \${stat.bgColor}`}>
                  <Icon className={`w-6 h-6 \${stat.textColor}`} />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500 mb-1">{stat.title}</p>
                  <h3 className="text-3xl font-bold text-gray-900">
                    {loading ? (
                      <div className="h-8 w-16 bg-gray-200 animate-pulse rounded"></div>
                    ) : (
                      stat.value
                    )}
                  </h3>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity Placeholder */}
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
          <div className="space-y-4">
            {[1, 2, 3].map((_, i) => (
              <div key={i} className="flex items-start gap-4 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                <div className="w-2 h-2 mt-2 rounded-full bg-primary-500"></div>
                <div>
                  <p className="text-sm font-medium text-gray-900">New sample registered</p>
                  <p className="text-xs text-gray-500 mt-0.5">Patient ID: #1042 • 2 hours ago</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* System Health Placeholder */}
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">System Health</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600 font-medium">Storage Capacity (Freezer A)</span>
                <span className="text-gray-900 font-bold">78%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-gradient-to-r from-primary-400 to-primary-600 h-2 rounded-full" style={{ width: '78%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600 font-medium">Database Load</span>
                <span className="text-gray-900 font-bold">42%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-gradient-to-r from-blue-400 to-blue-600 h-2 rounded-full" style={{ width: '42%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminOverview;
