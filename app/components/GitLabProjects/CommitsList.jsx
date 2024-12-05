'use client';
import React from 'react';

export default function CommitsList({ commits, users, error }) {
  if (error) {
    return (
      <div className="p-6 border rounded-lg shadow-sm bg-red-50">
        <h2 className="text-xl font-semibold text-red-600 mb-2">Error</h2>
        <p className="text-red-500">Failed to load commits. Please try again later.</p>
      </div>
    );
  }

  // Normalize users into an array (in case it's a single object)
  const userList = Array.isArray(users) ? users : [users];

  // Group commits by date
  const groupedCommits = commits.reduce((groups, commit) => {
    const commitDate = new Date(commit.created_at).toLocaleDateString(); // Format date (e.g., "MM/DD/YYYY")
    if (!groups[commitDate]) {
      groups[commitDate] = [];
    }
    groups[commitDate].push(commit);
    return groups;
  }, {});

  return (
    <div className="p-6 border rounded-lg shadow-sm bg-white">
      <h2 className="text-2xl font-semibold mb-4">Project Commits</h2>
      {Object.entries(groupedCommits).map(([date, commits]) => (
        <div key={date} className="mb-6">
          <h3 className="text-xl font-medium mb-3">{date}</h3>
          <ul className="space-y-3">
            {commits.map((commit) => {
              // Find the matching user by email
              const user = userList.find((user) => user.commit_email === commit.author_email);

              return (
                <li
                  key={commit.id}
                  className="flex items-center p-4 bg-gray-100 hover:bg-gray-200 rounded-md transition-all"
                >
                  <img
                    src={user?.avatar_url || '/default-avatar.png'}
                    alt={`${commit.author_name}'s avatar`}
                    className="w-10 h-10 rounded-full mr-4"
                  />
                  <div>
                    <strong className="text-gray-800">{commit.title}</strong>
                    <p className="text-sm text-gray-600">
                      By {commit.author_name} ({commit.short_id}) at{' '}
                      {new Date(commit.created_at).toLocaleTimeString()}
                    </p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </div>
  );
}
