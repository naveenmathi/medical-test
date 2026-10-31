import React, { useState, useEffect } from 'react';
import { Search, ChevronRight, Activity, Beaker, Users } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import api from '../api';

const PatientView = () => {
  const [patients, setPatients] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [biomarkers, setBiomarkers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Mock data for UI development if backend is not ready
  const mockBiomarkers = [
    { recorded_at: 'Day 1', rbc: 4.5, wbc: 6.2, platelets: 150 },
    { recorded_at: 'Day 2', rbc: 4.6, wbc: 6.5, platelets: 155 },
    { recorded_at: 'Day 3', rbc: 4.8, wbc: 6.8, platelets: 160 },
    { recorded_at: 'Day 4', rbc: 4.9, wbc: 7.0, platelets: 165 },
  ];

  const mockPatients = [
    { id: 1, name: 'John Doe', informed_consent_status: 1 },
    { id: 2, name: 'Jane Smith', informed_consent_status: 1 },
    { id: 3, name: 'Robert Johnson', informed_consent_status: 0 },
  ];

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const res = await api.get('/patients').catch(() => ({ data: mockPatients }));
        setPatients(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchPatients();
  }, []);

  const handleSelectPatient = async (patient) => {
    setSelectedPatient(patient);
    try {
      const res = await api.get(`/biomarkers/\${patient.id}`).catch(() => ({ data: mockBiomarkers }));
      setBiomarkers(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Patients & Biomarkers</h1>
          <p className="text-gray-500 text-sm mt-1">Manage trial participants and view biomarker trends.</p>
        </div>
        
        <div className="relative w-full sm:w-64">
          <input
            type="text"
            placeholder="Search patients..."
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-12rem)] min-h-[600px]">
        {/* Patient List */}
        <div className="card flex flex-col overflow-hidden">
          <div className="flex items-center gap-2 mb-4 pb-4 border-b border-gray-100">
            <Users className="w-5 h-5 text-primary-600" />
            <h2 className="text-lg font-semibold text-gray-900">Patient Roster</h2>
          </div>
          
          <div className="flex-1 overflow-y-auto pr-2 space-y-2">
            {loading ? (
              <div className="animate-pulse space-y-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-16 bg-gray-100 rounded-xl"></div>
                ))}
              </div>
            ) : (
              patients.map((patient) => (
                <button
                  key={patient.id}
                  onClick={() => handleSelectPatient(patient)}
                  className={`w-full text-left p-4 rounded-xl border transition-all duration-200 \${
                    selectedPatient?.id === patient.id 
                      ? 'border-primary-500 bg-primary-50 shadow-sm' 
                      : 'border-gray-100 hover:border-primary-300 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium text-gray-900">{patient.name}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className={`inline-block w-2 h-2 rounded-full \${patient.informed_consent_status ? 'bg-green-500' : 'bg-red-500'}`}></span>
                        <span className="text-xs text-gray-500">
                          {patient.informed_consent_status ? 'ICF Signed' : 'Pending ICF'}
                        </span>
                      </div>
                    </div>
                    <ChevronRight className={`w-5 h-5 \${selectedPatient?.id === patient.id ? 'text-primary-600' : 'text-gray-300'}`} />
                  </div>
                </button>
              ))
            )}
          </div>
        </div>

        {/* Patient Details & Charts */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          {selectedPatient ? (
            <>
              {/* Patient Header */}
              <div className="card p-6 flex justify-between items-center bg-gradient-to-r from-gray-900 to-gray-800 text-white border-0 shadow-lg relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary-500 opacity-20 rounded-full blur-3xl -mr-20 -mt-20"></div>
                <div className="relative z-10">
                  <h2 className="text-2xl font-bold">{selectedPatient.name}</h2>
                  <p className="text-gray-400 mt-1">Patient ID: #{selectedPatient.id.toString().padStart(4, '0')}</p>
                </div>
                <div className="relative z-10 flex gap-3">
                  <button className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors border border-white/10">
                    View ICF Document
                  </button>
                </div>
              </div>

              {/* Biomarker Chart */}
              <div className="card flex-1 flex flex-col min-h-0">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2">
                    <Activity className="w-5 h-5 text-primary-600" />
                    <h2 className="text-lg font-semibold text-gray-900">Biomarker Trends</h2>
                  </div>
                  <div className="flex gap-2">
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700">RBC</span>
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-50 text-green-700">WBC</span>
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-purple-50 text-purple-700">Platelets</span>
                  </div>
                </div>

                <div className="flex-1 w-full min-h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={biomarkers} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" vertical={false} />
                      <XAxis dataKey="recorded_at" tick={{ fill: '#9ca3af', fontSize: 12 }} axisLine={{ stroke: '#e5e7eb' }} />
                      <YAxis yAxisId="left" tick={{ fill: '#9ca3af', fontSize: 12 }} axisLine={false} tickLine={false} />
                      <YAxis yAxisId="right" orientation="right" tick={{ fill: '#9ca3af', fontSize: 12 }} axisLine={false} tickLine={false} />
                      <Tooltip 
                        contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}
                      />
                      <Legend />
                      <Line yAxisId="left" type="monotone" dataKey="rbc" stroke="#3b82f6" strokeWidth={3} dot={{ r: 4, strokeWidth: 2 }} activeDot={{ r: 6 }} name="RBC (M/mcL)" />
                      <Line yAxisId="left" type="monotone" dataKey="wbc" stroke="#10b981" strokeWidth={3} dot={{ r: 4, strokeWidth: 2 }} activeDot={{ r: 6 }} name="WBC (K/mcL)" />
                      <Line yAxisId="right" type="monotone" dataKey="platelets" stroke="#8b5cf6" strokeWidth={3} dot={{ r: 4, strokeWidth: 2 }} activeDot={{ r: 6 }} name="Platelets (K/mcL)" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </>
          ) : (
            <div className="card h-full flex flex-col items-center justify-center text-center p-12 border-dashed border-2 border-gray-200">
              <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                <Beaker className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No Patient Selected</h3>
              <p className="text-gray-500 max-w-sm">
                Select a patient from the roster on the left to view their detailed information and biomarker history.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};



export default PatientView;
