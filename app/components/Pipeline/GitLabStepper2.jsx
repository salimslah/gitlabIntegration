'use client';

import { getPipelineStagesFrontEnd } from '@/app/services/gitlab';
import { useEffect, useState } from 'react';
import { HiCheckCircle, HiArrowPath, HiExclamationCircle } from 'react-icons/hi2';

const GitLabStepper2 = ({ projectId, pipelineId }) => {
  const [stages, setStages] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStages = async () => {
      try {
        setLoading(true);
        const pipelineRes = await fetch(`/api/pipelines/${projectId}`);
        const pipelines = await pipelineRes.json();
        const latestPipelineId = pipelines[0]?.id;

        if (!latestPipelineId) {
          setError('No pipelines found');
          return;
        }

        const stagesData = await getPipelineStagesFrontEnd(projectId, latestPipelineId);

        const uniqueStages = stagesData.reduce((acc, job) => {
          if (!acc.some((stage) => stage.name === job.stage)) {
            acc.push({ name: job.stage, status: job.status });
          }
          return acc;
        }, []);

        setStages(uniqueStages);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStages();
  }, [projectId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-32">
        <p className="text-gray-500 animate-pulse text-lg font-medium">Loading pipeline stages...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-32">
        <p className="text-red-500 text-lg font-semibold">{error}</p>
      </div>
    );
  }

  const getStatusIcon = (status) => {
    if (status === 'success') return <HiCheckCircle className="text-3xl text-green-400" />;
    if (status === 'running') return <HiArrowPath className="text-3xl text-blue-400 animate-spin" />;
    if (status === 'failed') return <HiExclamationCircle className="text-3xl text-red-400" />;
    return <div className="w-6 h-6 bg-gray-300 rounded-full"></div>;
  };

  return (
    <div className="flex items-center justify-center space-x-8 p-8 bg-white/70 backdrop-blur-lg shadow-xl rounded-2xl border border-gray-200">
      {stages.map((stage, index) => (
        <div key={index} className="flex items-center">
          {/* Stage Circle */}
          <div
            className={`w-14 h-14 rounded-full flex items-center justify-center shadow-lg transform transition duration-500 ${
              stage.status === 'success'
                ? 'bg-gradient-to-br from-green-400 to-green-600 hover:scale-110'
                : stage.status === 'running'
                ? 'bg-gradient-to-br from-blue-400 to-blue-600 hover:scale-110'
                : stage.status === 'failed'
                ? 'bg-gradient-to-br from-red-400 to-red-600 hover:scale-110'
                : 'bg-gradient-to-br from-gray-200 to-gray-300 text-gray-600'
            }`}
          >
            {getStatusIcon(stage.status)}
          </div>

          {/* Stage Name */}
          <p className="ml-4 text-gray-800 text-lg font-medium">{stage.name}</p>

          {/* Animated Divider */}
          {index < stages.length - 1 && (
            <div className="h-1 w-16 bg-gradient-to-r from-gray-300 via-gray-400 to-gray-300 rounded-full mx-4 relative">
              {/* <div className="absolute top-0 left-0 h-1 w-1/4 bg-blue-500 rounded-full animate-ping"></div> */}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default GitLabStepper2;
