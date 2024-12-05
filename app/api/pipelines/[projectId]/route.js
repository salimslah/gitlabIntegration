import { listProjectPipelines } from '@/app/services/gitlab';
import { NextResponse } from 'next/server';

export async function GET(request, { params }) {
  const { projectId } = await params; // Get projectId from the route

  try {
    if (!projectId) {
      return NextResponse.json({ error: 'Project ID is required' }, { status: 400 });
    }

    const pipelines = await listProjectPipelines(projectId);
    return NextResponse.json(pipelines);
  } catch (error) {
    console.error('Error fetching GitLab pipelines:', error);
    return NextResponse.json(
      { error: 'Failed to fetch GitLab pipelines' },
      { status: error.response?.status || 500 }
    );
  }
}
