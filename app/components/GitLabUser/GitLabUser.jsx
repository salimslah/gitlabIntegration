'use client';

import { useEffect, useState } from 'react';

export default function GitLabUser() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch('/api/gitlab/user');
        const data = await response.json();
        setUser(data);
      } catch (error) {
        console.error('Failed to fetch user:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  return (
    <div className="mt-[50px] flex flex-col items-center justify-center  bg-gray-50 text-gray-900 p-6">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-center mb-4">GitLab User</h1>
        {loading ? (
          <div className="animate-pulse space-y-4">
            <div className="h-4 bg-gray-300 rounded w-3/4 mx-auto"></div>
            <div className="h-4 bg-gray-300 rounded w-1/2 mx-auto"></div>
          </div>
        ) : user ? (
          <div className="flex flex-col items-center space-y-4">
            <img
              src={user.avatar_url}
              alt={`${user.username}'s avatar`}
              className="w-24 h-24 rounded-full shadow-md"
            />
            <h2 className="text-xl font-semibold">{user.name || user.username}</h2>
            <p className="text-gray-600">
              <span className="font-medium">Username:</span> {user.username}
            </p>
            <p className="text-gray-600">
              <span className="font-medium">Email:</span> {user.email || 'N/A'}
            </p>
            <a
              href={user.web_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              Visit GitLab Profile
            </a>
          </div>
        ) : (
          <p className="text-red-500 text-center">Failed to load user data.</p>
        )}
      </div>
    </div>
  );
}
