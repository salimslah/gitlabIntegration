import { listProjectBranches } from '@/app/services/gitlab';
import { NextResponse } from 'next/server';

export async function GET(request, { params }) {
  const { projectId } = await params; // Get projectId from the route

  try {
    if (!projectId) {
      return NextResponse.json({ error: 'Project ID is required' }, { status: 400 });
    }

    const branches = await listProjectBranches(projectId);
    return NextResponse.json(branches);
  } catch (error) {
    console.error('Error fetching GitLab branches:', error);
    return NextResponse.json(
      { error: 'Failed to fetch GitLab branches' },
      { status: error.response?.status || 500 }
    );
  }
}
