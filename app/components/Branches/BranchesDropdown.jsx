'use client';
import React, { useEffect, useState } from 'react';

const BranchesDropdown = ({ projectId }) => {
  const [branches, setBranches] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedBranch, setSelectedBranch] = useState('');

  // Fetch the branches when the component mounts
  useEffect(() => {
    const fetchBranches = async () => {
      try {
        const response = await fetch(`/api/branches/${projectId}`);
        const data = await response.json();

        if (data.error) {
          setError(data.error);
        } else {
          setBranches(data);
        }
      } catch (error) {
        setError('Failed to fetch branches.');
      } finally {
        setLoading(false);
      }
    };

    fetchBranches();
  }, [projectId]);

  // Handle change in selected branch
  const handleChange = (e) => {
    setSelectedBranch(e.target.value);
  };

  if (loading) {
    return (
      <div className="p-6 border rounded-lg shadow-lg bg-white">
        <h2 className="text-2xl font-semibold mb-4">Loading branches...</h2>
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

  return (
    <div className="p-6 border rounded-lg shadow-lg bg-white">
      <h2 className="text-2xl font-semibold mb-4">Select a Branch</h2>
      {branches.length === 0 ? (
        <p>No branches found for this project.</p>
      ) : (
        <div>
          <select
            value={selectedBranch}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
          >
            <option value="" disabled>
              Select a branch
            </option>
            {branches.map((branch) => (
              <option key={branch.name} value={branch.name}>
                {branch.name}
              </option>
            ))}
          </select>
          {selectedBranch && (
            <p className="mt-2 text-sm text-gray-600">
              You have selected <strong>{selectedBranch}</strong> branch.
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default BranchesDropdown;
