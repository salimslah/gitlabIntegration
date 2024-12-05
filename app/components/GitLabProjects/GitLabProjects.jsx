'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function GitLabProjects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch('/api/gitlab/projects');
        const data = await response.json();
        setProjects(data);
      } catch (error) {
        console.error('Failed to fetch projects:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-lg font-medium text-gray-600">Loading projects...</p>
      </div>
    );
  }

  if (!projects.length) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-lg font-medium text-gray-600">No projects found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">GitLab Projects</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
           <div key={project.id} className="p-4 bg-white rounded-lg shadow-md border hover:shadow-lg transition-shadow">
           <Link href={`/projects/${project.id}`} className="block">
             <div className="flex items-center mb-4">
               <img
                 src={project.avatar_url || project.namespace.avatar_url || '/placeholder-avatar.png'}
                 alt={`${project.name} avatar`}
                 className="w-12 h-12 rounded-full mr-4"
               />
               <div>
                 <h2 className="text-lg font-semibold text-gray-700">{project.name}</h2>
                 <p className="text-sm text-gray-500">{project.namespace.name}</p>
               </div>
             </div>
             <p className="text-sm text-gray-600 mb-4 line-clamp-2">
               {project.description || 'No description available.'}
             </p>
           </Link>
           <a
             href={project.web_url}
             target="_blank"
             rel="noopener noreferrer"
             className="text-primary-500 font-medium hover:underline"
           >
             View Project →
           </a>
         </div>
         
          ))}
        </div>
      </div>
    </div>
  );
}
