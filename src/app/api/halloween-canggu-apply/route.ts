import { NextRequest, NextResponse } from "next/server";

// POST /api/halloween-canggu-apply
// Forwards Lay Day of the Dead (Halloween Party Canggu) guest list registration to Google Apps Script → Google Sheets
// Target Google Sheet: https://docs.google.com/spreadsheets/d/10npaQkXcaisqS8fAxFlUNPhS7JdiS9oyfgn1TkDUUkQ/edit?gid=0#gid=0
// Columns: Timestamp | Name | Phone | Email | How many people
export async function POST(req: NextRequest) {
  const APPS_SCRIPT_URL =
    process.env.HALLOWEEN_CANGGU_SHEETS_URL ||
    process.env.NEXT_PUBLIC_HALLOWEEN_CANGGU_SHEETS_URL ||
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

    const nationality = String(body.nationality || body.Nationality || body.people || "").trim();

    // Exact fields matching Google Sheet format (Column A: Timestamp, B: Name, C: Phone, D: Email, E: Nationality)
    const payload = {
      Timestamp: formattedTimestamp,
      timestamp: formattedTimestamp,
      timestampFormatted: formattedTimestamp,
      Name: body.name || "",
      name: body.name || "",
      Phone: phoneStr,
      phone: phoneStr,
      Email: body.email || "",
      email: body.email || "",
      Nationality: nationality,
      nationality: nationality,
      // Backward compatibility keys if Google Apps Script reads them
      "How many people": nationality,
      how_many_people: nationality,
      people: nationality,
      event: "Lay Day of the Dead - Halloween Canggu",
      source: "halloween-canggu-lp",
    };

    if (APPS_SCRIPT_URL) {
      const res = await fetch(APPS_SCRIPT_URL, {
        method: "POST",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify(payload),
        redirect: "follow",
      });

      const responseText = await res.text().catch(() => "");
      console.log(`[Halloween Canggu] Apps Script responded with ${res.status}:`, responseText.slice(0, 100));

      if (!res.ok) {
        console.warn(`[Halloween Canggu] Apps Script HTTP ${res.status}. If 403/401, check 'Who has access: Anyone' in Google Apps Script.`);
      }
    } else {
      console.log(
        "[Halloween Canggu] HALLOWEEN_CANGGU_SHEETS_URL not set yet. Target sheet: https://docs.google.com/spreadsheets/d/10npaQkXcaisqS8fAxFlUNPhS7JdiS9oyfgn1TkDUUkQ/edit?gid=0#gid=0. Local payload:",
        payload
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[Halloween Canggu] Sheets submission error:", err);
    return NextResponse.json({ ok: true });
  }
}
