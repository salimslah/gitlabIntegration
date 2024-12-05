import { NextResponse } from "next/server";
import { getPipelineStages2 } from "@/app/services/gitlab";

export async function GET(request, { params }) {
    const { projectId ,pipelineId } = await params; // Get projectId from the route
  console.log('\n\n\n\n\n\t salim',params)

  console.log('\t\t\t\t\t\n\n\n\n\n\n\n\n\n\n =======projectId',projectId,'\t\t\t\t\t\n\n\n\n\n\n\n\n\n\n =======pipelineId',pipelineId)
  try {
    if (!projectId || !pipelineId) {
      return NextResponse.json(
        { error: "Project ID and Pipeline ID are required" },
        { status: 400 }
      );
    }

    const jobs = await getPipelineStages2(projectId,pipelineId);
    return NextResponse.json(jobs);
  } catch (error) {
    console.error("Error fetching GitLab jobs:", error);
    return NextResponse.json(
      { error: "Failed to fetch GitLab jobs" },
      { status: error.response?.status || 500 }
    );
  }
}
