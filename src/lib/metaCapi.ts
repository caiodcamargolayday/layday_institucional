import crypto from 'crypto';

const API_VERSION = 'v21.0';

export function getCapiConfig(origin: string) {
  if (origin === 'gilit') {
    return {
      pixelId: process.env.META_PIXEL_ID_LDGILIT,
      accessToken: process.env.META_ACCESS_TOKEN_LDGILIT,
    };
  }
  return {
    pixelId: process.env.META_PIXEL_ID_LDCANGGU,
    accessToken: process.env.META_ACCESS_TOKEN_LDCANGGU,
  };
}

/**
 * Hash a string value with SHA256 (required by Meta for PII fields)
 * Do NOT hash: fbp, fbc, ip, user_agent
 */
export function hash(value: string | undefined | null): string | undefined {
  if (!value) return undefined;
  return crypto
    .createHash('sha256')
    .update(String(value).trim().toLowerCase())
    .digest('hex');
}

/**
 * Normalize phone to E.164 format before hashing
 * e.g. +62812345678 or 62812345678 or 08123456789
 */
export function normalizePhone(phone: string | undefined | null): string | undefined {
  if (!phone) return undefined;
  let p = String(phone).replace(/\D/g, '');
  if (p.startsWith('0')) p = '62' + p.slice(1); // Indonesian local format
  if (!p.startsWith('62')) p = '62' + p;
  return '+' + p;
}

export interface PurchaseEventParams {
  eventId: string;
  eventSourceUrl: string;
  clientIp?: string | null;
  clientUserAgent?: string | null;
  fbp?: string | null;
  fbc?: string | null;
  email?: string | null;
  phone?: string | null;
  firstName?: string | null;
  lastName?: string | null;
  country?: string;
  value: string | number;
  orderId: string;
}

/**
 * Build a Purchase event payload
 */
export function buildPurchaseEvent({
  eventId,
  eventSourceUrl,
  clientIp,
  clientUserAgent,
  fbp,
  fbc,
  email,
  phone,
  firstName,
  lastName,
  country = 'id', // Indonesia default
  value,
  orderId,
}: PurchaseEventParams) {
  return {
    event_name: 'Purchase',
    event_time: Math.floor(Date.now() / 1000),
    event_id: eventId,
    event_source_url: eventSourceUrl,
    action_source: 'website',

    user_data: {
      // PII — must be SHA256 hashed
      em: email ? [hash(email)] : undefined,
      ph: phone ? [hash(normalizePhone(phone))] : undefined,
      fn: firstName ? [hash(firstName)] : undefined,
      ln: lastName ? [hash(lastName)] : undefined,
      country: country ? [hash(country)] : undefined,

      // Do NOT hash these
      client_ip_address: clientIp || undefined,
      client_user_agent: clientUserAgent || undefined,
      fbp: fbp || undefined,
      fbc: fbc || undefined,
    },

    custom_data: {
      value: parseFloat(String(value)),
      currency: 'IDR',
      order_id: orderId,
      content_type: 'hotel',
    },
  };
}

/**
 * Send one or more events to Meta Conversions API
 * @param {Array} events - array of event objects
 * @param {string} testEventCode - optional, from Events Manager > Test Events
 */
export async function sendToMetaCAPI(events: any[], origin: string, testEventCode: string | null = null) {
  const body: any = { data: events };
  if (testEventCode) body.test_event_code = testEventCode;

  const config = getCapiConfig(origin);
  if (!config.pixelId || !config.accessToken) {
    console.log(`[Meta CAPI] Missing configuration for origin: ${origin}`);
    return;
  }

  const endpoint = `https://graph.facebook.com/${API_VERSION}/${config.pixelId}/events`;

  const response = await fetch(`${endpoint}?access_token=${config.accessToken}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  const result = await response.json();

  if (!response.ok) {
    console.error('[Meta CAPI] Error:', JSON.stringify(result));
    throw new Error('Meta CAPI request failed');
  }

  console.log('[Meta CAPI] Success:', JSON.stringify(result));
  return result;
}
