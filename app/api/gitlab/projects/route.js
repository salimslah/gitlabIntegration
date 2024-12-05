import { NextResponse } from 'next/server';
import { listGitLabProjects } from '@/app/services/gitlab';

export async function GET() {
  try {
    const projects = await listGitLabProjects();
    return NextResponse.json(projects);
  } catch (error) {
    console.error('Error fetching GitLab projects:', error);
    return NextResponse.json({ error: 'Failed to fetch GitLab projects' }, { status: 500 });
  }
}
