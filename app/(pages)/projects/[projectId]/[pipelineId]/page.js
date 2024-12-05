import BranchesDropdown from "@/app/components/Branches/BranchesDropdown";
import CommitsList from "@/app/components/GitLabProjects/CommitsList";
import EnvironmentsList from "@/app/components/GitLabProjects/EnvironmentsList";
import Navbar from "@/app/components/Navbar";
import GitLabStepper2 from "@/app/components/Pipeline/GitLabStepper2";
import PipelinesList from "@/app/components/Pipeline/PipelinesList";
import { getGitLabUser, listProjectCommits } from "@/app/services/gitlab";

export default async function Pipeline({ params }) {
  const { projectId, pipelineId } = await params;
  let commits = [];
  let users = [];
  let error = null;

  try {
    // Fetch commits and users in parallel
    const [commitsResponse, usersResponse] = await Promise.all([
      listProjectCommits(projectId),
      getGitLabUser(),
    ]);

    commits = commitsResponse;
    users = usersResponse;
  } catch (err) {
    console.error("Error fetching data:", err);
    error = err.message;
  }

  return (
    <>
      <Navbar />
      <div className="max-w-4xl mx-auto mt-10">
        <GitLabStepper2 projectId={projectId} pipelineId={pipelineId} />
        <BranchesDropdown projectId={projectId} />
        <CommitsList commits={commits} users={users} error={error} />
        <EnvironmentsList projectId={projectId} />
      </div>
    </>
  );
}
