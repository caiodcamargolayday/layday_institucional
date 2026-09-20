import { NextResponse } from 'next/server';
import { buildRegistrationEvent, sendToMetaCAPI } from '@/lib/metaCapi';

/**
 * WhatsApp Inbound Webhook
 * 
 * Listens for incoming WhatsApp messages sent to +62 895-1763-7461.
 * Automatically dispatches the "Registration" event to Meta CAPI (Pixel 1036889488979198)
 * only when the customer sends their message on WhatsApp.
 */

// GET endpoint for Meta / WhatsApp Webhook verification
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const mode = searchParams.get('hub.mode');
  const token = searchParams.get('hub.verify_token');
  const challenge = searchParams.get('hub.challenge');

  const VERIFY_TOKEN = process.env.WHATSAPP_WEBHOOK_VERIFY_TOKEN || 'layday_beerpong_webhook_token';

  if (mode === 'subscribe' && token === VERIFY_TOKEN) {
    return new Response(challenge, { status: 200 });
  }

  return new Response('Verification failed', { status: 403 });
}

// POST endpoint for processing inbound WhatsApp messages
export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Support standard WhatsApp Cloud API payload or generic webhook payload (ManyChat / Evolution API / Z-API / Make / Zapier)
    let senderPhone = '';
    let senderName = '';
    let messageText = '';

    // Standard WhatsApp Business Cloud API format:
    if (body.entry?.[0]?.changes?.[0]?.value?.messages?.[0]) {
      const msgObj = body.entry[0].changes[0].value.messages[0];
      const contactObj = body.entry[0].changes[0].value.contacts?.[0];
      senderPhone = msgObj.from || '';
      messageText = msgObj.text?.body || '';
      senderName = contactObj?.profile?.name || '';
    } else {
      // Direct / Generic webhook format
      senderPhone = body.phone || body.from || body.sender || '';
      senderName = body.name || body.firstName || body.senderName || '';
      messageText = body.message || body.text || body.body || '';
    }

    if (!senderPhone) {
      return NextResponse.json({ success: false, message: 'No sender phone detected' }, { status: 400 });
    }

    const eventId = crypto.randomUUID();
    const event = buildRegistrationEvent({
      eventId,
      eventSourceUrl: 'https://laydayhostels.com/beerpongatldgilit',
      phone: senderPhone,
      firstName: senderName ? senderName.split(' ')[0] : undefined,
      lastName: senderName && senderName.includes(' ') ? senderName.split(' ').slice(1).join(' ') : undefined,
      eventName: 'CompleteRegistration',
      contentName: 'Beerpong Championship Registration (WhatsApp Inbound)',
      actionSource: 'chat',
    });

    await sendToMetaCAPI([event], 'beerpong', body.testEventCode || null);

    return NextResponse.json({
      success: true,
      eventId,
      pixelId: '1036889488979198',
      eventName: 'CompleteRegistration',
      phone: senderPhone,
      message: 'Inbound WhatsApp message processed and CompleteRegistration CAPI event fired'
    });
  } catch (error: any) {
    console.error('[WhatsApp Inbound Webhook Error]:', error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
