import { NextRequest, NextResponse } from "next/server";

// POST /api/creator-week-apply
// Forwards form answers to Google Apps Script → Google Sheets
export async function POST(req: NextRequest) {
  const APPS_SCRIPT_URL = process.env.CREATOR_WEEK_SHEETS_URL;

  if (!APPS_SCRIPT_URL) {
    console.error("CREATOR_WEEK_SHEETS_URL env var not set");
    return NextResponse.json({ ok: false, error: "Server not configured" }, { status: 500 });
  }

  try {
    const body = await req.json();
    const res = await fetch(APPS_SCRIPT_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (!res.ok) throw new Error(`Apps Script responded with ${res.status}`);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Sheets submission error:", err);
    return NextResponse.json({ ok: false, error: "Submission failed" }, { status: 500 });
  }
}
