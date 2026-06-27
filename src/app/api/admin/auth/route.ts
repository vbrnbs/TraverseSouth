import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { pin } = await request.json();
    const correctPin = process.env.PM_DASHBOARD_PIN || '0506';

    if (pin === correctPin) {
      const response = NextResponse.json({ success: true });
      // Set a session cookie that expires in 7 days
      response.cookies.set('pm_auth', 'authenticated', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 60 * 60 * 24 * 7, // 7 days
        path: '/admin',
      });
      return response;
    }

    return NextResponse.json({ success: false, error: 'Invalid PIN' }, { status: 401 });
  } catch {
    return NextResponse.json({ success: false, error: 'Bad request' }, { status: 400 });
  }
}
