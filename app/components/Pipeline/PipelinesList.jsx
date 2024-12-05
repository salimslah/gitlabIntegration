'use client';
import React, { useEffect, useState } from 'react';

const PipelinesList = ({ projectId }) => {
  const [pipelines, setPipelines] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPipelines = async () => {
      try {
        const response = await fetch(`/api/pipelines/${projectId}`);
        const data = await response.json();

        if (data.error) {
          setError(data.error);
        } else {
          setPipelines(data);
        }
      } catch (error) {
        setError('Failed to fetch pipelines.');
      } finally {
        setLoading(false);
      }
    };

    fetchPipelines();
  }, [projectId]);

  if (loading) {
    return (
      <div className="p-6 border rounded-lg shadow-lg bg-white">
        <h2 className="text-2xl font-semibold mb-4">Loading pipelines...</h2>
        <div className="w-12 h-12 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 border rounded-lg shadow-lg bg-red-50">
        <h2 className="text-xl font-semibold text-red-600 mb-2">Error</h2>
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  if (pipelines.length === 0) {
    return (
      <div className="p-6 border rounded-lg shadow-lg bg-white">
        <h2 className="text-2xl font-semibold mb-4">Project Pipelines</h2>
        <p>No pipelines found for this project.</p>
      </div>
    );
  }

  const currentPipeline = pipelines[0]; // Assuming the latest pipeline is the active one

  return (
    <div className="p-6 border rounded-lg shadow-lg bg-white">
      <h2 className="text-2xl font-semibold mb-4">Project Pipelines</h2>
      <div className="space-y-6">
        {pipelines.map((pipeline, index) => {
          const isActive = pipeline.id === currentPipeline.id;

          return (
            <div key={pipeline.id} className="relative flex items-center">
              <div
                className={`w-8 h-8 flex items-center justify-center rounded-full border-2 ${
                  isActive ? 'bg-blue-500 text-white border-blue-500' : 'bg-gray-100 text-gray-600 border-gray-300'
                }`}
              >
                {index + 1}
              </div>
              <div className="flex-1 ml-4">
                <strong className={`block ${isActive ? 'text-blue-600' : 'text-gray-800'}`}>
                  Pipeline #{pipeline.id}
                </strong>
                <p className="text-sm text-gray-600">
                  Status: <span className={`${pipeline.status === 'success' ? 'text-green-500' : 'text-red-500'}`}>
                    {pipeline.status}
                  </span>
                </p>
                <p className="text-sm text-gray-600">
                  Created at: {new Date(pipeline.created_at).toLocaleString()}
                </p>
              </div>
              <a
                href={`/projects/${pipeline.project_id}/${pipeline.id}`}
                // href={pipeline.web_url}
                rel="noopener noreferrer"
                className="text-blue-500 hover:text-blue-700 text-sm ml-4"
              >
                View Details
              </a>
              {/* {index < pipelines.length - 1 && (
                <div className="absolute left-4 top-9 h-8 w-0.5 bg-gray-300"></div>
              )} */}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PipelinesList;
