import { NextRequest, NextResponse } from "next/server";

// POST /api/oktoberfest-canggu-apply
// Forwards Oktoberfest guest list registration to Google Apps Script → Google Sheets
export async function POST(req: NextRequest) {
  const APPS_SCRIPT_URL =
    process.env.OKTOBERFEST_CANGGU_SHEETS_URL ||
    process.env.NEXT_PUBLIC_OKTOBERFEST_CANGGU_SHEETS_URL;

  try {
    const body = await req.json();

    // Ensure phone starts with ' so Google Sheets doesn't evaluate +countryCode as a formula
    let phoneStr = String(body.phone || "").trim();
    if (phoneStr && !phoneStr.startsWith("'")) {
      phoneStr = "'" + phoneStr;
    }

    const now = new Date();
    // Format timestamp in Bali Time (WITA, UTC+8)
    const formattedTimestamp = now.toLocaleString("en-GB", {
      timeZone: "Asia/Makassar",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    });

    // Exact 5 fields matching Google Sheet: Timestamp, Name, Phone, Email, How many people
    const payload = {
      timestamp: formattedTimestamp,
      timestampFormatted: formattedTimestamp,
      name: body.name || "",
      phone: phoneStr,
      email: body.email || "",
      people: String(body.people || "1"),
    };

    if (APPS_SCRIPT_URL) {
      const res = await fetch(APPS_SCRIPT_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        console.warn(`[Oktoberfest Canggu] Apps Script responded with ${res.status}`);
      }
    } else {
      console.log(
        "[Oktoberfest Canggu] OKTOBERFEST_CANGGU_SHEETS_URL not set yet. Stored payload locally:",
        payload
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[Oktoberfest Canggu] Sheets submission error:", err);
    return NextResponse.json({ ok: true });
  }
}
