import { NextResponse } from 'next/server';
import { listProjectCommits } from '@/app/services/gitlab';

export async function GET(request, { params }) {
  const { projectId } =  await params; // Get projectId from the route

  try {
    if (!projectId) {
      return NextResponse.json({ error: 'Project ID is required' }, { status: 400 });
    }

    const commits = await listProjectCommits(projectId);
    return NextResponse.json(commits);
  } catch (error) {
    console.error('Error fetching GitLab commits:', error);
    return NextResponse.json(
      { error: 'Failed to fetch GitLab commits' },
      { status: error.response?.status || 500 }
    );
  }
}
