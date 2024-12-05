import axios from 'axios';

const GITLAB_BASE_URL = 'https://gitlab.com/api/v4';

const gitlabApi = axios.create({
  baseURL: GITLAB_BASE_URL,
  headers: {
    Authorization: `Bearer ${process.env.GITLAB_PERSONAL_ACCESS_TOKEN}`,
  },
});

export const getGitLabUser = async () => {
  const response = await gitlabApi.get('/user');
  return response.data;
};

export const listGitLabProjects = async () => {
  const response = await gitlabApi.get('/projects?membership=true');
  return response.data;
};

export const listProjectCommits = async (projectId) => {
  const response = await gitlabApi.get(`/projects/${projectId}/repository/commits`);
  return response.data;
};
export const listProjectEnvironments = async (projectId) => {
  const response = await gitlabApi.get(`/projects/${projectId}/environments`);
  
  return response.data;
};
export const listProjectBranches = async (projectId) => {

  const response = await gitlabApi.get(`/projects/${projectId}/repository/branches`);
  
  return response.data;
};


export const listProjectPipelines = async (projectId) => {
    const response = await gitlabApi.get(`/projects/${projectId}/pipelines`);
    return response.data;
};

export const getPipelineStagesFrontEnd = async (projectId, pipelineId) => {
  const response = await fetch(`/api/pipelines/${projectId}/${pipelineId}`);
  if (!response.ok) {
    throw new Error('Failed to fetch pipeline stages');
  }
  return response.json();
};


export const getPipelineStages2 = async (projectId,pipelineId) => {
  console.log(projectId,projectId)
  const response = await gitlabApi.get(`/projects/${projectId}/pipelines/${pipelineId}/jobs`);
  return response.data;
};



// all tempalte
// export const listGitLabProjects = async () => {
//   const response = await gitlabApi.get('/projects');
//   return response.data;
// };
// 1573407829