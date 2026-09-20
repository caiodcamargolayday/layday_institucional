import { NextResponse } from 'next/server';
import { buildRegistrationEvent, sendToMetaCAPI } from '@/lib/metaCapi';

/**
 * Meta CAPI Registration Event Endpoint
 * 
 * Fired exclusively when the user sends their registration message on WhatsApp.
 * Uses Pixel ID: 1036889488979198
 */
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { 
      phone, 
      firstName, 
      lastName, 
      email, 
      eventSourceUrl, 
      eventName = 'CompleteRegistration',
      contentName = 'Beerpong Championship Registration (WhatsApp)',
      fbp, 
      fbc, 
      testEventCode,
      actionSource = 'chat'
    } = body;

    const clientIp = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip');
    const clientUserAgent = req.headers.get('user-agent');
    const eventId = crypto.randomUUID();

    const event = buildRegistrationEvent({
      eventId,
      eventSourceUrl: eventSourceUrl || 'https://laydayhostels.com/beerpongatldgilit',
      clientIp,
      clientUserAgent,
      fbp,
      fbc,
      email,
      phone,
      firstName,
      lastName,
      eventName,
      contentName,
      actionSource,
    });

    // Send directly to Pixel 1036889488979198 via CAPI
    await sendToMetaCAPI([event], 'beerpong', testEventCode || null);

    return NextResponse.json({ 
      success: true, 
      eventId, 
      pixelId: '1036889488979198',
      eventName,
      message: 'Registration CAPI event dispatched successfully' 
    });
  } catch (error: any) {
    console.error('[Meta CAPI Registration Error]:', error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
