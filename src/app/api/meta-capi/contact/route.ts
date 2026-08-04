import { NextResponse } from 'next/server';
import { buildContactEvent, sendToMetaCAPI } from '@/lib/metaCapi';
// uuid removed

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { 
      eventSourceUrl, 
      fbp, 
      fbc, 
      email, 
      phone, 
      firstName, 
      lastName, 
      origin, 
      testEventCode 
    } = body;

    // Optional: Get IP and User-Agent from headers
    const clientIp = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip');
    const clientUserAgent = req.headers.get('user-agent');
    const eventId = crypto.randomUUID();

    const event = buildContactEvent({
      eventId,
      eventSourceUrl: eventSourceUrl || req.url,
      clientIp,
      clientUserAgent,
      fbp,
      fbc,
      email,
      phone,
      firstName,
      lastName,
    });

    await sendToMetaCAPI([event], origin || 'vice', testEventCode || null);

    return NextResponse.json({ success: true, eventId });
  } catch (error: any) {
    console.error('Contact event error:', error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
