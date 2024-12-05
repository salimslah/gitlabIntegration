import { NextResponse } from 'next/server';
import { listProjectEnvironments } from '@/app/services/gitlab';

export async function GET(request, { params }) {
  const { projectId } = await params; // Get projectId from the route

  try {
    if (!projectId) {
      return NextResponse.json({ error: 'Project ID is required' }, { status: 400 });
    }

    const environments = await listProjectEnvironments(projectId);
    return NextResponse.json(environments);
  } catch (error) {
    console.error('Error fetching GitLab environments:', error);
    return NextResponse.json(
      { error: 'Failed to fetch GitLab environments' },
      { status: error.response?.status || 500 }
    );
  }
}
