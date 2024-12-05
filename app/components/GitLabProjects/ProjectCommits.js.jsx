'use client'
import React, { useEffect, useState } from 'react';

const fetchProjectCommits = async (projectId) => {
  const response = await fetch(`/api/commits/${projectId}`);
  if (!response.ok) {
    throw new Error('Failed to fetch commits');
  }
  return response.json();
};

const ProjectCommits = ({ projectId }) => {
  const [commits, setCommits] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProjectCommits(projectId)
      .then(setCommits)
      .catch((err) => setError(err.message));
  }, [projectId]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!commits.length) {
    return <div>Loading commits...</div>;
  }

  return (
    <ul>
      {commits.map((commit) => (
        <li key={commit.id}>
          <strong>{commit.title}</strong> - {commit.author_name} ({commit.short_id})
        </li>
      ))}
    </ul>
  );
};

export default ProjectCommits;
