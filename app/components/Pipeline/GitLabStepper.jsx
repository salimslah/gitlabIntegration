'use client';

import { getPipelineStagesFrontEnd } from '@/app/services/gitlab';
import { useEffect, useState } from 'react';

const GitLabStepper = ({ projectId }) => {
  const [stages, setStages] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStages = async () => {
      try {
        setLoading(true);
        // Fetch the latest pipeline
        const pipelineRes = await fetch(`/api/pipelines/${projectId}`);
        const pipelines = await pipelineRes.json();
        const latestPipelineId = pipelines[0]?.id;

        if (!latestPipelineId) {
          setError('No pipelines found');
          return;
        }

        // Fetch pipeline stages
        const stagesData = await getPipelineStagesFrontEnd(projectId, latestPipelineId);

        // Extract unique stages with their status
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

  if (loading) return <p>Loading pipeline stages...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="flex items-center space-x-4">
      {stages.map((stage, index) => (
        <div key={index} className="flex items-center">
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center ${
              stage.status === 'success'
                ? 'bg-green-500'
                : stage.status === 'running'
                ? 'bg-blue-500'
                : 'bg-gray-300'
            }`}
          >
            <span className="text-white text-sm">{index + 1}</span>
          </div>
          <p className="ml-2">{stage.name}</p>
          {index < stages.length - 1 && (
            <div
              className={`w-8 h-1 ${
                stages[index + 1].status === 'success'
                  ? 'bg-green-500'
                  : stages[index + 1].status === 'running'
                  ? 'bg-blue-500'
                  : 'bg-gray-300'
              } mx-4`}
            ></div>
          )}
        </div>
      ))}
    </div>
  );
};

export default GitLabStepper;
