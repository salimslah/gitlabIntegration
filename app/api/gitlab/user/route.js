import { NextResponse } from 'next/server';
import { getGitLabUser } from '@/app/services/gitlab';

export async function GET() {
  try {
    const user = await getGitLabUser();
    return NextResponse.json(user);
  } catch (error) {
    console.error('Error fetching GitLab user:', error);
    return NextResponse.json({ error: 'Failed to fetch GitLab user' }, { status: 500 });
  }
}
