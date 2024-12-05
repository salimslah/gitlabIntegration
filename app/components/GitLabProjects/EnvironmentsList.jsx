'use client';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

const EnvironmentsList = ({ projectId }) => {
  const [environments, setEnvironments] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEnvironments = async () => {
      try {
        const response = await fetch(`/api/environment/${projectId}`);
        const data = await response.json();

        if (data.error) {
          setError(data.error);
        } else {
          setEnvironments(data);  // Set the fetched environments
        }
      } catch (error) {
        setError('Failed to fetch environments.');
      }
    };

    fetchEnvironments();
  }, [projectId]);

  if (error) {
    return (
      <div className="p-6 border rounded-lg shadow-lg bg-red-50">
        <h2 className="text-xl font-semibold text-red-600 mb-2">Error</h2>
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  if (environments.length === 0) {
    return (
      <div className="p-6 border rounded-lg shadow-lg bg-white">
        <h2 className="text-2xl font-semibold mb-4">Project Environments</h2>
        <p>No environments found for this project.</p>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-3xl font-semibold text-gray-800 mb-6">Project Environments</h2>
      <ul className="space-y-4">
        {environments.map((env) => (
            
          <li
            key={env.id}
            className="flex items-center justify-between p-5 bg-gradient-to-r from-gray-100 to-gray-200 rounded-xl shadow-sm hover:shadow-lg transition-all duration-200"
          >
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gray-300 rounded-full flex justify-center items-center text-gray-700 font-semibold">
                {env.name[0].toUpperCase()}
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-800">{env.name}</h3>
                <p className="text-sm text-gray-500">Status: 
                  <span className={`font-semibold ${env.state === 'available' ? 'text-green-500' : 'text-red-500'}`}>
                    {env.state}
                  </span>
                </p>
              </div>
            </div>
            <Link href={env.external_url || ''} className="text-sm text-blue-600 hover:text-blue-800">View Details</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EnvironmentsList;
