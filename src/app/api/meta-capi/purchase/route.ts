import { NextResponse } from 'next/server';
import { buildPurchaseEvent, sendToMetaCAPI } from '@/lib/metaCapi';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      eventId,
      eventSourceUrl,
      fbp,
      fbc,
      email,
      phone,
      firstName,
      lastName,
      country,
      value,
      orderId,
      testEventCode, // only pass this during testing
    } = body;

    // Validate required fields
    if (!eventId || !value || !orderId) {
      return NextResponse.json(
        { error: 'Missing required fields: eventId, value, orderId' },
        { status: 400 }
      );
    }

    // Get real client IP from headers (works on Vercel)
    const clientIp =
      request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
      request.headers.get('x-real-ip') ||
      null;

    const clientUserAgent = request.headers.get('user-agent') || null;

    const event = buildPurchaseEvent({
      eventId,
      eventSourceUrl: eventSourceUrl || 'https://www.laydayhostels.com/booking-confirmation',
      clientIp,
      clientUserAgent,
      fbp,
      fbc,
      email,
      phone,
      firstName,
      lastName,
      country: country || 'id',
      value,
      orderId,
    });

    await sendToMetaCAPI([event], testEventCode || null);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('[Meta CAPI Route] Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
